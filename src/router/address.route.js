const Router = require("koa-router")

const {
    auth
} = require("../middleware/auth.middleware")
const {
    validator
} = require("../middleware/cart.midleware")
const {
    create,
    findAll,update,remove,setDefault
} = require("../controller/address.controller")

const router = new Router({
    prefix: "/address"
})
// 添加地址
router.post("/", auth, validator({
    consignee: "string",
    phone: {
        type: "string",
        format: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    },
    address: "string"
}), create)
// 获取地址猎豹
router.get("/", auth, findAll)
// 修改地址
router.put("/:id", auth, update)
// 删除地址
router.delete("/:id", auth, remove)
// 设置默认地址
router.patch("/:id", auth, setDefault)
module.exports = router