const Discord = require('discord.js');
const https = require('https');

module.exports.run = function(command, args, message, bot){
    https.get('https://nekos.life/api/why', res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          body = JSON.parse(body);

          let embed = new Discord.RichEmbed()
          .setColor('#AABBED')
          .setTitle('Why?')
          .setDescription(body.why.substr(0, 1).toUpperCase() + body.why.substr(1))
          .setFooter('Powered by nekos.life!');
          message.channel.send(embed);
        });
      });
}

module.exports.help = {
    name: 'why',
    aliases: ['?'],
    usage: '{*}why',
    type: ['funny'],
    description: 'Why???'
}

