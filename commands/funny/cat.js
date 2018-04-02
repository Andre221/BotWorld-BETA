const Discord = require('discord.js');
const https = require('https');

module.exports.run = function(command, args, message, bot){
    message.channel.sendFile('http://thecatapi.com/api/images/get?format=src&type=gif');
}

module.exports.help = {
    name: 'cat',
    aliases: ['?'],
    usage: '{*}cat',
    type: 'funny',
    description: 'Get a cat!'
}

