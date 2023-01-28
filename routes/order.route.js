const express = require('express')

const route = express.Router()

const {createCashOrder} = require('../controllers/order.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('user'))

route.route('/:cartId').post(createCashOrder)

module.exports = route