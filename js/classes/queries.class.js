class Queries extends Base {
	
// Here is all our queries to the database
  constructor(){
    super();
  }

	/*Eaxmple how to work with db will be deleted when we have our real functions*/
	 // Example how to retrieve data from db
  /*runAQuery(callback){
    this.db.all((data)=>{
      console.log('Result of the query "all"',data);
			callback();
    });
  }*/
	
	 // Example how to insert data to db
  submitHighscoreToDB(name, highscore, callback){
    this.db.newPlayers({
        username: name,
        score: highscore
      },(data)=>{
      console.log('Result of the query "newPlayers"',data);
      callback();
    });
  }
    
    // Hämtar "all" från sqlQueries och returnerar data
    runAQuery(callback){
    this.db.all((data)=>{
			callback(data);
    });
  }
  
  static get sqlQueries(){
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

      `
    }
  }

}