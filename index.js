const Discord = require('discord.js');
const fs = require('fs');

let web;

let bot = new Discord.Client();

bot.regex = {
    invite: /discord(?:app\.com|\.gg).{1,}?[\/invite\/].{1,}?(?:(?!.*[Ii10OolL]).{1,}?[A-z0-9]{5,6}|[a-zA-Z0-9]{2,32})/g
}

bot.saycombo = {};

bot.music = [];

bot.messages = { user: 0, bot: 0, self: 0 };

bot.commands = new Discord.Collection();

bot.awaiting = [];

bot.bridge = {};

bot.startedAt = Date.now();
console.log(bot.startedAt);

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const ecoAdapter = new FileSync('.data/balances.json');

process.DB = {};
process.DB.economy = low(ecoAdapter);

process.DB.economy.defaults({ users: [] })
    .write();


const preAdapter = new FileSync('.data/prefixes.json');

process.DB.prefixes = low(preAdapter);

process.DB.prefixes.defaults({ servers: {} })
    .write();

const voteAdapter = new FileSync('.data/votes.json');

process.DB.votes = low(voteAdapter);

process.DB.votes.defaults({ users: [] })
    .write();

let logger = new Discord.WebhookClient(process.env.LOGGER_ID, process.env.LOGGER_TOKEN);

process.votes = require('./plugins/votes.js');
const economy = require('./plugins/economy.js');

bot.on('guildCreate', (guild) => {
    let bots = 0;
    let users = 0;

    guild.members.forEach(mem => {
        if (mem.user.bot) {
            bots++;
        } else {
            users++;
        }
    });

    let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Joined guild!')
        .addField('Name:', guild.name)
        .addField('Bots:', bots)
        .addField('Users', users)
        .setTimestamp();
    logger.send(embed);
});

bot.on('guildDelete', (guild) => {
    let bots = 0;
    let users = 0;

    guild.members.forEach(mem => {
        if (mem.user.bot) {
            bots++;
        } else {
            users++;
        }
    });

    let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Joined guild!')
        .addField('Name:', guild.name)
        .addField('Bots:', bots)
        .addField('Users', users)
        .setTimestamp();
    logger.send(embed);
});

//Read command files

