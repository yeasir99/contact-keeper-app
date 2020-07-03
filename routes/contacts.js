const express = require('express');

const router = express.Router();


//@ routes   GET api/contacts
//@ desc     Get all user contacts
//@ access   Private

router.get('/', (req, res) => {
    res.send('get all contacts')
})


//@ routes   POST api/contacts
//@ desc     Create a contact
//@ access   Private

router.post('/', (req, res) => {
    res.send('create a contact')
})


//@ routes   PUT api/contacts/:id
//@ desc     Update a contact
//@ access   Private

router.put('/:id', (req, res) => {
    res.send('update a contact')
})


//@ routes   DELETE api/contacts/:id
//@ desc     Delete a contact
//@ access   Private

router.delete('/:id', (req, res) => {
    res.send('remove a contact')
})

module.exports = router;