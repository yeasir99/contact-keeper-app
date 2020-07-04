const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const {
    body,
    validationResult
} = require('express-validator');
const User = require('../models/User');

const Contact = require('../models/Contact')


//@ routes   GET api/contacts
//@ desc     Get all user contacts
//@ access   Private

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.user.id
        }).sort({
            date: -1
        })
        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//@ routes   POST api/contacts
//@ desc     Create a contact
//@ access   Private

router.post('/', [
    auth,
    [
        body('name', 'Name is required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name,
        email,
        phone,
        type
    } = req.body

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();

        res.json(contact)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


//@ routes   PUT api/contacts/:id
//@ desc     Update a contact
//@ access   Private

router.put('/:id', auth, async (req, res) => {
    const {
        name,
        email,
        phone,
        type
    } = req.body;

    const contactFileds = {}

    if (name) contactFileds.name = name;
    if (email) contactFileds.email = email;
    if (phone) contactFileds.phone = phone;
    if (type) contactFileds.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({
            msg: "Contact not found"
        });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not authorized"
            })
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id, {
                $set: contactFileds
            }, {
                new: true
            }
        )
        res.json(contact)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


//@ routes   DELETE api/contacts/:id
//@ desc     Delete a contact
//@ access   Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({
            msg: 'Contact not found'
        });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Not authorized'
            })
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'Contact removed'
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;