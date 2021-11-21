const bcrypt = require("bcryptjs")
const {
    getUserInfo
} = require("../service/user.service")
const {
    userFormateError,
    userAlreadyExited,
    userNotExited,
    loginError,
    userPasswordError
} = require("../constant/err.type")

// 密码/用户名不能为空
const userValidator = async (ctx, next) => {
    const {
        user_name,
        password
    } = ctx.request.body
    // 合法性验证
    if (!user_name || !password) {
        ctx.app.emit("error", userFormateError, ctx)
        return
    } else {
        await next()
    }
}
// 验证用户是否已存在
const verifyUser = async (ctx, next) => {
    const {
        user_name,
        password
    } = ctx.request.body
    // 合理性验证
    if (await getUserInfo({
            user_name
        })) {
        ctx.app.emit("error", userAlreadyExited, ctx)
        return
    } else {
        await next()
    }
}
// 密码加密
const cryptPassword = async (ctx, next) => {
    const {
        password
    } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    // hash保存的是密文
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash

    await next()
}
// 登录-验证
const verifyLogin = async (ctx, next) => {
    const {
        user_name,
        password
    } = ctx.request.body

    const userInfo = await getUserInfo({
        user_name
    })

    try {
        // 验证用户名是否存在
        if (!userInfo) {
            return ctx.app.emit("error", userNotExited, ctx)
            // 验证密码是否错误
        } else if (!bcrypt.compareSync(password, userInfo.password)) {
            return ctx.app.emit("error", userPasswordError, ctx)
        } else {
            await next()
        }
    } catch (error) {
        ctx.app.emit("error", loginError, ctx)
    }
}
module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}