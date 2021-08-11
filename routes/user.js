const router = require('express').Router()
const userController = require('../controllers/userController')
const {check} = require ('express-validator')

router.post('/register', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
    ],
    userController.createUser    
)

router.post('/login', 
    [
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
    ],
    userController.authUser
)


module.exports = router