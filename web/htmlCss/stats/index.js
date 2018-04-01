function httpGet(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
setInterval(function(){
    httpGet('/api/stats', data => {
        data = JSON.parse(data);
        document.getElementById('guild-count').innerHTML = 'Guild Count: ' + data.guildCount;
        document.getElementById('user-count').innerHTML = 'User Count: ' + data.userCount;
        document.getElementById('uptime').innerHTML = 'Uptime: ' + data.uptime;
        document.getElementById('ping').innerHTML = 'Ping: ' + data.ping;

        document.getElementById('message-user').innerHTML = 'User Messages: ' + data.messages.user;
        document.getElementById('message-bot').innerHTML = 'Bot Messages: ' + data.messages.bot;
        document.getElementById('message-self').innerHTML = 'Self Messages: ' + data.messages.self;
    });
}, 100);