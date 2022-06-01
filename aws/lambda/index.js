/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

const s11 = require('sharp11');

/**
 * Sourced parts of table from link below, contains frequencies in Hz of all 88 piano notes
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth
 * @returns the 2d Notes Array
 */
 function createNoteTable() {
    let noteFreq = [];
    for (let i=0; i< 9; i++) {
      noteFreq[i] = [];
    }
  
    noteFreq[0]["A"] = 27.500000000000000;
    noteFreq[0]["A#"] = 29.135235094880619;
    noteFreq[0]["Bb"] = 29.135235094880619;
    noteFreq[0]["B"] = 30.867706328507756;
    noteFreq[0]["Cb"] = 30.867706328507756;
  
    noteFreq[1]["C"] = 32.703195662574829;
    noteFreq[1]["C#"] = 34.647828872109012;
    noteFreq[1]["Db"] = 34.647828872109012;
    noteFreq[1]["D"] = 36.708095989675945;
    noteFreq[1]["D#"] = 38.890872965260113;
    noteFreq[1]["Eb"] = 38.890872965260113;
    noteFreq[1]["E"] = 41.203444614108741;
    noteFreq[1]["Fb"] = 41.203444614108741;
    noteFreq[1]["F"] = 43.653528929125485;
    noteFreq[1]["F#"] = 46.249302838954299;
    noteFreq[1]["Gb"] = 46.249302838954299;
    noteFreq[1]["G"] = 48.999429497718661;
    noteFreq[1]["G#"] = 51.913087197493142;
    noteFreq[1]["Ab"] = 51.913087197493142;
    noteFreq[1]["A"] = 55.000000000000000;
    noteFreq[1]["A#"] = 58.270470189761239;
    noteFreq[1]["Bb"] = 58.270470189761239;
    noteFreq[1]["B"] = 61.735412657015513;
    noteFreq[1]["Cb"] = 61.735412657015513;
  
    noteFreq[2]["C"] = 65.406391325149658;
    noteFreq[2]["C#"] = 69.295657744218024;
    noteFreq[2]["Db"] = 69.295657744218024;
    noteFreq[2]["D"] = 73.416191979351890;
    noteFreq[2]["D#"] = 77.781745930520227;
    noteFreq[2]["Eb"] = 77.781745930520227;
    noteFreq[2]["E"] = 82.406889228217482;
    noteFreq[2]["Fb"] = 82.406889228217482;
    noteFreq[2]["F"] = 87.307057858250971;
    noteFreq[2]["F#"] = 92.498605677908599;
    noteFreq[2]["Gb"] = 92.498605677908599;
    noteFreq[2]["G"] = 97.998858995437323;
    noteFreq[2]["G#"] = 103.826174394986284;
    noteFreq[2]["Ab"] = 103.826174394986284;
    noteFreq[2]["A"] = 110.000000000000000;
    noteFreq[2]["A#"] = 116.540940379522479;
    noteFreq[2]["Bb"] = 116.540940379522479;
    noteFreq[2]["B"] = 123.470825314031027;
    noteFreq[2]["Cb"] = 123.470825314031027;
  
    noteFreq[3]["C"] = 130.812782650299317;
    noteFreq[3]["C#"] = 138.591315488436048;
    noteFreq[3]["Db"] = 138.591315488436048;
    noteFreq[3]["D"] = 146.832383958703780;
    noteFreq[3]["D#"] = 155.563491861040455;
    noteFreq[3]["Eb"] = 155.563491861040455;
    noteFreq[3]["E"] = 164.813778456434964;
    noteFreq[3]["Fb"] = 164.813778456434964;
    noteFreq[3]["F"] = 174.614115716501942;
    noteFreq[3]["F#"] = 184.997211355817199;
    noteFreq[3]["Gb"] = 184.997211355817199;
    noteFreq[3]["G"] = 195.997717990874647;
    noteFreq[3]["G#"] = 207.652348789972569;
    noteFreq[3]["Ab"] = 207.652348789972569;
    noteFreq[3]["A"] = 220.000000000000000;
    noteFreq[3]["A#"] = 233.081880759044958;
    noteFreq[3]["Bb"] = 233.081880759044958;
    noteFreq[3]["B"] = 246.941650628062055;
    noteFreq[3]["Cb"] = 246.941650628062055;
  
    noteFreq[4]["C"] = 261.625565300598634;
    noteFreq[4]["C#"] = 277.182630976872096;
    noteFreq[4]["Db"] = 277.182630976872096;
    noteFreq[4]["D"] = 293.664767917407560;
    noteFreq[4]["D#"] = 311.126983722080910;
    noteFreq[4]["Eb"] = 311.126983722080910;
    noteFreq[4]["E"] = 329.627556912869929;
    noteFreq[4]["Fb"] = 329.627556912869929;
    noteFreq[4]["F"] = 349.228231433003884;
    noteFreq[4]["F#"] = 369.994422711634398;
    noteFreq[4]["Gb"] = 369.994422711634398;
    noteFreq[4]["G"] = 391.995435981749294;
    noteFreq[4]["G#"] = 415.304697579945138;
    noteFreq[4]["Ab"] = 415.304697579945138;
    noteFreq[4]["A"] = 440.000000000000000;
    noteFreq[4]["A#"] = 466.163761518089916;
    noteFreq[4]["Bb"] = 466.163761518089916;
    noteFreq[4]["B"] = 493.883301256124111;
    noteFreq[4]["Cb"] = 493.883301256124111;
  
    noteFreq[5]["C"] = 523.251130601197269;
    noteFreq[5]["C#"] = 554.365261953744192;
    noteFreq[5]["Db"] = 554.365261953744192;
    noteFreq[5]["D"] = 587.329535834815120;
    noteFreq[5]["D#"] = 622.253967444161821;
    noteFreq[5]["Eb"] = 622.253967444161821;
    noteFreq[5]["E"] = 659.255113825739859;
    noteFreq[5]["Fb"] = 659.255113825739859;
    noteFreq[5]["F"] = 698.456462866007768;
    noteFreq[5]["F#"] = 739.988845423268797;
    noteFreq[5]["Gb"] = 739.988845423268797;
    noteFreq[5]["G"] = 783.990871963498588;
    noteFreq[5]["G#"] = 830.609395159890277;
    noteFreq[5]["Ab"] = 830.609395159890277;
    noteFreq[5]["A"] = 880.000000000000000;
    noteFreq[5]["A#"] = 932.327523036179832;
    noteFreq[5]["Bb"] = 932.327523036179832;
    noteFreq[5]["B"] = 987.766602512248223;
    noteFreq[5]["Cb"] = 987.766602512248223;
  
    noteFreq[6]["C"] = 1046.502261202394538;
    noteFreq[6]["C#"] = 1108.730523907488384;
    noteFreq[6]["Db"] = 1108.730523907488384;
    noteFreq[6]["D"] = 1174.659071669630241;
    noteFreq[6]["D#"] = 1244.507934888323642;
    noteFreq[6]["Eb"] = 1244.507934888323642;
    noteFreq[6]["E"] = 1318.510227651479718;
    noteFreq[6]["Fb"] = 1318.510227651479718;
    noteFreq[6]["F"] = 1396.912925732015537;
    noteFreq[6]["F#"] = 1479.977690846537595;
    noteFreq[6]["Gb"] = 1479.977690846537595;
    noteFreq[6]["G"] = 1567.981743926997176;
    noteFreq[6]["G#"] = 1661.218790319780554;
    noteFreq[6]["Ab"] = 1661.218790319780554;
    noteFreq[6]["A"] = 1760.000000000000000;
    noteFreq[6]["A#"] = 1864.655046072359665;
    noteFreq[6]["Bb"] = 1864.655046072359665;
    noteFreq[6]["B"] = 1975.533205024496447;
    noteFreq[6]["Cb"] = 1975.533205024496447;
  
    noteFreq[7]["C"] = 2093.004522404789077;
    noteFreq[7]["C#"] = 2217.461047814976769;
    noteFreq[7]["Db"] = 2217.461047814976769;
    noteFreq[7]["D"] = 2349.318143339260482;
    noteFreq[7]["D#"] = 2489.015869776647285;
    noteFreq[7]["Eb"] = 2489.015869776647285;
    noteFreq[7]["E"] = 2637.020455302959437;
    noteFreq[7]["Fb"] = 2637.020455302959437;
    noteFreq[7]["F"] = 2793.825851464031075;
    noteFreq[7]["F#"] = 2959.955381693075191;
    noteFreq[7]["Gb"] = 2959.955381693075191;
    noteFreq[7]["G"] = 3135.963487853994352;
    noteFreq[7]["G#"] = 3322.437580639561108;
    noteFreq[7]["Ab"] = 3322.437580639561108;
    noteFreq[7]["A"] = 3520.000000000000000;
    noteFreq[7]["A#"] = 3729.310092144719331;
    noteFreq[7]["Bb"] = 3729.310092144719331;
    noteFreq[7]["B"] = 3951.066410048992894;
    noteFreq[7]["Cb"] = 3951.066410048992894;
  
    noteFreq[8]["C"] = 4186.009044809578154;
    return noteFreq;
}

