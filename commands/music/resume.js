const Discord = require('discord.js');

const yt = require('ytdl-core');

module.exports.run = function(command, args, message, bot){
    if(!bot.music[message.guild.id] || !bot.music[message.guild.id].dispatcher){
        
    }else{
        bot.music[message.guild.id].dispatcher.resume();
    }
}

module.exports.help = {
    name: 'resume',
    aliases: [],
    usage: '{*}resume',
    type: 'music',
    description: 'Resumes a song.'
}