$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");
	// $('.selectpicker').selectpicker({
	// 	style: 'btn-info',
	// });


	$('#login').click(function(){
		var username = $('#username').val();
		var password = $('#password').val();
		Parse.User.logIn(username, password, {
			success: function(user) {
				window.location.href = "index_advisor.html";
			},
			error: function(user, error) {
				//failed logIn
				alert("You entered in a wrong username or password");
			}
		});
	});
});
