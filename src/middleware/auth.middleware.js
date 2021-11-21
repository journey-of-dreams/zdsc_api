const jwt = require("jsonwebtoken")
const {
    tokenExpiredError,
    invalidToken,
    notAdminPermission
} = require("../constant/err.type")
const {
    JWT_SECRET
} = require("../config/config.default")

// 登录认证-验证token
const auth = async (ctx, next) => {
    const {
        authorization
    } = ctx.request.header
    const token = authorization.replace("Bearer ", "")
    try {
        // user中包含了payload信息（id,user_name,is_admin）
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case "TokenExpiredError":
                return ctx.app.emit("error", tokenExpiredError, ctx)
            case "JsonWebTokenError":
                return ctx.app.emit("error", invalidToken, ctx)
            default:
                return console.error(err);
        }
    }
    await next()
}
// 管理员权限验证
const hasAdminPermission = async (ctx, next) => {
    const {
        is_admin
    } = ctx.state.user
    if (!is_admin) {
        console.log("该用户没有管理员权限", ctx.state.user);
        return ctx.app.emit("error", notAdminPermission, ctx)
    } else {
        await next()
    }
}

module.exports = {
    auth,
    hasAdminPermission
}