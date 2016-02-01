function getTime() {
    var dateTime = new Date();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var seconds = dateTime.getSeconds();
    var milliseconds = dateTime.getMilliseconds();

    return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + "." + (milliseconds < 1000 ? "0" + (milliseconds < 100 ?  "0" + (milliseconds < 10 ?  "0" + milliseconds : milliseconds) : milliseconds) : milliseconds);
}

self.onmessage = function(e){
    postMessage(getTime());
}