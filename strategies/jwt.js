const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.SECRET

module.exports = new JwtStrategy(options, (jwt_payload, done) => {
  if(jwt_payload.user === "admin") {
    return done(null, true)
  }

  return done("Invalid token", false)
})
