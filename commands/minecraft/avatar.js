const Discord = require('discord.js');
const request = require('request');

module.exports.run = function(command, args, message, bot){
    if(args[0]){
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
                        let avatarEmbed = new Discord.RichEmbed()
                        .setColor('#AABBED')
                        .setTitle(body.name + '\'s Avatar')
                        .setImage('https://crafatar.com/renders/body/' + body.id + '.png')
                        .setFooter('In response to bb-mcavatar', message.author.displayAvatarURL.split('?')[0]);
                        message.channel.send(avatarEmbed);
                    }
                }catch(err){
                    message.reply('Invalid user!');
                }
            }
        );
    }else{
        message.channel.send('Please say the name of the user you wish to get the avatar of...');
        message.awaitNext({}, message.channel.id, (msg) => {
            msg.end();
            request(
                {
                    url : 'https://api.mojang.com/users/profiles/minecraft/' + msg.content
                },
                function (error, response, body) {
                    if(error) return reject(error);
                    try{
                        body = JSON.parse(body);
                        if(body.error) return reject(body.message);
                        if(!body.name){
                            message.reply('Invalid user!');
                        }else{
                            let avatarEmbed = new Discord.RichEmbed()
                            .setColor('#AABBED')
                            .setTitle(body.name + '\'s Avatar')
                            .setImage('https://crafatar.com/renders/body/' + body.id + '.png')
                            .setFooter('In response to bb-mcavatar', message.author.displayAvatarURL.split('?')[0]);
                            message.channel.send(avatarEmbed);
                        }
                    }catch(err){
                        message.reply('Invalid user!');
                    }
                }
            );
        });
    }
}

module.exports.help = {
    name: 'mcavatar',
    aliases: [],
    usage: '{*}mcavatar',
    type: 'games=>minecraft',
    description: 'Get a users avatar.'
}