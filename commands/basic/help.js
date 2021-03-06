const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let sections = [];

    bot.commands.forEach(c => {
        if(!sections.includes(c.help.type)) sections[sections.length] = c.help.type;
    });

    if(args[0] && sections.filter(v=>v.includes(args[0].toLowerCase()))){
        let cmds = [];
        let secs = [];
        sections.filter(v=>v.includes(args[0].toLowerCase())).forEach(sec => {
            if(sec[sec.length-1]==args[0].toLowerCase()){
                cmds = cmds.concat(bot.commands.filter(v=>v.help.type==sec).map(v=>v.help));
            }else{
                if(sec!=[args[0].toLowerCase()]){
                    secs[secs.length] = sec[sec.indexOf(args[0].toLowerCase())+1];
                }
            }
        });


        let helpEmbed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Help | ' + args[0].toLowerCase())

        if(cmds.length>=1){
            Array.from(new Set(cmds)).forEach(c=>{
                helpEmbed.addField(c.usage.replace('{*}', 'bb-'), c.description);
            });
            if(secs.length>=1){
                helpEmbed.addBlankField(false);
            }
        }

        if(secs.length>=1){
            Array.from(new Set(secs)).forEach(sec => {
                helpEmbed.addField(sec, 'bb-help ' + sec);
            });
        }

        message.channel.send(helpEmbed);

    }else{
        let helpEmbed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Help');

        Array.from(new Set(sections.map(v=>v[0]))).forEach(s=>{
            helpEmbed.addField(s, 'bb-help ' + s);
        });

        message.channel.send(helpEmbed);
    }
}

module.exports.help = {
    name: 'help',
    aliases: ['commands', 'cmds'],
    usage: '{*}help <section>',
    type: ['basic'],
    description: 'Learn what this bot can do!'
}

