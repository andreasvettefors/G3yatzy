// Yatzy main.js

// Global variables
// Use query to talk with the database
var query = new Queries();

var throws = 0;

var players = [
	{
		"username": "hhh",
		"yatzyPoints": [],
		"score": 5,
		"active": false
	},
	{
		"username": "Hanna",
		"yatzyPoints": [],
		"score": 10,
		"active": false
	},
	{
		"username": "sss",
		"yatzyPoints": [],
		"score": 4,
		"active": false
	},
	{
		"username": "rrr",
		"yatzyPoints": [],
		"score": 7,
		"active": false
	}
];

var dice = [
	{
		"die": 0,
		"value": 0,
		"saved": false
	},
	{
		"die": 1,
		"value": 0,
		"saved": false
	},
	{
		"die": 2,
		"value": 0,
		"saved": false
	},
	{
		"die": 3,
		"value": 0,
		"saved": false
	},
	{
		"die": 4,
		"value": 0,
		"saved": false
	}
];



// Functions
// Example how to get data from database (Will be removed when our app is finished)
/*query.runAQuery(() =>{
	query.runAThirdQuery(() =>{
	});
});*/

$(start);

function start() {
	//Example how to show our templates in the DOM

	//$('body').append(example());
	$('body').append(startPage());
	yatzyForm();



	/*
		submitPlayer();
    totalCalc(); */
}

function randomize() {
	return Math.floor(Math.random() * 6) + 1;
}

function rollDie() {
	throws++;
	if (throws > 3) {
		// här ska kallas på aktiv spelare
		console.log('next person');
	} else {
		dice.forEach(function (die) {
			console.log(die.value);
			if (die.saved === false) {
				die.value = randomize();
			}
		});
		appendToDom();

	}
}

function appendToDom() {
	$('#diceHolder img').remove();
	dice.forEach(function (die) {
		if (die.saved === false) {
			if (die.value === 1) {
				$('#diceHolder').append(`<img src="img/dice-1.png">`);
			} else if (die.value === 2) {
				$('#diceHolder').append(`<img src="img/dice-2.png">`);
			} else if (die.value === 3) {
				$('#diceHolder').append(`<img src="img/dice-3.png">`);
			} else if (die.value === 4) {
				$('#diceHolder').append(`<img src="img/dice-4.png">`);
			} else if (die.value === 5) {
				$('#diceHolder').append(`<img src="img/dice-5.png">`);
			} else if (die.value === 6) {
				$('#diceHolder').append(`<img src="img/dice-6.png">`);
			}
		} else {
			if (die.value === 1) {
				$('#diceHolder').append(`<img class="active" src="img/dice-1-active.png">`);
			} else if (die.value === 2) {
				$('#diceHolder').append(`<img class="active" src="img/dice-2-active.png">`);
			} else if (die.value === 3) {
				$('#diceHolder').append(`<img class="active" src="img/dice-3-active.png">`);
			} else if (die.value === 4) {
				$('#diceHolder').append(`<img class="active" src="img/dice-4-active.png">`);
			} else if (die.value === 5) {
				$('#diceHolder').append(`<img class="active" src="img/dice-5-active.png">`);
			} else if (die.value === 6) {
				$('#diceHolder').append(`<img class="active" src="img/dice-6-active.png">`);
			}

		}

	});
}

//Calls "runAQuery" which exists in queries class. The returned value can be found in "element" as an array
function printScores() {
	query.runAQuery((element) => {
		for (var i = 0; i < element.length; i++) {
			console.log(element[i].username)
			console.log(element[i].score)
		}
	});
}


//Checks whether bonus is valid
function bonusChecker() {
	var points = singlePoints();
	var bonusActive = false;
	if (points > 63) {
		bonusActive = true;
	}
	return bonusActive;
}

//counts all points in the singel point board, ones-sixes
function singlePoints() {
	var pointsReturned = 0;
	//founds how many <tr> exists within DOM
	var amountOfTRs = $(document).find('tr').length;
	//Loopa igenom varje tr element
	for (var i = 0; i < amountOfTRs; i++) {
		//We want to manipulate every <tr> where points are being written, theese are nth-child 2-7, bonus is not included
		if (i < 8 && i > 1) {
			//Get points written in <tr>. You can console log for more clarification what the variables contains
			var a = $("tr:nth-child(" + i + ")").text();
			//We have to split the string, because other characters is included which we dont need
			var b = a.split("\n");
			//parse to int so we can perform mathematic functions
			var p = parseInt(b[2]);
			//If <tr> tags where empty (no points), parse int was unsuccessful and we can skip those
			if (!isNaN(p)) {
				//Add point to pointsReturned
				pointsReturned += p;
			}
		}
	}
	return pointsReturned;
}

