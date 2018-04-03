const tts = require('voice-rss-tts');
const Discord = require('discord.js');
const request = require('request');

module.exports.run = function (command, args, message, bot) {
    tts.speech({
        key: process.env.TTS,
        src: args.join(' '),
        hl: 'en-us',
        ssl: true,
        callback: function (error, content) {
            message.guild.voiceConnection.playStream(content);
        }
    });
}

module.exports.help = {
    name: 'tts',
    aliases: ['voice-rss'],
    usage: '{*}tts <text>',
    type: 'music',
    description: 'Say something'
}