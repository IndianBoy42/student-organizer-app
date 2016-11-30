// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const app = electron.app

const hwk = require('./js/hwk_parser')

const timetable = require("./js/timetable")

// const notes = require("./js/notes")


$(".nav-group-item").click(function() {
    btn = $(this)
    active = $('.active')

    console.log(btn);
    console.log(active);

    if(btn == active) {
    	console.log("nope");
    	return;
    }

    tohide = $("#" + active.attr('divlink'));
    toshow = $("#" + btn.attr('divlink'));

    console.log(tohide);
    console.log(toshow);

    btn.addClass("active");
    active.removeClass('active');

    tohide.hide()
    toshow.show()
})