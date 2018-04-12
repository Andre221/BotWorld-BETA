//https://discord.gg/7BFUx6p
const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let serv = bot.guilds.get('430508113058201621');
    let embed = new Discord.RichEmbed()
    .setColor('#AABBED')
    .setTitle('Official discord!')
    .setDescription(`You may my support server, ${serv.name}, [**__here__**](https://botworld-beta.glitch.me/server).\n\n**Current Stats:**\nBots: ${serv.members.filter(m=>m.user.bot).size}\nUsers: ${serv.members.filter(m=>!m.user.bot).size}\n\n**What is it?:**\nA server for support on NicksWorlds projects, and a place for generaly playing with programming projects.`)
    message.channel.send(embed);
}

module.exports.help = {
    name: 'support',
    aliases: ['server'],
    usage: '{*}support',
    type: ['basic'],
    description: 'Get a link to my support server.'
}

