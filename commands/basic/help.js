const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let sections = [];
    bot.commands.forEach(cmd => {
        cmd.help.type.split('=>').forEach(v=>{
            if(!sections.includes(v)) sections[sections.length] = v;
        });
    });

    if(args[0] && sections.includes(args[0].toLowerCase())){
        let sub = false;
        bot.commands.forEach(cmd => {
            if(cmd.help.type.split('=>')[0] == args[0].toLowerCase() && cmd.help.type.split('=>').length >1){
                sub = true;
            }
        });
        if(!sub){
            let helpEmbed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setTitle('Help | ' + args[0])
            .setDescription('List of commands:');
            bot.commands.forEach(cmd => {
                if(args[0].toLowerCase()==cmd.help.type){
                    helpEmbed.addField(cmd.help.usage.replace('{*}', 'bb-'), cmd.help.description);
                }
            });
            message.channel.send(helpEmbed);
        }else{
            let subs = [];
            bot.commands.forEach(cmd => {
                if(cmd.help.type.split('=>')[0] == args[0].toLowerCase() && cmd.help.type.split('=>').length >1){
                    if(!subs.includes(cmd.help.type.split('=>')[0])) subs[subs.length] = cmd.help.type.split('=>')[0];
                }
            });

            let helpEmbed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setTitle('Help | Sections of ' + args[0].toLowerCase())
            .setDescription('List of sections:');
            if(subs.length>=1){
                subs.forEach(section => {
                    helpEmbed.addField(section, 'bb-help ' + section);
                });
            }else{
                subs = [];
                bot.commands.forEach(cmd => {
                    if(cmd.help.type.split('=>')[1] == args[0].toLowerCase() && cmd.help.type.split('=>').length >1){
                        if(!subs.includes(cmd.help.type.split('=>')[1])) subs[subs.length] = cmd.help.type.split('=>')[1];
                    }
                });
            }
            message.channel.send(helpEmbed);
        }
    }else{
        let helpEmbed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Help | Sections')
        .setDescription('List of sections:');
        sections.forEach(section => {
            helpEmbed.addField(section, 'bb-help ' + section);
        });
        message.channel.send(helpEmbed);
    }
}

module.exports.help = {
    name: 'help',
    aliases: ['commands', 'cmds'],
    usage: '{*}help <section>',
    type: 'basic',
    description: 'Learn what this bot can do!'
}

