// Yatzy main.js

// Global variables
// Use query to talk with the database
var query = new Queries();
var throws = 0;
var yatzyForm = ["Spelare", "Ettor", "Tvåor", "Treor", "Fyror", "Femmor", "Sexor", "Bonus", "Summa",
"Ett Par", "Två Par", "Tretal", "Fyrtal", "Liten Stege", "Stor Stege", "Kåk", "Chans", "Yatzy", "Total"];

var players = [];

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

// Just to be domready before we do stuff
$(start);

function start() {
	$('body').append(startPage());
	$('#gamePage').hide();
	$('#wrapper').hide();
	printHighScoreToDom();
}

function startGame(){
	//$('#pageContent').html('');
	//$('#pageContent').append(gamePage());
	$('#homePage').hide();
	buildYatzyForm();
	$('#gamePage').show();
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

function printHighScoreToDom() {
	console.log('hej');
	query.dbHighScore((users) => {
		users.forEach(function (user, index) {
			$('tbody').append(`
									<tr>
					        <td class="lalign">${index+1}</td>
					        <td>${user.score}</td>
					        <td>${user.username}</td>
					      </tr>
				`)
			console.log(user.score);
		})
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

function addPlayersToGame() {
	players = [];
	$('.input').each(function (index) {
		if (index === 0) {
			players.push({
				"username": $(this).val(),
				"yatzyPoints": [],
				"active": true,
				"score": 0
			});
		} else {
			players.push({
				"username": $(this).val(),
				"yatzyPoints": [],
				"active": false,
				"score": 0
			});
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
            console.log(dice)
		}
	});

}
//function add inputfield for new players



function addField() {

	$('.addField').remove();
	var newField = $('.input-append').append('<div class="field"><input autocomplete="off" class="input inputControl" id="field1" type="text"><span class="glyphicon glyphicon-plus-sign addField" aria-hidden="true"></span><span class="glyphicon glyphicon-remove-sign removeField" aria-hidden="true"></span></div>');

}

//Funktion för att kunna starta spelet och rita upp spelet med spelare och formulär
function buildYatzyForm() {
	var tableRow;
	var tableData;
	yatzyForm.forEach(function (outPrint, index) {
		tableRow = $(`<tr></tr>`);
		if (index == 0) {
			tableData = $(`<th class="greyField">${outPrint}</th>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<th class = "text-center greyField">${index + 1}</th>`));
			});
		}else if(index<7&&index>0){
            tableData = $(`<td id="${index}">${outPrint}</td>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<td class="player${index + 1} customTd"></td>`));
			});     
       } else if (index == 7 || index == 8 || index == 18) {
			tableData = $(`<td class="greyField"><strong>${outPrint}</strong></td>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<td class="player${index + 1} greyField"></td>`));
			});
		} else {
			tableData = $(`<td>${outPrint}</td>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<td class="player${index + 1} customTd"></td>`));
			});
		}
		$("#scoretabel").append(tableRow);
    });
}

