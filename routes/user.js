const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get('/', async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.send(err);
    }
});

router.get('/:email', async (req,res) => {
    try{
        const user = await User.findById(req.params.email);
        res.json(user);
    }catch(err){
        res.send(err);
    }
});

router.post('/register', async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err){
        res.send(err);
    }
});

router.delete('/:userId', async (req,res) => {
    try{
        const user = await User.remove({_id:req.params.userId});
        res.json(user);
    }catch(err){
        res.send(err);
    }
});

router.post('/login', async(req,res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(info);
            }
            req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.send(user);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logOut();
})

module.exports = router;
