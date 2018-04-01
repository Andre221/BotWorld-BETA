const Discord = require('discord.js');

const economy = require('../../plugins/economy.js');

module.exports.run = function(command, args, message, bot){
    if(message.mentions.users.first()){
        let embed = new Discord.RichEmbed()
        .setAuthor(message.mentions.users.first().tag, message.mentions.users.first().displayAvatarURL.split('?')[0])
        .setColor('#AABBED')
        .setTitle('Balance')
        .addField('Coins:', economy.getBalance(message.mentions.users.first().id).toLocaleString());
        message.channel.send(embed);
    }else{
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL.split('?')[0])
        .setColor('#AABBED')
        .setTitle('Balance')
        .addField('Coins:', economy.getBalance(message.author.id).toLocaleString());
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'bal',
    aliases: ['balance', 'money'],
    usage: '{*}balance <Mention (optional)>',
    type: 'economy',
    description: 'Check a users balance.'
}