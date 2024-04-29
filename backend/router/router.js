const express = require('express')

const service = require('../functions/service')

const router = new express.Router()

router.post('/register', service.register)

router.post('/login', service.login)

router.get('/getProducts', service.getProducts)

router.post('/checkout', service.createOrder)

module.exports = router 