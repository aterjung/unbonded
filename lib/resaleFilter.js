var surcharge = null;
var worker = null;

console.log("restartFilter init");

exports.setWorker = function(externalWorker){
    worker = externalWorker;
}

exports.reset = function(){
    worker.port.emit("updateFilter", "reset");
}

exports.getFilterState = function(){
    return surcharge;
}

exports.applyFilter = function(add){
    surcharge = add;
    worker.port.emit("updateFilter", add);
}



