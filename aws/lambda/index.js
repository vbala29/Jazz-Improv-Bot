const s11 = require('sharp11')

exports.handler = async (event, context) => {
    var chart = s11.chart.load(JSON.parse(event.chart)); //Load serialized chart from request
    console.log("Lambda invoked for chart titled: " + chart.info.title)
    return {"response": chart.info.title}
};