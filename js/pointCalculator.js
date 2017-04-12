// Yatzy pointsCalculator.js

//Calculates the total score
function totalCalc() {
	players.forEach(function (player, index) {

		if (player.active) {
			var count = 0;
			var points = 0;
			var bonusPoints = 0;
			var bonusActive = false;
			var sumPoints = true;
			for (var i = 0; i < 6; i++) {
				if (typeof player.yatzyPoints[i] !== 'undefined') {
					bonusPoints += player.yatzyPoints[i]
				}
				if (bonusPoints > 63 && bonusActive == false) {
					player.yatzyPoints[6] = 50;
					$('tr:nth-child(8)').children(".player" + (index + 1)).text(50);
					bonusPoints += 50
					bonusActive = true
				}
				player.yatzyPoints[6] = 0;
				$('tr:nth-child(8)').children(".player" + (index + 1)).text(0);
				player.yatzyPoints[7] = bonusPoints;
				$('tr:nth-child(9)').children(".player" + (index + 1)).text(bonusPoints)

			}

			for (var i = 8; i < 17; i++) {

				if (typeof player.yatzyPoints[i] == 'undefined') {
					count++;
				} else {
					points += player.yatzyPoints[i];
				}
				if (sumPoints) {
					points += player.yatzyPoints[7];
					sumPoints = false
				}

				$('tr:nth-child(19)').children(".player" + (index + 1)).text(points)

				player.score = points;

			}
		}

	});
}


//Adds points to yatzyForm
function addToScore(thisDiv) {
	var pointAdded = 0;
	var p = parseInt($(thisDiv).closest('tr').find('td:first').attr('id'));
	for (var i = 0; i < dice.length; i++) {
		if (dice[i].value == p) {
			pointAdded += p;
		}
	}
	var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
	players[playerToAddPointsTo - 1].yatzyPoints[p - 1] = pointAdded;
	$(thisDiv).html(pointAdded);
}

