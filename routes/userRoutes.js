const express = require('express')
const router = express.Router();
const User = require('../db/models/userModel');

router.get('/login', (req,res) => {
    res.render('login', {error: ""})
})

router.post('/login', async (req,res) => {
    try {
        const usr = await User.loginUser(req.bosy.email, req.body.password)
        const token = await user.generateAuthTokens()
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/')
    } catch (error) {
        res.render('login', {error: "Wrong password or username"})
    }
})

router.get('/create-account', (req,res) => {
    res.render('signup', {error: ""})
})
router.post('/create-account', async (req,res) => {
    try {
        const user = req.body;
        const userExists = await User.find({email: user.email})
        if(userExists.length === 0) {
            const accout = new User({
                name: user.name,
                email: user.email,
                password: user.password
            })
            await account.generateAuthTokens();
            await account.save();
            res.redirect('/')
        } else {
            res.render('signup', {error: "User Exists"})
        }
    } catch (error) {
        res.redirect('/login')
    }
    
})

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    res.redirect('/');
})

module.exports = router; 