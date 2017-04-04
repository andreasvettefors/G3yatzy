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
		"value": 5,
		"saved": false
	},
	{
		"die": 1,
		"value": 5,
		"saved": false
	},
	{
		"die": 2,
		"value": 5,
		"saved": false
	},
	{
		"die": 3,
		"value": 5,
		"saved": false
	},
	{
		"die": 4,
		"value": 1,
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
	$('#highscore').hide();
	$('#aboutus').hide();
	printHighScoreToDom();


}

function startGame(){
	$('#home').hide();
	buildYatzyForm();
	$('#gamePage').show();
	seeActivePlayer();
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
	query.dbHighScore((users) => {
		users.forEach(function (user, index) {
			$('tbody').append(`
									<tr>
					        <td class="lalign">${index+1}</td>
					        <td>${user.score}</td>
					        <td>${user.username}</td>
					      </tr>
				`)
			//console.log(user.score);
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
				"yatzyPoints": [,,,,,,,,,,,,,,,,,],
				"active": true,
				"score": 0
			});
		} else {
			players.push({
				"username": $(this).val(),
				"yatzyPoints": [,,,,,,,,,,,,,,,,,],
				"active": false,
				"score": 0
			});
		}

	});

}

//Calculates the total score
function totalCalc() {
    	players.forEach(function(player,index){

        	if(player.active){
            var count=0;
            var points=0;
            var bonusPoints=0;
            var bonusActive=false;
            var sumPoints=true;
                for(var i = 0; i < 6;i++){
                    if(typeof player.yatzyPoints[i]!=='undefined'){
                        bonusPoints+=player.yatzyPoints[i]
                    }
                    if(bonusPoints>63&&bonusActive==false){
                        player.yatzyPoints[6]=50;
                        $('tr:nth-child(8)').children(".player"+(index+1)).text(50)
                        bonusPoints+=50
                        bonusActive=true
                    }
                    console.log(bonusPoints)
                    player.yatzyPoints[7]=bonusPoints;
                    $('tr:nth-child(9)').children(".player"+(index+1)).text(bonusPoints)

                }


			     for(var i = 8; i < 16; i++){

                     if(typeof player.yatzyPoints[i]=='undefined'){
                        count++;
                     }else{
                         points+=player.yatzyPoints[i]
                     }
                     if(sumPoints){
                         points+=player.yatzyPoints[7]
                         sumPoints=false
                     }

                     $('tr:nth-child(19)').children(".player"+(index+1)).text(points)

                 }
             }

	});

    /*
                var onceToSixesPoints=0;
		for(var i = 0; i < 6;i++){
            if(isNaN(player.yatzyPoints[i])){
            }else{
            onceToSixesPoints += player.yatzyPoints[i]
                }
        }       if(onceToSixesPoints<63){
            $('tr:nth-child(8)').children('.player'+index).text(50);
            player.yatzyPoints[8]=50;
        }
    */
   // $('tr:nth-child(19)').children(".player1").text(12)

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
		}else{
            dice[index].saved = false;
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
				tableRow.append($(`<th id="player${index + 1}" class = "text-center greyField">${index + 1}</th>`));
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
    var p = parseInt($(thisDiv).closest('tr').find('td:first').attr('id'));
        for(var i = 0; i < dice.length; i++){
            if(dice[i].value==p){
                pointAdded += p;
            }
        }
 		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo -1].yatzyPoints[p-1] = pointAdded;
    $(thisDiv).html(pointAdded);
    totalCalc();
    newRound();
}
function addToScoreAdvanced(thisDiv){
    //Variables that are used in the calculator
    var result = [];
    var result1= [];
    var pointAdded = 0;
    var count = 0;

		var x = $(thisDiv).closest('tr').find('td:first').text();
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
        if(result1.length==2){
            pointAdded=result1[0]*2
        }else if(result1.length==4){
            if(result1[1]==true&&result1[3]==true){
                console.log('Var god välj vilket par som ska sparas!')
                return;
            }else if(result1[1]==true){
                pointAdded=result1[0]*2
            }
            else if(result1[3]==true){
                pointAdded=result1[2]*2
            }
            else{
                console.log('Var god välj vilket par som ska sparas!')
                return;
            }
        }else if(result1.length==6){
            if(result1[1]==true&&result1[3]==true&&result1[5]==true){
                console.log('Var god välj vilket par som ska sparas!')
                return;
            }else if(result1[0]==result1[2]&&result[1]==true&&result1[3]==true){
                console.log('Var god välj vilket par som ska sparas!')
                return;
            }else if(result1[2]==result1[4]&&result1[1]==true&&result1[3]==true){
                console.log('Var god välj vilket par som ska sparas!')
                return;
            }else if(result1[1]==false&&result1[3]==false&&result1[5]==false){
                if(result1[0]==result1[2]&&result1[2]==result1[4]){
                 pointAdded=result1[0]*2
                }
                else{
                console.log('Var god välj vilket par som ska sparas!')
                return;
                }
            }
            else if(result1[1]==true){
                 pointAdded=result1[0]*2
            }else if(result1[3]==true){
                pointAdded=result1[2]*2
            }else if(result1[5]==true){
                pointAdded=result1[4]*2
            }
        }
						var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[8] = pointAdded;
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

        if(result1.length==2){
            var count=[0,0,0,0,0]
            for (var i = 0; i < dice.length;i++){
                for(var j = 0; j < dice.length; j++){
                    if(dice[i].value == dice[j].value){
                        count[i]++
                    }
                }
            }
            if(count[0]==3||count[1]==3||count[2]==3){
            }else if(count[0]==2||count[1]==2||count[2]==2||count[3]==2){
                pointAdded= (result1[0]*2) + (result1[1]*2)
            }else{
                pointAdded= (result1[0]*2) + (result1[1]*2)
            }
        }else if(result1.length==3){
            console.log(result1)
            if(result1[0]==result1[1]&&result1[1]==result1[2]){

                var count=[0,0,0,0,0]
            for (var i = 0; i < dice.length;i++){
                for(var j = 0; j < dice.length; j++){
                    if(dice[i].value == dice[j].value){
                        count[i]++
                    }
                }
            }if(count[0]==4||count[1]==4){
                pointAdded=result1[0]*4
            }

            }else if(result1[0]==result1[1]){
                pointAdded= (result1[0]*2) + (result1[2]*2)
            }else if(result1[0]==result1[2]){
                pointAdded= (result1[0]*2) + (result1[1]*2)
            }else{
                pointAdded= (result1[0]*2) + (result1[2]*2)
            }
        }else if(result1.length==4){

        }
    				var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[9] = pointAdded;
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
						var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[10] = pointAdded;
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
						var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[11] = pointAdded;
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
						var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[12] = pointAdded;
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
					var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[13] = pointAdded;
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
                    }else if(result1[0]==result1[2]){
                        pointAdded= (result1[0]*3)+(result1[1]*2)
                    }
                    else{
                        pointAdded= (result1[1]*3)+(result1[0]*2)
                    }
                }
            }
			var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[14] = pointAdded;
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
						var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[15] = pointAdded;
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
                            pointAdded=50
                        }
                    }
                }
            }
									var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
						players[playerToAddPointsTo -1].yatzyPoints[16] = pointAdded;
            $(thisDiv).text(pointAdded);
            totalCalc();
            newRound();
        }
    else if(x=="Ettor"||x=="Tvåor"||x=="Treor"||x=="Fyror"||x=="Femmor"||x=="Sexor"){
        addToScore(thisDiv);
    }
}


