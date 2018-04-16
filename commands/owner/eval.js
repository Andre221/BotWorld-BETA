import { resolve } from 'url';

const Discord = require('discord.js');

const consoledR = require('consoled');

const economy = require('../../plugins/economy.js');
const votes = require('../../plugins/votes.js');

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
function haste(code, lang = '') {
    return new Promise((resolve, reject) => {
        request(
            {
                method: "POST",
                url: 'https://code.larkin.space/documents',
                body: code
            },
            function (err, res, data) {
                data = JSON.parse(data);
                return resolve(`https://code.larkin.space/${data.key}${lang && `.${lang}`}`);
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

    let consoled = new consoledR.Console({ catchErrors: false });

    if (message.author.id == '292377829105205249') {
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            let rawEvaled = evaled;
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, { showHidden: false, depth: 3 });
            let cleaned = clean(evaled);

            new Promise((resolve, reject) => {
                let consoleLogs = consoled.getLogs().join('\n');

                if (consoleLogs.length > 1024) {
                    haste(consoleLogs, 'text').then(l => {
                        resolve('[```xl\n' + 'CLICK' + '```](' + l + ')')
                    });
                } else {
                    if(consoleLogs.length==0){
                        return resolve('```None.```');
                    }
                    resolve('```xl' + consoleLogs + '```');
                }
            }).then(logOut => {
                if (args[0] != undefined && args[0] != '') {
                    try {
                        let embed = new Discord.RichEmbed()
                            .setColor('#AABBED')
                            .setTitle('Evaluation')
                            .addField('Evaluated', '```js\n' + code + '```')
                            .addField('Logs', logOut)
                            .addField('Result', '```xl\n' + cleaned + '```')
                            .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```');
                        return message.channel.send(embed);
                    } catch (err) {
                        haste(cleaned, 'js').then(link => {
                            let embed = new Discord.RichEmbed()
                                .setColor('#AABBED')
                                .setTitle('Evaluation')
                                .addField('Evaluated', '```js\n' + args.join(" ") + '```')
                                .addField('Logs', logOut)
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
                            .addField('Logs', logOut)
                            .addField('Result', '```xl\n' + cleaned + '```')
                            .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```');
                        return message.channel.send(embed);
                    } catch (err) {
                        haste(cleaned, 'js').then(link => {
                            let embed = new Discord.RichEmbed()
                                .setColor('#AABBED')
                                .setTitle('Evaluation')
                                .addField('Evaluated', '```js\nundefined```')
                                .addField('Logs', logOut)
                                .addField('Result', '[```xl\n' + 'CLICK' + '```](' + link + ')')
                                .addField('Type', '```js\n' + (typeof rawEvaled).substr(0, 1).toUpperCase() + (typeof rawEvaled).substr(1) + '```')
                            return message.channel.send(embed);
                        });
                    }
                }
            });
        } catch (err) {
            new Promise((resolve, reject) => {
                let consoleLogs = consoled.getLogs().join('\n');

                if (consoleLogs.length > 1024) {
                    haste(consoleLogs, 'text').then(l => {
                        resolve('[```xl\n' + 'CLICK' + '```](' + l + ')')
                    });
                } else {
                    if(consoleLogs.length==0){
                        return resolve('```None.```');
                    }
                    resolve('```xl' + consoleLogs + '```');
                }
            }).then(logOut => {
                let embed = new Discord.RichEmbed()
                    .setColor('#770306')
                    .setTitle('Error')
                    .addField('Evaluated', '```js\n' + args.join(" ") + '```')
                    .addField('Logs', logOut)
                    .addField('Result', '```xl\n' + err.toString() + '```')
                    .addField('Type', '```js\nError```')
                return message.channel.send(embed).catch(err => {
                    haste(err, 'js').then(link => {
                        let embed = new Discord.RichEmbed()
                            .setColor('#770306')
                            .setTitle('Evaluation')
                            .addField('Evaluated', '```js\n' + args.join(" ") + '```')
                            .addField('Logs', logOut)
                            .addField('Result', '[```xl\n' + 'CLICK' + '```](' + link + ')')
                            .addField('Type', '```js\nError```');
                        return message.channel.send(embed);
                    });
                });
            });
        }

    } else {
        message.reply('You don\'t own me!');
    }
}

module.exports.help = {
    name: 'eval',
    aliases: ['evaluate'],
    usage: '{*}eval <Code>',
    type: ['owner'],
    description: 'Evaluate code'
}