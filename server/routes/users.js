var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Users is working')
})


module.exports = router;