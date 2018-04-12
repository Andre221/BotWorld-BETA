const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let dbwClient = process.env.dbwClient;
    let id = '';
    if(message.mentions.users&&message.mentions.users.first()){
        id = message.mentions.users.first().id;
    }else{
        id = bot.user.id;
    }

    message.channel.sendFile('https://dbw-widget.glitch.me/dbl/frame/' + id + '/widget.png');
}

module.exports.help = {
    name: 'dbl',
    aliases: ['dblbot'],
    usage: '{*}dbl <bot mention>',
    type: ['info','bots'],
    description: 'Get a DBW bot!'
}

