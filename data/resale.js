function filter(max) {

    resetFilter();
    elements = document.getElementsByClassName('title');
    c = elements.length;

    for (i = 0; i < c; i++) {
        element = elements[i].parentNode.childNodes[21].childNodes[1].childNodes[1];
        txt = element.innerHTML.split("(")[1];
        txt = txt.split(")")[0];
        f = parseInt(txt);
        if (f > max) {
            parent = elements[i].parentNode;

            $(elements[i]).parent().hide();
        };
    };
}

function sort_a()
{
	elements = document.getElementsByClassName('title');
	c = elements.length;
	for ( i = 1; i < c; i++ )	{ 
		element = elements[i].parentNode.childNodes[21].childNodes[1].childNodes[1];
        txt = element.innerHTML.split("(")[1];
        txt = txt.split(")")[0];
        a_i = parseInt(txt);
		for ( j = 0; j < i; j++ )	{ 
			element = elements[j].parentNode.childNodes[21].childNodes[1].childNodes[1];
			txt = element.innerHTML.split("(")[1];
			txt = txt.split(")")[0];
			a_j = parseInt(txt);
			
			if ( a_i < a_j)
			{   
				info = elements[i].parentNode.nextSibling.nextSibling;
				elements[j].parentNode.parentNode.insertBefore(info,elements[j].parentNode);
				elements[j].parentNode.parentNode.insertBefore(elements[i].parentNode,info);
				j = i;
			}
		}
	
	}

}

function sort_r()
{
	elements = document.getElementsByClassName('title');
	
	c = elements.length;
	for ( i = 1; i < c; i++ )	{ 
		element = elements[i].parentNode.childNodes[23].childNodes[1].childNodes[0];
		txt = element.innerHTML.replace(/,/g,'.');
		if (txt.trim() == "-%") txt = "-100%";
        a_i = parseFloat(txt);
		for ( j = 0; j < i; j++ )	{ 
			element = elements[j].parentNode.childNodes[23].childNodes[1].childNodes[0];
			txt = element.innerHTML.replace(/,/g,'.');
		if (txt.trim() == "-%") txt = "-100%";
			a_j = parseFloat(txt);
			
			if ( a_i > a_j)
			{   
				info = elements[i].parentNode.nextSibling.nextSibling;
				elements[j].parentNode.parentNode.insertBefore(info,elements[j].parentNode);
				elements[j].parentNode.parentNode.insertBefore(elements[i].parentNode,info);
				j = i;
			}
		}
	
	}

}


function r_filter(min) {

	elements = document.getElementsByClassName('title');
	c = elements.length;

	for ( i = 0; i < c; i++ )	{ 
		element = elements[i].parentNode.childNodes[23].childNodes[1].childNodes[0];
		txt = element.innerHTML;
		f = parseInt(txt);
		if ( (f < min) || (txt.trim() == "-%"))
		{
			parent = elements[i].parentNode;
			$(elements[i]).parent().hide();
		}
		
	} 
} 

function resetFilter() {
    elements = document.getElementsByClassName('title');
    c = elements.length;
    for (i = 0; i < c; i++) {
        element = elements[i].parentNode.childNodes[21].childNodes[1].childNodes[1];
        $(elements[i]).parent().show();
    };
}

function scrollToFilter() {
    $('html, body').animate({
        scrollTop: $("#enhancer_filter").offset().top
    }, 1000);
}

// React to control messages from main.js
self.port.on("resetFilter", function () {
    resetFilter();
    scrollToFilter();
});

self.port.on("updateFilter", function (add) {
    filter(add);
    scrollToFilter();
});

self.port.on("setFilterButton", function (id) {
    $('#' + id).click();
});

// Insert our markup to page
$('head').append('<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">');

$("<div id=\"enhancer_filter\" class=\"nice_group_border enhanced_filter\"><a id=\"enhancer_filter_button_reset\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-recycle fa-lg\"></i></a></div>").insertBefore(".loansales_table");
$('<div id="enhancer_filter" class="nice_group_border enhanced_filter">' +
    '<span>Auf/Abschläge <i class=\"fa fa-filter fa-lg\"></i></span>'+
    '<div id="surchargeFilter">' +
    '<input type="radio" id="surchargeFilterNo" name="surchargeFilterRadio">' +
    '<label for="surchargeFilterNo">aus</label>' +
    '<input type="radio" id="surchargeFilterM5" name="surchargeFilterRadio">' +
    '<label for="surchargeFilterM5">-5 %</label>' +
    '<input type="radio" id="surchargeFilter0" name="surchargeFilterRadio">' +
    '<label for="surchargeFilter0">0 %</label>' +
    '<input type="radio" id="surchargeFilterP5" name="surchargeFilterRadio">' +
    '<label for="surchargeFilterP5">5 %</label>' +
    '</div></div>').insertBefore(".loansales_table");

$("<a id=\"enhancer_sort_a_button\" class=\"enhanced_btn\" href=\"#\"> &darr; Aufgeld </a>").insertAfter("#enhancer_filter_button_reset");
// React on button events
$("input[name=surchargeFilterRadio]").change(function (e) {
    console.log(this.id);
    self.port.emit("buttonChange", this.id);
});

$("<a id=\"enhancer_filter_button_m5\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> A &le; -5% </a>").insertAfter("#enhancer_sort_a_button");
// Apply jQueryUI effects
$("#surchargeFilter").buttonset();

// Page modification finished, send event back to main.js to update filter status
self.port.emit("loadFinished");
