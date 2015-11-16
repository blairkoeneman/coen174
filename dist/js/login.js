$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");

	$('#login').click(function(){
		var username = $('#username').val();
		var password = $('#password').val();
        
		if(username =='' || /^[0-9a-zA-Z ]+$/.test(username)==0){
			alert("Please enter a valid Username.");
		}
		//else if(password == ''){
        else if (password == ' ' || /^[0-9a-zA-Z ]+$/.test(password)==0) {
			alert("Please enter a valid Password.");
		}
		else {
		
			Parse.User.logIn(username, password, {
				success: function(user) {
					window.location.href = "index_advisor.html";
				},
				error: function(user, error) {
					//failed logIn
					alert("You entered in a wrong username or password");
				}
			});
		}
	});
});
