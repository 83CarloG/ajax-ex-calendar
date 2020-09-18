$(document).ready(function	() {
	// First day of my calendar
	var date = '2018-01-01';
	// Day-template Handlebars
	var source = $('#day-template').html();
	var template = Handlebars.compile(source);

	// Print days+month of my calendar
	for (var i = 1; i < 31; i++) {
		var context = {
			day: i,
			month: 'Gennaio'
		};

		var html = template(context);

		$('#days').append(html);

	}


});
