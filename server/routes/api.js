var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js');

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

module.exports = router;