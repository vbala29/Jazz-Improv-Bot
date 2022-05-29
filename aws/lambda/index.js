/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const s11 = require('sharp11')
const improv = require('sharp11-improv')


exports.handler = async (event, context) => {
    let chart = s11.chart.load(JSON.parse(event.chart)); //Load serialized chart from request
    console.log("Lambda invoked for chart titled: " + chart.info.title)
    let imp = improv.overChart(chart, {cadence: false});
    let notes = []
    let chords = []
    if (event.chords) {
        for (obj of imp.data) {
            notes.push(obj.notes);
            chords.push(obj.chord)
        }
    }
    return {
            "improv": JSON.stringify(notes),
            "chords": JSON.stringify(chords)
        }
};