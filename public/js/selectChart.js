//List of chords entered by the user
var chartList = document.getElementsByClassName("select-button"); //Live List!

var generateCallbacks = () => {
    for (var i = 0; i < chartList.length; i++) {
        chartList[i].addEventListener('click', function() {
            fetch('http://localhost:3000/improv/improviseOnChart', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type' : 'application/json'
                },
            }).then(
                console.log("Here! " + this.id)
            ).catch(err => alert("Server Error: " + err));
        });
    }
}


