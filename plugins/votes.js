const economy = require('./economy.js');
const Discord = require('discord.js');
var events = require('events');
module.exports.event = new events.EventEmitter();

module.exports.registerVote = function(req, res, bot){
    if(req.headers.authorization==process.env.DBL_TOKEN){
        module.exports.event.emit('vote', req.body);
        let user = process.DB.votes.get('users').find({id: req.body.user});
        if(!user.value()){
            process.DB.votes.get('users').push({
                id: req.body.user,
                votes: [
                    {
                        time: Date.now()
                    }
                ]
            }).write();
        }else{
            user.get('votes').push({
                time: Date.now()
            }).write();
        }

        user = req.body.user;
        economy.addBalance(user, 1000000);
        if(bot.users.get(user)){
            let embed = new Discord.RichEmbed()
            .setColor('#AABBED')
            .setTitle('Thank you for voting, ' + bot.users.get(user).tag + '!')
            .setDescription('As an award for your act of kidness towards this bot you get +$1,000,000 on the bot!');
            bot.users.get(user).send(embed).catch((err)=>{});
        }

    }else{
        console.log('f')
        res.sendStatus(403);
    }
}

module.exports.getTotalVotes = function(userID){
    let i = 0;
    process.DB.votes.get('users').value().forEach(u => {
        i+= u.votes.length;
    });
    return i;
}

module.exports.hasVoted = function(id, ms){
    if(process.DB.votes.get('users').find({id: id}).value()){
        if(process.DB.votes.get('users').find({id: id}).get('votes').value()){
            let uVotes = process.DB.votes.get('users').find({id: id}).get('votes').value();
            if(Date.now() - uVotes[uVotes.length-1].time<=ms){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}