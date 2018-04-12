const Discord = require('discord.js');

const economy = require('../../plugins/economy.js');

module.exports.run = function(command, args, message, bot){
    let result = economy.payday(message.author.id);
    if(typeof result == 'string'){
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Please wait...')
        .setDescription('You can use this again in ' + result);
        message.channel.send(embed);
    }else{
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('500 coins gained!')
        .setDescription('You now have ' + economy.getBalance(message.author.id).toLocaleString() + ' coins!');
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'payday',
    aliases: ['pd'],
    usage: '{*}payday',
    type: ['economy'],
    description: 'Get 500 coins every 5 minutes.'
}