const express = require('express');
let app = express();

const economy = require('../plugins/economy.js');

let bot;

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

app.use('/api/economy', require('./api/economy.js'));

app.use('/api/members', require('./api/members.js'));

app.use('/images', require('./images.js'));

app.get('/', (req, res) => {
    res.render(process.cwd() + '/web/htmlCss/index.ejs', {});
});

app.get('/styles', (req, res) => {
    res.sendFile(process.cwd() + '/web/htmlCss/index.css');
});

app.get('/economy/leaderboards/:id', (req, res) => {
    let guild = bot.guilds.get(req.params.id);
    if(!guild) return res.render('404.ejs');
    
    //Sort users by balance
    let out = [];
    guild.members.filter(member => economy.getBalance(member.user.id)!=0).forEach(member => {

        out[out.length] = {
            tag: member.user.tag,
            username: member.user.username,
            id: member.user.id,
            avatar: member.user.displayAvatarURL.split('?')[0],
            balance: economy.getBalance(member.user.id)
        };
    });
    out = out.sort(function(a, b){return b.balance - a.balance})
    res.render(process.cwd() + '/web/htmlCss/leaderboard/index.ejs', {guild: guild, memberData: out});
});
app.get('/leaderstyles', (req, res) => {
    res.sendFile(process.cwd() + '/web/htmlCss/leaderboard/index.css');
});

app.get('/stats', (req, res) => {
    res.render(process.cwd() + '/web/htmlCss/stats/index.ejs', {guildCount: bot.guilds.size, uptime: msToTime(bot.uptime), ping: bot.ping, userCount: bot.users.size, messages: bot.messages});
});
app.get('/api/stats', (req, res) => {
    res.send({guildCount: bot.guilds.size, uptime: msToTime(bot.uptime), ping: bot.ping, userCount: bot.users.size, messages: bot.messages});
});

app.get('/stats/styles', (req, res) => {
    res.sendFile(process.cwd() + '/web/htmlCss/stats/index.css');
});

app.get('/stats/js', (req, res) => {
    res.sendFile(process.cwd() + '/web/htmlCss/stats/index.js');
});

app.listen(1111);

module.exports = function(client){
    bot = client;
}