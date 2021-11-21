// 处理路由业务
const jwt = require("jsonwebtoken")

const {
    getUserInfo,
    createUser,
    updateById
} = require("../service/user.service")
const {
    JWT_SECRET
} = require("../config/config.default")

const {
    userRegisterError
} = require("../constant/err.type")
class UserController {
    // 注册
    async register(ctx, next) {
        // 1.获取数据
        const {
            user_name,
            password
        } = ctx.request.body

        // 2.操作数据库,重构users表
        try {
            const res = await createUser(user_name, password)
            // 3.返回结果
            ctx.body = {
                code: 0,
                message: "用户注册成功",
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (error) {
            ctx.app.emit("error", userRegisterError, ctx)
        }

    }
    // 登录
    async login(ctx, next) {
        const {
            user_name
        } = ctx.request.body

        // 1.获取用户信息，在token的playload中，记录id，user_name，is_admin
        const {
            password,
            ...userInfo
        } = await getUserInfo({
            user_name
        })

        ctx.body = {
            code: 0,
            message: "用户登陆成功",
            result: {
                token: jwt.sign(userInfo, JWT_SECRET, {
                    expiresIn: "1d"
                })
            }
        }
    }
    // 修改密码
    async editPassword(ctx, next) {
        const id = ctx.state.user.id
        const {
            password
        } = ctx.request.body
        if (await updateById({
                id,
                password
            })) {
            ctx.body = {
                code: 0,
                message: "修改密码成功",
                result: ""
            }
        } else {
            ctx.body = {
                code: 10007,
                message: "修改密码失败",
                result: ""
            }
        }
        // console.log(res);
    }
}
module.exports = new UserController()