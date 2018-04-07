const Discord = require('discord.js');

module.exports.run = function (command, args, message, bot) {
    if (message.member.hasPermission('MANAGE_MESSAGES') || message.author.id == '292377829105205249') {
        message.channel.fetchMessages({limit: 100}).then(messages => {
            let toDelete = messages.filter(msg => {return msg.author.id==bot.user.id});
            toDelete.forEach(msg => {
                msg.delete();
            });
        });
        message.reply(`Cleaned!`).then(msg => {
            setTimeout(() => {
                msg.delete();
            }, 500);
        });
    } else {
        message.reply('No permission! :x:');
    }
}

module.exports.help = {
    name: 'clean',
    aliases: [],
    usage: '{*}clean',
    type: 'basic',
    description: 'Delete the bots responses in the last 100 messages.'
}

