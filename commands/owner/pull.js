const Discord = require('discord.js');


module.exports.run = function (command, args, message, bot) {
    if(message.author.id == '292377829105205249') {
        require('child_process').exec('cd /app/ && git pull origin master && refresh', (error, out) => {
            message.channel.send('```' + out + '```');
        });
    }else{
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'pull',
    aliases: ['p'],
    usage: '{*}pull',
    type: 'owner',
    description: 'Pull from origin/master.'
}