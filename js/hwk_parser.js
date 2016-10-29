const Sugar = require('sugar')
const fs = require('fs')
// const $ = require('jquery')

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

m = /(.+?)\s+(?:in|of)\s+(.+?)\s+((?:on|by)\s+([^!]+)|(?:next|this|in)\s+[^!]+)(!?)/
l = /[^,(and)\s][^\,(and)]*[^,\s]*/g
d = "{HH}:{mm} on {Weekday}, the {do} of {Month}, {year}"
f = "./json/events.json"

function parse(t) {
    obj = {}
    m1 = t.match(m)
    if (m1 == null) {
        return undefined
    }
    obj.raw = m1[0]
    obj.homework = m1[1]
    obj.subjectstr = m1[2]
    obj.subjects = m1[2].match(l)
    obj.subjectlist = obj.subjects.join(', ')
    obj.duedatestr = ""
    if (m1[4] == undefined) {
        obj.duedatestr = m1[3]
    } else {
        obj.duedatestr = m1[4]
    }
    obj.duedate = Sugar.Date.create(obj.duedatestr)
    obj.duedatefmt = Sugar.Date.format(obj.duedate, d)
    obj.priority = m1[5] == '!'
    return obj
}

function toevent(e) {
    event = {
        "title": "{0} in {1}".f(e.homework, e.subjectlist),
        // start: Sugar.Date.format(e.duedate, 'ISO8601')
        "start": e.duedate
            //TODO: ALL DAY // END DATE // COLOR
    }
    return event
}

function addevent(e, s) {
    // console.log(cal)
    $("#calendar").fullCalendar('renderEvent', toevent(e), true)

    if (s) {
        saveevents()
    }
}

function getevents() {
    var events = $("#calendar").fullCalendar("clientEvents")
    let json = events.map(e => {
        let rv = {};
        Object.keys(e)
            .filter(k => k != "source" && !k.startsWith("_"))
            .forEach(k => {
                rv[k] = e[k];
            });
        return rv;
    });
    return json
}

function saveevents() {
    fs.writeFile(f, JSON.stringify(getevents()), function(err) {
        if(err){
              alert("An error ocurred updating the file"+ err.message);
              console.log(err);
              return;
        }
    })
}

exports.input_regex = m
exports.list_regex = l
exports.date_fmt = d
exports.parse = parse
exports.addevent = addevent
exports.toevent = toevent
exports.getevents = getevents
exports.eventsfile = f
exports.saveevents = saveevents