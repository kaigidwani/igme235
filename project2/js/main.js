
// 1
window.onload = (e) => { document.querySelector("#search").onclick = searchButtonClicked };

// 2
let displayTerm = "";

let whichPokemonCounter = 0;

// 3
function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    const POKEAPI_URL = "https://pokeapi.co/api/v2/";

    whichPokemonCounter = 0;

    firsturl = POKEAPI_URL;
    secondurl = POKEAPI_URL;
    

    let firstterm = document.querySelector("#firstsearchterm").value;
    let secondterm = document.querySelector("#secondsearchterm").value;
    displayTerm = firstterm + " and " + secondterm;

    firstterm = firstterm.trim().toLowerCase();
    secondterm = secondterm.trim().toLowerCase();

    firstterm = encodeURIComponent(firstterm);
    secondterm = encodeURIComponent(secondterm);

    if (firstterm.length < 1) return;
    if (secondterm.length < 1) return;

    firsturl += "pokemon/" + firstterm;
    secondurl += "pokemon/" + secondterm;

    let contentElement = document.querySelector('#content');
    let backgroundOption = document.querySelector("#background-option").value;
    contentElement.style.backgroundImage = `url(../images/${backgroundOption})`;


    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log("first url: " + firsturl);
    console.log("second url: " + secondurl);

    // 12 Request data!
    getData(firsturl);
    getData(secondurl);
}

function getData(url) {
    let xhr = new XMLHttpRequest();
    
    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e) {
    let xhr = e.target;

    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    

    console.log(obj.sprites.back_default);
    
    if (whichPokemonCounter == 0){
        document.getElementById("your-pokemon").src = "../images/no-image-found.png";
        document.getElementById("your-pokemon").src = obj.sprites.back_default;
        whichPokemonCounter = whichPokemonCounter + 1;
    }
    else if (whichPokemonCounter == 1){
        document.getElementById("enemy-pokemon").src = "../images/no-image-found.png";
        document.getElementById("enemy-pokemon").src = obj.sprites.front_default;
        whichPokemonCounter = 0;
    }

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
    /**
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        let rating = result.rating.toUpperCase();

        let line = `<div class='result'><img src='${smallURL}' title='${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a>`;
        line += `<p>Rating: ${rating}</p></span></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    */
}

function dataError(e) {
    console.log("An error occurred");
}