function readCommands() {
    fs.readdir('./commands/basic/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/basic/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./commands/economy/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/economy/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./commands/owner/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/owner/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./commands/funny/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/funny/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./commands/music/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/music/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./commands/games/minecraft/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/games/minecraft/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    fs.readdir('./commands/admin/', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/admin/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });

    // fs.readdir('./commands/cryptography/', function (err, files) {
    //     if (err) console.log(err);

    //     let jsfile = files.filter(f => f.split('.').pop() == 'js');
    //     if (jsfile.length <= 0) {
    //         console.log('error reading files');
    //     }

    //     jsfile.forEach(function (f, i) {
    //         let props = require(`./commands/cryptography/${f}`);
    //         bot.commands.set(props.help.name, props);
    //     });
    // });

    fs.readdir('./commands/information/bot-lists', function (err, files) {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }

        jsfile.forEach(function (f, i) {
            let props = require(`./commands/information/bot-lists/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });
}

readCommands();

//End reading command files

const DBW = require('discord-botworld-api');

const dbwClient = new DBW.Client(process.env.DBW_TOKEN, '404762043527462922');

Discord.Message.prototype.awaitNext = function (dataKept, channel, cb, inf) {
    bot.awaiting[this.author.id] = { channel: channel, kept: dataKept, cb: cb, inf: inf ? inf : false };
}

Discord.Message.prototype.end = function () {
    bot.awaiting[this.author.id] = undefined;
}

bot.on('message', (message) => {
    if (!message.channel) return;
    if (bot.awaiting[message.author.id]) {
        if (bot.awaiting[message.author.id].channel) {
            if (bot.awaiting[message.author.id].channel == message.channel.id) {
                if (bot.awaiting[message.author.id].inf) {
                    bot.awaiting[message.author.id].cb(message, bot.awaiting[message.author.id].kept);
                } else {
                    bot.awaiting[message.author.id].cb(message, bot.awaiting[message.author.id].kept);
                    bot.awaiting[message.author.id] = undefined;
                }
            }
        } else {
            if (bot.awaiting[message.author.id].inf) {
                bot.awaiting[message.author.id].cb(message, bot.awaiting[message.author.id].kept);
            } else {
                bot.awaiting[message.author.id].cb(message, bot.awaiting[message.author.id].kept);
                bot.awaiting[message.author.id] = undefined;
            }
        }
    }
});

const msgEmbedToRich = require("discordjs-embed-converter");
bot.on('message', (message) => {
    if (!message.channel) return;
    let bridge = bot.bridge;
    if (message.author.id == '292377829105205249') {
        if (message.content == 'bridge.close()') {
            bot.channels.get(bridge.from).send('Bridge closed!');
            bot.channels.get(bridge.to).send('Bridge closed!');
            bot.bridge = {};
        }
    }
    if (message.author.id == bot.user.id) return;
    let bn;
    if (message.author.bot) bn = '(BOT)';
    if (!message.author.bot) bn = '(USER)';
    if (message.channel && bridge.to == message.channel.id) {
        bot.channels.get(bridge.from).send(message.author.tag + ' ' + bn + ': ' + message.content);
        if (message.attachments) {
            message.attachments.forEach(file => {
                bot.channels.get(bridge.from).sendFile(file.url)
            });
        }
        if (message.embeds) {
            message.embeds.forEach(embed => {
                bot.channels.get(bridge.from).send(msgEmbedToRich(embed));
            });
        }
    } else if (message.channel && bridge.from == message.channel.id) {
        bot.channels.get(bridge.to).send(message.author.tag + ' ' + bn + ': ' + message.content);
        if (message.attachments) {
            message.attachments.forEach(file => {
                bot.channels.get(bridge.to).sendFile(file.url)
            });
        }
        if (message.embeds) {
            message.embeds.forEach(embed => {
                bot.channels.get(bridge.to).send(msgEmbedToRich(embed));
            });
        }
    }
});

bot.on('ready', () => {
    console.log('Bot has logged in!');
    web = require('./web/index.js')(bot);
    dbwClient.postStats(bot.guilds.size, 0);

    let embed = new Discord.RichEmbed()
        .setColor('#AABBED')
        .setTitle('Started!')
        .setDescription(bot.guilds.size + ' guilds currently')
        .setTimestamp();
    logger.send(embed);

    process.env.bot = bot;
});

bot.on('guildCreate', (guild) => {
    dbwClient.postStats(bot.guilds.size, 0);
});

bot.on('guildDelete', (guild) => {
    dbwClient.postStats(bot.guilds.size, 0);
});

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

bot.on('message', (message) => {
    if (message.author == bot.user) {
        bot.messages.self++;
    } else {
        if (message.author.bot) {
            bot.messages.bot++;
        } else {
            bot.messages.user++;
        }
    }
    try {
        if (bot.saycombo[message.author.id]) {
            if (message.content == 'exit') {
                bot.saycombo[message.author.id] = false;
                message.reply('Exited saycombo!');
            } else {
                message.channel.send(bot.saycombo[message.author.id].func.replaceAll('{c}', message.content));
            }
        }
        if (message.author.bot) return;
        let prefixes = ['bb-', '<@' + bot.user.id + '> '];

        if (process.DB.prefixes.get('servers').get(message.guild.id).value()) {
            prefixes[prefixes.length] = process.DB.prefixes.get('servers').get(message.guild.id).value();
        }

        let ran = false;

        prefixes.forEach(prefix => {
            if (!ran) {
                if (message.content.substring(0, prefix.length) == prefix) {
                    let args = message.content.substr(prefix.length).split(' ');
                    let command = args[0];
                    args.shift();

                    bot.commands.forEach(cmd => {
                        if (cmd.help.name == command.toLowerCase() || cmd.help.aliases.includes(command.toLowerCase())) {
                            ran = true;
                            cmd.run(command, args, message, bot);
                        }
                    });
                }
            }
        });
    } catch (err) {
        message.channel.send('Missing permissions or errored!: ' + err).catch(er2 => { message.channel.send(er2) });
    }
});

bot.login(process.env.TOKEN);