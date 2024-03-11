const { Router } = require('express')
const { addAddress, getAddress } = require('../controllers/address')
const router = Router()

router.post('/add', addAddress )
router.get('/:user_id', getAddress)

module.exports = router