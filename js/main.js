// Yatzy main.js

// Global variables
// Use query to talk with the database
var query = new Queries();
 			query.runAQuery((element) => {
 				console.log(element);
 			});

// Functions
// Example how to get data from database (Will be removed when our app is finished)
/*query.runAQuery(() =>{
	query.runAThirdQuery(() =>{
	});
});*/

$(start);

function start(){
	//Example how to show our templates in the DOM
	$('body').append(example());
	randomize();
  

	rollDice();
	rollDice();
	rollDice();
	rollDice();
}

var throws = 0;
var dices = [0,1,0,0,0];

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
			}
		}
	}
	console.log(dices);
}


// Events
