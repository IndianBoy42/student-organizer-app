var Sugar = require('sugar')

m = /(.+)\s+(?:in|of)\s+(.+)\s+((?:on|by)\s+([^!]+)|(?:next|this|in)\s+[^!]+)(!?)/
l = /[^,(and)\s][^\,(and)]*[^,\s]*/g
d = "{HH}:{mm} on {Weekday}, the {do} of {Month}, {year}"

function parse(t) {
        obj = {}
        m1 = t.match(m)
        obj.raw = m1[0]
        obj.homework = m1[1]
        obj.subjectstr = m1[2]
        obj.subjects = m1[2].match(l)
        obj.duedatestr  = ""
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
