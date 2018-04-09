let a = 'abcdefghijklmnopqrstuvwxyz'.split('');
const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    if(args[0]=='encode'){
        if(args[1]){
            let embed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setTitle('Encoded Message!')
            .setDescription(args.slice(1).join(' ').replace(/[A-z]/g, (c)=>{return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);}));
            message.channel.send(embed);
        }else{
            message.reply('Cannot encode nothing');
        }
    }
}

module.exports.help = {
    name: 'rot13',
    aliases: ['ebg13'],
    usage: '{*}rot13 <encode|decode> <text>',
    type: 'cryptography',
    description: 'Encode/Decode ROT13'
}

