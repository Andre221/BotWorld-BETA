const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let sections = [];
    bot.commands.forEach(cmd => {
        if(!sections.includes(cmd.help.type)){
            sections[sections.length] = cmd.help.type;
        }
    });

    if(args[0] && sections.includes(args[0].toLowerCase())){
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
