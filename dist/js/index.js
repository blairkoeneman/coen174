$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");
	$('.selectpicker').selectpicker({
		style: 'btn-grey',
	});

// function toggleSelectAll(control) {
//     var allOptionIsSelected = (control.val() || []).indexOf("All") > -1;
//     function valuesOf(elements) {
//         return $.map(elements, function(element) {
//             return element.value;
//         });
//     }

//     if (control.data('allOptionIsSelected') != allOptionIsSelected) {
//         // User clicked 'All' option
//         if (allOptionIsSelected) {
//             // Can't use .selectpicker('selectAll') because multiple "change" events will be triggered
//             control.selectpicker('val', valuesOf(control.find('option')));
//         } else {
//             control.selectpicker('val', []);
//         }
//     } else {
//         // User clicked other option
//         if (allOptionIsSelected && control.val().length != control.find('option').length) {
//             // All options were selected, user deselected one option
//             // => unselect 'All' option
//             control.selectpicker('val', valuesOf(control.find('option:selected[value!=All]')));
//             allOptionIsSelected = false;
//         } else if (!allOptionIsSelected && control.val().length == control.find('option').length - 1) {
//             // Not all options were selected, user selected all options except 'All' option
//             // => select 'All' option too
//             control.selectpicker('val', valuesOf(control.find('option')));
//             allOptionIsSelected = true;
//         }
//     }
//     control.data('allOptionIsSelected', allOptionIsSelected);
// }
	// $('#foundation').selectpicker().change(function(){toggleSelectAll($(this));}).trigger('change');

	var scuclasses = document.getElementById("foundation");
	var dropdown = document.getElementById("university");
	var duplicate = document.getElementById("uniduplicate");
	if(scuclasses){
		var foundation = Parse.Object.extend("Foundation");
		var query = new Parse.Query(foundation);
		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					var object = "<option value='" + results[i].id +"'>" + results[i].get('course') + "</option";
					$('#foundation').append(object);
				}
				$('#foundation').selectpicker('refresh');
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	if (dropdown && duplicate){
		var university = Parse.Object.extend("University");
		var query =  new Parse.Query(university);
		query.find({
			success: function(results) {
				alert("Successfully retrieved " + results.length + " universities.");

				for (var i = 0; i < results.length; i++) {

					var object = "<option value='" + results[i].id +"'>" + results[i].get('name') + "</option>";
					$('#university').append(object);
					$('#uniduplicate').append(object);
				}
				
				$('#university').selectpicker('refresh');
				$('#uniduplicate').selectpicker('refresh');

			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}

	$('#uniduplicate').on('change', function(){
		var classlist = document.getElementById("courses");
		if (classlist){
			
			$('#courses').empty();
			var Courses = Parse.Object.extend("Courses");

			var University = Parse.Object.extend("University");
			var uniCourse = new University();
			uniCourse.id = $('#uniduplicate :selected').val();
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

	$('#coursesearch').click(function(){
		$('#table-catalog tbody').remove();
		//String to hold table entries
		var myCourses='';
		//holds the select menu value
		var selected = $('#foundation :selected').val();
		var coursename = $('#foundation :selected').text();
		var universityname = $('#university :selected').text();
		var Courses = Parse.Object.extend("Courses");

		//Need to make universitySelect a Parse Object of "University"

		var University = Parse.Object.extend("University");
		var universitySelect = new University();
		universitySelect.id = $('#university :selected').val();
		if( selected == 'All' && universitySelect.id == 'None'){
			var query = new Parse.Query(Courses);
			// query.equalTo("university", universitySelect);
			// query.equalTo("courseEquivalent", selected);
			query.find({
				success: function(results) {
					alert("Successfully retrieved " + results.length + "equivalent courses.");
					for(var i = 0; i < results.length; i++) {
						var object = results[i];
						myCourses+='<tr><td>' + object.get('courseEquivalent') + '</td><td>' + object.get('course') +'</td><td>' + object.get('notes') + '</td></tr>';
					}
					(function($) {
						$('#table-catalog').append(myCourses);
					})(jQuery);
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

		}else if (selected != 'All' && universitySelect.id == 'None'){
			var query = new Parse.Query(Courses);
			query.equalTo("courseEquivalent", coursename);
			query.find({
				success: function(results) {
					for(var i = 0; i < results.length; i++) {
						var object = results[i];
						myCourses += '<tr><td>' + object.get('courseEquivalent') + '</td><td>' + object.get('course') +'</td><td>' + object.get('notes') + '</td></tr>';
						}
						(function($) {
						$('#table-catalog').append(myCourses);
					})(jQuery);

					},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
					}

				});
		}else if (selected == 'All' && universitySelect.id != 'None'){
			alert(universitySelect);
			var query = new Parse.Query(Courses);
			query.equalTo("universityName", universityname);
			query.find({
				success: function(results) {
					for(var i = 0; i < results.length; i++) {
						var object = results[i];
						myCourses += '<tr><td>' + object.get('courseEquivalent') + '</td><td>' + object.get('course') +'</td><td>' + object.get('notes') + '</td></tr>';
						}
						(function($) {
						$('#table-catalog').append(myCourses);
					})(jQuery);

					},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
					}

				});
		}else{
			
				var query = new Parse.Query(Courses);
				query.equalTo("courseEquivalent",coursename);
				query.equalTo("universityName", universityname);

				query.find({
					success: function(results) {
						for(var i = 0; i < results.length; i++) {
							var object = results[i];
							myCourses += '<tr><td>' + object.get('courseEquivalent') + '</td><td>' + object.get('course') +'</td><td>' + object.get('notes') + '</td></tr>';
						}
						(function($) {
						$('#table-catalog').append(myCourses);
					})(jQuery);

					},
					error: function(error) {
						alert("Error: " + error.code + " " + error.message);
					}

				});
			}

		
	});

	$('#universitysearch').click(function(){
		$('#table-catalog tbody').remove();
		//String to hold table entries
		var myCourses='';
		//holds the select menu value
		var selected = $('#uniduplicate :selected').val();
		var cselected = $('#courses :selected').val();
		var coursename = $('#courses :selected').text();
		var universityname = $('#uniduplicate :selected').text();
		var Courses = Parse.Object.extend("Courses");

		//Need to make universitySelect a Parse Object of "University"

		// var University = Parse.Object.extend("University");
		// var universitySelect = new University();
		// universitySelect.id = $('#university :selected').val();
		// alert(universitySelect.id);
		if(coursename != 'Choose your class...' && universityname != 'Choose your University...'){
			var query = new Parse.Query(Courses);
			query.equalTo("universityName", universityname);
			query.equalTo("course", coursename);
			query.find({
				success: function(results) {
					alert("Successfully retrieved " + results.length + " equivalent courses.");
					for(var i = 0; i < results.length; i++) {
						var object = results[i];
						myCourses+='<tr><td>' + object.get('courseEquivalent') + '</td><td>' + object.get('course') +'</td><td>' + object.get('notes') + '</td></tr>';
					}
					(function($) {
						$('#table-catalog').append(myCourses);
					})(jQuery);
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}else{
			alert("You must select both a University and it's course");

		}	
	});
});