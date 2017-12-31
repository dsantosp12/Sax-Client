
function loadingBarComplete() {
    $("#loading-bar").replaceWith(
        '<div id="loading-bar" class="determinate" style="width: 100%"></div>');
}

function activateLoadingBar() {
    $("#loading-bar").replaceWith(
        '<div id="loading-bar" class="indeterminate"></div>');
}

$(document).ready(function() {
    $(".button-collapse").sideNav();
});