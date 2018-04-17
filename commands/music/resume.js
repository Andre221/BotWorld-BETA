const Discord = require('discord.js');

const yt = require('ytdl-core');

module.exports.run = function(command, args, message, bot){
    if(!bot.music[message.guild.id] || !bot.music[message.guild.id].dispatcher){
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Could not fullfil request!')
        .setDescription('I must be playing music to pause the music!');
        message.channel.send(embed);
    }else{
        bot.music[message.guild.id].dispatcher.resume();
    }
}

module.exports.help = {
    name: 'resume',
    aliases: [],
    usage: '{*}resume',
    type: ['music'],
    description: 'Resumes a song.'
}