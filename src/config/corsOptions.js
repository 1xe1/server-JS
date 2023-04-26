const allowedOrigins = require('./allowedOrigins')

const corsOprions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowd by CORS'))
    }
  },
  credential: true,
  optionSuccessStatus: 200,
}

module.exports = corsOprions