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
      }
        ;
    }
    ;
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
    }
    ;
}

function scrollToFilter(){
    $('html, body').animate({
        scrollTop: $("#enhancer_filter").offset().top
    }, 1000);
}

$('head').append('<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">');

$("<div id=\"enhancer_filter\" class=\"nice_group_border enhanced_filter\"><a id=\"enhancer_filter_button_reset\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-recycle fa-lg\"></i></a></div>").insertBefore(".loansales_table");

$("<a id=\"enhancer_sort_a_button\" class=\"enhanced_btn\" href=\"#\"> &darr; Markup </a>").insertAfter("#enhancer_filter_button_reset");

$("<a id=\"enhancer_filter_button_m5\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> M &le; -5% </a>").insertAfter("#enhancer_sort_a_button");

$("<a id=\"enhancer_filter_button0\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> M &le; 0% </a>").insertAfter("#enhancer_filter_button_m5");

$("<a id=\"enhancer_filter_button_p5\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> M &le; 5% </a>").insertAfter("#enhancer_filter_button0");

$("<a id=\"enhancer_filter_button_x\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> M &le; x% </a>").insertAfter("#enhancer_filter_button_p5");

$("<a id=\"enhancer_sort_r_button\" class=\"enhanced_btn\" href=\"#\"> <span class=\"green\"> &uarr; Return </a>").insertAfter("#enhancer_filter_button_x");

$("<a id=\"enhancer_filter_button_r20\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> <span class=\"green\">R &ge; 20% </span></a>").insertAfter("#enhancer_sort_r_button");

$("<a id=\"enhancer_filter_button_r30\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> <span class=\"green\">R &ge; 30% </span></a>").insertAfter("#enhancer_filter_button_r20");

$("<a id=\"enhancer_filter_button_rx\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> <span class=\"green\">R &ge; x% </span></a>").insertAfter("#enhancer_filter_button_r30");






$("#enhancer_filter_button_reset").click(function () {
    resetFilter();
    scrollToFilter();
});

$("#enhancer_sort_a_button").click(function () {
	sort_a();
    scrollToFilter();
});

$("#enhancer_filter_button0").click(function () {
    filter(0);
	sort_r();
    scrollToFilter();
});
$("#enhancer_filter_button_m5").click(function () {
    filter(-5);
	sort_r();
    scrollToFilter();
});
$("#enhancer_filter_button_p5").click(function () {
    filter(5);
	sort_r();
    scrollToFilter();
});
$("#enhancer_filter_button_x").click(function () {
	x = prompt('Maximal markup :','');
    filter(x);
	sort_r();
    scrollToFilter();
});
$("#enhancer_filter_button_r20").click(function () {
    r_filter(20);
	sort_r();
    scrollToFilter();
});
$("#enhancer_filter_button_r30").click(function () {
    r_filter(30);
	sort_r();
    scrollToFilter();
});
$("#enhancer_filter_button_rx").click(function () {
	x = prompt('Minimal expected return :','');
    r_filter(x);
	sort_r();
    scrollToFilter();
});	

$("#enhancer_sort_r_button").click(function () {
	sort_r();
    scrollToFilter();
});