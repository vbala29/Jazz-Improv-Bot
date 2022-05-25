
//List of chords entered by the user
var chordList = document.getElementsByTagName("li"); //Live List!
var selectButtons = document.getElementsByClassName("select"); ///Live list!

//Creates delete button for each chord
var generateSelectButtons = () => {
    for (var i = 0; i < chordList.length; i++) {
        //If the list element does not already have a delete button then add one
        if (chordList[i].getElementsByClassName("select-button").length === 0) {
            var button = document.createElement("button");
            button.className = "delete-button btn btn-secondary"
            button.innerHTML = "Select Chart"
            button.name = "Select-Chart"
            // button.onclick
            chordList[i].appendChild(button)
        }
    }
}

async function selectChart() {
    fetch('http://localhost:3000/improv/improviseOnChart', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
    }).then(
        
    ).catch(err => alert("Server Error: " + err));
};


