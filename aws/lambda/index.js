const s11 = require('sharp11')
const improv = require('sharp11-improv')


exports.handler = async (event, context) => {
    var chart = s11.chart.load(JSON.parse(event.chart)); //Load serialized chart from request
    console.log("Lambda invoked for chart titled: " + chart.info.title)
    var imp = improv.overChart(chart).notesAndDurations();

    return {"improv": JSON.stringify(imp)}
};