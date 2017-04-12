// Yatzy main.js

// Global variables

// Use query to talk with the database
var query = new Queries();
var localGame = true;
var throws = 0;
var gameIsDone = false;
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

// Just to be domready before we do something
$(initiatePage);

function initiatePage() {
	$('body').append(startPage());
	$('#gamePage').hide();
	$('#aboutus').hide();
	$('#confirmEnd').hide();
	printHighScoreToDom();
}

function startGame() {
	$('#home').hide();
	$('#about').hide();
	buildYatzyForm();
	$('#gamePage').show();
	if (localGame) {
		$('#showOnBigScreens').remove();
		$('#showOnSmallScreens').remove();
	}
	showActivePlayers();
	seeActivePlayer();
	$("#brand").addClass("confirmEnd");
	$("#brand").removeAttr("href").css("cursor", "pointer");
}

function newRound() {
	for (var i = 0; i < dice.length; i++) {
		dice[i].saved = false;
	}
	throws = 0;
	var nextIndex = 0;
	players.forEach(function (player, index) {
		if (player.active && index == players.length - 1) {
			nextIndex = 0;
			player.active = false;
		} else if (player.active && players.length > 1) {
			nextIndex = index + 1;
			player.active = false;
		} else {

		}
	});

	if (localGame) {
		players[nextIndex].active = true;
		seeActivePlayer();
		$('#diceHolder img').remove();
	} else {
		query.updatePlayerStatusInDB(nextIndex + 1, () => {
			players[nextIndex].active = true;
			$('#diceHolder img').remove();
		});
	}
}

function addPlayersToGame() {
	players = [];
	$('.input').each(function (index) {
		if (index === 0) {
			players.push({
				"username": $(this).val(),
				"yatzyPoints": [, , , , , , , , , , , , , , , , , ],
				"active": true,
				"score": 0
			});
		} else {
			players.push({
				"username": $(this).val(),
				"yatzyPoints": [, , , , , , , , , , , , , , , , , ],
				"active": false,
				"score": 0
			});
		}
	});
}

//Shows yatzyform in Dom with right amount of players
function buildYatzyForm() {
	$("#scoretabel").html('');
	var tableRow;
	var tableData;
	var count = 0;
	yatzyForm.forEach(function (outPrint, index) {
		tableRow = $(`<tr></tr>`);
		if (index == 0) {
			tableData = $(`<th class="greyField">${outPrint}</th>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<th id="player${index + 1}" class = "text-center greyField">${index + 1}</th>`));
			});
		} else if (index < 7 && index > 0) {
			tableData = $(`<td class="possClass" id="${index}">${outPrint}</td>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<td class="player${index + 1} customTd"></td>`));
				count++;
			});
		} else if (index == 7 || index == 8 || index == 18) {
			tableData = $(`<td class="greyField possClass"><strong>${outPrint}</strong></td>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<td class="player${index + 1} greyField"></td>`));
			});
		} else {
			tableData = $(`<td class="possClass">${outPrint}</td>`);
			tableRow.append(tableData);
			players.forEach(function (player, index) {
				tableRow.append($(`<td class="player${index + 1} customTd"></td>`));
			});
		}
		$("#scoretabel").append(tableRow);

	});
}

function showActivePlayers() {
	$('#activePlayers').html('');
	var unorderedList = $(`<ul class="activePlayersList"></ul>`);
	players.forEach(function (player, index) {
		var playerItem = $(`<li class="playerList" id="p${index}">Spelare ${index + 1} - ${player.username}</li>`);
		unorderedList.append(playerItem);
	});

	$('#activePlayers').append(unorderedList);
}

function seeActivePlayer() {

	players.forEach(function (player, index) {

		if (player.active) {
			$(`#p${index}`).addClass('activePlayer');
			$(`#player${index +1}`).addClass('activePlayerForm');
			if (!localGame) {
				if (player.username == user.sessionUser) {
					$(`.player${index +1}`).addClass('activeCell');
				}
			} else {
				$(`.player${index +1}`).addClass('activeCell');
			}
		} else {
			$(`#p${index}`).removeClass('activePlayer');
			$(`#player${index +1}`).removeClass('activePlayerForm');
			$(`.player${index +1}`).removeClass('activeCell');
		}
	});
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
		$('#numberOfRollsContainer').empty().append('<p>Kast <strong class="strongForThrows">' + throws + '</strong> av 3</p>');
		appendDiceToDom();
	}
}

