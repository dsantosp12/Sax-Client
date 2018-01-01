function getFullDeviceStatus(render) {
    var baseURL = getSaxURL();
    var fullDeviceStatusURL = baseURL + "/devices/status/" + deviceID;

    $.getJSON(fullDeviceStatusURL, function (data) {
        render(data);
    }).done(function () {
        $("#device-error-display").replaceWith('<h5 id="device-error-display" hidden></h5>');
        loadingBarComplete();
    }).fail(function () {
        $("#device-error-display").replaceWith(
            '<h5 class="center" id="device-error-display">Could connect to this device, refreshing in 3 seconds...</h5>');
        $("#device-error-display").fadeTo("fast", 0.1);
        $("#device-error-display").fadeTo("fast", 1);

        setTimeout(function() {
            $("#refresh-device-detail").click();
        }, 3000);
    });
}

function deviceFullStatusRender(status) {

    var fanTemplate = "";

    if (status.fans){
        for (var i = 0; i < status.fans.length; i++) {
            fanTemplate += '<p id="fan-' + i + '"><i class="material-icons">sync</i> <b>Fan '+ (i+1) + ': </b>' + status.fans[i] + ' RPM</p>';
        }
    } else {
        fanTemplate += "<p>Couldn't get fans data</p>"
    }

    var tempTemplate = "";

    if (status.temp) {
        for (var i = 0; i < status.temps.length; i++) {
            tempTemplate += '<p id="temp-' + i + '"><i class="material-icons">whatshot</i> <b>Temp ' + (i + 1) + ': </b> ' + status.temps[i] + ' C</p>';
        }
    } else {
        tempTemplate += "<p>Couldn't get temperature data</p>"
    }

    var chainACSTemplate = "";

    if (status.chain_acs) {
        for (var i = 0; i < status.chain_acs.length; i++) {

            var chainDisplay = '';
            var chain = status.chain_acs[i];

            for (var j = 0; j < chain.length; j++) {
                if (!(chain[j] === " ")) {
                    chainDisplay += '<b><i class="material-icons" style="font-size: 1rem;">radio_button_unchecked</i></b>';
                } else {
                    chainDisplay += "\t\t ";
                }
            }

            chainACSTemplate += "<p><i class='material-icons' style='margin-right: 10px;'>all_inclusive</i>" + chainDisplay + "</p>";
        }
    } else {
      chainACSTemplate += "<p>Couldn't get chain ACS data</p>";
    }

    // TODO: Figure out what the timeElapsed from API means
    // var timeElapsed = new Date(status.time_elapsed*1000);
    // var timeElapsedFormat = timeElapsed.toUTCString();
    // // var timeElapsedFormat = timeElapsed.getHours() + ":" + timeElapsed.getMinutes() + ":" + timeElapsed.getSeconds();
    // <p id="time-elapsed"><i class="material-icons">access_time</i>  ' + timeElapsedFormat + '</p>\

    var template =
    '<div class="row">\
        <div class="col s3 m3 l3 xl3">\
            <h5>Details</h5>\
            <p id="device-name"><i class="material-icons">developer_board</i>  ' + status.device.device_name + '</p>\
            <p id="device-ip"><i class="material-icons">settings_ethernet</i>  ' + status.device.device_ip + '</p>\
        </div>\
        <div class="col s3 m3 l3 xl3">\
            <h5>Status</h5>\
            <p class="hide-on-small-and-down" id="current-ghs"><i class="material-icons">insert_chart</i> <b>Current GHS:</b> '+ status.ghs_current +' GHS</p>\
            <p class="hide-on-small-and-down" id="average-ghs"><i class="material-icons">insert_chart</i> <b>Average GHS:</b> '+ status.ghs_average+' GHS</p>\
            <p class="hide-on-small-and-down" id="frequency"><i class="material-icons">graphic_eq</i> <b>Frequency: </b>' + status.frequency + ' Hz</p>\
        </div>\
        <div class="col s3 m3 l3 xl3">\
            <h5>Temperature</h5>\
            <p id="temp-max"><i class="material-icons">whatshot</i> <b>Temp Max:</b> ' + status.temp_max + ' C</p>\
            <p id="temp-average"><i class="material-icons">whatshot</i> <b>Temp Avg:</b> ' + status.temp_average + ' C</p>\
            ' + tempTemplate + '\
        </div>\
        <div class="col s3 m3 l3 xl3">\
        <h5>Fans</h5>\
        ' + fanTemplate +'\
        </div>\
    </div>\
    <div class="row">\
        <div class="center col s12 m12 l12 xl12">\
            <h5>Chain ACS</h5>\
            ' + chainACSTemplate + '\
        </div>\
    </div>';

    $("#device-detail").append(template).hide().fadeIn(300);
}

$(document).ready(function () {
    getFullDeviceStatus(deviceFullStatusRender);

    $("#refresh-device-detail").click(function () {
        activateLoadingBar();
        $("#device-detail").empty().append('<h5 id="device-error-display" hidden></h5>');
        getFullDeviceStatus(deviceFullStatusRender);
    });
});