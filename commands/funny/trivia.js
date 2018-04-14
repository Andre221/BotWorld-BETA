const Discord = require('discord.js');
const https = require('https');

const economy = require('../../plugins/economy.js');
const request = require('request');

var shuffle = a => a.length ? a.splice(~~(Math.random()*a.length),1).concat(shuffle(a)): a;

function decode(str){
    return str.replaceAll('&quot;', '"').replaceAll('&#039;', "'");
}

module.exports.run = function (command, args, message, bot) {
    request.get('https://opentdb.com/api.php?amount=1&type=multiple', (error, response, body) => {
        body = JSON.parse(body);
        body.results[0].question = decode(body.results[0].question);
        let answers = shuffle(body.results[0].incorrect_answers.map(v=>decode(v)).concat([decode(body.results[0].correct_answer)]));
        let aText = '';
        for(var i=0;i<answers.length;i++){
            aText+= i+1 + '. ' + answers[i] + '\n'
        }
        let start = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle(body.results[0].category + ':')
        .setDescription(`**${body.results[0].question}**\n${aText}`)
        message.channel.send(start);
        message.awaitNext({q: body.results[0], a:answers}, message.channel.id, (msg,s) => {
            if(Number(msg.content)==msg.content){
                if([1,2,3,4].includes(Number(msg.content))){
                    if(s.a[Number(msg.content)-1]==s.q.correct_answer){
                        let embed = new Discord.RichEmbed()
                        .setColor('#197F00')
                        .setTitle('Correct!')
                        .setDescription('**' + s.q.correct_answer + '** was the correct answer! Good job +$100!')
                        .setFooter(s.q.question);
                        msg.channel.send(embed);
                        economy.addBalance(msg.author.id, 100);
                        msg.end();
                    }else{
                        let embed = new Discord.RichEmbed()
                        .setColor('#7F0019')
                        .setTitle('Incorrect!')
                        .setDescription('**' + s.q.correct_answer + '** was the correct answer! Try again next time!')
                        .setFooter(s.q.question);
                        msg.channel.send(embed);
                        msg.end();
                    }
                }else{
                    let embed = new Discord.RichEmbed()
                    .setColor('#7F0019')
                    .setTitle('Invalid answer!')
                    .setDescription('Your message must be a number between 1 and 4.');
                    msg.channel.send(embed);
                }
            }else{
                let embed = new Discord.RichEmbed()
                .setColor('#7F0019')
                .setTitle('Invalid answer!')
                .setDescription('Your message must be a number between 1 and 4.');
                msg.channel.send(embed);
            }
        }, true);
    });
}

module.exports.help = {
    name: 'trivia',
    aliases: ['quiz'],
    usage: '{*}trivia',
    type: ['funny'],
    description: 'Quiz yourself.'
}