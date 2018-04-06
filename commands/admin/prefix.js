const Discord = require('discord.js');

module.exports.run = function(command, args, message, bot){
    if(args[0]=='get'){
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle(message.guild.name + '\'s Prefix')
        .setDescription('The prefix in this server is: ' + process.DB.prefixes.get('servers').get(message.guild.id).value() ? process.DB.prefixes.get('servers').get(message.guild.id).value() : 'None (No custom prefix set)');
    }else if(args[0]=='set'){
        if(message.member.hasPermission('MANAGE_MESSAGES') || message.author.id=='292377829105205249'){
            if(args[1]){
                process.DB.prefixes.get('servers').set(message.guild.id, args[1]).write();
                message.reply(`Set server prefix to "${args[1]}"`);
            }
        }else{
            message.reply('No permission! :x:');
        }
    }
}

module.exports.help = {
    name: 'prefix',
    aliases: ['pre'],
    usage: '{*}prefix <get | set>',
    type: 'basic',
    description: 'Get or set the bots prefix!'
}

