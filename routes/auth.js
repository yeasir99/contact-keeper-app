const express = require('express');

const router = express.Router();


//@ routes   GET api/auth
//@ desc     Get logged in user
//@ access   Private

router.get('/', (req, res) => {
    res.send('Get logged in a user')
})


//@ routes   POST api/auth
//@ desc     Auth user & get token
//@ access   Public

router.post('/', (req, res) => {
    res.send('Get logged in a user')
})


module.exports = router;