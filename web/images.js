const express = require('express');

let router = express.Router();

router.get('/b-top', (req, res) => {
    res.sendFile(process.cwd() + '/web/images/guille-pozzi-375035-unsplash.jpg');
    //res.sendFile(process.cwd() + '/web/images/b-top.png');
});

router.get('/bot-avatar', (req, res) => {
    res.sendFile(process.cwd() + '/web/images/bot-avatar.png');
});

module.exports = router;