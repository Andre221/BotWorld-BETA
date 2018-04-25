function httpGet(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h:" + minutes + "m:" + seconds + "s:" + milliseconds + 'ms';
}

var start = Date.now();
var botUptime = 0;
httpGet('/api/stats', data => {
    data = JSON.parse(data);
    botUptime = data.uptime;
});

setInterval(() => {
    document.getElementById('uptime').innerHTML = msToTime(botUptime + (Date.now() - start));
}, 100)