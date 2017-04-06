class Queries extends Base {

	// Here is all our queries to the database
	constructor() {
		super();
	}
	
	// Example how to insert data to db
	submitHighscoreToDB(name, highscore, callback) {
		this.db.newPlayers({
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
			newPlayers: `
        INSERT INTO players SET ?

      `,
			highscore: `
        select * from players ORDER BY score DESC LIMIT 10
      `
		}
	}

}
