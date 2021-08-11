const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const {check} = require ('express-validator')
const auth = require('../middleware/auth')


router.get('/',
    categoryController.getCategories
)

router.get('/:id', 
    categoryController.getCategory
)


// Auth
router.post('/', 
    // auth,
    [
        check('description', 'Description is required').not().isEmpty(),
    ],
    categoryController.createCategory    
)

router.put('/:id',
    // auth,
    [
        check('description', 'Description is required').not().isEmpty(),
    ],
    categoryController.updateCategory
)

router.delete('/:id',
    // auth,
    categoryController.deleteCategory
)

module.exports = router
