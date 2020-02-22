const User = require('../models/user.model');
const mongoose = require('mongoose');
const kafka = require('../db/kafka')
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Simple version, without validation or sanitation
exports.health = function (req, res) {
    res.send('Up and running!');
};

exports.registerUser = async (req, res) => {

    let { email, mobile, password } = req.body;

    exisingUser = await User.findOne({ email });

    if (exisingUser != null) {
        return res.status(404).send({ 'message': 'Email id already existing please login' })
    }

    password = await bcrypt.hash(password, saltRounds)

    user = await User.create({
        email, mobile, password
    })

    res.send(user);
}

exports.loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    const match = await bcrypt.compare(password, user.password);

    console.log(match)

    if (match) {
        return res.send(user);

    }

    res.status(404).send({ 'message': 'User not found' });

}

exports.getUserInformation = async (req, res) => {


    const user = await User.findById(req.params.userId);

    if (user != null) {
        return res.send({ email: user.email, mobile: user.mobile })
    }

    res.status(404).send({ 'message': 'User not found' });

}

exports.getUserInformationByEmail = async (req, res) => {


    const user = await User.findOne({ 'email': req.params.userEmail });

    if (user != null) {
        return res.send({ email: user.email, mobile: user.mobile })
    }

    const createdUser = await User.create({ 'email': req.params.userEmail })
    return res.send({ email: createdUser.email, mobile: createdUser.mobile })

}