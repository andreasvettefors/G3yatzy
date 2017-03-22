// Yatzy main.js

// Global variables
// Use dbCon to retrieve data from the dbConnect class
var dbCon = new dbConnect();

// Functions
// Example how to get data from database (Will be removed when our app is finished)
/*dbCon.runAQuery(() =>{
	dbCon.runAThirdQuery(() =>{
	});
});*/

$(start);

function start(){
	//Example how to show our templates in the DOM
	$('body').append(example());
}

// Events
