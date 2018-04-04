const Discord = require('discord.js');
const fs = require('fs');

let web;

let bot = new Discord.Client();
bot.saycombo = {};

bot.music = [];

bot.messages = {user: 0, bot: 0, self: 0};

bot.commands = new Discord.Collection();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('storage/balances.json');
process.DB = {};
process.DB.economy = low(adapter);

process.DB.economy.defaults({ posts: [], user: {} })
  .write()

let logger = new Discord.WebhookClient(process.env.LOGGER_ID, process.env.LOGGER_TOKEN);

bot.on('guildCreate', (guild) => {
    let bots = 0;
    let users = 0;

    guild.members.forEach(mem => {
        if(mem.user.bot){
            bots++;
        }else{
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
        if(mem.user.bot){
            bots++;
        }else{
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

function readCommands(){
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

    fs.readdir('./commands/minecraft/', function (err, files) {
        if (err) console.log(err);
    
        let jsfile = files.filter(f => f.split('.').pop() == 'js');
        if (jsfile.length <= 0) {
            console.log('error reading files');
        }
    
        jsfile.forEach(function (f, i) {
            let props = require(`./commands/minecraft/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });
}

readCommands();

//End reading command files

const DBW = require('discord-botworld-api');
 
const dbwClient = new DBW.Client(process.env.DBW_TOKEN, '404762043527462922');

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
});

bot.on('guildCreate', (guild) => {
    dbwClient.postStats(bot.guilds.size, 0);
});

bot.on('guildDelete', (guild) => {
    dbwClient.postStats(bot.guilds.size, 0);
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

bot.on('message', (message) => {
    if(message.author == bot.user){
        bot.messages.self++;
    }else{
        if(message.author.bot){
            bot.messages.bot++;
        }else{
            bot.messages.user++;
        }
    }
    try{
        if(bot.saycombo[message.author.id]){
            if(message.content=='exit'){
                bot.saycombo[message.author.id] = false;
                message.reply('Exited saycombo!');
            }else{
                message.channel.send(bot.saycombo[message.author.id].func.replaceAll('{c}', message.content));
            }
        }
        if(message.author.bot) return;
        let prefixes = ['bb-', '<@' + bot.user.id + '> '];

        prefixes.forEach(prefix => {
            if(message.content.substring(0, prefix.length)==prefix){
                let args = message.content.substr(prefix.length).split(' ');
                let command = args[0];
                args.shift();
            
                bot.commands.forEach(cmd => {
                    if(cmd.help.name==command.toLowerCase() || cmd.help.aliases.includes(command.toLowerCase())){
                        cmd.run(command, args, message, bot);
                    }
                });
            }
        });
    }catch(err){
        message.channel.send('Missing permissions or errored!: ' + err).catch(er2 => {message.channel.send(er2)});
    }
});

bot.login(process.env.TOKEN);