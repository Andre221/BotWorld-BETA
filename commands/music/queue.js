const Discord = require('discord.js');

const yt = require('ytdl-core');


const search = require('youtube-search');
var opts = {
    maxResults: 1,
    key: process.env.YT
};


function createEmbed(song, author, length) {
    let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setThumbnail(author.icon)
        .setTitle('Song Queued!')
        .addField('Song:', `[${song.title}](${song.url})`, true)
        .addField('Author:', `[${author.name}](${author.url})`, true)
        .addField('Length', length);
    return embed;
}

module.exports.run = function (command, args, message, bot) {
    if (!bot.music[message.guild.id]) bot.music[message.guild.id] = { queue: [] };
    yt.getInfo(args[0], (err, info) => {
        if (err) {
            search(args.join(' '), opts, function (err, results) {
                if (err) return console.log(err);
                if (results[0].title == undefined) {
                    message.channel.send('There were no results for **' + args.join(' ') + '**');
                } else {
                    yt.getInfo(results[0].link, (err, vid) => {
                        var date = new Date(null);
                        date.setSeconds(vid.length_seconds);
                        var result = date.toISOString().substr(11, 5);
                        message.channel.send(createEmbed({title: vid.title, url: vid.video_url}, {name: vid.author.name, url: vid.author.channel_url, icon: vid.author.avatar}, result + ' Hours Long.'));
                        bot.music[message.guild.id].queue[bot.music[message.guild.id].queue.length] = {from: message.author, info: vid};
                    });
                }
            });
        } else {
            var date = new Date(null);
            date.setSeconds(info.length_seconds);
            var result = date.toISOString().substr(11, 5);
            message.channel.send(createEmbed({title: info.title, url: info.video_url}, {name: info.author.name, url: info.author.channel_url, icon: info.author.avatar}, result + ' Hours Long.'));
            bot.music[message.guild.id].queue[bot.music[message.guild.id].queue.length] = {from: message.author, info: info};
        }
    });
}

module.exports.help = {
    name: 'queue',
    aliases: [],
    usage: '{*}queue <link or search>',
    type: ['music'],
    description: 'Queue a song.'
}