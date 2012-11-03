if (window.location.hostname === 'rpm.newrelic.com') {
	$(document).ready(function() {
		// Add 'edit server name tags' action on top of the list
		$('#app_filter_container').next('div')
			.before('<div class="add_more_servers_link"><a id="add_name_tags" class="icon add">Edit server name tags</a></div>');

		// Toggle 'set name' buttons
		$('#add_name_tags').click(function() {
			$('.btn-group').toggle();
		});

		// Add set name button with dropdown form
        $('.app_name > a').before(
			'<div class="btn-group">'
			+ '<a role="button" class="btn btn-info btn-mini dropdown-toggle" data-toggle="dropdown">set name</a>'
			+ '<form class="dropdown-menu chnr_name_form">'
			+ '<input type="text" name="name" />'
			+ '<a class="btn btn-info" id="chnr_save">Save</a><a id="chnr_remove" class="btn btn-danger">Remove</a>'
			+ '</form>'
			+ '</div>'
		);

		$('.btn-group').hide();

		// Add all stored tags on page load
		$('.app_name > a').each(function() {
			if(localStorage['chnr_name_list_' + $(this).attr('title')] !== undefined) {
				appendNameTag($(this));
			}
		});

        // Prevent dropdown from closing when clicking on input
		$('.dropdown-menu input').click(function(e) {
			e.stopPropagation();
		});

		// Save button action
		$('.chnr_name_form a#chnr_save').click(function(e) {
			var hostname = $(this).parents('.app_name').children('a').attr('title');
			var name = $(this).prev('input').val();

			localStorage['chnr_name_list_' + hostname] = name;

			appendNameTag($(this).parents('.app_name').children('a'));
		});

		// Remove button action
		$('.chnr_name_form a#chnr_remove').click(function(e) {
			var hostname = $(this).parents('.app_name').children('a').attr('title');

			delete localStorage['chnr_name_list_' + hostname];

			removeNameTag($(this).parents('.app_name').children('a'));
		});

		// Append a name tag to a server list entry
		function appendNameTag(el) {
			el.children('.chnr_name_tag').remove();
			el.append('<span class="chnr_name_tag">(' + localStorage['chnr_name_list_' + el.attr('title')] + ')</span>');
		}

		// Remove a name tag from a server list entry
		function removeNameTag(el) {
			el.children('.chnr_name_tag').remove();
		}
	});
}