const Discord = require('discord.js');

module.exports.run = function (command, args, message, bot) {
    if (message.member.hasPermission('MANAGE_NICKNAMES') || message.author.id == '292377829105205249') {
        if(message.guild.me.hasPermission('CHANGE_NICKNAME')){
            if(args[0] && args[0]!='' && args[0]!=' '){
                message.guild.me.setNickname(args.join(' ')).then(m=>{
                    message.reply('Changed nickname!');
                }).catch(e=>{
                    message.reply('Error: couldn\'t change my nickname! :x:');
                });
            }
        }else{
            message.reply('I cannnot change my own nickname! :x:');
        }
    } else {
        message.reply('You have no permission! :x:');
    }
}

module.exports.help = {
    name: 'setnick',
    aliases: [],
    usage: '{*}setnick <nickname>',
    type: ['basic'],
    description: 'Change the bots nickname (Requires ability to change nickname).'
}