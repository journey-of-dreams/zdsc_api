// 解析URL，分析控制器对应的方法
const Router = require("koa-router")
const {
    register,
    login,
    editPassword
} = require("../controller/user.controller")
const {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
} = require("../middleware/user.midlleware")
const {
    auth
} = require("../middleware/auth.middleware")

const userRouter = new Router({
    prefix: "/user"
})

// 注册
userRouter.post("/register", userValidator, verifyUser, cryptPassword, register)
// 登录
userRouter.post("/login", userValidator, verifyLogin, login)
// 修改密码
userRouter.patch("/", auth, cryptPassword, editPassword)
module.exports = userRouter