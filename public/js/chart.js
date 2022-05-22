//List of chords entered by the user
var chordList = document.getElementsByTagName("LI"); //Live List!
var deleteButtons = document.getElementsByClassName("delete"); ///Live list!

//Creates delete button for each chord
let generateDeleteButtons = () => {
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


//Add a new chord to the chart
let addChord = () => {
    var li = document.createElement("li");
    var chordString = document.getElementById("chord").value;
    var duration = document.getElementById("duration").value;
    var txt = document.createTextNode("Chord: " + chordString + ",           Duration: " + duration + " measures ")
    li.style = "margin-bottom: 3px"
    li.appendChild(txt);

    //Input validation
    document.getElementById("chart").appendChild(li);
    document.getElementById("chord").value = null;
    document.getElementById("duration").value = null;

    generateDeleteButtons();
}

