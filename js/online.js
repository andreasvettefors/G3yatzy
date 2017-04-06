var user = new Session();
var updater;

$(document).on('click', '.btn-online', function () {
	var userInput = $('#fieldOnline').val();
	var userId;

	query.getGameSession((data) => {
		if (data.length < 4) {
			if (data.length == 0) {
				playersIntoDbWithRightId((data.length + 1), userInput, true);
			} else {
				playersIntoDbWithRightId((data.length + 1), userInput, false);
			}
		} else {
			/*Show the player that the game is full*/
			alert('fullt spel');
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
		startGame();
		updater = setInterval(updateGamePage, 1000);

	});
}

var check;
function updateGamePage() {
	players = [];
	query.getGameSession((data) => {
		data.forEach(function (player) {
			players.push({
				"username": player.player,
				"yatzyPoints": [player.aces, player.twos, player.threes, player.fours, player.fives, player.sixes,player.bonus ,player.sum ,player.onePair ,player.twoPair ,player.threeOfAKind ,player.fourOfAKind ,player.smallStraight ,player.largeStraight ,player.fullHouse,player.chance ,player.yahtzee],
				"active": player.activeStatus,
				"score": player.total
			});
			buildYatzyForm();
			updateYatzyForm();
			showActivePlayers();
			seeActivePlayer();
		});

	});
}


// För att uppdatera yatzyformulär när vi ändrat något i databasen
function updateYatzyForm() {
	players.forEach(function (player,num) {
		$(`.player${[num+1]}`).each(function (index) {
			$(this).text(player.yatzyPoints[index]);
		});
	});

}
