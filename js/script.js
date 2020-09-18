$(document).ready(function	() {
	// First day of my calendar
	var date = '2018-01-01';
	// Create object moment
	var momentDate = moment(date);

	// Day-template Handlebars
	var source = $('#day-template').html();
	var template = Handlebars.compile(source);

	// Print days+month of my calendar
	for (var i = 1; i <= momentDate.daysInMonth(); i++) {
		var dataCompleteMoment = momentDate;
		var context = {
			day: i,
			month: momentDate.format('MMMM'),
			dateComplete: dataCompleteMoment.format('YYYY-MM-DD')
		};

		var html = template(context);

		$('#days').append(html);
		dataCompleteMoment.add(1, 'day');
	}

	// Ajax
	$.ajax({
		url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
		data: {
			year: 2018,
			month: 0
		},
		method: 'GET',
		success: function (data) {
			printHoliday(data.response);
		},
		error: function	(err) {
			alert('Errore! ' + err);
		}
	});
});

// Function to serch and add: class holiday and text holidayType
function printHoliday (holidays)	{
	for (var i = 0; i < holidays.length; i++) {
		var holidayDate = holidays[i].date;
		var holidayType = holidays[i].name;
		$('.day[data-date="'	+	holidayDate	+	'"]').addClass('holiday');
		$('.day[data-date="'	+	holidayDate	+	'"] .holidayType').text('- ' + holidayType);
	}
}
