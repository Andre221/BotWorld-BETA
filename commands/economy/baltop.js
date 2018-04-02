const Discord = require('discord.js');
const https = require('https');

module.exports.run = function(command, args, message, bot){
    let embed = new Discord.RichEmbed()
    .setColor('#AABBED')
    .setTitle('Balance Leaderboard!')
    .setDescription(`The may find this guilds leaderboard [**__here__**](https://botworld-beta.glitch.me/economy/leaderboards/${message.guild.id}).`)
    message.channel.send(embed);
}

module.exports.help = {
    name: 'baltop',
    aliases: ['balancetop'],
    usage: '{*}baltop',
    type: 'funny',
    description: 'Get the guilds leaderboard of balances.'
}

