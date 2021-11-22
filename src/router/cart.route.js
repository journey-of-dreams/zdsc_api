const Router = require("koa-router")

const {
    auth
} = require("../middleware/auth.middleware")
const {
    validator
} = require("../middleware/cart.midleware")
const {
    add
} = require("../controller/cart.controller")
const router = new Router({
    prefix: "/cart"
})

// 加入购物车
router.post("/", auth, validator, add)
module.exports = router