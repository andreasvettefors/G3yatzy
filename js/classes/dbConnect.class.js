class dbConnect extends Base {
	
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
  }
	
	 // Example how to insert data to db
  runAThirdQuery(callback){
    this.db.newStudent({
        firstName:'Anna',
        lastName:'Andersson',
        course:5
      },(data)=>{
      console.log('Result of the query "newStudent"',data);
			callback();
    });
  }*/
  
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
        select * from students 
      `,
      newStudent: `
        INSERT INTO students SET ?
      `
    }
  }

}