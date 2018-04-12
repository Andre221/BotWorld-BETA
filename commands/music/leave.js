const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let vc = message.member.voiceChannel;
    if(message.guild.me.voiceChannel == vc){
        if(vc){
            vc.leave();
            let embed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setTitle('Left voice channel ' + vc.name + '!');
            message.channel.send(embed);
        }
    }else{
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Could not fullfil request!')
        .setDescription('You must be in the same voice channel as me!');
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'leave',
    aliases: ['go-away'],
    usage: '{*}leave',
    type: ['music'],
    description: 'Get bot to leave your voice channel.'
}