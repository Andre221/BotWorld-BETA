const Discord = require('discord.js');
const fs = require('fs');

let web;

let bot = new Discord.Client();
bot.saycombo = {};

bot.music = [];

bot.messages = {user: 0, bot: 0, self: 0};

bot.commands = new Discord.Collection();

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
 
const dbwClient = new DBW.Client('6fd89b58e523b0228cd8a6000e9371d93170ffc76c1211e8d5578733b9f1c2221f299431adb4b7b690303d26733d1170', '404762043527462922');
process.env.dbwClient = dbwClient;

bot.on('ready', () => {
    console.log('Bot has logged in!');
    web = require('./web/index.js')(bot);
    dbwClient.postStats(bot.guilds.size, 0);
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
                let args = message.content.split(' ');
                let command = args[0].substring(prefix.length);
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