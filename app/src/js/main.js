require(['backbone', 'views/app', 'routers/router'], function(Backbone, AppView, Workspace) {
	new Workspace();
	Backbone.history.start();

	new AppView();

	$.fn.datepicker.defaults.format = "mm-dd-yyyy";
	
});