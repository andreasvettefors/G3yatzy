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

				// If the first player has made the first insertion in the yatzyform 
				// the game has started and more players can't join
				if (data[0].total !== null) {
					alert('Du får inte vara med');
					return;
				}

				playersIntoDbWithRightId((data.length + 1), userInput, false);
			}
		} else {
			/*Show the players that the game is full*/
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

function displayChatMsgs() {
    $("p").remove(".test1213");
		query.getMsgs((data) => {
			data.forEach(function(e){
                $('#gamePage').append('<p class="test1213">'+e.userName+':'+e.msg+'</p>')
            })
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
		localGame = false;
		startGame();
		updater = setInterval(updateGamePage, 500);

	});
}

var sizeBeforeUpdate = 0;
var sizeAfterUpdate = 0;

var emptyPointCell = 0;

function updateGamePage() {
	//sizeAfterUpdate = 0;


	query.getGameSession((data) => {
		/*console.log('check size 2');
		data.forEach(function (player) {
			for (cellData in player) {
				if (player[cellData] !== null) {
					sizeAfterUpdate++;
				}
			}
		});*/
		/*if (sizeAfterUpdate > sizeBeforeUpdate) {*/
		//sizeBeforeUpdate = sizeAfterUpdate;

		emptyPointCell = 0;
		players.forEach(function (player) {
			for (var point of player.yatzyPoints) {
				if (point == null) {
					emptyPointCell++;
				}
			}
		});

		if (emptyPointCell == 0) {
			endOnlineGame();
	
		}

		console.log(emptyPointCell);


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
		/*}*/
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

$(document).on('keyup','#chatMsg', function (e){
    console.log(e.target.value)
    if(e.which==13){
        query.addMsg(e.target.value,user.sessionUser)
    }

});

function endOnlineGame(){
			console.log('Slut på spelet');
			eraseDataFromGameSession();
			var playerIndex = findPlayerIndexOfWinner();

			for (var i = 0; i < players.length; i++) {
				submitPlayer(players[i].username, players[i].score);
			}

			$('#myModal2').modal('show');
			$('.popup-text').append('<p>Grattis till vinsten <br/><b>' + players[playerIndex].username + '!');
			clearInterval(updater);
}

function eraseDataFromGameSession() {

	query.clearGameSession(() => {

	});
}

