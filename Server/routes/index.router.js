const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken ,userController.userProfile);
router.post('/addproduct', productController.addproduct);
router.get('/products', productController.retrieve);
router.put('/product/:id', productController.updateInfo);
router.delete('/product/:id', productController.deleteProduct);
router.put('/product/join/:id', productController.requestProduct);
router.get('/requester/:id', userController.requesterInfo);

module.exports = router;
