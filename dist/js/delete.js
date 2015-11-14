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
	


}

function deleteUniversity() {

	var Uni = Parse.Object.extend("University");
	var uni = new Uni();
	uni.id = $('#universitydrop').val();
	
	var universityName = $('#universitydrop :selected').val();

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

}

function deleteFoundation() {

	var Foundation = Parse.Object.extend("Foundation");
	var foundation = new Foundation();
	foundation.id = $('#foundationdrop').val();
	
	var foundationCourse = $('#foundationdrop :selected').val();

	var Foundation = Parse.Object.extend("Foundation");
	var foundation = new Foundation();

///new part

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
}


//	foundationCourse.destroy({
//		success: function(foundationCourse) {
//			alert('Foundation Course deleted: ' + foundationCourse);
//		},
//		error: function(foundation, error) {
//			alert('Error');
//		}
//	});


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
