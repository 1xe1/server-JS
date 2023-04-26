const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'superadmin', // user, admin, superadmin
  },
  active: {
    type: Boolean,
    default: true,
  },
})

module.exports = mongoose.model('User', userSchema)