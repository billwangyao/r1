$(function(){
	var d = new Date();
	var week = d.getDay();
	var today = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();
	var firstDay =getFirstDay( year , month);
	var monthLength = getMonthLength( year , month );
	var day = 1;

	$(window).ready(function(){
		//get date
		console.log( year + "." + ( month + 1 ) + "." + today + "( " + week +" ) " + "first Day is " + firstDay );
		createCalendar();
	});
	//click to nextMonth
	$('.next').on('click' , function(e) {
		e.preventDefault();
		month++;
		check(month);
		monthLength = getMonthLength(year, month);
		firstDay = getFirstDay(year,month);
		createCalendar();
	});
	//click to prevMonth
	$('.prev').on('click' , function(e){
		e.preventDefault();
		month--;
		check(month);
		monthLength = getMonthLength(year, month);
		firstDay = getFirstDay(year,month);
		createCalendar();
	});

	//click span to  show the information
	$('.days').on('click' ,'span', function(e){
		e.preventDefault();
		var index = $(this).attr('id');
		$('#info').css('display' , 'inline-block');
		$('#info .title').html(data[index].title);
		$('#info .content').html(data[index].content);

	});

	function check(m){
		if(m > 11){
			month = 0;
			year++;
		}
		if(m < 0){
			month = 11;
			year--;
		}
		$('#info').css('display' , 'none');
	}
	//getMonthLength
	function getMonthLength( y , m ){
		var nextMonth = new Date( y , m +1, 1);
		nextMonth.setHours(nextMonth.getHours() - 2);
		return nextMonth.getDate();
	}

	//getMonthFirstDay
	function getFirstDay(y , m){
		
		var nextFirstDay = new Date( y , m , 1);
		return nextFirstDay.getDay();
	}

	//create, update Calendar
	function createCalendar(){
		console.log( year + "." + ( month + 1 ) +  " & first Day is week" + firstDay + " & this month has " + monthLength +"days" );
		$('.main > .calendar > .top > .title').html(year + "年" + (month+1) + "月");

		$('.days>div').empty(); //clear div content
		$('.days>div').removeAttr('id'); // clear div attr-id
		$('.days>div').removeAttr('class');// clear div class

		$('.days>div').each(function(index) {

			if(index > firstDay - 1){
				$(this).html('<a>' + day + '</a>');
				var id = ''.concat(year, ".",month+1,".",day);// id
				
				$(this).attr('id',id);
				day++;
				if(( month == d.getMonth()) && ( year == d.getFullYear())&&( day == d.getDate() + 1) ){
					$(this).addClass('today');
				}
				for(var i =0 ;i < data.length ; i++){
					if(id == data[i].dates){
						$(this).append('<span id=' + i + '>' + data[i].title + '</span>');
					}
				}
			}
			if(day > monthLength ){
				day = 1 ;
				return false;
			}
		});
	}




});