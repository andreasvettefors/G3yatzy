// Yatzy main.js

// Global variables
// Use query to talk with the database
var query = new Queries();

var throws = 0;
var dice = [
	{ "die": 0,
	  "value":0,
	  "saved":false
	},
	{ "die": 1,
	  "value":0,
	  "saved":false
	},
	{ "die": 2,
	  "value":0,
	  "saved":false
	},
	{ "die": 3,
	  "value":0,
	  "saved":false
	},
	{ "die": 4,
	  "value":0,
	  "saved":false
	}
];


// Functions
// Example how to get data from database (Will be removed when our app is finished)
/*query.runAQuery(() =>{
	query.runAThirdQuery(() =>{
	});
});*/

$(start);

function start(){
	//Example how to show our templates in the DOM

	//$('body').append(example());
	randomize();
  
	$('#yatzyFormCol').append(yatzyformular());
	$('#submitFormCol').append(submitForm());

	$('#diceTableCol').append(diceTable());
	rollDice();

	submitPlayer();

    totalCalc(); 
    appendToDom(); 

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
		dice.forEach(function(die){
			console.log(die.value);
			if(die.saved === false){
			die.value = randomize();
			
		}
		});	
		
	}
	console.log(dice);
}

function appendToDom(){
	dice.forEach(function(die){
		if(die.saved === false){
					if(die.value === 1){
				$('#diceHolder').append(`<p>&#9856;</p>`);
			} else if(die.value === 2){
				$('#diceHolder').append(`<p>&#9857;</p>`);
			} else if(die.value === 3){
					$('#diceHolder').append(`<p>&#9858;</p>`);
			} else if(die.value === 4){
				$('#diceHolder').append(`<p>&#9859;</p>`);
			}else if(die.value === 5){
					$('#diceHolder').append(`<p>&#9860;</p>`);
			} else if(die.value === 6){
				$('#diceHolder').append(`<p>&#9861;</p>`);
			}
		}else {
			if(die.value === 1){
				$('#diceHolder').append(`<p class="active">&#9856;</p>`);
			} else if(die.value === 2){
				$('#diceHolder').append(`<p class="active">&#9857;</p>`);
			} else if(die.value === 3){
					$('#diceHolder').append(`<p class="active">&#9858;</p>`);
			} else if(die.value === 4){
				$('#diceHolder').append(`<p class="active">&#9859;</p>`);
			}else if(die.value === 5){
					$('#diceHolder').append(`<p class="active">&#9860;</p>`);
			} else if(die.value === 6){
				$('#diceHolder').append(`<p class="active">&#9861;</p>`);
			}

		}
		console.log(die);
	
	});	
}

//Calls "runAQuery" which exists in queries class. The returned value can be found in "element" as an array
function printScores(){
    query.runAQuery((element) => {
    for(var i = 0; i < element.length; i++){
        console.log(element[i].username)
        console.log(element[i].score)
    }
});
}


//Checks whether bonus is valid
function bonusChecker(){
    var points = singlePoints();
    var bonusActive=false;
    if(points>63){
        bonusActive = true;
    }
    return bonusActive;
}

//counts all points in the singel point board, ones-sixes
function singlePoints(){
 var pointsReturned=0;
    //founds how many <tr> exists within DOM
    var amountOfTRs = $(document).find('tr').length;
    //Loopa igenom varje tr element
    for(var i = 0; i < amountOfTRs; i++){
        //We want to manipulate every <tr> where points are being written, theese are nth-child 2-7, bonus is not included
        if(i<8&&i>1){
            //Get points written in <tr>. You can console log for more clarification what the variables contains
                var a = $("tr:nth-child("+i+")").text();
            //We have to split the string, because other characters is included which we dont need
            var b = a.split("\n");
            //parse to int so we can perform mathematic functions
        var p = parseInt(b[2]);
            //If <tr> tags where empty (no points), parse int was unsuccessful and we can skip those
            if(!isNaN(p)){
                //Add point to pointsReturned
                pointsReturned += p;
            }
        }
    }
    return pointsReturned;
}

//Adds 50 points if bonus is active
function sumCalc(){
     var pointsReturned = singlePoints();
    if(bonusChecker()==true){
        pointsReturned+=50;
        $(".bonus").text(50);
    }
    $(".summa").text(pointsReturned);
    return pointsReturned;
}

//Calculates the total score
function totalCalc(){
    var pointsReturned=0;
        var amountOfTRs = $(document).find('tr').length;
    for(var i = 0; i < amountOfTRs; i++){
        if(i<19&&i>9){
                var a = $("tr:nth-child("+i+")").text();
            var b = a.split("\n");
        var p = parseInt(b[2]);
            if(!isNaN(p)){
                pointsReturned += p;
            }
        }
    }   
        //Add the sum of the single points (onces-sixes and bonus)
        pointsReturned += sumCalc();
        $(".total").text(pointsReturned);
}

//submit form (saves the players name in a variable)
function submitPlayer(){
	$('#submitForm').submit(function(){	
		var textValue = $("input:text").val();
		var sumValue = $(".total").text();
		console.log(textValue + " " + sumValue);	
		query.submitHighscoreToDB(textValue, sumValue, ()=>{
		});
		return false;	
	});
}
//hur ska jag få rätt totalsumma som tillhör en viss spelare?

// Events

$(document).on('click','#diceHolder p',function(){	
	$(this).toggleClass('active');
});



