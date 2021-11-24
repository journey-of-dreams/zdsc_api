// 解析URL，分析控制器对应的方法
const Router = require("koa-router")
const {
    register,
    login,
    editPassword,
    setAuth
} = require("../controller/user.controller")
const {
    validator
} = require("../middleware/cart.midleware")
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
// 设置权限（admin为超级管理员，可为其他用户设置权限）
userRouter.patch("/auth", auth, validator({
    id: "number",
    is_admin: "boolean"
}), setAuth)
module.exports = userRouter