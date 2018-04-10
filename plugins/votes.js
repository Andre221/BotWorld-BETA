module.exports.registerVote = function(req, res){
    if(req.headers.authorization==process.env.DBL_TOKEN){
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
    if(process.env.DB.votes.get('users').find({id: id}).value()){
        if(process.env.DB.votes.get('users').find({id: id}).get('votes').value()){
            let uVotes = process.env.DB.votes.get('users').find({id: id}).get('votes').value();
            if(uVotes[uVotes.length-1].time<=Date.now()-ms){
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