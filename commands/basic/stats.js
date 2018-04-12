const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let embed = new Discord.RichEmbed()
    .setColor('#AABBED')
    .setTitle('Bot Stats!')
    .setDescription(`You may find live updating status on this bot [**__here__**](https://botworld-beta.glitch.me/stats).`)
    message.channel.send(embed);
}

module.exports.help = {
    name: 'stats',
    aliases: ['info'],
    usage: '{*}stats',
    type: ['basic'],
    description: 'Get where you can check my stats **LIVE**.'
}