let noteFreq = createNoteTable();


class Improv {
    constructor(substitutions, outness, rests, chart, tempo) {
        this.substitutions = substitutions/100; //Chance of a chord being substituted diatonically or with a tritone sub
        this.rests = (rests/100); //Chance of a particular note being a rest
        this.chart = chart; //The chart to improvise over
        this.jumps = 0.3; //Chance of jumping rather than going up or down in scale

        
        //Depending on tempo, make likeliness of different note durations difference
        if (tempo < 75) {
            this.quarterThreshold = 0.05; //5%
            this.eightThreshold = 0.40;  //35%
            this.tripletThreshold = 0.60;  //30% 
            this.sixteenthThreshold = 1.0; //40%
        } else if (tempo < 150 && tempo >= 75) {
            this.quarterThreshold = 0.20; //20%
            this.eightThreshold = 0.60;  //40%
            this.tripletThreshold = 0.80;  //20% 
            this.sixteenthThreshold = 1.0; //20%
        } else if (tempo < 220 && tempo >= 150) {
            this.quarterThreshold = 0.20; //20%
            this.eightThreshold = 0.70;  //50%
            this.tripletThreshold = 0.90;  //20% 
            this.sixteenthThreshold = 1.0; //10%
        } else if (tempo >= 220) {
            this.quarterThreshold = 0.30; //30%
            this.eightThreshold = 1.0;  //70%
            this.tripletThreshold = 1.01;  //0%
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
                this.outness = 0.20;
                break;
            case "You are John Coltrane (2nd to Most Out)":
                this.outness = 0.35;
                break;
            case "So Out They Might Just Be Playing the Wrong Song (Most Out)":
                this.outness = 0.5;
                break;
            default:
                this.outness = 0.20; //Average Jazz Musician Case
                break;
        }

        console.log(this.outness + ", outness!, string: ," + outness + ",")
    }

