const express = require('express')

const route = express.Router()

const {addProductToCart,getLoggedUserCart,removeCartItem,clearCart} = require('../controllers/cart.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('user'))
route.route('/').post(addProductToCart).get(getLoggedUserCart).delete(clearCart)
route.route('/:itemId').delete(removeCartItem)

module.exports = route;