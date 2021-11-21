// 解析URL，分析控制器对应的方法
const Router = require("koa-router")
const {
    auth,hasAdminPermission
} = require("../middleware/auth.middleware")

const {
    upload
} = require("../controller/goods.controller")

const router = new Router({
    prefix: "/goods"
})
// 文件上传
// router.post("/upload", auth, upload)
router.post("/upload", upload)
module.exports = router