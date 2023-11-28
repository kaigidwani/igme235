
// 1
window.onload = (e) => { document.querySelector("#search").onclick = searchButtonClicked };

// 2
let displayTerm = "";

let whichPokemonCounter = 0;

// === Load saved data if it exists! ===
const yourPokemonField = document.querySelector("#firstsearchterm");
const enemyPokemonField = document.querySelector("#secondsearchterm");
const chosenBackgroundSelect = document.querySelector("#background-option");
const contentElement = document.querySelector('#content');

const prefix = "kpg8244-";
const yourPokemonKey = prefix + "yourPokemon";
const enemyPokemonKey = prefix + "enemyPokemon";
const chosenBackgroundKey = prefix + "chosenBackground";

// grab the stored data, will return `null` if the user has never been to this page
const storedYourPokemon = localStorage.getItem(yourPokemonKey);
const storedEnemyPokemon = localStorage.getItem(enemyPokemonKey);
const storedChosenBackground = localStorage.getItem(chosenBackgroundKey);

// if we find a previously set name value, display it
if (storedYourPokemon){
    console.log("Found a saved your pokemon.");
	yourPokemonField.value = storedYourPokemon;
}

// if we find a previously set name value, display it
if (storedEnemyPokemon){
    console.log("Found a saved enemy pokemon.");
	enemyPokemonField.value = storedEnemyPokemon;
}

// Set pokemon to either loaded ones or defaults
getData(makePokeURL(yourPokemonField.value));
getData(makePokeURL(enemyPokemonField.value));

// if we find a previously set background value, display it
if (storedChosenBackground){
    console.log("Found a saved background");
	chosenBackgroundSelect.querySelector(`option[value='${storedChosenBackground}']`).selected = true;
    contentElement.style.backgroundImage = `url(images/${storedChosenBackground})`;; // Set the image of the background
}

yourPokemonField.onchange = e=>{ localStorage.setItem(yourPokemonKey, e.target.value); };
enemyPokemonField.onchange = e=>{ localStorage.setItem(enemyPokemonKey, e.target.value); };
chosenBackgroundSelect.onchange = e=>{ 
    console.log("Saved a new background.");
    localStorage.setItem(chosenBackgroundKey, e.target.value); 
    contentElement.style.backgroundImage = `url(images/${storedChosenBackground})`; // Set the image of the background
};

// 3
function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    let contentElement = document.querySelector('#content');
    let backgroundOption = document.querySelector("#background-option").value;
    contentElement.style.backgroundImage = `url(images/${backgroundOption})`;
    console.log(`Changed background to image at /images/${backgroundOption}`);

    whichPokemonCounter = 0;
    
    let firstterm = document.querySelector("#firstsearchterm").value;
    let secondterm = document.querySelector("#secondsearchterm").value;
    displayTerm = firstterm + " and " + secondterm;

    let firstURL = makePokeURL(firstterm);
    let secondURL = makePokeURL(secondterm);

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log("first url: " + firstURL);
    console.log("second url: " + secondURL);

    // 12 Request data!
    getData(firstURL);
    getData(secondURL);
}

function makePokeURL(term){
    if (term.length < 1) return;
    term = term.trim().toLowerCase();
    term = encodeURIComponent(term);
    return "https://pokeapi.co/api/v2/pokemon/" + term;
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

    console.log(obj);

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