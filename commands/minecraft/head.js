const Discord = require('discord.js');
const request = require('request');

module.exports.run = function(command, args, message, bot){
    request(
        {
            url : 'https://api.mojang.com/users/profiles/minecraft/' + args[0]
        },
        function (error, response, body) {
            if(error) return reject(error);
            try{
                body = JSON.parse(body);
                if(body.error) return reject(body.message);
                if(!body.name){
                    message.reply('Invalid user!');
                }else{
                    message.channel.sendFile('https://crafatar.com/renders/head/' + body.id + '.png');
                }
            }catch(err){
                message.reply('Invalid user!');
            }
        }
    );
}

module.exports.help = {
    name: 'mchead',
    aliases: [],
    usage: '{*}mchead <username>',
    type: 'games=>minecraft',
    description: 'Get a users head.'
}