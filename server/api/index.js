// Matches Route requests

const router = require('express').Router()

router.use('/route', require('./route'))

// 404 error handler
router.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

module.exports = router
