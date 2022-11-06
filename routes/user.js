const express = require('express')
const router = express.Router()
const userModel = require('../model/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


router.post('/register', body('email').isEmail(), async (req, res) => {
    // console.log('ok')
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { email, password } = req.body
        let ress = await userModel.findOne({ email: email })

        if (ress) {

            return res.status(400).json({ message: "user already registered" })
        } else {
            console.log('ok', res)
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    res.status(400).json({ message: err.message })
                }
                const result = await userModel.create({
                    email: email,
                    password: hash
                })
                res.status(200).json({ message: "success" })
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})






router.post('/login', body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { email, password } = req.body
        let ress = await userModel.findOne({ email: email })
        if (!ress) {
            return res.status(400).json({ message: "user not registered" })
        } else {

            bcrypt.compare(password, ress.password, async function (err, result) {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }
                if (result) {
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: ress._id
                    }, '10xAcademy');

                    if (token) {

                        res.status(200).json({ message: "success", token: token })
                    }
                } else {
                    res.status(400).json({ message: "incorrect password" })
                }
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router;