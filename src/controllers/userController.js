const bcrypt = require('bcrypt')
const User = require('../models/User')


const getUserID = async () => {
    const userFound = await User.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .lean()
      .exec()
    if (!userFound) {
      return 'U0000'
    } else {
      let userID = userFound.user_id
      if (userID.substr(0, 1) === 'U') {
        userID = userID.substr(1)
        const numberUser = parseInt(userID, 10)
        userID = ('0000' + (numberUser + 1)).slice(-4)
        return `U${userID}`
      } else {
        return ''
      }
    }
  }
/**
 * Create new User
 * @route POST /users
 * @access public
 */
const createNewUser = async (req, res) => {
    try {
      const { username, password, name ,role} = req.body
      if (!username || !password || !name) {
        return res
          .status(400)
          .json({ success: false, message: 'All fields are required' })
      }

      //note: check duplicates
      const duplicates = await User.findOne({ username: username}).lean().exec()

      if(duplicates){
        return res
        .status(400)
        .json({ success: false, message: 'Duplicates Username' })
      }

      //Note: Hash Password
      const hashedPwd = bcrypt.hashSync(password,10)
      const userID = await getUserID()
      const userObject = {
        user_id: userID,
        username: username,
        password: hashedPwd,
        name: name,
        role
      }

      const user = await User.create(userObject)

      if(!user) return res.status(400).json({ success: false, message: 'Invalid user data recived'})

      response.status(201).json({ success: true, message:'New User ${name} created'})
      
    } catch (err) {
      res.status(400).json({ success: false, message: err })
    }
  }
  
  module.exports = { createNewUser }