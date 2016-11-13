var d3 = require('d3');
var fs = require('fs');

$(document).ready(function() {
    tablecsv = fs.readFileSync("json/Table.csv", 'utf8')
    dict = JSON.parse(fs.readFileSync("json/classes.json"));
    // console.log(tablecsv);
    var parsedCSV = d3.csvParseRows(tablecsv);
    parsedCSV = parsedCSV.map(function(e) {
        return e.map(function(a) {
            // console.log(a) 
            if (dict[a] != undefined) {
                return dict[a]
            } else {
                return a
            } 
        }) 
    })
    // console.log(parsedCSV);
    var container = d3
    	.select("body")
    	.select("#timetable-table")
    	.selectAll("tr")
    	.data(parsedCSV).enter()
    	.append("tr")
    	.selectAll("td")
    	.data(function(d) { return d; }).enter()
    	.append("td")
    	.text(function(d) { return d; });
})