const { Router } = require('express')
const { user_get, get_users, edit_user } = require('../controllers/users')
const router = Router()

router.get('/:user_id', user_get)
router.get('/', get_users)
router.put('/edit/:user_id', edit_user)

module.exports = router