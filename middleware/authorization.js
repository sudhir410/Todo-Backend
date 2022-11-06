const { verify } = require('jsonwebtoken')
const user = require('../model/User');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")
    if (!accessToken) return res.json({ message: "User not Loged In" })

    try {

        verify(accessToken, "10xAcademy", async (err, decode) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            const data = await user.findOne({ _id: decode.data })
            
            if (data) {
                req.user = data._id
                next()
            } else {
                res.json({ message: "failed" })
            }

        });


    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { validateToken };