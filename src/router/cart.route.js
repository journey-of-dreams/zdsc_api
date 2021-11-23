const Router = require("koa-router")

const {
    auth
} = require("../middleware/auth.middleware")
const {
    validator
} = require("../middleware/cart.midleware")
const {
    add,
    findAll,
    update,
    remove,
    selectAll,
    unselectAll
} = require("../controller/cart.controller")

const router = new Router({
    prefix: "/cart"
})

// 加入购物车
router.post("/", auth, validator({
    goods_id: "number"
}), add)
// 获取购物车列表
router.get("/", auth, findAll)
// 更新购物车
router.patch("/:id", auth, validator({
    number: {
        type: "number",
        required: false
    },
    selected: {
        type: "boolean",
        required: false
    }
}), update)
// 批量删除购物车
router.delete("/", auth, validator({
    ids: "array"
}), remove)
// 全选
router.put("/selectAll",auth,selectAll)
// 全不选
router.put("/unselectAll",auth,unselectAll)
module.exports = router