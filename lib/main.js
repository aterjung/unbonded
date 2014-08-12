var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
    id: "bondora-link",
    label: "Go to Bondora",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    tabs.open("https://www.bondora.ee/en/invest/secondary-market");
}

// Import the page-mod API
var pageMod = require("sdk/page-mod");

var self = require("sdk/self");

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
    include: "https://www.bondora.de/de/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});
pageMod.PageMod({
    include: "https://www.bondora.ee/de/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.ee/en/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld_en.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.es/en/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld_en.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.de/en/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld_en.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.es/es/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld_es.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.ee/es/invest/secondary-market*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("aufgeld_es.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.ee/de/MyAccount/MyInvestmentsAll*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("depot.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.ee/en/MyAccount/MyInvestmentsAll*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("depot_en.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

pageMod.PageMod({
    include: "https://www.bondora.de/de/MyAccount/MyInvestmentsAll*",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("depot.js")],
    contentStyleFile: require("sdk/self").data.url("style.css")

});

/*pageMod.PageMod({
    include: "https://www.bondora.de/de/login",
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("login.js")]
});*/
