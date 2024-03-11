const { Router } = require('express')
const { signup_post, signin_post } = require('../controllers/authentication')
const router = Router()

router.post('/signup', signup_post)
router.post('/signin', signin_post)

module.exports = router