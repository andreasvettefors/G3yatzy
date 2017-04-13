// Yatzy online.js

var user = new Session();
var updater = 0;

$(document).on('click', '.btn-online', function () {
	var userInput = $('#fieldOnline').val();
	var userId;
	var nameExist;
	query.deleteMsgs();
	query.getGameSession((data) => {

		if (data.length < 4) {
			data.forEach(function (name) {
				if (userInput == name.player) {
					nameExist = true;
				}
			});

			if (nameExist) {
				$('#myModal9').modal('show');
				$('.popup-text').append('<p>Namnet är<br/>redan taget!<b>');
				return;
			}
			if (data.length == 0) {
				playersIntoDbWithRightId((data.length + 1), userInput, true);
			}
			// If the first player has made the first insertion in the yatzyform 
			// the game has started and more players can't join
			else if (data[0].total !== null) {
				$('#myModal9').modal('show');
				$('.popup-text').append('<p>Du får inte vara med!<br/><b>');
				return;
			}
			playersIntoDbWithRightId((data.length + 1), userInput, false);
		} else {
			/*Show the players that the game is full*/
			$('#myModal9').modal('show');
			$('.popup-text').append('<p>Fullt Spel!<br/>Försök igen senare.<b>');
			return;
		}
	});
});



function playersIntoDbWithRightId(id, inputFromUser, active) {
	user.startSession(inputFromUser, (res) => {
		user.sessionUser = res.sessionUser;
		query.insertPlayerIntoDB(id, user.sessionUser, active, () => {
			addOnlinePlayersToGame();
		});
	});
}

var chatLength = -1;
var playerNumber = 0;
var uniqueAppendID = 9000;
var uniqueAppendID2 = 4000;

function addOnlinePlayersToGame() {
	query.getGameSession((data) => {
		console.log(data);
		data.forEach(function (player) {
			console.log(player);

			players.push({
				"username": player.player,
				"yatzyPoints": [, , , , , , , , , , , , , , , , , ],
				"active": player.activeStatus,
				"score": 0
			});

		});
		localGame = false;
		startGame();
		updater = setInterval(updateGamePage, 500);

	});
}

var emptyPointCell = 0;

function updateGamePage() {

	console.log(updater);
	query.getGameSession((data) => {

		emptyPointCell = 0;
		players.forEach(function (player) {
			for (var point of player.yatzyPoints) {
				if (point == null) {
					emptyPointCell++;
				}
			}
		});

		if (emptyPointCell == 0) {
			// a bit akward solution but the interval wouldn't stop with clearInterval(updater) 
			for (var i = 1; i < 99999; i++) {
				window.clearInterval(i);
			}
			setTimeout(endOnlineGame, 500);
		}

		players = [];
		data.forEach(function (player) {
			players.push({
				"username": player.player,
				"yatzyPoints": [player.aces, player.twos, player.threes, player.fours, player.fives, player.sixes, player.bonus, player.sum, player.onePair, player.twoPair, player.threeOfAKind, player.fourOfAKind, player.smallStraight, player.largeStraight, player.fullHouse, player.chance, player.yahtzee],
				"active": player.activeStatus,
				"score": player.total
			});

		});

		buildYatzyForm();
		updateYatzyForm();
		showActivePlayers();
		seeActivePlayer();
		displayChatMsgs()
		showPlayerTurnOnSpecificComputer();
	});


}

// För att uppdatera yatzyformulär när vi ändrat något i databasen
function updateYatzyForm() {
	players.forEach(function (player, num) {
		$(`.player${[num+1]}`).each(function (index) {
			$(this).text(player.yatzyPoints[index]);
			if (index == 17) {
				if (player.score !== null) {
					$(this).text(player.score);
				}
			}
		});
	});
}

function displayChatMsgs() {
	query.getMsgs((data) => {
		if (data.length == 0) {
			return;
		}
		if (data.length > chatLength) {
			chatLength = data.length;
			players.forEach(function (e) {
				if (data[data.length - 1].userName == e.username) {
					playerNumber = (players.indexOf(e) + 1);
				}
			});

			$('.Content').append('<div class="talk-bubble play' + playerNumber + '"><div class="talktext"><p class="chatParagraph">' + data[data.length - 1].userName + ':</p><p class="chatParagraph">' + data[data.length - 1].msg + '</p></div></div>');
			$('.Content').animate({
				scrollTop: $('.Content').prop("scrollHeight")
			}, 500);
		}
	});

}

function showPlayerTurnOnSpecificComputer() {
	players.forEach(function (player) {
		if (player.active && player.username == user.sessionUser) {
			$('#activePlayers').prepend(`<h3 id="showTurn">Nu är det din tur</h3>`);
		}
	});
}

function endOnlineGame() {
	$('.popup-text').html('');
	query.getWinnerFromDb((data) => {
		$('#myModal2').modal('show');
		$('.popup-text').append(`<p>Grattis till vinsten</p>
														 <p>${data[0].winner}!</p>`);
	});
}

$(document).on('keyup', '.form-control', function (e) {
	if (e.which == 13) {
		query.addMsg(e.target.value, user.sessionUser)
		$('.form-control').val("");
	}
});

$(document).on('click', '.chatSubmit', function (e) {
	var inMsg = $('.form-control').val();
	query.addMsg(inMsg, user.sessionUser);
	$('.form-control').val("");

});
