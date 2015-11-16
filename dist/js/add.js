$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");
	$('.selectpicker').selectpicker({
		style: 'btn-white',
	});
	var currentUser = Parse.User.current();

	if(currentUser) {
		var dropdown = document.getElementById("foundation");
		if (dropdown){
			var foundations = Parse.Object.extend("Foundation");
			var query =  new Parse.Query(foundations);
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = "<option value='" + results[i].id +"'>" + results[i].get("course") + "</option>";
						$('#foundation').append(object);
					}
					
					$('#foundation').selectpicker('refresh');

				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}
		
		var unidrop = document.getElementById("university");
		if (unidrop){
			var unis = Parse.Object.extend("University");
			var query =  new Parse.Query(unis);
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = "<option value='" + results[i].id +"'>" + results[i].get("name") + "</option>";
						$('#university').append(object);
					}
					
					$('#university').selectpicker('refresh');

				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}

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

	function addCourse() {

		//variables
		var courses = [];
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

		//LOOK AT THIS BLAIR
		//Add regex and stuff from login and repeat 
		//for the other add functionalities.
		//Thank you.
		//
		//
		//
		if(courseNumber =='' || foundationCourse == '' || universityName == ''){
			alert("You must enter in fields");
		}else {

		var Courses = Parse.Object.extend("Courses");
		var courses = new Courses();

		courses.set("course", courseNumber);
		courses.set("universityName", universityName);
		courses.set("university", uni);
	    courses.set("courseEquivalent", foundationCourse);
	    courses.set("equivalency", foundation);
		courses.set("notes", notes);
		
			courses.save(null, {
	  		success: function(courses) {
	    		// Execute any logic that should take place after the object is saved.
	    		alert('New object created with objectId: ' + courses.id);
	  		},
	  		error: function(courses, error) {
	    		// Execute any logic that should take place if the save fails.
	    		// error is a Parse.Error with an error code and message.
	    		alert('Failed to create new Course, with error code: ' + error.message);
	  		}
		});
		}

	}

	function addUniversity() {

		var Uni = Parse.Object.extend("University");
		var uni = new Uni();
		uni.id = $('#newUniversity').val();
		
		var universityName = $('#newUniversity').val();

		var University = Parse.Object.extend("University");
		var university = new University();
		university.set("name", universityName);
		university.save(null, {
			success: function(university) {
				alert('New University added: ' + universityName);
				uni.id = university;
			},
			error: function(university, error) {
				alert('Failed to create new University, with error code: ' + error.message);
			}
		});
	}

	function addFoundation() {

		var Foundation = Parse.Object.extend("Foundation");
		var foundation = new Foundation();
		foundation.id = $('#newFoundation').val();
		
		var foundationCourse = $('#newFoundation').val();

		var Foundation = Parse.Object.extend("Foundation");
		var foundation = new Foundation();
		foundation.set("course", foundationCourse);
		foundation.save(null, {
			success: function(foundation) {
				alert('New Foundation Course added: ' + foundationCourse);
				foundation.id = foundation;
			},
			error: function(foundation, error) {
				alert('Failed to create new Foundation Course, with error code: ' + error.message);
			}
		});
	}


	


// function checkDup(foundationCourse, universityName, courseNumber) {
// 	var count = 0;
// 	var query = new Parse.Query("Courses");
// 	query.equalTo("course", courseNumber);
// 		query.find({
//   			success: function(results) {
//     		// Do something with the returned Parse.Object values
//     		alert("Checking Duplicates");
//     			for (var i = 0; i < results.length; i++) {
//     				var object = results[i];
//       				var uName = object.get('universityName');
//       				var fCourse = object.get('courseEquivalent');
//       				if((uName == universityName) && (fCourse == foundationCourse)){
//       					count++;
// 					}		
//     			}

//   			},
//   			error: function(error) {
//     		alert("Error: " + error.code + " " + error.message);
//   			}
// 		});
//     			if (count > 0){
//     				return false;
//     			}else{
//     				return true;
//     			}
// }	
	
	
	
	
	//check duplicates
	
	//var duplicate = checkDup(foundationCourse, universityName, courseNumber, courses);
	//if(duplicate == 1){
	//	alert("duplicate found - return");
	//	return;
	//}	

// 	Parse.Cloud.beforeSave("Courses", function(request, response) {
//     if (!request.object.isNew()) {
//       // Let existing object updates go through
//       response.success();
//     }
//     var query = new Parse.Query(Courses);
//     // Add query filters to check for uniqueness
//     query.equalTo("course", courseNumber);
//     query.first().then(function(existingObject) {
//       if (existingObject) {
//         // Update existing object
//         // existingObject.set("score", request.object.get("score")); Can update previous entry if needed
//         return existingObject.save();
//       } else {
//         // Pass a flag that this is not an existing object
//         return Parse.Promise.as(false);
//       }
//     }).then(function(existingObject) {
//       if (existingObject) {
//         // Existing object, stop initial save
//         response.error("Existing object");
//       } else {
//         // New object, let the save go through
//         response.success();
//       }
//     }, function (error) {
//       response.error("Error performing checks or saves.");
//     });
// });
	

	



