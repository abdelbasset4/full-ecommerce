const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const asyncHandler = require('express-async-handler')

const apiError = require('../utils/apiError')
const factory = require('./handelersFactory');

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

exports.filterOrderForLoggedUser = asyncHandler(async (req,res,next)=>{
    if(req.user.role ==="user") req.filterObj = {user:req.user._id}
    next()
})

exports.getAllOrders = factory.getAll(Order)

exports.getSpecificOrder = factory.getOne(Order)

exports.updateOrderPaid = asyncHandler(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new apiError('Order not found',404)) 
    }
    order.isPaid = true;
    order.paidAt = Date.now()
    const updateOrder = await order.save();
    res.status(200).json({status:'succes',data:updateOrder})
})

exports.updateOrderDeliver = asyncHandler(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new apiError('Order not found',404)) 
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now()
    const updateOrder = await order.save();
    res.status(200).json({status:'succes',data:updateOrder})
})

exports.createCheckoutSession = asyncHandler(async (req,res,next)=>{
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

    const session = await stripe.checkout.sessions.create({
        line_items:[
           {
            price_data: {
              currency: 'usd',
              unit_amount: totalOrderPrice*100,
              product_data: {
                name:  req.user.name,
              },
            },
            quantity: 1,
           }
        ],
        mode:"payment",
        success_url: `${req.protocol}://${req.get("host")}/orders`,
        cancel_url: `${req.protocol}://${req.get("host")}/orders`,
        customer_email:req.user.email,
        client_reference_id:req.params.cartId,
        metadata:req.body.shippingAdress
    })
    res.status(200).json({status:'succes',session})
})