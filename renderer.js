// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const app = electron.app

const hwk = require('./js/hwk_parser')

// app.on("ready", function() {
// 	a = hwk.parse("Essay in English, Spanish on tomorrow")
// 	hwk.addevent(a)
// })

$('#command').bind("input propertychange", function(e) {
    t = $('#command').val()
    a = hwk.parse(t)
    if (a == undefined) {
        console.log("not yet")
            // $("#instructions").html("Format: [Homework Name] [in/of] [Subject(s)] [on/by] [Due Date]")
        $("#hwkname").html("Homework Name: ")
        $("#hwksubj").html("Subject(s): ")
        $("#hwkdate").html("Due Date: ")
        return false
    }
    $("#hwkname").html("Homework Name: " + a.homework)
    $("#hwksubj").html("Subject(s): " + a.subjectlist)
    $("#hwkdate").html("Due Date: " + a.duedatefmt)
})

$("#command").keypress(function(e) {
    if (e.which == 13) {
        e.preventDefault()

        //get and parse
        t = $('#command').val()
        a = hwk.parse(t)
        if (a == undefined) {
        	return false
        }
        hwk.addevent(a, true)

        //clear field
        $('#command').val('')
    }
})