    /**
     * Main method that generates improvization and returns object that can be played
     * by the front end audio visualizer. Uses chart passed into Improv class constructor
     * to generate the improvization over.
     */
    improv() {
        let chart_content = this.chart.content['A'];
        let improv = []
        let prev_chord_note = null;
        for (let obj of chart_content) {
            let chord_improv = this.#improvOverChord(obj.chord, obj.duration, this.substitutions, this.outness, prev_chord_note)
            improv.push({notes: chord_improv.notes, chord: chord_improv.chord});
            prev_chord_note = chord_improv.previousNote; //Save the last note played in the last chord, so you can do voice leading.
        }

        return improv
    }

    /**
     * Generates improvization over a given Sharp11 Chord and Sharp 11 Duration Object
     * @param {} chord 
     * @param {*} duration 
     * @return an object consists of a "notes" and "chord" (a sharp11 chord object)
     */
    #improvOverChord(chord, duration, substitutions, outness, prev_chord_note) {
        let num_beats = duration.beats;

        let improv_over_chord = []; //Array of beat arrays (which contain note arrays) representing improv
        let firstNote = true; //True if first note hasn't been played yet.
        let previousNote = prev_chord_note; 
        let scale_arr = chord.scales() //Ordered in terms of most frequently used to least frequently used scales
        let scale; //Sharp 11 Object
        let tritone_sub = 0.4; //Probability of a tritone sub when a substitution is to take place


