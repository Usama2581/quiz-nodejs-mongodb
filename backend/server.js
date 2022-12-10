const express = require('express');
const app = express();
const db = require('./config/db')
const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});


db.connection
.once('open', () => console.log('connected to db'))
.on('err', (e) => console.log(e))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', require('./route/root'))