//Adds 50 points if bonus is active
function sumCalc() {
	var pointsReturned = singlePoints();
	if (bonusChecker() == true) {
		pointsReturned += 50;
		$(".bonus").text(50);
	}
	$(".summa").text(pointsReturned);
	return pointsReturned;
}

//Calculates the total score
function totalCalc() {
	var pointsReturned = 0;
	var amountOfTRs = $(document).find('tr').length;
	for (var i = 0; i < amountOfTRs; i++) {
		if (i < 19 && i > 9) {
			var a = $("tr:nth-child(" + i + ")").text();
			var b = a.split("\n");
			var p = parseInt(b[2]);
			if (!isNaN(p)) {
				pointsReturned += p;
			}
		}
	}
	//Add the sum of the single points (onces-sixes and bonus)
	pointsReturned += sumCalc();
	$(".total").text(pointsReturned);
}

//submit form (saves the players name in a variable)
function submitPlayer() {
	$('#submitForm').submit(function () {
		var textValue = $("input:text").val();
		var sumValue = $(".total").text();
		console.log(textValue + " " + sumValue);
		query.submitHighscoreToDB(textValue, sumValue, () => {});
		//return false does so that the page doesn't refresh
		return false;
	});
}

//function that shows who's the winner
function findWinner() {
	var highestScore = 0;
	var winner;
	players.forEach(function (player) {
		if (player.score > highestScore) {
			highestScore = player.score;
			winner = player.username;
		}
	});
	console.log("Vinnaren är: ", winner, "Totalpoäng: ", highestScore);
}
//hur ska jag få rätt totalsumma som tillhör en viss spelare?

function holdDice() {
	$('#diceHolder img').each(function (index) {
		if ($(this).attr('class') == 'active') {
			dice[index].saved = true;
		}
	});

}
//function add inputfield for new players

var clicks = 0;

function addField() {

	$('.addField').remove();
	var newField = $('body').append('<div class="field"><input autocomplete="off" class="input form-control" id="field1" type="text"><span class="glyphicon glyphicon-plus-sign addField" aria-hidden="true"></span><span class="glyphicon glyphicon-remove-sign removeField" aria-hidden="true"></span></div>');

}

var arr = ['Spelare', 'Ettor', 'Tvåor', 'Treor', 'Fyror', 'Femmor', 'Sexor', 'Summa', 'Bonus'];


function yatzyForm() {
	var tablerow;
	var tabledata;
	arr.forEach(function (a, index) {
			tablerow = $('<tr/>');
			if (index == 0) {
				tabledata = $(`<th>${a}</th>`);
				tablerow.append(tabledata);
				players.forEach(function (player, index) {
					tabledata = $(`<th class="text-center">${index + 1}</th>`);
					tablerow.append(tabledata);
				});
			} else if (index == 7 || index == 8) {
				tabledata = $(`<td><strong>${a}</strong></td>`);
				tablerow.append(tabledata);
				players.forEach(function (player, index) {
					tabledata = $(`<td></td>`);
					tablerow.append(tabledata);
				});
			} else {
			tabledata = $(`<td>${a}</td>`);
			tablerow.append(tabledata);
			players.forEach(function (player, index) {
				tabledata = $(`<td class="player${index + 1}"></td>`);
				tablerow.append(tabledata);
			});
		}

		$('#scoretabel').append(tablerow);
	});


}

// Event that adds a new input field
$(document).on('click', '.addField', function () {

	if (clicks < 3) {
		clicks += 1;

		if ($(this).parent().find('input').val() != "") {
			addField();
		} else {
			console.log("hej");
		}
	}
});

// event that removes previous field
$(document).on("click", ".removeField", function (e) { //user click on remove text
	e.preventDefault();
	$(this).parent('div').remove();
	$('.addField').remove();
	$('.field:last-child').append('<span class="glyphicon glyphicon-plus-sign addField" aria-hidden="true"></span>');

	clicks--;

});


$(document).on('click', '#diceHolder img', function () {
	$(this).toggleClass('active');
});

$(document).on('click', '#diceTable #throwDice', function () {
	holdDice();
	rollDie();
});