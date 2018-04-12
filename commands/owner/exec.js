const Discord = require('discord.js');

module.exports.run = function (command, args, message, bot) {
    if (message.author.id == '292377829105205249') {
        require('child_process').exec('cd /app/ && ' + args.join(' '), (error, out) => {
            message.channel.send('```' + out + '```');
        });
    } else {
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'exec',
    aliases: ['execute'],
    usage: '{*}exec <command>',
    type: ['owner'],
    description: 'Execute a command from the command line.'
}