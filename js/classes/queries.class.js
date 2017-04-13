class Queries extends Base {

	// Here is all our queries to the database
	constructor() {
		super();
	}

	// Example how to insert data to db
	submitHighscoreToDB(name, highscore, callback) {
		this.db.newHighscoreEntry({
			username: name,
			score: highscore
		}, (data) => {
			console.log('Result of the query "newPlayers"', data);
			callback();
		});
	}

	dbHighScore(callback) {
		this.db.highscore((data) => {
			callback(data);
		});
	}
	
	getMsgs(callback) {
		this.db.getChatMsgs((data) => {
			callback(data);
		});
	}
	
	addMsg(userName, message) {
		this.db.insertChatMsg([userName, message], (data) => {
			console.log('Result of the query "addMsg"', data);
		});
	}
	
	deleteMsgs() {
		this.db.deleteAllChat((data) => {
			console.log('Chat deleted', data);
		})
	}
	
	// Put players into gamesession to kepp track of active players and points
	insertPlayerIntoDB(userId, userName, active, callback) {
		this.db.newPlayer({
			id: userId,
			player: userName,
			activeStatus: active
		}, (data) => {
			console.log('inputDB', data);
			callback();
		});
	}

	// Update points in DB
	updatePlayerInDB(userId, userYatzyPoints, totalScore, callback) {

		this.db.updateYatzyFormInDB([{
			activeStatus: 0,
			aces: userYatzyPoints[0],
			twos: userYatzyPoints[1],
			threes: userYatzyPoints[2],
			fours: userYatzyPoints[3],
			fives: userYatzyPoints[4],
			sixes: userYatzyPoints[5],
			bonus: userYatzyPoints[6],
			sum: userYatzyPoints[7],
			onePair: userYatzyPoints[8],
			twoPair: userYatzyPoints[9],
			threeOfAKind: userYatzyPoints[10],
			fourOfAKind: userYatzyPoints[11],
			smallStraight: userYatzyPoints[12],
			largeStraight: userYatzyPoints[13],
			fullHouse: userYatzyPoints[14],
			chance: userYatzyPoints[15],
			yahtzee: userYatzyPoints[16],
			total: totalScore
		}, userId], (data) => {
			console.log('update', data);
			callback();
		});
	}

	// Update points in DB
	updatePlayerStatusInDB(userId, callback) {
		console.log(userId);
		this.db.updatePlayerStatus([userId], (data) => {
			console.log('update', data);
			callback();
		});
	}

	getGameSession(callback) {
		this.db.getGameSession((data) => {

			callback(data);

		});
	}

	updatePlayerStatusInDB(userId, callback) {
		console.log(userId);
		this.db.updatePlayerStatus([userId], (data) => {
			console.log('update', data);
			callback();
		});
	}

	clearGameSession(callback) {

		this.db.clearGameSession(() => {
			callback();
		});
	}

	// Insert into insert gamesstatistics
	insertGameStatistics(winner, winnerScore, averageScore, callback) {
		this.db.newGameStat({
			winner: winner,
			winnerScore: winnerScore,
			averageScore: averageScore
		}, (data) => {
			console.log('gameStat', data);
			callback();
		});
	}

	getWinnerFromDb(callback) {
		this.db.getWinnerInLastGame((data) => {
			callback(data);
		});
	}

	static get sqlQueries() {
		return {
			newHighscoreEntry: `
        INSERT INTO highscore SET ?
      `,
			highscore: `
        select * from highscore ORDER BY score DESC LIMIT 10
      `,
			newPlayer: `
				INSERT INTO gamesession SET ?
			`,
			getGameSession: `
				SELECT * FROM gamesession
			`,
			updateYatzyFormInDB: `
				UPDATE gamesession SET ? WHERE id = ?
			`,
			updatePlayerStatus: `
				UPDATE gamesession SET activeStatus = 1 WHERE id = ?
			`,
			clearGameSession: `
				DELETE FROM gamesession
			`,
			getChatMsgs: `
        SELECT * FROM chat
                `,
			insertChatMsg: `
        INSERT INTO chat (msg,userName) VALUES (?, ?)
                `,
			deleteAllChat: `
        DELETE FROM chat WHERE ID > 0
                `,
			newGameStat: `
				INSERT INTO games SET ?
			`,
			getWinnerInLastGame: `
				SELECT winner FROM games ORDER BY id DESC LIMIT 1
			`

		}
	}

}