        if (Math.random() < substitutions) {
            scale = scale_arr[Math.round(Math.random() * (scale_arr.length - 1))] //Choose a random scale to do diatonic substitution.

            if (Math.random() < tritone_sub) {
                scale = scale.transposeDown('m3').transposeDown('m3'); //shifts the scale a tritone down
            }

        } else {
            scale = scale_arr[0]; //If not substitution, use the most frequently used scale 
        }

        if (Math.random() < outness) {
            //Do a diminished chord substituion only if we have a dominant chord.
            //The chord Bb7 would become Bdim7 (aka Abdim7/Ddim7/Fdim7)
            if ((chord.name.includes('7')) && !(chord.name.includes('m')) && !(chord.name.includes('M')) && !(chord.name.includes('sus')) && !(chord.name.includes('dim'))) {
                let new_root_note = chord.root.shift(1); //Shift up by one halfset
                //Created the diminshed chord substitution
                let new_chord = s11.chord.create(new_root_note.name + "dim7", 4); //Octave here doesn't really matter, it will get reassigned in generateNote();
                scale = new_chord.scale() //Returns the first element in array that would've been returned by scales()
            }
        }

        //If this is not the first chord in the chart, then don't use the starting_note found below, but rather perform voice leading.
        if (previousNote != null) {
            firstNote = false;
        }

        //Only used for the first chord in the chart.
        let starting_note = this.#chooseStartingNote(scale) //Determine the starting based on chords tones interpolated from the scale

        for (let i = 0; i < num_beats; i++) {
            let noteType = this.#determineNoteType();
            let improv_over_beat = []

            while(noteType > 0) {
               let current_note = this.#generateNote(previousNote, chord, firstNote, scale.scale); //Pass in the scale property of the scale Sharp 11 Object
                if (current_note === 1) {
                    improv_over_beat.push(starting_note);
                    previousNote = starting_note;
                    firstNote = false;
                } else if (current_note === 2){
                    improv_over_beat.push(null);
                } else if (current_note !== null && current_note !== undefined) {
                    improv_over_beat.push(current_note);
                    previousNote = current_note;
                } else {
                    console.warn("Invaild note generated! Note: " + current_note + ". Scale: " + scale.scale + ". Previous Note: " + previousNote)
                    current_note = scale.scale[Math.round(Math.random(0, 1) * (scale.scale.length - 1))]
                    improv_over_beat.push(current_note)
                    previousNote = current_note
                }
                // if (!firstNote) console.log("Prev: " + previousNote.name + ", curr: " + current_note.name)

                noteType--;
            }

            improv_over_chord.push(improv_over_beat);
        }

