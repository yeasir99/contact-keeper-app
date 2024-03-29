const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

//@ routes   GET api/auth
//@ desc     Get logged in user
//@ access   Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//@ routes   POST api/auth
//@ desc     Auth user & get token
//@ access   Public

router.post(
  '/',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          msg: 'Invalid Credentials',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: 'Invalid Credentials',
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token, {
            httpOnly: true,
          });
          res.json({
            msg: 'Login Successfull',
            token,
          });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

//@ routes   GET api/auth/logout
//@ desc     Logout from login state
//@ access   Private

router.get('/logout', auth, async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
    });
    res.json({
      msg: 'Logout Successfull',
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
