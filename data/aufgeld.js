function filter(min) {

    resetFilter();
    elements = document.getElementsByClassName('title');
    c = elements.length;

    for (i = 0; i < c; i++) {
        console.log(elements[i].parentNode.childNodes[21].childNodes[1].childNodes[1].innerHTML);

        element = elements[i].parentNode.childNodes[21].childNodes[1].childNodes[1];
        txt = element.innerHTML.split("(")[1];
        txt = txt.split(")")[0];
        console.log(txt);
        f = parseInt(txt);
        console.log(f);
        if (f > min) {
            console.log("remove element");
            parent = elements[i].parentNode;

            $(elements[i]).parent().hide();

            // parent.style = "display:none;";

            //parClass = parent.className;
            //modClass = parClass + ' hideMe'; parent.className = modClass;
        }
        ;
    }
    ;
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

$("<a id=\"enhancer_filter_button_m5\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> &lt; -5% </a>").insertAfter("#enhancer_filter_button_reset");

$("<a id=\"enhancer_filter_button0\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> &lt; 0% </a>").insertAfter("#enhancer_filter_button_m5");

$("<a id=\"enhancer_filter_button_p5\" class=\"enhanced_btn\" href=\"#\"><i class=\"fa fa-filter fa-lg\"></i> &lt; 5% </a>").insertAfter("#enhancer_filter_button0");

$("#enhancer_filter_button_reset").click(function () {
    resetFilter();
    scrollToFilter();
});
$("#enhancer_filter_button0").click(function () {
    filter(0);
    scrollToFilter();
});
$("#enhancer_filter_button_m5").click(function () {
    filter(-5);
    scrollToFilter();
});
$("#enhancer_filter_button_p5").click(function () {
    filter(5);
    scrollToFilter();
});