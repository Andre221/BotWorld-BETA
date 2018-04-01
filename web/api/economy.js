const express = require('express');

const economy = require('../../plugins/economy.js');

let router = express.Router();

router.get('/balance/:id', (req, res) => {
    res.send({balance: economy.getBalance(req.params.id)});
});

module.exports = router;