const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: 'authIndex'
    })
})


module.exports = router