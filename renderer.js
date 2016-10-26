// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = require('jquery')

const hwk = require('./js/hwk_parser')
const fullcalendar = require('fullcalendar')

a = hwk.parse("Essay in English, Spanish on tomorrow")
cal = $('#calframe').contents().find("#calendar");
console.log(cal)
hwk.addevent(a, cal)

// const iframe = require('iframe')

// cal_frame = iframe({
//   container: document.querySelector("#calframe"),
//   src: "calendar.html",
//   scrollingDisabled: false
// })