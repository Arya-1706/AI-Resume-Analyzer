const jwt = require("jsonwebtoken")
const tokenBlackListmodel = require("../models/blacklist.models")



async function authUser(req, res, next) {
  const token = req.cookies.token

  if(!token) {
    return res.status(401).json({
      message: "Token not provided"
    })
  }

  const isTokenBlackListed = await tokenBlackListmodel.findOne({
    token
  })

  if(isTokenBlackListed) {
    return res.status(401).json({
      message: "Token is invalid. Please login again."
    })
  }
 
  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  req.user = decoded

  next()

  } catch (error) {

    return res.status(401).json({
      message: "Invalid Token."
    })
  }  
}

module.exports = {authUser}