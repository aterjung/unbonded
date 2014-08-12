function filter_farbe(farbe) {

    resetFilter();
    elements = document.getElementsByTagName('tr');
	c = elements.length; 
    for (i = 1; i < c-1; i++) {
        txt = elements[i].childNodes[5].innerHTML;
        if (!txt.contains(farbe) ){
            $(elements[i]).hide();
      }
        ;
    }
    ;
}


function loescheVerkauf(bID,bName)
{

myURL= window.location.toString();
URLStart= myURL.split("/")[0]+"//"+myURL.split("/")[2];
var sm=window.open(URLStart+ '/en/invest/secondary-market?SecondMarketSearch.Username='+bName+'&pageNr=1&pageSize=200','_blank','');
	var myVar = setInterval(function(){myTimer()}, 2000);
		function myTimer(){
		if ( sm.document.readyState== "complete")
		{
			// alert(bName);
			clearInterval(myVar);
			var elements = sm.document.getElementsByClassName( 'icon delete_small' );
			c = elements.length;
			a=1;
			for ( t = 0; t < c; t++ ) { 	
				
			theID = elements[t].parentNode.parentNode.childNodes[3].childNodes[0].data.toString();
			if ( theID.trim() == bID)
				{
				href = elements[t].getAttribute( 'href' ); 
				fullurl = URLStart + href; 
				xmlhttp = new XMLHttpRequest();   
				xmlhttp.open( 'POST', fullurl, true ); 
				xmlhttp.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' ); 
				xmlhttp.send( null );  
				}
			}
		sm.close();
		}
	}
}

function filter_verkauf() {

    elements = document.getElementsByTagName('tr');
	c = elements.length; 
    for (i = 1; i < c-1; i++) {
		txt = elements[i].childNodes[27].innerHTML;
        if ((txt.trim() == '') || (txt.indexOf('a href') >0))
			{
            $(elements[i]).hide();
			}
        else
		{ 
		childs = elements[i].childNodes;
		bID = childs[1].childNodes[1].innerHTML.trim();
		bName = childs[1].childNodes[4].data.trim().toString();
		aSpan = document.createElement("span");
		aSpan.className = "icon delete_small";
		aSpan.name=bName;
		aSpan.id = bID;
		aSpan.onclick = function () { loescheVerkauf(this.id,this.name);};
		elements[i].childNodes[25].appendChild(aSpan);
		
		}
    }
    ;
}

function resetFilter() {
     elements = document.getElementsByTagName('tr');
	c = elements.length; 
    for (i = 1; i < c-1; i++) {
       
            $(elements[i]).show();
     
    }
    ;
}

function scrollToFilter(){
    $('html, body').animate({
        scrollTop: $("#enhancer_filter").offset().top
    }, 1000);
}


$('head').append('<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">');

$("<div id=\"enhancer_filter\" class=\"nice_group_border enhanced_filter\"><a id=\"enhancer_filter_button_reset\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-recycle fa-lg\"></i></a></div>").insertBefore(".oldtable");


$("<a id=\"enhancer_filter_green\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> <span class=\"fieldHelpLink icon dot_green\"></span> </a>").insertAfter("#enhancer_filter_button_reset");
$("<a id=\"enhancer_filter_yellow\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> <span class=\"fieldHelpLink icon dot_yellow\"></span> </a>").insertAfter("#enhancer_filter_green");
$("<a id=\"enhancer_filter_red\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> <span class=\"fieldHelpLink icon dot_red\"></span> </a>").insertAfter("#enhancer_filter_yellow");

$("<a id=\"enhancer_filter_verkauf\" class=\"enhanced_btn\" href=\"#\" title =\"Filter credits to sell and insert cancel button\"><i class=\"fa fa-filter fa-lg\"></i> To sell </a>").insertAfter("#enhancer_filter_red");
scrollToFilter();





$("#enhancer_filter_button_reset").click(function () {
    resetFilter();
    scrollToFilter();
});

$("#enhancer_filter_green").click(function () {
    filter_farbe("green");
	
    scrollToFilter();
});
$("#enhancer_filter_yellow").click(function () {
	filter_farbe("yellow");
	scrollToFilter();
   
});
$("#enhancer_filter_red").click(function () {
    filter_farbe("red");
	
    scrollToFilter();
});

$("#enhancer_filter_verkauf").click(function () {
    filter_verkauf();
	
    scrollToFilter();
});

