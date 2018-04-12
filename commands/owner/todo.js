const Discord = require('discord.js');
const fs = require('fs');

const TODO = require('../../storage/TODO.json');

function updateJSON(){
    fs.writeFile(`${process.cwd()}/storage/TODO.json`, JSON.stringify(TODO, null, 2), function (err) {
         if (err) return console.log(err);
    });
}

module.exports.run = function (command, args, message, bot) {
    if(message.author.id == '292377829105205249') {
        if(args[0]=='add'){
            TODO[TODO.length] = args.slice(1).join(' ');
            message.reply('Added');
            updateJSON();
        }else if(args[0]=='view'){
            let desc = '';
            let i =1;
            TODO.forEach(to => {
                desc+=i + '. ' + to + '\n';
                i++;
            });
            let todoEmbed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setDescription(desc ? desc : 'None');
            message.channel.send(todoEmbed);
        }else if(args[0]=='remove'){
            if(args[1]==Number(args[1])){
                TODO.splice(Number(args[1]-1), 1);
                    message.reply('Removed');
                    updateJSON();
            }else{
                message.reply('Invalid number');
            }
        }else{
            message.reply(module.exports.help.usage);
        }
    }else{
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'todo',
    aliases: ['td'],
    usage: '{*}todo <view | add <what to do> | remove <number>>',
    type: ['owner'],
    description: 'Todo list for the bot owner.'
}