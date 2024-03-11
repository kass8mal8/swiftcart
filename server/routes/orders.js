const { Router } = require('express')
const { addOrders, editOrder, getOrder } = require('../controllers/orders')
const router = Router()

router.post('/place-order', addOrders)
router.put('/edit-order', editOrder)
router.get('/:user_id', getOrder)

module.exports = router