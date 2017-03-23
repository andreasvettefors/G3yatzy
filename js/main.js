// Yatzy main.js

// Global variables
// Use query to talk with the database
var query = new Queries();
var throws = 0;
var dices = [0,0,0,0,0];

// Functions
// Example how to get data from database (Will be removed when our app is finished)
/*query.runAQuery(() =>{
	query.runAThirdQuery(() =>{
	});
});*/

$(start);

function start(){
	//Example how to show our templates in the DOM

	$('#yatzyFormCol').append(yatzyformular());
	$('#submitFormCol').append(submitForm());

	$('#diceTableCol').append(diceTable());
	rollDice();
	saveName();
}

function randomize(){
	return Math.floor(Math.random() * 6) + 1;
}

function rollDice(){
	throws++;
	if(throws > 3){
		// här ska kallas på aktiv spelare
		console.log('next person');
	}else {
		for(var i =0; i < 5; i++){
			if(dices[i] === 0){
				dices[i] = randomize();
				if(dices[i] === 1){
					$('#diceHolder').append(`<p>&#9856;</p>`);
				} else if(dices[i] === 2){
					$('#diceHolder').append(`<p>&#9857;</p>`);
				} else if(dices[i] === 3){
						$('#diceHolder').append(`<p>&#9858;</p>`);
				} else if(dices[i] === 4){
					$('#diceHolder').append(`<p>&#9859;</p>`);
				}else if(dices[i] === 5){
						$('#diceHolder').append(`<p>&#9860;</p>`);
				} else if(dices[i] === 6){
					$('#diceHolder').append(`<p>&#9861;</p>`);
				}
			}
		}
	}
	console.log(dices);
}


// Events

$(document).on('click','#diceHolder p',function(){	
	$(this).toggleClass('active');
});


//submit formulär (Sparar namn i en variable
function saveName(){
	$('#submitForm').submit(function(){	
		var textValue = $("input:text").val();
		console.log(textValue);	
		return false;
	});
}

