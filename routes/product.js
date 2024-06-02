// connect with mongodb which is detabase
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
// mongoose.connect("mongodb://127.0.0.1:27017/Ecom");

// Product Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
    ,mrp:{
        type:String,
        required:true,
    }
    ,description:{
        type:String,
    }
    ,img:{
        type:String,
    },
});
module.exports =mongoose.model('product',productSchema);
