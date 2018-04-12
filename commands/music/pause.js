const Discord = require('discord.js');

const yt = require('ytdl-core');

module.exports.run = function(command, args, message, bot){
    if(!bot.music[message.guild.id] || !bot.music[message.guild.id].dispatcher){
        
    }else{
        bot.music[message.guild.id].dispatcher.pause();
    }
}

module.exports.help = {
    name: 'pause',
    aliases: [],
    usage: '{*}pause',
    type: ['music'],
    description: 'Pause a song.'
}