
$(document).on('click','.btn-online',function(){
	var username = $('#fieldOnline').val();
	console.log(username);
	var u = new Session(username);
});