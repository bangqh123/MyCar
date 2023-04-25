const {User} = require('../model/model')
const bcrypt = require('bcrypt')
const secret = 'your_secret_key'

const authController = {

    //REGISTER
    Register: async(req, res)=> {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            const newAuth = new User({
                name: req.body.name,
                phone: req.body.phone,
                password: hash,
                address: req.body.address,
                gender: req.body.gender
            })
            const saveAuth = await newAuth.save()
            res.status(200).json(saveAuth)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error creating user' })
        }
    },

    //LOGIN
    Login: async(req, res) => {
        const {phone, password} = req.body
        try {
            const user = await User.findOne({phone})
            if(!user) return res.status(500).json("User not found!")
            const passwordMatches = await bcrypt.compare(password, user.password)
            if(!passwordMatches) return res.status(500).json("Invalid credentials")
            res.status(200).json({user})
        } catch (error) {
            console.error(error)
            res.status(500).json('Error loging in')
        }
    },
}

module.exports = authController