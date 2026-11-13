const multer = require('multer')
const ApiError = require('../utils/ApiError')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
  fileFilter: (req, file, cb) => {
   
    if (file.mimetype !== 'application/pdf') {
      return cb(ApiError.badRequest('Only PDF files are allowed'))
    }

    cb(null, true)
  },
})

module.exports = upload