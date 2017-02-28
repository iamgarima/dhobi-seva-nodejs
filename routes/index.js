const express = require('express')
const courseRoutes = require('./courseRoutes')
const studentRoutes = require('./studentRoutes')

const router = express.Router()

courseRoutes(router)
studentRoutes(router)

module.exports = router
