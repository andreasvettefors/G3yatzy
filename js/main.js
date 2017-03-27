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

	$('body').append(example());
	randomize();
  
	$('#yatzyFormCol').append(yatzyformular());
	$('#diceTableCol').append(diceTable());
	rollDice();
    totalCalc();  
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

dice=[{
    name:1,
    value:3,
    saved:true
},
{
    name:2,
    value:3,
    saved:false
},
{
    name:3,
    value:1,
    saved:true
},
{
    name:4,
    value:4,
    saved:true
},
{
    name:5,
    value:1,
    saved:true
}];

//Adderar poäng till formuläret
function addToScore(a){
    var pointAdded = 0;
    var x = a.previousElementSibling.innerHTML;
    var p = parseInt(a.previousElementSibling.id);
    console.log(p);
    if(x==x){
        for(var i = 0; i < dice.length; i++){
            if(dice[i].value==p){
                pointAdded += p;
            }
        }
    }
    $(a).text(pointAdded);
    totalCalc();
    newRound();
}
function addToScoreAdvanced(a){
    var result = [];
    var result1= [];
    var pointAdded = 0;
    var count = 0;
    var x = a.previousElementSibling.innerHTML;
        
    if(x=="Ett Par"){
        $.each(dice, function (key, point) {
            if($.inArray(point.value, result) === -1) {
                result.push(point.value);
            }else{
                result1.push(point.value,point.saved)
            }
        }); 
        if(result1[1]==null){
            pointAdded=result1[0].value*2
            console.log(pointAdded)
        }else{
            if(result1[1]==true&&result1[3]==true){
                pointAdded=Math.min(result1[0],result1[2])*2
                console.log("1")
            }else if(result1[1]==true){
                pointAdded=result1[0]*2
                console.log("2")
            }else{
                pointAdded=result1[2]*2
                console.log(result1)
            }
        }
            $(a).text(pointAdded);
            totalCalc();
            newRound();
        
    }else if(x=="Två Par"){
        $.each(dice, function (key, point) {
            if($.inArray(point.value, result) === -1) {
                result.push(point.value);
            }else{
                result1.push(point.value);
            }
        });     
        if(result1[1]==null){
        }else{
            pointAdded = (result1[0]*2) + (result1[1]*2)
        }
            $(a).text(pointAdded);
            totalCalc();
            newRound();
        }            
}
    


function newRound(){
    for(var i = 0; i < dice.length; i++){
        dice[i].saved=false;
    }
    $('#diceHolder p').remove();
}

// Events

$(document).on('click','#diceHolder p',function(){	
	$(this).toggleClass('active');
});
