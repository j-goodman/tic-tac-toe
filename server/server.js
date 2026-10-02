require('dotenv').config()

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const gameRoutes = require('./routes/games')

const app = express()

app.use(express.json())
app.use('/api/games', gameRoutes)
app.use(express.static(path.join(__dirname, '../client/dist')))

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`)
    })
})
.catch(error => {
    console.error("MongoDB connection failed:", error.message)
    process.exit(1)
})