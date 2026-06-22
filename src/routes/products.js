const express = require('express');

const router = express.Router();

const productController = require('../controllers/product.controller');

const authMiddleware = require('../middlewares/authMiddleware');

const roleMiddleware = require('../middlewares/roleMiddleware');


// Rutas públicas
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);


// Rutas solo ADMIN
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    productController.createProduct
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    productController.updateProduct
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    productController.deleteProduct
);

module.exports = router;