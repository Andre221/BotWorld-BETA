const Discord = require('discord.js');
const request = require('request');

module.exports.run = function (command, args, message, bot) {
    request(
        {
            method: "POST",
            url: 'https://api.mojang.com/orders/statistics',
            json: {
                "metricKeys": [
                    "item_sold_minecraft"
                ]
            }
        },
        function (error, response, body) {
            if (error) {
                console.log(error);
                return message.channel.send('An error occured!');;
            }
            try {
                if (body.error) {
                    console.log(body.error);
                    return message.channel.send('An error occured!');
                }

                let statusEmbed = new Discord.RichEmbed()
                    .setColor('#AABBED')
                    .setTitle('Minecraft\'s Status')
                    .addField('Sales', `Total: ${body.total.toLocaleString()}\nLast 24 Hours: ${body.last24h.toLocaleString()}`)
                request(
                    {
                        method: "GET",
                        url: 'https://status.mojang.com/check'
                    },
                    function (err, res, stats) {
                        stats = JSON.parse(stats);
                        if (err) {
                            console.log(err);
                            return message.channel.send('An error occured!');;
                        }
                        try {
                            if (body.error) {
                                console.log(body.error);
                                return message.channel.send('An error occured!');
                            }

                            let field = '';
                            stats.forEach(stat => {
                                statObject = {
                                    "green": {
                                        "text": "Online",
                                        "emoji": "<:good:429969987843784724>"
                                    },
                                    "yellow": {
                                        "text": "Some issues",
                                        "emoji": "<:issue:429969987747184650>"
                                    },
                                    "red": {
                                        "text": "Offline",
                                        "emoji": "<:bad:429969987436806167>"
                                    }
                                }
                                field += Object.keys(stat)[0].substr(0,1).toUpperCase() + Object.keys(stat)[0].substr(1).toLowerCase() + ': ' + statObject[Object.values(stat)[0]].text + ' ' + statObject[Object.values(stat)[0]].emoji + '\n';
                            });
                            statusEmbed.addField('Services:', field);
                            message.channel.send(statusEmbed);
                        } catch (err2) {
                            console.log(err2);
                            message.channel.send('An error occured!');
                        }
                    }
                );
            } catch (err) {
                console.log(err);
                message.channel.send('An error occured!');
            }
        }
    );
}

module.exports.help = {
    name: 'mcstatus',
    aliases: [],
    usage: '{*}mcstatus',
    type: 'games=>test=>minecraft',
    description: 'Get minecrafts api status.'
}