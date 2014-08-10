var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var resaleFilter = require("resaleFilter.js");

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
    contentScriptFile: [self.data.url("jquery-1.11.1.min.js"), self.data.url("jquery-ui.js"), self.data.url("resale.js")],
    contentStyleFile: [self.data.url("style.css"),self.data.url("jquery-ui-own.css")],
    onAttach: function(worker) {

        resaleFilter.setWorker(worker);

        worker.port.on("buttonChange", function(button) {
            switch (button) {
                case "surchargeFilterNo":
                    resaleFilter.reset();
                    break;
                case "surchargeFilterM5":
                    resaleFilter.applyFilter(-5);
                    break;
                case "surchargeFilter0":
                    resaleFilter.applyFilter(0);
                    break;
                case "surchargeFilterP5":
                    resaleFilter.applyFilter(5);
                    break;
            }
        });

        worker.port.on("loadFinished", function(){
            var resaleFilterState = resaleFilter.getFilterState();

            console.log(resaleFilterState);
            switch (resaleFilterState){
                case null:
                    worker.port.emit("setFilterButton", "surchargeFilterNo");
                    break;
                case -5:
                    worker.port.emit("setFilterButton", "surchargeFilterM5");
                    break;
                case 0:
                    worker.port.emit("setFilterButton", "surchargeFilter0");
                    break;
                case 5:
                    worker.port.emit("setFilterButton", "surchargeFilterP5");
                    break;

            }
        });
    }
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
});


const {Cc,Ci} = require("chrome");

//const Cc = Components.classes;
//const Ci = Components.interfaces;

var tbirdsqlite = {

    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.dbInit();
    },

    dbConnection: null,

    dbSchema: {
        tables: {
            attachments:"id           INTEGER PRIMARY KEY, \
                    name         TEXT \
                    encoded      TEXT NOT NULL"
        }
    },

    dbInit: function() {
        var dirService = Cc["@mozilla.org/file/directory_service;1"].
            getService(Ci.nsIProperties);

        var dbFile = dirService.get("ProfD", Ci.nsIFile);
        dbFile.append("tbird.sqlite");

        var dbService = Cc["@mozilla.org/storage/service;1"].
            getService(Ci.mozIStorageService);

        var dbConnection;

        if (!dbFile.exists())
            dbConnection = this._dbCreate(dbService, dbFile);
        else {
            dbConnection = dbService.openDatabase(dbFile);
        }
        this.dbConnection = dbConnection;
    },

    _dbCreate: function(aDBService, aDBFile) {
        var dbConnection = aDBService.openDatabase(aDBFile);
        this._dbCreateTables(dbConnection);
        return dbConnection;
    },

    _dbCreateTables: function(aDBConnection) {
        for(var name in this.dbSchema.tables)
            aDBConnection.createTable(name, this.dbSchema.tables[name]);
    },
};
window.addEventListener("load", function(e) { tbirdsqlite.onLoad(e); }, false);