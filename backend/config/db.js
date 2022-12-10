const mongoose = require('mongoose')

// const mongoURI = sWUWPm3eL2tx0YfS

const mongoURI = 'mongodb+srv://usama:sWUWPm3eL2tx0YfS@cluster0.pwuhz3l.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true })


module.exports = mongoose