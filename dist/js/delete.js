$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");
	$('.selectpicker').selectpicker({
		style: 'btn-white',
	});
	var currentUser = Parse.User.current();

	if(currentUser) {
		var dropdown = document.getElementById("foundation");
		var foundationlist = document.getElementById("foundationdrop");
		if (dropdown && foundationlist){
			var foundations = Parse.Object.extend("Foundation");
			var query =  new Parse.Query(foundations);
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = "<option value='" + results[i].id +"'>" + results[i].get("course") + "</option>";
						$('#foundation').append(object);
						$('#foundationdrop').append(object);
					}
					
					$('#foundation').selectpicker('refresh');
					$('#foundationdrop').selectpicker('refresh');

				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}
		
		var universitydrop = document.getElementById("university");
		var universitydroplist = document.getElementById("universitydrop");
		if (universitydrop && universitydroplist){
			var unis = Parse.Object.extend("University");
			var query =  new Parse.Query(unis);
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = "<option value='" + results[i].id +"'>" + results[i].get("name") + "</option>";
						$('#university').append(object);
						$('#universitydrop').append(object);
					}
					
					$('#university').selectpicker('refresh');
					$('#universitydrop').selectpicker('refresh');

				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}

		$('#university').on('change', function(){
			var classlist = document.getElementById("courses");
			if (classlist){
				
				$('#courses').empty();
				var Courses = Parse.Object.extend("Courses");

				var University = Parse.Object.extend("University");
				var uniCourse = new University();
				uniCourse.id = $('#university :selected').val();
				var query = new Parse.Query(Courses);

				query.equalTo("university", uniCourse);

				query.find({
					success: function(results) {
						for( var i = 0; i <results.length; i++) {
							var object = "<option value='" + results[i].id +"'>" + results[i].get('course') + "</option>";
							$('#courses').append(object);
						}

						$('#courses').selectpicker('refresh');
					},
					error: function(error) {
						alert("Error: " + error.code + " " + error.message);
					}
				});
			}
		});
		$('#logout').click(function(){
			console.log("Performing Logout");

			if(Parse.User.current()){
				console.log("Sucessfully logged out");
				Parse.User.logOut();

				if(Parse.User.current())
					console.log("Failed to logout");
			}
			window.location.href= "index_student.html";
		});
	}else{
		alert("You must be logged in to view this page");
		window.location.href="login.html";

	}

});

	function deleteCourse() {

		//variables
		
		var myCourses='';
		
		var foundationCourse = $('#foundation :selected').text();

		var Foundation = Parse.Object.extend("Foundation");
		var foundation = new Foundation();
		foundation.id = $('#foundation :selected').val();

		var universityName = $('#university :selected').text();

		var Uni = Parse.Object.extend("University");
		var uni = new Uni();
		uni.id = $('#university :selected').val();

		var courseNumber = $('#course_number').val();
		
		var notes = $('#notes').val();

		var Courses = Parse.Object.extend("Courses");
		var courses = new Courses();
		
		//delete equivalency
		var uniID = $('#university :selected').text();
		var foundationID = $('#foundation :selected').text();
		var classID = $('#courses :selected').text();

		var Courses = Parse.Object.extend("Courses");

		var query = new Parse.Query(Courses);
		query.equalTo("universityName", uniID);
		query.equalTo("course", classID);
		query.equalTo("courseEquivalent", foundationID);
		query.find({
				success: function(results) {
					//results[0].destroy({});
					Parse.Object.destroyAll(results);
					if(alert("Successfully deleted Equivalency.")){}
					else window.location.reload();
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
		});
	}

	function deleteUniversity() {

		var Uni = Parse.Object.extend("University");
		var uni = new Uni();
		uni.id = $('#universitydrop').val();
		
		var universityName = $('#universitydrop :selected').val();
		//this picks up the ID

		//delete from University class
		var University = Parse.Object.extend("University");
		var university = new University();
		
		var query = new Parse.Query(University);
		query.get(universityName, {
	  		success: function(myObj) {
	    		// The object was retrieved successfully.
	    		myObj.destroy({});
	  		},
	  		error: function(object, error) {
	    		// The object was not retrieved successfully.
	    		// error is a Parse.Error with an error code and description.
	  		}
		});
		
		//delete from Courses class
		var uniID = $('#universitydrop :selected').text();

		var Courses = Parse.Object.extend("Courses");

		var query = new Parse.Query(Courses);
		query.equalTo("universityName", uniID);
		query.find({
				success: function(results) {
					Parse.Object.destroyAll(results);
					if(alert("Successfully deleted University.")){}
					else window.location.reload();
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
		});

	}


	function deleteFoundation() {

		var Foundation = Parse.Object.extend("Foundation");
		var foundation = new Foundation();
		foundation.id = $('#foundationdrop').val();
		
		var foundationCourse = $('#foundationdrop :selected').val();

		var Foundation = Parse.Object.extend("Foundation");
		var foundation = new Foundation();

		var query = new Parse.Query(Foundation);
		query.get(foundationCourse, {
	  		success: function(myObj) {
	    		// The object was retrieved successfully.
	    		myObj.destroy({});
	  		},
	  		error: function(object, error) {
	    		// The object was not retrieved successfully.
	    		// error is a Parse.Error with an error code and description.
	  		}
		});
		
		//delete from Courses class
		var foundationID = $('#foundationdrop :selected').text();

		var Courses = Parse.Object.extend("Courses");

		var query = new Parse.Query(Courses);
		query.equalTo("courseEquivalent", foundationID);
		query.find({
				success: function(results) {
					Parse.Object.destroyAll(results);
					if(alert("Successfully deleted Foundation Course.")){}
					else window.location.reload();
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
		});	
	}
