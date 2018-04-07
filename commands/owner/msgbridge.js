const Discord = require('discord.js');

module.exports.run = function (command, args, message, bot) {
    if (message.author.id == '292377829105205249') {
        bot.bridges[message.author.id] = {to: args[0], from: message.channel.id};
        message.channel.send('Opened bridge to ' + bot.channels.get(args[0]) ? bot.channels[args[0]].name : 'Non-existant channel');
    } else {
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'bridge',
    aliases: ['msgbridge'],
    usage: '{*}bridge <channel id>',
    type: 'owner',
    description: 'Connect 2 channels.'
}