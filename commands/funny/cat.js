const Discord = require('discord.js');
const https = require('https');
const request = require('request');


module.exports.run = function (command, args, message, bot) {
    request.get('http://thecatapi.com/api/images/get?format=xml&results_per_page=1', (error, response, body) => {
        var parseString = require('xml2js').parseString;
        parseString(body, function (err, result) {
            let cat = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setDescription('Meow! :cat:')
            .setImage(result.response.data[0].images[0].image[0].url[0]);
            message.channel.send(cat);
        });
    });
}

module.exports.help = {
    name: 'cat',
    aliases: ['kat', 'kit', 'kitty', 'kitten'],
    usage: '{*}cat',
    type: ['funny'],
    description: 'Get a random cat.'
}