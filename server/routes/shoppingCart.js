const { Router } = require('express')
const { getCart, removeCartItem, addToCart, updateCart, removeUserCart } = require('../controllers/shoppingCart')
const router = Router()

router.get('/:user_id', getCart)
router.delete('/update/:product_id', removeCartItem)
router.post('/add', addToCart)
router.put('/update/:product_id', updateCart)
router.delete('/delete/:user_id', removeUserCart)

module.exports = router