//Adds points to yatzyForm
function addToScoreAdvanced(thisDiv) {
	//Variables that are used in the calculator
	var result = [];
	var result1 = [];
	var pointAdded = 0;
	var count = 0;

	var x = $(thisDiv).closest('tr').find('td:first').text();
	//
	//ONE PAIR
	//
	if (x == "Ett Par") {
		//See if there are any multiply values in the Dice array
		$.each(dice, function (key, point) {
			if ($.inArray(point.value, result) === -1) {
				result.push(point.value);
			} else {
				result1.push(point.value, point.saved)
			}
		});
		console.log(result1.length)
		if (result1.length == 2) {
			pointAdded = result1[0] * 2
		} else if (result1.length == 4) {
			console.log(result1)
			if (result1[1] == true && result1[3] == true) {
				if (result1[0] == result1[2]) {
					pointAdded = result1[0] * 2
				} else {
					return false;
				}
			} else if (result1[1] == true) {
				pointAdded = result1[0] * 2
			} else if (result1[3] == true) {
				pointAdded = result1[2] * 2
			} else {
				return false;
			}
		} else if (result1.length == 6) {
			if (result1[1] == true && result1[3] == true && result1[5] == true) {
				return false;
			} else if (result1[0] == result1[2] && result[1] == true && result1[3] == true) {
				return false;
			} else if (result1[2] == result1[4] && result1[1] == true && result1[3] == true) {
				return false;
			} else if (result1[1] == false && result1[3] == false && result1[5] == false) {
				if (result1[0] == result1[2] && result1[2] == result1[4]) {
					pointAdded = result1[0] * 2
				} else {
					return false;
				}
			} else if (result1[1] == true) {
				pointAdded = result1[0] * 2
			} else if (result1[3] == true) {
				pointAdded = result1[2] * 2
			} else if (result1[5] == true) {
				pointAdded = result1[4] * 2
			}
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[8] = pointAdded;
		$(thisDiv).text(pointAdded);

	}
	//
	//TWO PAIR
	//
	else if (x == "Två Par") {
		//See if there are any multiply values in the Dice array
		$.each(dice, function (key, point) {
			if ($.inArray(point.value, result) === -1) {
				result.push(point.value);
			} else {
				result1.push(point.value);
			}
		});
		//To make sure you cant trick the system, we check several options which needs to be true

		if (result1.length == 2) {
			var count = [0, 0, 0, 0, 0]
			for (var i = 0; i < dice.length; i++) {
				for (var j = 0; j < dice.length; j++) {
					if (dice[i].value == dice[j].value) {
						count[i]++
					}
				}
			}
			if (count[0] == 3 || count[1] == 3 || count[2] == 3) {} else if (count[0] == 2 || count[1] == 2 || count[2] == 2 || count[3] == 2) {
				pointAdded = (result1[0] * 2) + (result1[1] * 2)
			} else {
				pointAdded = (result1[0] * 2) + (result1[1] * 2)
			}
		} else if (result1.length == 3) {
			console.log(result1)
			if (result1[0] == result1[1] && result1[1] == result1[2]) {

				var count = [0, 0, 0, 0, 0]
				for (var i = 0; i < dice.length; i++) {
					for (var j = 0; j < dice.length; j++) {
						if (dice[i].value == dice[j].value) {
							count[i]++
						}
					}
				}
				if (count[0] == 4 || count[1] == 4) {
					pointAdded = result1[0] * 4
				}

			} else if (result1[0] == result1[1]) {
				pointAdded = (result1[0] * 2) + (result1[2] * 2)
			} else if (result1[0] == result1[2]) {
				pointAdded = (result1[0] * 2) + (result1[1] * 2)
			} else {
				pointAdded = (result1[0] * 2) + (result1[2] * 2)
			}
		} else if (result1.length == 4) {

		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[9] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//THREE OF A KIND
	//
	else if (x == "Tretal") {
		//Check if any values match eachother in the Dice array
		for (var i = 0; i < dice.length; i++) {
			var count = 0;
			for (var j = 0; j < dice.length; j++) {
				//Keep a count how many times they match
				if (dice[i].value == dice[j].value) {
					count++;
					//If they match more than two times, this point is valid
					if (count > 2) {
						pointAdded = dice[i].value * 3
					}
				}
			}
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[10] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//FOUR OF A KIND
	//
	else if (x == "Fyrtal") {
		//Check if any values match eachother in the Dice array
		for (var i = 0; i < dice.length; i++) {
			var count = 0;
			for (var j = 0; j < dice.length; j++) {
				//Keep a count how many times they match
				if (dice[i].value == dice[j].value) {
					count++;
					//If they match more than three times, this point is valid
					if (count > 3) {
						pointAdded = dice[i].value * 4
					}
				}
			}
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[11] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//Small Straigh
	//
	else if (x == "Liten Stege") {
		//We need all of theese counts to be 1. You could think of them as booleans, i just choosed numbers instead
		var count1 = 0;
		var count2 = 0;
		var count3 = 0;
		var count4 = 0;
		var count5 = 0;
		for (var i = 0; i < dice.length; i++) {
			//If the value is valid, count is changed
			if (dice[i].value == 1) {
				count1 = 1;
			}
			if (dice[i].value == 2) {
				count2 = 1;
			}
			if (dice[i].value == 3) {
				count3 = 1;
			}
			if (dice[i].value == 4) {
				count4 = 1;
			}
			if (dice[i].value == 5) {
				count5 = 1;
			}
		}
		//We add the counts
		count += (count1 + count2 + count3 + count4 + count5)
		//If all count has been triggered, point is valid
		if (count == 5) {
			pointAdded = 15;
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[12] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//Large Straight
	//
	else if (x == "Stor Stege") {
		//Same as the "Small Ladder" just that one dice.value need to be 6 instead of 1
		var count1 = 0;
		var count2 = 0;
		var count3 = 0;
		var count4 = 0;
		var count5 = 0;
		for (var i = 0; i < dice.length; i++) {
			if (dice[i].value == 6) {
				count1 = 1;
			}
			if (dice[i].value == 2) {
				count2 = 1;
			}
			if (dice[i].value == 3) {
				count3 = 1;
			}
			if (dice[i].value == 4) {
				count4 = 1;
			}
			if (dice[i].value == 5) {
				count5 = 1;
			}
		}
		count += (count1 + count2 + count3 + count4 + count5)
		if (count == 5) {
			pointAdded = 20;
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[13] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//FULL HOUSE
	//
	else if (x == "Kåk") {
		//Check multiply values
		$.each(dice, function (key, point) {
			if ($.inArray(point.value, result) === -1) {
				result.push(point.value);
			} else {
				result1.push(point.value);
			}
		});
		//You can log result1 for better understanding
		// This array needs to have 3 numbers
		if (result1.length == 3) {
			//Formulas to see which multiply values is going to multiply 3 and 2
			if (result1[0] == result1[1] && result1[0] == result1[2]) {} else {
				if (result1[0] == result1[1]) {
					pointAdded = (result1[0] * 3) + (result1[2] * 2)
				} else if (result1[0] == result1[2]) {
					pointAdded = (result1[0] * 3) + (result1[1] * 2)
				} else {
					pointAdded = (result1[1] * 3) + (result1[0] * 2)
				}
			}
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[14] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//CHANCE
	//
	else if (x == "Chans") {
		//Add all values to point!
		for (var i = 0; i < dice.length; i++) {
			pointAdded += dice[i].value
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[15] = pointAdded;
		$(thisDiv).text(pointAdded);
	}
	//
	//YATZY
	//
	else if (x == "Yatzy") {
		//Same is the "LADDERS" but modified
		for (var i = 0; i < dice.length; i++) {
			var count = 0;
			for (var j = 0; j < dice.length; j++) {
				if (dice[i].value == dice[j].value) {
					count++;
					//Modified
					if (count > 4) {
						pointAdded = 50
					}
				}
			}
		}
		var playerToAddPointsTo = $(thisDiv).closest('table').find('.activePlayerForm').text();
		players[playerToAddPointsTo - 1].yatzyPoints[16] = pointAdded;
		$(thisDiv).text(pointAdded);
	} else if (x == "Ettor" || x == "Tvåor" || x == "Treor" || x == "Fyror" || x == "Femmor" || x == "Sexor") {
		addToScore(thisDiv);
	}
	return true;
}
