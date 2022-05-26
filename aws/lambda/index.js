const s11 = require('sharp11')

exports.handler = async (event, context) => {
    console.log("Hello World, this is Vikram's Lambda")
    var chart = s11.chart.create(['A', 'B', 'A'], { A: [{ chord: 'C7', duration: 4 }], B: [{ chord: 'Dm', duration: 4 }] }, { foo: 1 });
    console.log("Event info: " + event.key)
};