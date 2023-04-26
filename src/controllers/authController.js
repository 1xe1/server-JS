const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * @desc Login
 * @route POST /auth
 * @access public
 */
const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' })
  }

  const userFound = await User.findOne({ username }).exec()

  if (!userFound || !userFound.active)
    return res.status(401).json({ success: false, message: 'Unauthorized' })

  const match = await bcrypt.compare(password, userFound.password)

  if (!match)
    return res.status(401).json({ success: false, message: 'Unauthorized' })

  const acessToken = jwt.sign(
    {
      UserInfo: {
        username: userFound.username,
        name: userFound.name,
        role: userFound.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  res.status(200).json({ success: true, acessToken, user: userFound })
}

/**
 * Logout
 * @route POST /auth/logout
 * @access public
 */
const logout = (req, res) => {
    res.json({ success: true, message: 'Logout Succeed'})
}

module.exports = { login, logout }