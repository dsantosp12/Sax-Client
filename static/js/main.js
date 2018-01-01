const WARNING = "W";
const INFORMATIONAL = "I";
const SUCCESS = "S";
const ERROR = "E";
const FATAL = "F";

function loadingBarComplete() {
    $("#loading-bar").replaceWith(
        '<div id="loading-bar" class="determinate" style="width: 100%"></div>');
}

function activateLoadingBar() {
    $("#loading-bar").replaceWith(
        '<div id="loading-bar" class="indeterminate"></div>');
}

function displayErrorMessageAndRefresh(id, msg, refreshTime) {
    $(id).replaceWith(
        '<li id="summary-error-display">' +
        '<h5 class="center">' + msg + '</h5></li>');
    $(id).fadeTo("fast", 0.1);
    $(id).fadeTo("fast", 1);

    setTimeout(function() {
        $("#refresh-summary").click();
    }, refreshTime * 1000);
}

$(document).ready(function() {
    $(".button-collapse").sideNav();
});