const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let pingEmbed = new Discord.RichEmbed()
    .setColor('#AABBED')
    .setTitle(command=='ping' ? ':ping_pong: Pong' : ':ping_pong: Ping')
    .setDescription(Math.round(bot.ping) + ' miliseconds!');
    message.channel.send(pingEmbed);
}

module.exports.help = {
    name: 'ping',
    aliases: ['pong'],
    usage: '{*}ping',
    type: 'basic',
    description: 'Check how many miliseconds the bot takes to respond.'
}