//Adderar poäng till formuläret
function addToScore(thisDiv){
    var pointAdded = 0;
    var x = thisDiv.previousElementSibling.innerHTML;
    var p = parseInt(thisDiv.previousElementSibling.id);
    console.log(x)
    console.log(p)
    if(x==x){
        for(var i = 0; i < dice.length; i++){
            if(dice[i].value==p){
                pointAdded += p;
            }
        }
    }
    $(thisDiv).text(pointAdded);
    totalCalc();
    newRound();
}
function addToScoreAdvanced(thisDiv){
    //Variables that are used in the calculator
    var result = [];
    var result1= [];
    var pointAdded = 0;
    var count = 0;
    var x = thisDiv.previousElementSibling.innerHTML;
    //
        //ONE PAIR
    //
    if(x=="Ett Par"){
        //See if there are any multiply values in the Dice array
        $.each(dice, function (key, point) {
            if($.inArray(point.value, result) === -1) {
                result.push(point.value);
            }else{
                result1.push(point.value,point.saved)
            }
        });
        //To make sure you cant trick the system, we check several options which needs to be true
        if(result1[1]==null&&result1[0]<7){
            pointAdded=result1[0].value*2
        }else{
            if(result1[1]==true&&result1[3]==true){
                pointAdded=Math.min(result1[0],result1[2])*2
                console.log("")
            }else if(result1[1]==true){
                pointAdded=result1[0]*2
                console.log("")
            }else if(result1[3]==true){
                pointAdded=result1[2]*2
                console.log("")
            }else if(result1.length==0){
            }
            else{
                pointAdded=result1[4]*2
                console.log(result1)
            }
        }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        
    }
    //
        //TWO PAIR
    //
    else if(x=="Två Par"){
        //See if there are any multiply values in the Dice array
        $.each(dice, function (key, point) {
            if($.inArray(point.value, result) === -1) {
                result.push(point.value);
            }else{
                result1.push(point.value);
            }
        });
        //To make sure you cant trick the system, we check several options which needs to be true
        if(result1[1]==null){   
        }else if(result1[2]==null){
         pointAdded = (result1[0]*2) + (result1[1]*2) 
        }
        else{
            pointAdded = (result1[2]*2) + (result1[1]*2)
        }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        }
    //
        //THREE OF A KIND
    //
    else if(x=="Tretal"){
            //Check if any values match eachother in the Dice array
            for (var i = 0; i < dice.length;i++){
                var count = 0;
                for(var j = 0; j < dice.length; j++){
                    //Keep a count how many times they match
                    if(dice[i].value == dice[j].value){
                        count++;
                        //If they match more than two times, this point is valid
                        if(count>2){
                            pointAdded=dice[i].value*3
                        }
                    }
                }
            }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        }
    //
        //FOUR OF A KIND
    //
    else if(x=="Fyrtal"){
            //Check if any values match eachother in the Dice array
            for (var i = 0; i < dice.length;i++){
                var count = 0;
                for(var j = 0; j < dice.length; j++){
                    //Keep a count how many times they match
                    if(dice[i].value == dice[j].value){
                        count++;
                        //If they match more than three times, this point is valid
                        if(count>3){
                            pointAdded=dice[i].value*4
                        }
                    }
                }
            }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();            
        }
    //
        //SMALL LADDER
    //
        else if(x=="Liten Stege"){
            //We need all of theese counts to be 1. You could think of them as booleans, i just choosed numbers instead
            var count1 = 0;
            var count2 = 0;
            var count3 = 0;
            var count4 = 0;
            var count5 = 0;
        for(var i = 0; i < dice.length; i++){
            //If the value is valid, count is changed
            if(dice[i].value==1){
                count1=1;
            }if(dice[i].value==2){
                count2=1;
            }if(dice[i].value==3){
                count3=1;
            }if(dice[i].value==4){
                count4=1;
            }if(dice[i].value==5){
                count5=1;
            }
        }   
            //We add the counts
            count += (count1+count2+count3+count4+count5)
            //If all count has been triggered, point is valid
            if(count==5){
            pointAdded=15;
        }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        }
    //
        //BIG LADDER
    //
        else if(x=="Stor Stege"){
            //Same as the "Small Ladder" just that one dice.value need to be 6 instead of 1
            var count1 = 0;
            var count2 = 0;
            var count3 = 0;
            var count4 = 0;
            var count5 = 0;
        for(var i = 0; i < dice.length; i++){
            if(dice[i].value==6){
                count1=1;
            }if(dice[i].value==2){
                count2=1;
            }if(dice[i].value==3){
                count3=1;
            }if(dice[i].value==4){
                count4=1;
            }if(dice[i].value==5){
                count5=1;
            }
        }
            count += (count1+count2+count3+count4+count5)
            if(count==5){
            pointAdded=20;
        }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        }
    //
        //FULL HOUSE
    //
    else if(x=="Kåk"){
        //Check multiply values
        $.each(dice, function (key, point) {
            if($.inArray(point.value, result) === -1) {
                result.push(point.value);
            }else{
                result1.push(point.value);
            }
        });     
            //You can log result1 for better understanding
                // This array needs to have 3 numbers
            if(result1.length==3){
                //Formulas to see which multiply values is going to multiply 3 and 2
                if(result1[0]==result1[1]&&result1[0]==result1[2]){
                }else{
                    if(result1[0]==result1[1]){
                        pointAdded= (result1[0]*3)+(result1[2]*2)
                    }if(result1[0]==result1[2]){
                        pointAdded= (result1[0]*3)+(result1[1]*2)
                    }
                    else{
                        pointAdded= (result1[1]*3)+(result1[0]*2)
                    }
                }
            }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();            
        }
    //
        //CHANCE
    //
    else if(x=="Chans"){
            //Add all values to point!
            for(var i = 0; i < dice.length;i++){
                pointAdded+=dice[i].value
            }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        }
    //
        //YATZY
    //
    else if(x=="Yatzy"){
        //Same is the "LADDERS" but modified
            for (var i = 0; i < dice.length;i++){
                var count = 0;
                for(var j = 0; j < dice.length; j++){
                    if(dice[i].value == dice[j].value){
                        count++;
                        //Modified
                        if(count>4){
                            pointAdded=dice[i].value*6
                        }
                    }
                }
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
            }            
        }
    else if(x=="Ettor"||x=="Tvåor"||x=="Treor"||x=="Fyror"||x=="Femmor"||x=="Sexor"){
        addToScore(thisDiv);
        console.log("")
    }
}


function newRound(){
    for(var i = 0; i < dice.length; i++){
        dice[i].saved=false;
    }
    $('#diceHolder p').remove();
}

// Events

var clicks = 0;

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

$(document).on('click', '.btn-info', function () {
	var flag = false;
	$('.input').each(function (index) {
		if ($(this).val() != '') {
			flag = true;
		} else {
			flag = false;
		}
	});
	if (flag) {
		addPlayersToGame();
		startGame();
		
	}
	else{
		console.log('Får inte vara tomt');
		return;
	}
});

$(document).on('click', '#diceHolder img', function () {
	$(this).toggleClass('active');
    holdDice();
});

$(document).on('click', '#diceTable #throwDice', function () {
	rollDie();
});

$(document).on('click', 'li', function () {
	$('#wrapper').show();
	$('#homePage').hide();
});

$(document).on('click', '.customTd', function () {
	addToScoreAdvanced(this);
});
 
