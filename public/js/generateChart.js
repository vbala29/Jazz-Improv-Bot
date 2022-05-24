const DEBUG = 0;

//List of chords entered by the user
var chordList = document.getElementsByTagName("li"); //Live List!
var deleteButtons = document.getElementsByClassName("delete"); ///Live list!

//Creates delete button for each chord
var generateDeleteButtons = () => {
    for (var i = 0; i < chordList.length; i++) {
        //If the list element does not already have a delete button then add one
        if (chordList[i].getElementsByClassName("delete-button").length === 0) {
            var button = document.createElement("button");
            button.className = "delete-button btn btn-secondary"
            button.innerHTML = "Delete Chord"
            button.name = "Delete-Chord"
            button.onclick = () => {
                button.parentElement.remove(); //Remove the chord
            }
            chordList[i].appendChild(button)
        }
    }
}

//Calls all delete buttons to clear all entered chords
var callDeleteButtons = () => {
    var len = chordList.length;
    for (var i = 0; i < len; i++) {
        //Live list so only delete from first index
        chordList[0].remove();
    }

    document.getElementById("chord").value = null;
    document.getElementById("duration").value = null;
    
}

//Generate chart from chords inputted.
function generateChartParams() {
    let sections = ['A']; //Solely use one A section in compositions
    let chord_duration_pairs = []; //2D list, outer list contains sections, inner lists are the chords in each section.
    //Code configured for solely one section right now! 
   
    //For each entered chord/duration add it to the chord_duration_pairs list.
    for (var s = 0; s < sections.length; s++) {
        let section_chord_duration_pairs = [];
        for (var i = 0; i < chordList.length; i++) {
            let li = chordList[i];
            let chordString = li.classList[0];
            let durationString = li.classList[1];
            let chord_duration_pair = {chord: chordString, duration: parseInt(durationString)};
            section_chord_duration_pairs.push(chord_duration_pair);
        }
        chord_duration_pairs.push(section_chord_duration_pairs);
    }
    

    var section_chord_map = {};
    //Assign a key with the section name to the associated chord/duration pairs list.
    sections.forEach((section, index) => section_chord_map[section] = chord_duration_pairs[index]);
    var info = {title: document.getElementById("composition-name").value};

    if (info.title.length === 0) {
        alert("Please enter a non empty title!");
        return;
    }

    if (DEBUG) console.log(sections.toString());
    if (DEBUG) console.log(JSON.stringify(section_chord_map).toString());

    //JSON to be sent to backend to be made into Sharp11 Chart Object
    var chartPackage = {sections: sections, content: section_chord_map, info: info};

    fetch('http://localhost:3000/improv/generateChart', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(chartPackage)
    }).then(
        response => {
            if (response.status === 406) {
                alert("Invalid chord entries, server could not generate chart. Please read instructions.")

            } else if (response.status === 201) {
                alert("Chart succesfully created. Please select it from the dropdown on the next page to begin improvization!")
                window.location.href = "/improv/selectChart" //redirect to /improv/selectChart
            }

            callDeleteButtons();
        }
    ).catch(err => alert(err))
}


//Add a new chord to the chart
var addChord = () => {
    var li = document.createElement("li");
    var chordString = document.getElementById("chord").value;
    var duration = document.getElementById("duration").value;
    var txt = document.createTextNode("Chord: " + chordString + ",           Duration: " + duration + " measures ")
    li.classList.add(chordString); 
    li.classList.add(duration);
    li.style = "margin-bottom: 3px"
    li.appendChild(txt);

    //Input validation
    //https://stackoverflow.com/questions/11229080/regex-for-matching-a-music-chord
    var notes = "^[CDEFGAB]",
    accidentals = "(b|#)?",
    chords = "(m7|7)?",
    regex = new RegExp("\\b" + notes + accidentals + chords + "\\b", "g");

    if(!regex.test(chordString)) {
        alert("Invlalid Chord Entered, Please See Instructions")
        document.getElementById("chord").value = null;
        document.getElementById("duration").value = null;
        return;
    }

    if (parseInt(duration) === undefined || duration <= 0) {
        alert("Invlalid Duration (Not a Number or Negative) Entered, Please See Instructions")
        document.getElementById("chord").value = null;
        document.getElementById("duration").value = null;
        return;
    }

    document.getElementById("chart").appendChild(li);
    document.getElementById("chord").value = null;
    document.getElementById("duration").value = null;

    generateDeleteButtons();
}

