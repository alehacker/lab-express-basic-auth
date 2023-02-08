var express = require('express');
var router = express.Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model')

/* GET users listing. */
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs');
});

router.post('/signup', (req, res, next) =>{
    console.log('The form data: ', req.body);
    const { username, password } = req.body;
    bcryptjs
    .genSalt(saltRounds)
    .then((salt) => {
        return bcryptjs.hash(password, salt)
    })
    .then((hashedPassword) => {
        return User.create({
            username,
            passwordHash: hashedPassword
        });
    })
    .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB);
        res.send("User Created")
      })
    .catch((err) => {
        console.log(err)
    })
    // res.redirect('/users/user-profile')  

})



module.exports = router;