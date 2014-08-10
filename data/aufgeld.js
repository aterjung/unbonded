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

// React to control messages from main.js
self.port.on("resetFilter", function() {
    resetFilter();
    scrollToFilter();
});

self.port.on("updateFilter", function(add) {
    filter(add);
    scrollToFilter();
});

self.port.on("setFilterButton", function(id) {
    $('#'+id).click();
//    $('#'+id).button("refresh");
});

// Insert our markup to page
$('head').append('<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">');

$('<div id="enhancer_filter" class="nice_group_border enhanced_filter">' +
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

// React on button events
$("input[name=surchargeFilterRadio]").change(function(e) {
    console.log(this.id);
    self.port.emit("buttonChange", this.id);
});

// Apply jQueryUI effects
$( "#surchargeFilter" ).buttonset();

self.port.emit("loadFinished");

$('#'+id).checked = true;
$('#'+id).button("refresh");