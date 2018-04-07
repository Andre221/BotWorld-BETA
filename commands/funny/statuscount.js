const Discord = require('discord.js');
const https = require('https');

module.exports.run = function (command, args, message, bot) {
    message.channel.send('Working...').then(msg => {
        let presences = [];
        let members = message.guild.members.filter(m => m.user.presence.game && m.user.presence.game.name != undefined)
        members.forEach(m => {
            presences[presences.length] = m.user.presence.game.name;
        });
        let set = new Set(presences);
        let count = [];
        set.forEach(p => {
            count[count.length] = { name: p, count: members.filter(m => m.user.presence.game && m.user.presence.game.name == p).size };
        });
        msg.edit(count.sort((a, b) => { return b.count - a.count; }).slice(0, 9).map(v => { return 'Name: ' + v.name + '\nCount:' + v.count }));
    });
}

module.exports.help = {
    name: 'statuscount',
    aliases: ['sc'],
    usage: '{*}statuscount',
    type: 'funny',
    description: 'Get guild status count.'
}

