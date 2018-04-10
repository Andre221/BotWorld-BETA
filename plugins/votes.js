var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports.registerVote = function(req, res){
    if(req.headers.authorization==process.DBL_TOKEN){
        eventEmitter.emit('vote', req.body);
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
    }else{
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

module.exports.event = eventEmitter;