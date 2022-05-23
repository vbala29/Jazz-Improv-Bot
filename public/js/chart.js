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

//Generate chart from chords inputted.
function generateChartParams() {
    let sections = ['A']; //Solely use one A section in compositions
    let chord_duration_pairs = []; //2D list, outer list contains sections, inner lists are the chords in each section. 
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
    console.log(sections.toString());
    console.log(JSON.stringify(section_chord_map).toString());
    //document.getElementById("composition-name").value


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
    document.getElementById("chart").appendChild(li);
    document.getElementById("chord").value = null;
    document.getElementById("duration").value = null;

    generateDeleteButtons();
}