function appendDiceToDom() {
	$('#diceHolder img').remove();
	dice.forEach(function (die) {
		if (die.saved === false) {
			if (die.value === 1) {
				$('#diceHolder').append(`<img class="notactive" src="img/dice-1.png">`);
			} else if (die.value === 2) {
				$('#diceHolder').append(`<img class="notactive" src="img/dice-2.png">`);
			} else if (die.value === 3) {
				$('#diceHolder').append(`<img class="notactive" src="img/dice-3.png">`);
			} else if (die.value === 4) {
				$('#diceHolder').append(`<img class="notactive" src="img/dice-4.png">`);
			} else if (die.value === 5) {
				$('#diceHolder').append(`<img class="notactive" src="img/dice-5.png">`);
			} else if (die.value === 6) {
				$('#diceHolder').append(`<img class="notactive" src="img/dice-6.png">`);
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

function holdDice() {
	$('#diceHolder img').each(function (index) {
		if ($(this).attr('class') == 'active') {
			dice[index].saved = true;
		} else {
			dice[index].saved = false;
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
		})
	});
}

function submitPlayer(textValue, sumValue) {
	query.submitHighscoreToDB(textValue, sumValue, () => {

	});
}

function endGame() {
	var playerIndex = findPlayerIndexOfWinner();
	var winner = players[playerIndex].username;
	var winnerScore = players[playerIndex].score;
	var averageScore = calculateAverageScore();

	for (var i = 0; i < players.length; i++) {
		submitPlayer(players[i].username, players[i].score);
	}
	if (localGame) {
		$('#myModal2').modal('show');
		$('.popup-text').append('<p>Grattis till vinsten <br/><b>' + winner + '</b>!<br/>Du har <b>vunnit</b>. Hurraaa!!</p>');
	} else {
		query.insertGameStatistics(winner, winnerScore, averageScore, () => {
			query.clearGameSession(() => {});
		});
	}
}

function findPlayerIndexOfWinner() {
	var highestScore = 0;
	var winner;
	var playerIndex;
	players.forEach(function (player, index) {
		if (player.score > highestScore) {
			highestScore = player.score;
			winner = player.username;
			playerIndex = index
		}
	});
	console.log("Vinnaren är: ", winner, "Totalpoäng: ", highestScore);
	return playerIndex;
}

function calculateAverageScore() {
	var totalPlayersScore = 0;
	var averageScore = 0;
	players.forEach(function (player) {
		totalPlayersScore += player.score;
	});

	console.log('totalPlayersScore', totalPlayersScore);

	averageScore = totalPlayersScore / (players.length);
	console.log('averageScore', averageScore);
	return averageScore;
}

// Adds inputfield if you want to bee more than one player locally
function addField() {
	$('.addField').remove();
	var newField = $('.input-append').append('<div class="field"><input autocomplete="off" class="input inputControl" id="field1" type="text" maxlength="15"><span class="glyphicon glyphicon-plus-sign addField" aria-hidden="true"></span><span class="glyphicon glyphicon-remove-sign removeField" aria-hidden="true"></span></div>');
}
// Events
var clicks = 0;

// Event that adds a new input field
$(document).on('click', '.addField', function () {

	if ($(this).parent().find('input').val() != "") {
		addField();
	} else {
		$('.addField').attr('data-toggle', 'tooltip');
		$('.addField').attr('data-trigger', 'manual');
		$('.addField').attr('data-placement', 'auto');
		$('.addField').attr('title', 'Det där användarnamnet är alldelles för coolt! \n Tyvärr måste du namnge dig själv.');
		$('.addField').tooltip('show');
		setTimeout(function () {
			$('.addField').tooltip('hide');
			$(".addField").removeAttr("title");
		}, 3000);
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

$(document).on('keyup', '#field1', function (e) {
	console.log(e.target.value)
	if (e.which == 13) {
		$('.btn-info').trigger('click')
	}

	if (e.target.value.length == 15) {
		$('#field1').attr('data-toggle', 'tooltip');
		$('#field1').attr('data-trigger', 'manual');
		$('#field1').attr('data-placement', 'auto');
		$('#field1').attr('title', 'Det där användarnamnet är alldelles för coolt! \n Håll dig till 15 tecken.');
		$('#field1').tooltip('show');
		setTimeout(function () {
			$('#field1').tooltip('hide');
			$("#field1").removeAttr("title");
		}, 3000);
	}
});

$(document).on('click', '.btn-info', function () {
	var flag = false;
	$('.input').each(function (index) {
		if ($(this).val() != '') {
			flag = true;
		}
		/*else {
			flag = false;
            console.log('hej');
            $('.field').append('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">Fälten får inte vara tomma</a></div>');
		}*/
	});
	if (flag) {
		addPlayersToGame();
		localGame = true;
		startGame();

	} else {
		$('.addField').attr('data-toggle', 'tooltip');
		$('.addField').attr('data-trigger', 'manual');
		$('.addField').attr('data-placement', 'auto');
		$('.addField').attr('title', 'Det där användarnamnet är alldeles för coolt! \n Tyvärr måste du namnge dig själv.');
		$('.addField').tooltip('show');
		setTimeout(function () {
			$('.addField').tooltip('hide');
			$(".addField").removeAttr("title");
			$(".addField").removeAttr("title");
		}, 5000);
		return;
	}
});



$(document).on('click', '#diceHolder img', function () {
	$(this).toggleClass('active');
	$(this).removeClass('notactive');
	holdDice();

});

$(document).on('click', '#diceTable #throwDice', function () {
	if (localGame) {
		rollDie();
	} else {
		players.forEach(function (player) {
			if (player.active == true && player.username == user.sessionUser) {
				rollDie();
			}
		});
	}


});

$(document).on('click', '#about', function () {
	$('#home').hide();
	$('#aboutus').show();
});
$(document).on('click', '.confirmEnd', function () {
	$('#confirmEnd').modal('show');
});

$(document).on('click', '#winnerTemplateModalClose', function () {
	location.reload();
});

$(document).on('click', '.customTd', function () {

	if (!localGame) {


		players.forEach(function (player) {
			if (player.active !== true && player.username !== user.sessionUser) {
				return;
			}
		});
	}

	if (!gameIsDone) {
		var tdThatCanBeUsed;
		players.forEach(function (player, index) {
			if (player.active) {
				tdThatCanBeUsed = index + 1;
			}
		});
	}

	if ($(this).attr('class').indexOf(`player${tdThatCanBeUsed}`) > -1) {

		if ($(this).text() == '' && throws >= 1) {

			var sucess = addToScoreAdvanced(this);
			totalCalc();

			var count = 0;

			for (var i = 0; i < players[tdThatCanBeUsed - 1].yatzyPoints.length; i++) {
				if (i == 6 || i == 7 || i == 17) {
					continue;
				}
				if (typeof players[tdThatCanBeUsed - 1].yatzyPoints[i] == 'undefined' || players[tdThatCanBeUsed - 1].yatzyPoints[i] == null) {

				} else {
					count++
				}
			}

			if (count == 15) {
				if (players[players.length - 1].active == true) {
					endGame();
					gameIsDone = true;
				} else {}
			}

			if (sucess) {
				if (localGame) {
					newRound();
					$('.alert').remove();
					$('tr:nth-child(10)').tooltip('hide');
				} else {
					query.updatePlayerInDB((tdThatCanBeUsed), players[tdThatCanBeUsed - 1].yatzyPoints, players[tdThatCanBeUsed - 1].score, () => {
						newRound();
						$('.alert').remove();
						$('tr:nth-child(10)').tooltip('hide');
					});
				}
			} else {
				$('tr:nth-child(10)').attr('data-toggle', 'tooltip');
				$('tr:nth-child(10)').attr('data-trigger', 'manual');
				$('tr:nth-child(10)').attr('data-placement', 'auto');
				$('tr:nth-child(10)').attr('title', 'Var god och välj ett par!');
				$('tr:nth-child(10)').tooltip('show');
			}
		}
	}
});
