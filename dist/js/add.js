$(document).ready(function(e) {
	Parse.initialize("xoKIhEIxEK5SxBRVMcucXhjd2wzFwMKGwSUoynot", "fXKCq8wQgTcOpoBkRhzf2DUZDofbdFp9bM8IL1Eo");
	$('.selectpicker').selectpicker({
		style: 'btn-info',
	});

function toggleSelectAll(control) {
    var allOptionIsSelected = (control.val() || []).indexOf("All") > -1;
    function valuesOf(elements) {
        return $.map(elements, function(element) {
            return element.value;
        });
    }

    if (control.data('allOptionIsSelected') != allOptionIsSelected) {
        // User clicked 'All' option
        if (allOptionIsSelected) {
            // Can't use .selectpicker('selectAll') because multiple "change" events will be triggered
            control.selectpicker('val', valuesOf(control.find('option')));
        } else {
            control.selectpicker('val', []);
        }
    } else {
        // User clicked other option
        if (allOptionIsSelected && control.val().length != control.find('option').length) {
            // All options were selected, user deselected one option
            // => unselect 'All' option
            control.selectpicker('val', valuesOf(control.find('option:selected[value!=All]')));
            allOptionIsSelected = false;
        } else if (!allOptionIsSelected && control.val().length == control.find('option').length - 1) {
            // Not all options were selected, user selected all options except 'All' option
            // => select 'All' option too
            control.selectpicker('val', valuesOf(control.find('option')));
            allOptionIsSelected = true;
        }
    }
    control.data('allOptionIsSelected', allOptionIsSelected);
}
	$('#foundation').selectpicker().change(function(){toggleSelectAll($(this));}).trigger('change');


	var dropdown = document.getElementById("university");
	if (dropdown){
		var university = Parse.Object.extend("University");
		var query =  new Parse.Query(university);
		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					var object = "<option value='" + results[i].get('name') +"'>" + results[i].get('name') + "</option>";
					$('#university').append(object);
				}
				
				$('#university').selectpicker('refresh');

			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
});

//added this
function addCourse() {
	alert('form');
	//correct
	var foundationCourse = $('#foundation :selected').text();
	var universityName = $('#university :selected').text();
	var courseNumber = $('#course_number').text();
	var notes = $('#notes').text();
	
	var foundationCourse = $('#foundation :selected').val();
	var universityName = $('#university :selected').val();
	var courseNumber = $('#course_number').val();
	var notes = $('#notes').val();
	
//edit this
    var Courses = Parse.Object.extend("Courses");
    var courses = new Courses();
    
    courses.set("courseEquivalent", foundationCourse);
    courses.set("universityName", universityName);
	courses.set("course", courseNumber);
	courses.set("notes", notes);
	
	courses.save(null, {
  		success: function(courses) {
    		// Execute any logic that should take place after the object is saved.
    		alert('New object created with objectId: ' + courses.id);
  		},
  		error: function(gameScore, error) {
    		// Execute any logic that should take place if the save fails.
    		// error is a Parse.Error with an error code and message.
    		alert('Failed to create new object, with error code: ' + error.message);
  		}
	});
}

//queries - basic queries