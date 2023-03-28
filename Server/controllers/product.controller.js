const mongoose = require('mongoose');
const passport = require('passport');

const Product = mongoose.model('Product');

module.exports.addproduct = (req, res, next) => {
    var product = new Product();
    product.productName = req.body.productName;
    product.location = req.body.location;
    product.uploadDate = req.body.uploadDate;
    product.isAvailable = req.body.isAvailable;
    product.uploaderID = req.body.uploaderID;
    product.productImage = req.body.productImage;
    product.requesters = [];
    product.condition = req.body.condition;
    product.usedPeriod = req.body.usedPeriod;
    product.save( (err, doc) =>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in registering product: ' + JSON.stringify(err, undefined, 2));
    } );
}

module.exports.retrieve = (req, res, next) => {
    Product.find( (err, doc) =>{
        if(!err) res.send(doc);
        else {
            console.log(`Error in product retrive: `+ JSON.stringify(err, undefined, 2));
        }
    } ) 
}

module.exports.updateInfo = (req, res, next) => {
    //console.log(req.body);
    var product = {
        productName : req.body.productName,
        location : req.body.location,
        uploadDate : req.body.uploadDate,
        isAvailable : req.body.isAvailable,
        uploaderID : req.body.uploaderID,
        productImage : req.body.productImage,
        requesters : req.body.requesters,
        condition : req.body.condition,
        usedPeriod : req.body.usedPeriod
    };

    Product.findByIdAndUpdate(req.params.id, { $set:product }, { new:true } , (err, doc) => {
        if(!err) {res.send(doc);}
        else{
            console.log(`Error in exam update: `+ JSON.stringify(err, undefined, 2));
        }
    });
}

module.exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err, doc) => {
        if(!err) { res.send(doc); console.log('deleted') }
        else { console.log('Error in exam delete: ' + JSON.stringify(err, undefined, 2)); }
    })
}

module.exports.requestProduct = (req, res, next) => {
    var userID = req.body.userID;
    console.log(req.params.id);
    console.log(userID);
    Product.findByIdAndUpdate(req.params.id, {$push: {requesters: userID}}, {new:true}, (err, doc) =>{
        if(!err) {res.send(doc);
        }
        else{
            console.log(`Error in product request: `+ JSON.stringify(err, undefined, 2));
        }
    } )
}