const express = require('express');
const Discord = require('discord.js');


const economy = require('../../plugins/economy.js');


// let client = new Discord.Client();

// client.on('ready', () => {
//     console.log('member api up');
// });

// client.login(process.env.TOKEN);

let client = process.env.bot;

let router = express.Router();

router.get('/guild/:id', (req, res) => {
    if(client.guilds.get(req.params.id)){
        let ordering = [];
        let out = [];
        client.guilds.get(req.params.id).members.forEach(member => {
            out[out.length] = {
                tag: member.user.tag,
                id: member.user.id,
                avatar: member.user.displayAvatarURL.split('?')[0],
                balance: economy.getBalance(member.user.id)
            };
        });
        res.send(out.sort(function(a, b){return b.balance - a.balance}));
    }else{
        res.send({error: 'Not in that guild!'});
    }
});

module.exports = router;