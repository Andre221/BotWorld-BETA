const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    let vc = message.member.voiceChannel;
    if(vc){
        vc.join().then(voiceconnection =>{
            let embed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setTitle('Joined voice channel ' + vc.name + '!');
            message.channel.send(embed);
        });
    }else{
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Could not fullfil request!')
        .setDescription('You must join a voice channel before executing this command!');
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'join',
    aliases: ['come'],
    usage: '{*}join',
    type: ['music'],
    description: 'Get bot to join your voice channel.'
}