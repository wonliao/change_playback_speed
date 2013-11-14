// JavaScript Document
$(document).bind("mobileinit", function () {

	//$.mobile.page.prototype.options.backBtnText = "back";
    $.mobile.page.prototype.options.addBackBtn      = true;
    $.mobile.page.prototype.options.backBtnTheme    = "e";

    // Page
    $.mobile.page.prototype.options.headerTheme = "e";  // Page header only
    $.mobile.page.prototype.options.contentTheme = "e";
    $.mobile.page.prototype.options.footerTheme = "e";

    // Listviews
    $.mobile.listview.prototype.options.headerTheme = "e";  // Header for nested lists
    $.mobile.listview.prototype.options.theme = "e";  // List items / content
    $.mobile.listview.prototype.options.dividerTheme = "e";  // List divider

    $.mobile.listview.prototype.options.splitTheme = "e";
    $.mobile.listview.prototype.options.countTheme = "e";
    $.mobile.listview.prototype.options.filterTheme = "e";
    //$.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
});

$( document ).bind( "pageload", function( event, data ){

	var temp = $('select[name^="flip"]').attr('id').split( "-" );
	var id = temp[1];
	
	//console.log( "id(" + id + ")" );
	app.getTimer(id);
});

for(var i=1; i<=12; i++ ) {

	$("#flip-" + i).live('change', function(event) {

		var temp = $(this).attr('id').split( "-" );
		var id = temp[1];
		var value = $(this).val();
		//console.log( "id(" + id + ") value(" + value + ")" );
		
		var time = 7;
		switch( id ) {
			case "1":	time = 23;	break;
			case "2":	time = 1;	break;
			case "3":	time = 3;	break;
			case "4":	time = 5;	break;
			case "5":	time = 7;	break;
			case "6":	time = 9;	break;
			case "7":	time = 11;	break;
			case "8":	time = 13;	break;
			case "9":	time = 15;	break;
			case "10":	time = 17;	break;
			case "11":	time = 19;	break;
			case "12":	time = 21;	break;
		}

		//console.log( "id(" + id + ") time(" + time + ") value(" + value + ")" );
	
		if( value == "on" ) {
			app.setTimer(id, time);
		} else if( value == "off" ) {
			app.cancelTimer(id);
		}
	});
}
