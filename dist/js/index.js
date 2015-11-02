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
				alert("Successfully retrieved " + results.length + " universities.");

				for (var i = 0; i < results.length; i++) {
					var object = "<option value='" + results[i].id +"'>" + results[i].get('name') + "</option>";
					$('#university').append(object);
				}
				
				$('#university').selectpicker('refresh');

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