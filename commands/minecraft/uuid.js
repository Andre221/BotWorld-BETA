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
                    message.reply(`${body.name}'s UUID is ${body.id}`)
                }
            }catch(err){
                message.reply('Invalid user!');
            }
        }
    );
}

module.exports.help = {
    name: 'mcid',
    aliases: ['mcuuid'],
    usage: '{*}mcid <username>',
    type: 'games=>test=>minecraft',
    description: 'Get a users UUID'
}