const jwt = require("jsonwebtoken")

exports.login = (req, res, next) => {
  const { user, password } = req.body
  if(user === "admin") {
    if(password === "admin") {
      const options = {}
      const secret = process.env.SECRET
      const token = jwt.sign({ user }, secret, options)
      return res.json({
        message: "Auth Passed",
        token
      })
    }
  }

  return res.status(401).json({ message: "Auth Failed" })
}
