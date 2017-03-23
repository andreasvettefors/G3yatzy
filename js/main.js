// Yatzy main.js

// Global variables
// Use query to talk with the database
var query = new Queries();

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
}

// Events
