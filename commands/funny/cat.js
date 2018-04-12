const Discord = require('discord.js');
const https = require('https');

module.exports.run = function (command, args, message, bot) {
    const http = require("http");

    const url =
        'http://aws.random.cat/meow';

    http.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            message.channel.sendFile(body.file);
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

