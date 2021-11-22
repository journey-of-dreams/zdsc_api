// 解析URL，分析控制器对应的方法
const Router = require("koa-router")
const {
    auth,
    hasAdminPermission
} = require("../middleware/auth.middleware")
const {
    validator
} = require("../middleware/goods.midleware")
const {
    upload,
    create,
    update,
    remove,
    restore,
    findAll
} = require("../controller/goods.controller")

const router = new Router({
    prefix: "/goods"
})
// 文件上传
router.post("/upload", auth, hasAdminPermission, upload)

// 发布商品
// router.post("/", auth, hasAdminPermission, validator,(ctx)=>{
//     ctx.body = "发布商品成功"
// })
router.post("/", auth, validator, create)
// 修改商品
router.put("/:id", auth, validator, update)
// 删除商品-硬删除
// router.delete("/:id", auth,hasAdminPermission, remove)
// 下架商品-软删除
router.post("/:id/off", auth, remove)
// 恢复商品
router.post("/:id/on", auth, restore)
// 获取商品列表
router.get("/",findAll)

module.exports = router