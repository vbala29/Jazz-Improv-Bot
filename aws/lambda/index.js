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
    for (obj of imp.data) {
        notes.push(obj.notes);
        if (event.chords) chords.push(obj.chord);
    }

    return {
            "improv": JSON.stringify(notes),
            "chords": JSON.stringify(chords)
        }
};

class Improv {
    constructor(substitutions, outness, rests, chart, tempo) {
        this.substitutions = substitutions/100; //Chance of a chord being substituted diatonically or with a tritone sub
        this.rests = rests/100; //Chance of a particular note being a rest
        this.chart = chart; //The chart to improvise over
        this.jumps = 0.3; //Chance of jumping rather than going up or down in scale

        
        //Depending on tempo, make likeliness of different note durations difference
        if (tempo < 75) {
            this.quarterThreshold = 0.20; //20%
            this.eightThreshold = 0.55;  //35%
            this.tripletThreshold = 0.75;  //20% 
            this.sixteenthThreshold = 1.0; //25%
        } else if (tempo < 150) {
            this.quarterThreshold = 0.25; //25%
            this.eightThreshold = 0.60;  //35%
            this.tripletThreshold = 0.80;  //20% 
            this.sixteenthThreshold = 1.0; //20%
        } else if (tempo < 220) {
            this.quarterThreshold = 0.30; //30%
            this.eightThreshold = 0.70;  //40%
            this.tripletThreshold = 0.90;  //20% 
            this.sixteenthThreshold = 1.0; //10%
        } else if (tempo < 220) {
            this.quarterThreshold = 0.40; //40%
            this.eightThreshold = 0.80;  //40%
            this.tripletThreshold = 1.0;  //20% 
            this.sixteenthThreshold = 1.01; //0%
        }

        switch (outness) {
            case "Solely Diatonic (Least Out)":
                this.outness = 0.05;
                break;
            case "You Heard Giant Steps Once (2nd Least)":
                this.outness = 0.10;
                break;
            case "Average Jazz Musician (Medium)":
                this.outness = 0.15;
                break;
            case "You are John Coltrane (2nd to Most Out)":
                this.outness = 0.20;
                break;
            case "So Out They Might Just Be Playing The Wrong Song (Most Out)":
                this.outness = 0.25;
                break;
            default:
                this.outness = 0.15; //Average Jazz Musician Case
                break;
        }
    }


    #improvOverChord(chord, duration) {
        let num_beats = duration.beats;

        let improv_over_chord = []; //Array of beat arrays (which contain note arrays) representing improv
        let starting_note = this.#chooseStartingNote(chord)
        let previousNote = null; //Null if no note has been played over the chord as yet

        for (let i = 0; i < num_beats; i++) {
            let noteType = this.determineNoteType();
            let improv_over_beat = [];

            while(noteType > 0) {
               let current_note = generateNote(previousNote, chord);

                if (current_note === 1) {
                    improv_over_beat.push(starting_note);
                    previousNote = starting_note;
                } else {
                    improv_over_beat.push(current_note);
                    previousNote = current_note;
                }

                noteType--;
            }
        }
    }

    #generateNote(previousNote, chord) {
        if (Math.random() <  this.rests) {
            return null; //Signifies a rest
        } else if (previousNote == null) {
            //If not a rest and no previous note, must play starting note
            return 1;
        }

        //If there is a previous note and the note is not a rest


        if (Math.random() < this.jumps) {
            //If we need to jump instead of moving up/down by a scale tone
            //Jumps ONLY transistion to chord tones!

            let chord_tones = s11.chord.chord;
            let note_octave = Math.round(this.#randn_bm(1, 7, 0)); //Center at octave 4
            let note = chord_tones[Math.random * (chord_tones.length - 1)]; //Choose a random chord tone
            return s11.note.create(note.name, note_octave);

        } else {
            //If there is not a jump, we move down or up in the scale by 1 note.
            let scale = chord.scales()[0];

            //Find the index of previous note in the scale
            let index = 0;
            for (scale_tone of scale) {
                if (scale_tone.name === previousNote.name) {
                    //Select a scale tone above or below previous note
                    if (Math.random() < 0.5) return scale[index-1];
                    else return scale[index+1];
                }
                index++;
            }
        }
        
    }

    #determineNoteType() {
        let rand = Math.random(); //Number in [0,1)
        if (rand < this.quarterThreshold) {
            return 1; //quarter note
        } else if (rand < this.eightThreshold) {
            return 2; //eight note
        } else if (rand < this.tripletThreshold) {
            return 3; //triplet
        } else if (rand < this.sixteenthThreshold) {
            return 4; //sixteenthThreshold
        }
    }

    /**
     * Generates a starting note from the chord tones and a normal distribution of octaves ranging from oct #2 - #6.
     * @param {} chord (Sharp11 library chord object) the chord to choose a starting note for
     * @returns the starting note as a Sharp 11 Library Note Object
     */
    #chooseStartingNote(chord) {
        let starting_octave = Math.round(this.#randn_bm(2, 6, 0)); //Center at octave 4 (where middle C is)
        let chord_tones = s11.chord.chord //array of note objects in the chord.
        let starting_note = chord_tones[Math.random() * (chord_tones.length - 1)]; //selected note might be incorrect octave, so we have next line.
        starting_note = s11.note.create(starting_note.name, starting_octave) //Make starting_note in selected octave

        return starting_note
    }

    /**
     * Normal random variable using Box-Muller transform.
     * @param {*} min value of distribution exclusive
     * @param {*} max value of distribution exclusive
     * @param {*} skew N/A for our usage
     * @returns a selected number from the distribution
     */
    #randn_bm(min, max, skew) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random()
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
        
        num = num / 10.0 + 0.5 // Translate to 0 -> 1
        if (num > 1 || num < 0) 
          num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
        
        else{
          num = Math.pow(num, skew) // Skew
          num *= max - min // Stretch to fill range
          num += min // offset to min
        }
        return num
      }

    
   
}

    
