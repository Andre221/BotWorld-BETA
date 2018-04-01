const fs = require('fs');

const balances = require('../storage/balances.json');

const paydayAdd = 500;

function updateJSON(){
    fs.writeFile(`${process.cwd()}/storage/balances.json`, JSON.stringify(balances, null, 2), function (err) {
         if (err) return console.log(err);
    });
}

module.exports.getBalance = function(userID){
    return balances[userID] && balances[userID].balance ? balances[userID].balance : 0; 
}

module.exports.setBalance = function(userID, balance){
    if(!balances[userID]){
        balances[userID] = {};
    }
    balances[userID].balance = balance;
    updateJSON();
}

module.exports.setLastPayday = function(userID, now){
    if(!balances[userID]){
        balances[userID] = {};
    }
    balances[userID].lastPayday = now;
    updateJSON();
}

module.exports.addBalance = function(userID, toAdd){
    module.exports.setBalance(userID, module.exports.getBalance(userID) ? module.exports.getBalance(userID) + toAdd : toAdd);
}

module.exports.subtractBalance = function(userID, toSubtract){
    module.exports.setBalance(userID, module.exports.getBalance(userID) ? module.exports.getBalance(userID) - toSubtract : toSubtract * -1);
}

module.exports.getLastPayday = function(userID){
    return balances[userID] && balances[userID].lastPayday ? balances[userID].lastPayday : false;
}

module.exports.payday = function(userID){
    if(Date.now() - module.exports.getLastPayday(userID)>=300000){
        module.exports.addBalance(userID, paydayAdd);
        module.exports.setLastPayday(userID, Date.now());
        return true;
    }else{
        return require('ms')(300000 - (Date.now() - module.exports.getLastPayday(userID)), {long: true});
    }
}