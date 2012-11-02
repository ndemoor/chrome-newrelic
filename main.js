if (window.location.hostname === 'rpm.newrelic.com') {
	$(document).ready(function() {
		$('#app_filter_container').next('div')
			.before('<div class="add_more_servers_link"><a id="add_name_tags" class="icon add">Add name tags</a></div>');

		$('#add_name_tags').click(function() {
			$('.btn-group').toggle();
		});

		// Add set name button with dropdown form
        $('.app_name > a').before(
			'<div class="btn-group">'
			+ '<a role="button" class="btn btn-info btn-mini dropdown-toggle" data-toggle="dropdown">set name</a>'
			+ '<form class="dropdown-menu chnr_name_form"><input type="text" name="name" /><a class="btn btn-info">Save</a></form>'
			+ '</div>'
		);

		$('.btn-group').hide();

		$('.app_name > a').each(function() {
			if(localStorage['chnr_name_list_' + $(this).attr('title')] !== undefined) {
				appendNameTag($(this));
			}
		});

        // Prevent dropdown from closing when clicking on input
		$('.dropdown-menu input').click(function(e) {
			e.stopPropagation();
		});

		$('.chnr_name_form a.btn').click(function(e) {
			var hostname = $(this).parents('.app_name').children('a').attr('title');
			var name = $(this).prev('input').val();

			localStorage['chnr_name_list_' + hostname] = name;

			appendNameTag($(this).parents('.app_name').children('a'));
		});

		function appendNameTag(el) {
			el.children('.chnr_name_tag').remove();
			el.append('<span class="chnr_name_tag">(' + localStorage['chnr_name_list_' + el.attr('title')] + ')</span>');
		}
	});
}