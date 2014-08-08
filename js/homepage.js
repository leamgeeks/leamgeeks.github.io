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

function nth(d) {

    if (d>3 && d<21)
        return 'th';
    switch (d % 10) {
	case 1:  return "st";
	case 2:  return "nd";
	case 3:  return "rd";
	default: return "th";
    }

}

function getNextEvent(skip) {

    var next = new Date(),
        nextWeek,
        dow = 2; // Tuesday

    while(true) {
        if (next.getDay() == dow) {
            nextWeek = new Date(next.getTime() + (7 * 24 * 60 * 60 * 1000));
            if (nextWeek.getMonth() != next.getMonth() && skip-- == 0)
                return next;
            else
                next = nextWeek; //skip to the next week
        }
        else {
	    var days_till_dow = (7 + dow - next.getDay()) % 7;
            next = new Date(next.getTime() + (days_till_dow * 24 * 60 * 60 * 1000));
        }
    }

}

function nextDates() {

    var now = new Date(),
        d = getNextEvent(0),
        d2 = getNextEvent(1),
        monthNames = [ "January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December" ];

    document.getElementById("js-date-next").innerHTML = "Tuesday, " + monthNames[d.getMonth()] + ", " +
                                                         d.getDate() + nth(d.getDate());

    document.getElementById("js-date-next-next").innerHTML = monthNames[d2.getMonth()] + "'s meet: Tuesday, " +
                                                             monthNames[d2.getMonth()] + " " +
                                                             d2.getDate() + nth(d2.getDate()) + ".";

    document.getElementById("js-days-to-go").innerHTML = "That's in " +
                                                         Math.round((d.getTime() - now.getTime())/(24 * 60 * 60 * 1000)) +
                                                         " days.";

}

nextDates();
rotatePeople();
