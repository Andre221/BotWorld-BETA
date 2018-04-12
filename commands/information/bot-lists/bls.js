const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let id = '';
    if(message.mentions.users&&message.mentions.users.first()){
        id = message.mentions.users.first().id;
    }else{
        id = bot.user.id;
    }

    message.channel.sendFile('https://dbw-widget.glitch.me/bls/frame/' + id + '/widget.png');
}

module.exports.help = {
    name: 'bls',
    aliases: ['blsbot'],
    usage: '{*}bls <bot mention>',
    type: ['info','bots'],
    description: 'Get a BLS bot!'
}

