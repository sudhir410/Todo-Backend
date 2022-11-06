const express = require('express')
const router = express.Router()
const userModel = require('../model/User')
const todoModel = require('../model/todoModel')

const { validateToken } = require('../middleware/authorization')

router.get('/username', validateToken, async (req, res) => {

    try {
        let data = await userModel.findOne({ _id: req.user })

        res.status(200).json({ message: data.email })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post("/todoList", validateToken, async (req, res) => {

    try {
        const { activity } = req.body;
        const data = await todoModel.create({
            activity: activity,
            userid: req.user
        })
        res.send({ message: "success" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.get("/todoListAll", validateToken, async (req, res) => {
    try {

        const data = await todoModel.find({ userid: req.user })
        res.send(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
module.exports = router;



router.post("/todoListUpdate", validateToken, async (req, res) => {

    try {
        const { status, id } = req.body;

        const data = await todoModel.updateOne({
            _id: id,
        }, { status: status })
        res.send({ message: "success" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post("/todoListUpdateStop", validateToken, async (req, res) => {

    try {
        const { time_taken, id, status } = req.body;

        const data = await todoModel.updateOne({
            _id: id,
        }, { time_taken: time_taken, status: status })
        res.send({ message: "success" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})