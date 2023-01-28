const asyncHandler = require('express-async-handler')

const apiError = require('../utils/apiError')

const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Order = require('../models/order.model')

exports.createCashOrder = asyncHandler(async (req,res,next)=>{
    const taxPrice = 0;
    const shippingPrice = 0;
    // 1- get cart based on cartId
    const cart = await Cart.findById(req.params.cartId);
    if(!cart){
        return next(new apiError('Cart not found',404))
    }
    // 2- get cart price and check if coupon apply to order
    const orderPrice = cart.priceAfterDiscount ? cart.priceAfterDiscount:cart.totalCartPrice;
    const totalOrderPrice = orderPrice+taxPrice+shippingPrice;

    // 3- create order based on shipping methode "Cash"
    const order = await Order.create({
        user:req.user._id,
        cartItems:cart.cartItems,
        shippingAdress:req.body.shippingAdress,
        paidAt:Date.now(),
        totalOrderPrice
    })
    // 4- after create order increment sold product and decrement quantity product
    if(order){
        const bulkOption = cart.cartItems.map((item) =>({
            updateOne:{
                filter:{_id:item.product},
                update:{$inc:{quantity:-item.quantity,sold:+item.quantity}}
            }
        }))
        await Product.bulkWrite(bulkOption,{});

        // 5- clear cart 
        await Cart.findByIdAndDelete(req.params.cartId)
    }
    res.status(200).json({status:'Succes',data:order})
})