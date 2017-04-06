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

	// Hämtar "all" från sqlQueries och returnerar data
	runAQuery(callback) {
		this.db.all((data) => {
			callback(data);
		});
	}

	dbHighScore(callback) {
		this.db.highscore((data) => {
			callback(data);
		});
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

	getGameSession(callback) {
		this.db.getGameSession((data) => {

			callback(data);

		});
	}

	static get sqlQueries() {
		//
		// Please note: This part of the class is read by
		// the Node server on start so you can not build
		// queries dynamically here.
		//
		// But you can use ? as placeholders for parameters.
		//
		return {
			all: `
        select * from players
      `,
			newHighscoreEntry: `
        INSERT INTO players SET ?

      `,
			highscore: `
        select * from players ORDER BY score DESC LIMIT 10
      `,
			newPlayer: `
				INSERT INTO gamesession SET ?
			`,
			getGameSession: `
				SELECT * FROM gamesession
			`,
			updateYatzyFormInDB: `
				UPDATE gamesession SET ? WHERE id = ?
			`
		}
	}

}
