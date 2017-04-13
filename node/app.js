class App {

  constructor(){
    this.requireModules();
    this.createWebServer();
  }

  requireModules(){

    // Express is a npm module that creates web servers
    this.express = require('express');
    this.bodyParser = require('body-parser');
		this.session = require('express-session');
    
    // Path is a built in Node module for handling file paths
    this.path = require('path');
  
  }

  createWebServer(){

    // Create a web server
    var server = this.express();
    server.use(this.bodyParser.json());
		server.use(this.session({ secret: 'keyboard cat', cookie: { maxAge: 0 }}));


    // A loader for clientside static sqlQueries
    new (require('./sql-queries.class.js'))(server);
		
		  // keep track of a user
    server.post(
      '/api/sessionuser/',(req,res)=>{
        var result = {};
        console.log('req.session.sessionUser', req.session.sessionUser);
        console.log('req.body', req.body);
        if(!req.session.sessionUser && req.body.sessionUser){
          req.session.sessionUser = req.body.sessionUser;
        }
        req.session.sessionUser && (result.sessionUser = req.session.sessionUser || false);
        res.json(result);
      }
    );

    // Calculate the path to our root folder for client content (our parent folder)
    var basePath = this.path.normalize('../'.split('/').join(this.path.sep));

    // Prevent visitors from seeing content in the node folder
    server.all('/node/*',function(req,res){ res.statusCode = 404; res.end(); })


    // Tell the web server to server files from the root folder 
    server.use(this.express.static(basePath));

    // Start the web server at port 3000
     server.listen(3000,function(){
      console.log("Express Server listening on port 3000");
    });

  }

}

// Create our app
new App();
