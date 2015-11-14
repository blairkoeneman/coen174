$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");
	$('.selectpicker').selectpicker({
		style: 'btn-white',
	});

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
					alert("Successfully retrieved " + results.length + " courses.");

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


});

function deleteCourse() {

	//variables
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

	courses.set("course", courseNumber);
	courses.set("universityName", universityName);
	courses.set("university", uni);
    courses.set("courseEquivalent", foundationCourse);
    courses.set("equivalency", foundation);
	
		courses.destroy({
  		success: function(courses) {
    		// Execute any logic that should take place after the object is saved.
    		alert('New object created with objectId: ' + courses.id);
  		},
  		error: function(courses, error) {
    		// Execute any logic that should take place if the save fails.
    		// error is a Parse.Error with an error code and message.
    		alert('Failed to create new object, with error code: ' + error.message);
  		}
	});

}

function deleteUniversity() {

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
			alert(uni);
		},
		error: function(university, error) {
			alert('Error');
		}
	});
}

function deleteFoundation() {

	var Foundation = Parse.Object.extend("Foundation");
	var foundation = new Foundation();
	foundation.id = $('#newFoundation').val();
	
	var foundationCourse = $('#newFoundation').val();

	var Foundation = Parse.Object.extend("Foundation");
	var foundation = new Foundation();
	foundation.set("course", foundationCourse);
	foundation.destroy(foundation, {
		success: function(foundation) {
			alert('New Foundation Course added: ' + foundationCourse);
			foundation.id = foundation;
			alert(foundation);
		},
		error: function(foundation, error) {
			alert('Error');
		}
	});
}

// //////
// myObject.destroy({
//   success: function(myObject) {
//     // The object was deleted from the Parse Cloud.
//   },
//   error: function(myObject, error) {
//     // The delete failed.
//     // error is a Parse.Error with an error code and message.
//   }
// });
