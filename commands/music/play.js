const Discord = require('discord.js');

const yt = require('ytdl-core');

function createEmbed(song, author, length, message) {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL.split('?')[0])
        .setColor('#AABBED')
        .setThumbnail(author.icon)
        .setTitle('Now Playing!')
        .addField('Song:', `[${song.title}](${song.url})`, true)
        .addField('Author:', `[${author.name}](${author.url})`, true)
        .addField('Length', length);
    return embed;
}

function play(bot, message, songs){
    if(!songs[0]||!message.guild.voiceConnection){
        if(message.guild.me.voiceChannel!=undefined){
            message.guild.me.voiceChannel.leave();
            message.channel.send('The queue has emptied, I shall now leave this voice channel. Queue more music with the queue command.');
        }
    }else{
        var date = new Date(null);
        date.setSeconds(songs[0].info.length_seconds);
        var result = date.toISOString().substr(11, 5);
        message.channel.send(createEmbed({title: songs[0].info.title, url: songs[0].info.video_url}, {name: songs[0].info.author.name, url: songs[0].info.author.channel_url, icon: songs[0].info.author.avatar}, result + ' Hours Long.', message));

        bot.music[message.guild.id].dispatcher = message.guild.voiceConnection.playStream(yt(songs[0].info.video_url, {audioonly: true}), {passes: 5});

        bot.music[message.guild.id].dispatcher.on('end', () => {
            setTimeout(() => {
                bot.music[message.guild.id].queue.shift()
                play(bot, message, bot.music[message.guild.id].queue);
            }, 1000);
        });
    }
}

module.exports.run = function(command, args, message, bot){
    if(!bot.music[message.guild.id] || !bot.music[message.guild.id].queue[0]){
        let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('The queue is empty!')
        .setDescription('To play something you must first queue it using the queue command!')
        message.channel.send(embed);
    }else{
        if(!message.guild.voiceConnection){
            let vc = message.member.voiceChannel;
            if(vc){
                vc.join().then(voiceconnection =>{
                    let embed = new Discord.RichEmbed()
                    .setColor('#AABBED')
                    .setTitle('Joined voice channel ' + vc.name + '!');
                    message.channel.send(embed);
                    play(bot, message, bot.music[message.guild.id].queue);
                });
            }else{
                let embed = new Discord.RichEmbed()
                .setColor('#AABBED')
                .setTitle('Could not fullfil request!')
                .setDescription('You must join a voice channel before executing this command!');
                message.channel.send(embed);
            }
        }else{
            play(bot, message, bot.music[message.guild.id].queue);
        }
    }
}

module.exports.help = {
    name: 'play',
    aliases: [],
    usage: '{*}play',
    type: ['music'],
    description: 'Start the music!'
}