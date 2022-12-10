const express = require('express')
const router = express.Router()

router.use('/users', require('./UserRoute'))


module.exports = router