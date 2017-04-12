class Session extends Base {

	// Here is all our queries to the database
	constructor() {
		super();
		var sessionUser;
	}

	startSession(sessionUser, callback) {
		sessionUser = sessionUser ||  false;
		var data = sessionUser ? {
			sessionUser: sessionUser
		} :  {};
		$.ajax({
			url: '/api/sessionuser',
			type: "POST",
			dataType: "json",
			// don't process the request body
			processData: false,
			// and tell Node that it is raw json
			headers: {
				"Content-Type": "application/json"
			},
			// the request body
			data: JSON.stringify(data),
			// callback functions
			success: callback,
			error: function (error) {
				callback({
					_error: error.responseJSON
				});
			}
		});
	}
}
