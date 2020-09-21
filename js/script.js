/*
Milestone 2
Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
Attenzione!
Ogni volta che cambio mese dovrò:
Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
Controllare quanti giorni ha il mese scelto formando così una lista
Chiedere all’api quali sono le festività per il mese scelto
Evidenziare le festività nella lista
*/
$(document).ready(function	() {
	// First day of my calendar
	var date = moment('2018-01-01');

	printCalendar(date);
	printHolidays(date);
	nextMonth(date);
	prevMonth(date);
// nextMonth
});
//  Function to print day + month in calendar
function printCalendar (date)	{
	var momentDate = date;

	$('h1').text(momentDate.format('MMMM YYYY'));
	// Day-template Handlebars
	var source = $('#day-template').html();
	var template = Handlebars.compile(source);

	// Print days+month of my calendar
	for (var i = 1; i <= momentDate.daysInMonth(); i++) {
		var dataCompleteMoment = date.format('YYYY') + '-' + date.format('MM') + '-' + addZero(i);
		var context = {
			day: i,
			month: momentDate.format('MMMM'),
			dateComplete: dataCompleteMoment
		};

		var html = template(context);
		$('#days').append(html);
	}
}
// Function to serch and add: class holiday and text holidayType
function printHolidays (date)	{
	var month = date.format('M')	-	1;
	// Ajax
	$.ajax({
		url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
		data: {
			year: 2018,
			month: month
		},
		method: 'GET',
		success: function (data) {
			var holidays = data.response;

			if (holidays.length > 0)	{
				for (var i = 0; i < holidays.length; i++) {

					var holidayDate = holidays[i].date;
					var holidayType = holidays[i].name;

					$('.day[data-date="'	+	holidayDate	+	'"]').addClass('holiday');
					$('.day[data-date="'	+	holidayDate	+	'"] .holidayType').text('- ' + holidayType);
				}
			}
		},
		error: function	(err) {
			alert('Errore! ' + err);
		}
	});
}

function addZero (x) {
	if (x < 10) {
		return ('0' + x);
	} else {
		return x;
	}
}
function nextMonth (date) {
	$('.next').click(function	() {
		if (date.month() > 10) {
			return true;
		} else {
			$('#days li').remove();
			var momentDate = date.add(1, 'month');
			$('h1').text(momentDate.format('MMMM YYYY'));
			// Day-template Handlebars
			var source = $('#day-template').html();
			var template = Handlebars.compile(source);

			// Print days+month of my calendar
			for (var i = 1; i <= momentDate.daysInMonth(); i++) {
				var dataCompleteMoment = date.format('YYYY') + '-' + date.format('MM') + '-' + addZero(i);
				var context = {
					day: i,
					month: momentDate.format('MMMM'),
					dateComplete: dataCompleteMoment
				};
				var html = template(context);
				$('#days').append(html);
			}
			printHolidays(date);
			return date;
		}
	});
}
function prevMonth (date) {
	$('.prev').click(function	() {
		if (date.month() === 0) {
			return true;
		} else {
			$('#days li').remove();
			var momentDate = date.subtract(1, 'month');
			$('h1').text(momentDate.format('MMMM YYYY'));
			// Day-template Handlebars
			var source = $('#day-template').html();
			var template = Handlebars.compile(source);

			// Print days+month of my calendar
			for (var i = 1; i <= momentDate.daysInMonth(); i++) {
				var dataCompleteMoment = date.format('YYYY') + '-' + date.format('MM') + '-' + addZero(i);
				var context = {
					day: i,
					month: momentDate.format('MMMM'),
					dateComplete: dataCompleteMoment
				};
				var html = template(context);
				$('#days').append(html);
			}
			printHolidays(date);
			return date;
		}
	});
}
