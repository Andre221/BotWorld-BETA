const Discord = require('discord.js');


module.exports.run = function (command, args, message, bot) {
    if(message.author.id == '292377829105205249'||message.author.id=='138657194986962945'||message.author.id=='172571295077105664'||message.author.id=='284122164582416385'||message.author.id=='359794248570109972'||message.author.id=='266277541646434305') {
        if(args.join(' ')==undefined||args.join(' ')==''){
            message.channel.send('bb-saycombo <function>')
        }else{
            if(message.mentions.users && message.mentions.users.first()){
                return message.reply('Pong U');
            }
            bot.saycombo[message.author.id] = {func: args.join(' ')};
            message.channel.send('Say exit to close!');
        }
    }else{
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'saycombo',
    aliases: ['sc'],
    usage: '{*}saycombo <function>',
    type: 'owner',
    description: 'Say with additions to your messages ex. {c}help if you sent - would be -help'
}