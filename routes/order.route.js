const express = require('express')

const route = express.Router()

const {createCashOrder,filterOrderForLoggedUser,getAllOrders,getSpecificOrder} = require('../controllers/order.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect)

route.route('/:cartId').post(allowedTo('user'),createCashOrder)

route.route('/').get(allowedTo('user','admin','manager'),filterOrderForLoggedUser,getAllOrders)
route.route('/:id').get(getSpecificOrder)

module.exports = route