const Router = require("koa-router")
const {
    auth
} = require("../middleware/auth.middleware")

const {
    validator
} = require("../middleware/cart.midleware")
const {
    create,
    findAll,
    update
} = require("../controller/order.controller")
const router = new Router({
    prefix: "/order"
})

// 生成订单
router.post("/", auth, validator({
    address_id: "int",
    goods_info: "string",
    total: "string"
}), create)
// 获取订单列表
router.get("/", auth, findAll)
// 修改订单（非会员不可取消订单）
router.patch("/:id", auth, validator({
    status: "number"
}), update)
module.exports = router