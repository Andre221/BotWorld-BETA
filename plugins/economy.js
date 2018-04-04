const fs = require('fs');

const paydayAdd = 500;

module.exports.getBalance = function(userID){
    let bal = process.env.DB.ECONOMY.find('id', userID);
    return bal && bal.balance.value() ? bal.balance.value() : 0; 
}

module.exports.setBalance = function(userID, balance){
    if(!process.env.DB.ECONOMY.find('id', userID)){
        process.env.DB.ECONOMY.push({
            id: userID,
            balance: balance
        }).write();
    }else{
        process.env.DB.ECONOMY.find('id', userID).set('balance', balance).write();
    }
}

module.exports.setLastPayday = function(userID, now){
    if(!process.env.DB.ECONOMY.find('id', userID)){
        process.env.DB.ECONOMY.push({
            id: userID,
            balance: 0,
            lastPayday: now
        }).write();
    }else{
        process.env.DB.ECONOMY.find('id', userID).set('lastPayday', now).write();
    }
}

module.exports.addBalance = function(userID, toAdd){
    module.exports.setBalance(userID, module.exports.getBalance(userID) ? module.exports.getBalance(userID) + toAdd : toAdd);
}

module.exports.subtractBalance = function(userID, toSubtract){
    module.exports.setBalance(userID, module.exports.getBalance(userID) ? module.exports.getBalance(userID) - toSubtract : toSubtract * -1);
}

module.exports.getLastPayday = function(userID){
    return process.env.DB.ECONOMY.find('id', userID) && process.env.DB.ECONOMY.find('id', userID).value().lastPayday ? process.env.DB.ECONOMY.find('id', userID).value().lastPayday : false;
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