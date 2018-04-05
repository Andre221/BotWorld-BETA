const Discord = require('discord.js');

const economy = require('../../plugins/economy.js');

const https = require('https');
const http = require('http');

function getLocal(path, callback) {
    http.get('http://localhost:1111' + path, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            callback(body);
        });
    });
}

const request = require('request');
function haste(code, lang = ''){
    return new Promise((resolve, reject) => {
        request(
            {
                method: "POST",
                url: 'https://hastebin.com/documents',
                body: code
            },
            function (err, res, data) {
                return resolve(`https://hastebin.com/${data.key}${lang && `.${lang}`}`);
            }
        );
    });
}

module.exports.run = function (command, args, message, bot) {
    let dbwClient = process.env.dbwClient;
    function clean(text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    if (message.author.id == '292377829105205249') {
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            let rawEvaled = evaled;
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, { showHidden: false, depth: 3 });
            let cleaned = clean(evaled);
            if (args[0] != undefined && args[0] != '') {
                try {
                    let embed = new Discord.RichEmbed()
                        .setColor('#AABBED')
                        .setTitle('Evaluation')
                        .addField('Evaluated', '```js\n' + code + '```')
                        .addField('Result', '```xl\n' + cleaned + '```')
                        .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```');
                    return message.channel.send(embed);
                } catch (err) {
                    haste(cleaned, 'js').then(link => {
                        let embed = new Discord.RichEmbed()
                            .setColor('#AABBED')
                            .setTitle('Evaluation')
                            .addField('Evaluated', '```js\n' + args.join(" ") + '```')
                            .addField('Result', '[```xl\n' + 'CLICK' + '```](' + link + ')')
                            .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```')
                        return message.channel.send(embed);
                    });
                }
            } else {
                try {
                    let embed = new Discord.RichEmbed()
                        .setColor('#AABBED')
                        .setTitle('Evaluation')
                        .addField('Evaluated', '```js\nundefined```')
                        .addField('Result', '```xl\n' + cleaned + '```')
                        .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```');
                    return message.channel.send(embed);
                } catch (err) {
                    haste(cleaned, 'js').then(link => {
                        let embed = new Discord.RichEmbed()
                            .setColor('#AABBED')
                            .setTitle('Evaluation')
                            .addField('Evaluated', '```js\nundefined```')
                            .addField('Result', '[```xl\n' + 'CLICK' + '```](' + link + ')')
                            .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```')
                        return message.channel.send(embed);
                    });
                }
            }
        } catch (err) {
            let embed = new Discord.RichEmbed()
                .setColor('#770306')
                .setTitle('Error')
                .addField('Evaluated', '```js\n' + args.join(" ") + '```')
                .addField('Result', '```xl\n' + err.toString() + '```')
                .addField('Type', '```js\nError```')
            return message.channel.send(embed).catch(err => {
                haste(err, 'js').then(link => {
                    let embed = new Discord.RichEmbed()
                        .setColor('#770306')
                        .setTitle('Evaluation')
                        .addField('Evaluated', '```js\n' + args.join(" ") + '```')
                        .addField('Result', '[```xl\n' + 'CLICK' + '```](' + link + ')')
                        .addField('Type', '```js\nError```');
                    return message.channel.send(embed);
                });
            });
        }
        return;
    } else {
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'eval',
    aliases: ['evaluate'],
    usage: '{*}eval <Code>',
    type: 'owner',
    description: 'Evaluate code'
}