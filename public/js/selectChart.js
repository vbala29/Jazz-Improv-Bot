//List of chords entered by the user
var chartList = document.getElementsByClassName("select-button"); //Live List!

var generateCallbacks = () => {
    for (var i = 0; i < chartList.length; i++) {
        chartList[i].addEventListener('click', function() {
            fetch('http://localhost:3000/improv/improviseOnChart', {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type' : 'text/plain'
                },
                body: this.id
            }).then(
                console.log("Here! " + this.id)
            ).catch(err => alert("Server Error: " + err));
        });
    }
}


