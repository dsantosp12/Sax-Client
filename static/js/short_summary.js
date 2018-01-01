function getSummaryAndRenderWith(render) {
    var baseURL = getSaxURL();
    var shortSummaryURL = baseURL + "/devices/status/short";

    $.getJSON(shortSummaryURL, function (data) {
        $.each(data, function (idx, value) {
            render(
                value.device.id,
                value.device.device_name,
                value.device.device_ip,
                value.user,
                value.pool,
                value.ghs_current,
                value.temp_average,
                value.fan_average,
                value.status_code
            )
        });
    }).done(function () {
        $("#summary-error-display").replaceWith(
            '<li id="summary-error-display" hidden>');
        loadingBarComplete();
    }).fail(function() {
        $("#summary-error-display").replaceWith(
            '<li id="summary-error-display">' +
            '<h5 class="center">Couldn\'t read data, refreshing in 5 ' +
            'seconds...</h5></li>');
        $("#summary-error-display").fadeTo("fast", 0.1);
        $("#summary-error-display").fadeTo("fast", 1);

        setTimeout(function() {
            $("#refresh-summary").click();
        }, 5000);
    });
}

function summaryItemRender(id, deviceName, deviceIP, user, pool,
                                      ghsCurrent, tempAverage, fanAverage,
                                   statusCode) {
    var statusIcon = "";

    switch (statusCode) {
        case INFORMATIONAL:
            statusIcon = "info";
            break;
        case WARNING:
            statusIcon = "warning";
            break;
        case SUCCESS:
            statusIcon = "done";
            break;
        case  ERROR:
            statusIcon = "do_not_disturb";
            break;
        case FATAL:
            statusIcon = "do_not_disturb";
            break;
        default:
            statusIcon = "";
            break;
    }

    var template =
    '<li class="collection-item">\
        <div class="row">\
            <div class="col s3 m3 l3 xl3">\
                <p id="device-name"><i class="material-icons">developer_board</i>  ' + deviceName + '</p>\
                <p id="device-ip"><i class="material-icons">settings_ethernet</i>  ' + deviceIP + '</p>\
            </div>\
            <div class="col s5 m5 l5 xl5">\
                <p class="hide-on-small-and-down" id="user"><i class="material-icons">person</i> '+ user +'</p>\
                <p class="hide-on-small-and-down" id="pool"><i class="material-icons">traffic</i> ' + pool + '</p>\
                <p id="ghs-current"><i class="material-icons">insert_chart</i> ' + ghsCurrent + ' GHS</p>\
            </div>\
            <div class="col s3 m3 l3 xl3">\
                <p id="temp-average"><i class="material-icons">whatshot</i> ' + tempAverage + ' C</p>\
                <p id="fan-average"><i class="material-icons">sync</i> ' + fanAverage + ' RPM</p>\
            </div>\
            <div class="col s1 m1 l1 xl1">\
                <p id="status"><a href="/device/' + id + '"><i class="material-icons"> ' + statusIcon + ' </i></a></p>\
            </div>\
        </div>\
    </li>';

    $("#summary-item-list").append(template).hide().fadeIn(300);
}

$(document).ready(function () {
    getSummaryAndRenderWith(summaryItemRender);

    $("#refresh-summary").click(function () {
        activateLoadingBar();
        $("#summary-item-list").empty().append('<li id="summary-error-display" hidden>');
        getSummaryAndRenderWith(summaryItemRender);
    });
});