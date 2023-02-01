const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect("mongodb+srv://abdelbasset:abdelbasset4real@abdelbasset.d7gr8ht.mongodb.net/full-ecommerce?retryWrites=true&w=majority").then(() => {
        console.log('Database Connected');
    })
    // mongoose.connect(process.env.DB_URL).then(() => {
    //     console.log('Database Connected');
    // })
}
module.exports = dbConnection