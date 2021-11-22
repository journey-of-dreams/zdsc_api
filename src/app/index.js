const path = require("path")

const Koa = require("koa")
const koaBody = require('koa-body');
const KoaStatic = require("koa-static")
const parameter = require('koa-parameter');

const errHandler = require("./errHandler")

const app = new Koa()
// const goodsRouter = require("../router/goods.route")
const router = require("../router")
app.use(koaBody({
    multipart: true,
    formidable: {
        // 在配置选项option里，不推荐使用相对路径(在option里的相对路径，不是相对的当前的文件，而是相对于脚本文件）
        uploadDir: path.join(__dirname, "../upload"),
        keepExtensions: true
    }
})); //要在处理路由之前注册koabody中间件
app.use(KoaStatic(path.join(__dirname, "../upload")))
app.use(parameter(app))
// app.use(userRouter.routes())
app.use(router.routes()).use(router.allowedMethods())
// 统一错误处理
app.on("error", errHandler)
module.exports = app