function newRound(){
    for(var i = 0; i < dice.length; i++){
        dice[i].saved=false;
    }
		throws = 0;
	  var nextIndex = 0;
		players.forEach(function(player,index){
			if(player.active && index == players.length - 1){
				nextIndex = 0;
				player.active = false;
				console.log('last player')
			}
			else if(player.active && players.length > 1){
				nextIndex = index+1;
				player.active = false;
			}

			else{

			}
		});


		players[nextIndex].active = true;
		seeActivePlayer();

    $('#diceHolder img').remove();
}

//function see active players

function showActivePlayers(){
		var unorderedList = $(`<ul class="activePlayersList"></ul>`);
	players.forEach(function(player, index){
		var playerItem = $(`<li class="playerList" id="p${index}">Spelare ${index + 1} - ${player.username}</li>`);
		unorderedList.append(playerItem);
	});

	$('#activePlayers').append(unorderedList);
}

function seeActivePlayer(){

	players.forEach(function(player,index){

		if(player.active){
			$(`#p${index}`).addClass('activePlayer');
			$(`#player${index +1}`).addClass('activePlayerForm');


		}
		else{
			$(`#p${index}`).removeClass('activePlayer');
			$(`#player${index +1}`).removeClass('activePlayerForm');
			console.log('tar bort class');
		}
	});


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
		showActivePlayers();

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

var pages = ['aboutusPage','highscorePage','rulesPage','homePage'];


$(document).on('click', 'li', function () {
	var buttonId = $(this).attr('id');

	var page;

	pages.forEach(function(value){
		if(buttonId === value){

		page = value.replace("Page","");
		console.log(page);
		$(`#${page}`).show();
	} else {
		page = value.replace("Page","");
		console.log(page);
		$(`#${page}`).hide();
	}
	});

});

$(document).on('click', '.customTd', function () {
	var tdThatCanBeUsed;
	players.forEach(function(player,index){
		if(player.active){
			tdThatCanBeUsed = index + 1;
		}
	});
	if($(this).attr('class').indexOf(`player${tdThatCanBeUsed}`) > -1){
		if($(this).text() == ''){
			console.log('den är inte tom');
			addToScoreAdvanced(this);
		}

	}

});
