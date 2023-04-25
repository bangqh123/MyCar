const {User, Car} = require('../model/model')

const userController = {

    // Get all users
    getUsers: async(req, res)=> {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error getting users' })
        }
    },

    // Get a single user by ID
    getUserByID: async(req, res)=> {
        try {
            const user = await User.findById(req.params.id).populate("cars")
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error getting user' })
        }
    },

    // Update an existing user
    updateUser: async(req, res)=> {
        try {
            const user = await User.findById(req.params.id)
            if(!user) return res.status(404).json('User not found')
            await user.updateOne({
                name: req.body.name,
                gender: req.body.gender,
                address:req.body.address
            })
            const updatedUser = await User.findById(req.params.id)
            res.status(200).json(updatedUser)
        } catch (error) {
            console.error(error)
            res.status(500).json('Server error')
        }
    },

    // Delete a user by ID
    deleteUser: async(req, res)=> {
        try {
            await Car.updateMany({ user: req.params.id }, { user: null })
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted successfully!")
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting user' })
        }
    },
}


module.exports = userController