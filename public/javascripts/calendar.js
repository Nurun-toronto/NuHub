"use strict";
$(function(){
	var calendarDataUrl = "http://nuhub.nurun.com:9200/events/event/_search?q=orguser:*";
	var calendarData = [];
	$.getJSON(calendarDataUrl, function(jsonData) {
	   calendarData = [];
	   $.each(jsonData["hits"]["hits"], function(){	    	
	    	if(this._source["date"] !== undefined){
	    		console.log(this._source);
	    		this._source["date"] = (new Date(this._source["date"]).getTime());
	    		calendarData.push(this._source);
	    	}
	    });
	   console.log(calendarData);
	   $("#calendarHolder").eventCalendar({
		  jsonData: calendarData,
		  showDayAsWeeks: false
		});

	});

	
});