        return {notes: improv_over_chord, chord: chord, previousNote: previousNote};
    }

    /**
     * Generates the next note/rest in an improvization over a chord.
     * @param {*} previousNote that was played (not including rests)
     * @param {*} chord to improvize over
     * @param {*} firstNote boolean indicating if a note has been improvized over this chord yet or not
     * @param {*} scale to generate improviation over, a note array not a sharp11 object
     * @returns 
     */
    #generateNote(previousNote, chord, firstNote, scale) {
        let rand = Math.random();
        if (rand < this.rests) {
            return 2; //Signifies a rest
        } else if (firstNote) {
            //If not a rest and no previous note, must play starting note
            return 1;
        }

        //If there is a previous note and the note is not a rest


        if (Math.random() < this.jumps) {

            //If we need to jump instead of moving up/down by a scale tone
            //Jumps ONLY transistion to chord tones!
            let note_octave = Math.round(this.#guassian_rand(previousNote.octave, 1, previousNote.octave - 1, previousNote.octave + 1)); //Center at octave 5 
            if (note_octave > 6) note_octave = 6;
            if (note_octave < 3) note_octave = 3;

             //Clean notes so that you don't try creating chord from double sharp or flat key, because this will yield an error
             let cleaned_scale_tones = []
             for (let tone of scale) {
                 cleaned_scale_tones.push(tone.clean())
             }

            let chord = s11.chord.create(s11.chord.getPossibleChordNamesFromArray(cleaned_scale_tones)[0], note_octave);


            //Try to find a random chord tone that is also in the scale.
            let tries = 0;
            while(tries < 10) {

                let chord_tones = chord.chord //array of note objects in the chord.
                let jump_note = chord_tones[Math.round(Math.random() * (chord_tones.length - 1))]; //selected note might be incorrect octave, so we have next line.
                jump_note = s11.note.create(jump_note.name, note_octave) //Make jump_note in selected octave

                if (jump_note in scale) return jump_note;
                tries++;
            }

            //If failed to find a chord tone in the scale, just return the first note in the scale.
            return s11.note.create(scale[0], note_octave);            

        } else {
            //If there is not a jump, we move down or up in the scale by 1 note.
            //Find the index of previous note in the scale
            let index = 0;

            for (let scale_tone of scale) {
                //Had to create new notes in order to make sure octave numbers were not accounted for in note.equals function. 
                //Using the .equals ensures things like G## and A are treated as the same!

                let curr_note = s11.note.create(scale_tone.name);
                let to_find_note = s11.note.create(previousNote.name)
                curr_note = curr_note.clean(); to_find_note = to_find_note.clean(); //Removes double accidentals and makes B#/Cb, E#/Fb all the same
                this.#makeComparable(curr_note); this.#makeComparable(to_find_note);

                if (curr_note.equals(to_find_note)) {
                    //Select a scale tone above or below previous note
                    if (Math.random() < 0.5) {
                        let new_octave = previousNote.octave;
                        let lower_index = index-1; //The tentative index of the new note to add
                        
                        //If we are at the beginning of scale then perform wraparound
                        if (index === 0) {
                            lower_index = scale.length - 1;
                        }

                        //Calculate if we have gone down in octave number
                        if ((scale[lower_index].name === 'B' || scale[lower_index].name === 'Bb' || scale[lower_index].name === 'A') &&
                            (scale[index].name === 'C' || scale[index].name === 'C#' || scale[index].name === 'D')) {
                                new_octave = previousNote.octave - 1;
                        } 
                        
                        //Make sure note octave within valid bounds
                        if (new_octave > 6) new_octave = 6;
                        if (new_octave < 3) new_octave = 3;

                        // console.log(scale + ", note: " + previousNote.name +", scale tone : " + scale_tone.name + ", next: " + scale[lower_index].name + new_octave)
                        return s11.note.create(scale[lower_index].name, new_octave); 
                    } else {
                        let new_octave = previousNote.octave;
                        let higher_index = index+1; //The tentative index of the new note to add
                        
                        //If we are at the end of the scale then perform wraparound
                        if (index === scale.length - 1) {
                            higher_index = 0;
                        }

                        //Calculate if we have gone up in octave number
                        if ((scale[index].name === 'B' || scale[index].name === 'Bb' || scale[index].name === 'A') &&
                            (scale[higher_index].name === 'C' || scale[higher_index].name === 'C#' || scale[higher_index].name === 'D')) {
                                new_octave = previousNote.octave + 1;
                        } 

                        //Make sure note octave within valid bounds
                        if (new_octave > 6) new_octave = 6;
                        if (new_octave < 3) new_octave = 3;

                        
                        // console.log(scale + ", note: " + previousNote.name +", scale tone : " + scale_tone.name + ", next: " + scale[higher_index].name + new_octave)
                        return s11.note.create(scale[higher_index].name, new_octave); 
                    }
                }
                index++;
            }
            console.warn("Unable to find match for scale:" + scale + ", previous note: " + previousNote.name + ", chord: " + chord.chord)
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
     * @param {} scale (Sharp11 library Scale Object) the scale to interpret the chord tones from and choose a starting note
     * @returns the starting note as a Sharp 11 Library Note Object
     */
    #chooseStartingNote(scale) {
        let starting_octave = Math.round(this.#guassian_rand(5, 1, 4, 6)); //Center at octave 5 
        if (starting_octave > 6) note_octave = 6;
        if (starting_octave < 3) note_octave = 3;

        let cleaned_scale_tones = []
        for (let tone of scale.scale) {
            cleaned_scale_tones.push(tone.clean())
        }
        //Clean notess so that you don't try creating chord from double sharp or flat key, because this will yield an error
        let chord = s11.chord.create(s11.chord.getPossibleChordNamesFromArray(cleaned_scale_tones)[0], starting_octave);


        //Try to find a random chord tone that is also in the scale.
        let tries = 0;
        while(tries < 10) {

            let chord_tones = chord.chord //array of note objects in the chord.
            let starting_note = chord_tones[Math.round(Math.random() * (chord_tones.length - 1))]; //selected note might be incorrect octave, so we have next line.
            starting_note = s11.note.create(starting_note.name, starting_octave) //Make starting_note in selected octave

            if (scale.contains(starting_note)) return starting_note;
            tries++;
        }

        //If failed to find a chord tone in the scale, just return the first note in the scale.
        return s11.note.create(scale.scale[0], starting_octave);
        
    }

   

    /**
     * Normal Random variable with bounds at a min and max
     * @param {*} mean
     * @param {*} variance 
     * @param {*} min
     * @param {*} max 
     * @returns a selected number from the distribution
     */
    #guassian_rand(mean, variance, min, max) {
        let rand = Math.round((this.#randn_bm()*Math.pow(variance, 0.5)) + mean);
        if (rand < min) return min;
        if (rand > max) return max;
        return rand;
    }

    // Standard Normal variate using Box-Muller transform.
    #randn_bm() {
        var u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    }

    /**
     * Makes all notes with flats, into sharps so that they can be compared with s11.note.equals
     * IMPORTANT! Assumes that s11.note.clean() has already been run and removed double accidentals
     * @param {*} note to be cleaned
     */
    #makeComparable(note) {
        if (note.accidental === "b") {
            note = note.shift(-1);
            note = note.clean()
            note = note.shift(1)

            if (note.accidental === 'b') {
                throw new Error("Make comparable failed");
            }

            return note;
        } else return note;
    }


}


