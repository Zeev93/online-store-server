const router = require('express').Router()
const productController = require('../controllers/productController')
const {check} = require ('express-validator')


router.get('/', 
    productController.getProducts
)

router.get('/:id', 
    productController.getProduct
)

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('long_description', 'Long Description is required').not().isEmpty(),
        check('brand', 'Brand is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty()
    ],
    productController.createProduct    
)

router.put('/:id',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('long_description', 'Long Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty()
    ],
    productController.updateProduct
)

router.delete('/:id',
    productController.deleteProduct
)


module.exports = router