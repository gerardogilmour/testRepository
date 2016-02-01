/// <reference path="jquery-1.12.0.js" />

$(document).on("ready", function () {
    var milliseconds = 1000;
    var opacity = 0.5;
    var worker = null;

    function displayCoverAsync() {
        return $("#cover").fadeTo(milliseconds, opacity).promise();
    }
    
    function startWorker() {
        worker = new Worker("scripts/webWorker.js");
        worker.onmessage = function (e) {
            $("#time").html(e.data);
            worker.postMessage("");
        }
        worker.postMessage("");
    }

    function endWorker() {
        worker.terminate();
        worker = null;
    }

    function showMessageContentAsync() {
        startWorker();
        $("#messageBox").show();
        return $("#messageContent").slideDown(milliseconds / 2).promise();
    }

    function showMessageAsync() {
        var coverPromise = displayCoverAsync();
        var messagePromise = coverPromise.pipe(function () {
            return showMessageContentAsync();
        });
        return messagePromise;
    }

    function displayTimeAsync() {
        return showMessageAsync();
    }


    function hideMessageContentAsync(message) {
        var promise = $("#messageContent").slideUp(milliseconds / 2).promise();
        promise.done(function () {
            $("#messageBox").hide();
            endWorker();
        });
        return promise;
    };

    function hideCoverAsync() {
        return $("#cover").fadeOut(milliseconds).promise();
    }

    function hideMessageAsync() {
        var messagePromise = hideMessageContentAsync();
        var coverPromise = messagePromise.done(function () {
            return hideCoverAsync();
        });
        return coverPromise;
    }

    $("#showMessageBtn").on("click", displayTimeAsync);
    $("#closeBtn").on("click", hideMessageAsync);
    //$("#messageBox").on("click", hideMessageAsync);
});
