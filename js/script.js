/*
#	Milestone 1
Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
#	Milestone 2
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
	const date = moment('2018-01-01');

	printCalendar(date);
	printHolidays(date);
	nextPrevMonth(date);
	// resizeSmallScreen();
});
//  Function to print day + month in calendar
function printCalendar (date)	{
	$('.days-of-month .day-block').detach();
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
		$('.days-of-month').append(html);
	}
	var dayOfWeek = date.days() + 1;

	$('.days-of-month .day-block:first-child').css('grid-column', dayOfWeek);
	return date;
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
				for (var i = 0; i < holidays.length; i++)	{
					var holidayDate = holidays[i].date;
					var holidayType = holidays[i].name;

					$('.day[data-date="'	+	holidayDate	+	'"]').parent().addClass('holiday');
					console.log(holidayType);
					$('.day[data-date="'	+	holidayDate	+	'"]').siblings().text(holidayType);
				}
			}
		},
		error: function	(err) {
			alert('Errore! ' + err);
		}
	});
}
// Function Prev/Next Month
function nextPrevMonth (date) {
	$('.next, .prev').click(function	() {
		var momentDate = date;
		// Just year 2018
		if ($(this).hasClass('next') && (momentDate.month()	!==	11)) {
			momentDate.add(1, 'month');
		} else if ($(this).hasClass('prev') && (momentDate.month()	> 0))	{
			momentDate.subtract(1, 'month');
		}
		// Print calendar and holidays
		printCalendar(momentDate);
		printHolidays(momentDate);
	});
}
// Function to add zero to minutes < 10
function addZero (x) {
	if (x < 10) {
		return ('0' + x);
	} else {
		return x;
	}
}
// TODO:
function	resizeSmallScreen	()	{
	// When the window is resized, check the size to determine your classes
	$(window).resize(function()	{
		// When the width and height meet your specific requirements or lower
		if (($(window).width() <= 960)){
			// If it is smaller or equal to 1024x768, apply your class
			var weekdaysShort =	moment.updateLocale('en', {
				weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			});
			var obj = [];
					$('.days-of-week').each(function() {
				  var childrenLis = $(this).find('li');
					for (var i = 0; i < weekdaysShort.length; i++) {
						obj[0].value[i] = weekdaysShort[i];
					}
					console.log(obj[0].value[i])

			// for (var i = 0; i < weekdaysShort.length; i++) {
			// 	console.log(weekdays[i])
			// 	weekdays[i].text() = weekdaysShort[i];
			// }
     // }
	 })
 }
});
}