exports.handler = async (event, context) => {
    let chart = s11.chart.load(JSON.parse(event.chart)); //Load serialized chart from request
    console.log("Lambda invoked for chart titled: " + chart.info.title)
    let improv = new Improv(event.substitutions, event.outness, event.rests, chart, event.tempo);
    let improv_gen = improv.improv();
    let notes = []
    let chords = []
    for (obj of improv_gen) {
        notes.push(obj.notes);
        if (event.chords) chords.push(obj.chord);
    }

    return {
            "improv": JSON.stringify(notes),
            "chords": JSON.stringify(chords), 
        }
};

//Code used for testing improvoutside of AWS Lambda
// let chart = s11.chart.create(['A'], { A: [{ chord: 'C7', duration: 8 }, { chord: 'Fm7', duration: 4}]}, { foo: 1 });
// console.log("Lambda invoked for chart titled: " + chart.info.title)
// let improv = new Improv(50, "asdfasd", 10, chart, 125);

// let improv_gen = improv.improv();
// let notes = []
// let chords = []

// for (let obj of improv_gen) {
//     notes.push(obj.notes);
//     if (true) chords.push(obj.chord);
// }

// console.log( {
//         "improv": JSON.stringify(notes),
//         "chords": JSON.stringify(chords)
//     });

    
