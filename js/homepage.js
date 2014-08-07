/*
//  Leamington Geeks
//
//  Frontend Routes
//      /routes/index.js
*/

var people = [
    'people like you', 'designers', 'developers', 'photographers', 'writers', 'students', 'geeks', 'nerds', 'gamers', 
    'iOS enthusiasts', 'android enthusiasts', '.NET programmers', 'fervent learners', 'UX practitioners', 
    'front-end engineers', 'musicians', 'security boffins'
],
    randomisedPeople = [];

var rotatePeopleTimeout,    // A var to hold the setTimeout we're using for the major switches
    switchPersonTimeout,    // A var to hold the setTimeout we're using for the minor switches
    switchPersonIndex = 0,  // The number of times we've switched a person during this cycle
    switchPersonTimes = 0,  // The number of times we'll switch a person before stopping
    currentPersonIndex = 0; // The person we're currently on.


function rotatePeople() {

    if (randomisedPeople.length == 0) {
        randomisedPeople = people.sort(function() { return 0.5 - Math.random() });
    }

    if (switchPersonTimes == 0) {
        var modulo = 3;
        do { 
            remainder = randomisedPeople.length % modulo;
            switchPersonTimes = modulo;
            modulo++;
        } 
        while (remainder == 0 && modulo < randomisedPeople.length);
    }
    switchPeople();

}


function switchPeople() {

    document.getElementById("js-people").innerHTML = randomisedPeople[currentPersonIndex % randomisedPeople.length];
    currentPersonIndex++;

    if (switchPersonIndex < switchPersonTimes) {
        switchPersonTimeout = window.setTimeout(switchPeople, 125);
        switchPersonIndex++;
    }
    else {
        rotatePeopleTimeout = window.setTimeout(rotatePeople, 2000);
        switchPersonIndex = 0;
    }

}
 

rotatePeople();