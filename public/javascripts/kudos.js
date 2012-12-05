"use strict";
//kudos example
$(function(){
	var kudosDataUrl = "http://nuhub.nurun.com:9200/kudos/kudo/_search?q=fromuser:max";
	//http://nuhub.nurun.com:9200/kudos/kudo/_search?q=fromuser:max


	var KudosMsg = function(data) {
	    this.fromuser = data.fromuser || "";
	    this.touser = data.touser || "";
	    this.post_date = data.post_date || "";
	    this.message = data.message || "";
	}

	// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
	var viewModel = {
	    KudosMsgs : ko.observableArray()
	    
	};
	$.getJSON(kudosDataUrl, function(jsonData) {
	    // Now use this data to update your view models,
	    // and Knockout will update your UI automatically
	    viewModel.KudosMsgs = [];
	    $.each(jsonData["hits"]["hits"], function(){
	    	viewModel.KudosMsgs.push(new KudosMsg(this._source));
	    });
	    ko.applyBindings(viewModel);
	});
});