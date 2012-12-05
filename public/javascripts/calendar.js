"use strict";
$(function(){
	var calendarDataUrl = "http://nuhub.nurun.com:9200/events/event/_search?q=orguser:*";
	var calendarHolder = $("#calendarHolder");
	window.updateCalendar = function(){
		var calendarData = [];
		$.getJSON(calendarDataUrl, function(jsonData) {
		   calendarData = [];
		   $.each(jsonData["hits"]["hits"], function(){	    	
		    	//if(this._source["date"] !== undefined){
		    		this._source["date"] = (new Date(this._source["date"] || this._source["when"]).getTime());
		    		calendarData.push(this._source);
		    	//}
		    });
		   calendarHolder.empty();
		   $("<div />").appendTo(calendarHolder).eventCalendar({
			  jsonData: calendarData,
			  showDayAsWeeks: false,
			  cacheJson : false
			});

		});
	}
	
	window.updateCalendar();
	window.calendarInterval = window.setInterval(function(){
		window.updateCalendar();
	}, 1000 * 60 * 1);
});