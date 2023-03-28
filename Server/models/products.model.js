const mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: 'Product name can\'t be emtpy',
    },
    location:{
        type:String
    },
    uploadDate:{
        type:String
    },
    isAvailable:{
        type:Boolean
    },
    uploaderID:{
        type: String
    },
    requesters:{
        type: Array
    },
    productImage:{
        type:String
    },
    condition:{
        type:String
    },
    usedPeriod:{
        type:Number
    }
});

mongoose.model('Product', ProductSchema);