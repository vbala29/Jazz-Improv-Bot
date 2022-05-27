//List of chords entered by the user
var chartList = document.getElementsByClassName("select-button"); //Live List!

var context = new AudioContext();

let running = false;
let interrupt = false;

var Voice = (function(context) {
    function Voice(frequency){
      this.frequency = frequency;
    };

    Voice.oscillators = []; //List of currently active oscillators

    Voice.prototype.start = function() {
      /* VCO */
      var vco = context.createOscillator();
      vco.type = "sine"
      vco.frequency.value = this.frequency;

      /* VCA */
      var vca = context.createGain();
      vca.gain.value = 0.3;

      /* connections */
      vco.connect(vca);
      vca.connect(context.destination);

      vco.start(0);

      Voice.oscillators.push(vco); //Push to list of currently active oscillators
    };

    return Voice;
})(context);


/**
 * Stops all currently active oscillators
 */
function deleteOscillators() {
    Voice.oscillators.forEach(function(oscillator, _) {
        oscillator.stop();
    })
}

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

var noteFreq = createNoteTable();

function generateCallbacks() {
    for (var i = 0; i < chartList.length; i++) {
        chartList[i].addEventListener('click', lambdaCall);
    }
}

function lambdaCall() {
    //Stop running process that will generate audio oscillators
    if (running) {
        interrupt = true;
    }

    //Make sure that any previouisly called charts have beeen cleared from display.
    cleanUpDisplayAndAudio(); //Also deletes any current audio oscilaltors


    //Display loading icon
    document.getElementsByClassName('spinner')[0].innerHTML = 
        "<div class=\"d-flex justify-content-center\">" + 
        " <div class=\"spinner-border text-primary\" role=\"status\">" +
        "<span class=\"visually-hidden\">Loading...</span> </div>" + 
        "</div>";

    fetch('http://localhost:3000/improv/improviseOnChart', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type' : 'text/plain'
        },
        body: this.id
    }).then((res) => {
        console.log("Selected:  " + this.id);
        if (res.status === 500) {
            alert('Improvization engine unable to do generation. Error: (' + res.statusText + ')');
        } else {
            return res.json();
        }
    }).then(data => {
        //Stop displaying loading icon
        document.getElementsByClassName('spinner')[0].innerHTML = '';

        displayChart(data.chart);
        audioForImproization(data.improv);
    }).catch(err => {
        alert("ERROR: Front End Improvization Processing Failed");
        console.log("ERROR: Front End Improvization Processing Failed. \nError: " + err)
    });
}

function displayChart(chart) {
    var chart_section = document.getElementsByClassName('chart-div')[0];
    
    //var index is used in id field so that audioForImproization() can highlight the chords
    //as it plays over them.
    var index = 0;
    for (pair of chart) {
        chart_section.innerHTML += "<div id=\"" + index + "\" class=\"badge bg-primary text-wrap\" style=\"width: 6rem;\">" +
        "Chord: " + pair.chord.name + " Beats: " + pair.duration.beats + "</div>";
        index++; 
    }
}

/**
 * Used to make sure that any previouisly called charts have beeen cleared/stop playing
 */
function cleanUpDisplayAndAudio() {
    let note = document.getElementsByClassName("note")[0]
    let chart = document.getElementsByClassName('chart-div')[0]

    if (note !== null) note.innerHTML = '';
    if (chart !== null) chart.innerHTML = '';
    deleteOscillators();
}

async function audioForImproization(improv_array) {
    running = true;

    try {
        //Each array in this array is a array represents one chord in the chart
        console.log(improv_array)
        for (var i = 0; i < improv_array.length; i++) {
            //Highlight the chord being played over
            var chord_icon = document.getElementById(i.toString())
            if (chord_icon === null) {
                console.error("Null chord icon for chord at index " + i);
            } else {
                chord_icon.classList.remove('bg-primary')
                chord_icon.classList.add('bg-warning')
            }
        
            let chord = improv_array[i];
            //Each array in this array, represents notes played over a beat.
            for (var j = 0; j < chord.length; j++) {

                let beat = chord[j];
                let duration = 0;
                switch(beat.length) {
                    case 1:
                        duration = 0.6;
                        break;
                    case 2:
                        duration = 0.3;
                        break;
                    case 3:
                        duration = 0.2;
                        break;
                    case 4:
                        duration = 0.15;
                        break;
                    default:
                        console.error("Invalid duration # of notes in beat: " + beat.length);
                        return;
                }
                //The elements of the beat array are notes with equal duration-> null indicates a "rest"
                for (var n = 0; n < beat.length; n++) {

                    //async function is halted by the interrupt flag.
                    if (interrupt) {
                        interrupt = false;
                        running = false;
                        console.log("Got interrupted")
                        return;
                    }

                    let note = beat[n];
                    if (note !== null) {
                        let fullname = note.fullName;
                        let name_len = fullname.length;
                        let freq = noteFreq[parseInt(fullname.slice(name_len - 1))][fullname.slice(0, name_len-1)];

                        if (isNaN(freq)) {
                            console.error("UNABLE TO PLAY NOTE. See details below.")
                            console.error(note)
                            console.error(name_len)
                        }
                        else {
                            let note_section = document.getElementsByClassName("note")[0]
                            if (note_section == null) {
                                console.error("Couldn't update not because section was null. Note: " + fullname)
                            } else {
                               note_section.innerHTML = "<div class=\"d-flex justify-content-center\">" + 
                                "<p class=\"fs-5\">" + fullname +"</p>" + "</div>";
                            }
                            new Voice(freq).start();
                        }
                    }
                    await sleep(duration*1000); //Let the note play before going on to play next note
                    deleteOscillators(); //Stop the note playing.
                }

            }

            //Unhighlight chord now that it is done being played over
            chord_icon.classList.remove('bg-warning')
            chord_icon.classList.add('bg-primary')
        }

        //Make sure that any previouisly called charts have beeen cleared/stop playing
        cleanUpDisplayAndAudio();
        running = false;

    } catch (err) {
        running = false;
        interrupt = false;
        console.log("Error in audioForImprovization(). Error: " + err);
    }
}

/**
 * Halts executing for provied number of milliseconds
 * @param {*} ms - time to sleep in ms
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
