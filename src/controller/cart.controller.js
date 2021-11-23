const {
    createOrUpdate,
    findCarts,
    updateCarts,
    removeCarts,
    selectAllCarts,unselectAllCarts
} = require("../service/cart.server")
const {
    notExitGoodsError
} = require("../constant/err.type")
const Cart = require("../model/cart.model")
// post请求用ctx.request.body获取参数，get请用用ctx.request.query获取参数
class CartController {
    // 加入购物车
    async add(ctx) {
        const goods_id = ctx.request.body.goods_id
        const user_id = ctx.state.user.id
        const res = await createOrUpdate(user_id, goods_id)
        ctx.body = {
            code: 0,
            message: "添加到购物车成功",
            result: res
        }
    }
    // 获取购物车列表
    async findAll(ctx) {
        const {
            pageSize = 10,
                pageNum = 1
        } = ctx.request.query
        const res = await findCarts(pageSize, pageNum)
        ctx.body = {
            code: 0,
            message: "获取购物车列表成功",
            result: res
        }
    }
    // 更新购物车
    async update(ctx) {
        const id = ctx.params.id
        const {
            number,
            selected
        } = ctx.request.body
        if (number || selected) {
            const res = await updateCarts({
                id,
                number,
                selected
            })
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "更新购物车成功",
                    result: res
                }

            } else {
                return ctx.app.emit("error", notExitGoodsError, ctx)
            }
        }
    }
    // 批量删除购物车
    async remove(ctx) {
        const ids = ctx.request.body.ids
        const user_id = ctx.state.user.id
        const res = await removeCarts(ids,user_id)

        ctx.body = {
            code: 0,
            message: `成功删除${res}条购物车数据`,
            result: ""

        }
    }
    // 全选
    async selectAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await selectAllCarts(user_id)
        console.log("是否执行了");
        ctx.body = {
            code: 0,
            message: "全部选中",
            result: res
        }
    }
    // 全不选
    async unselectAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await unselectAllCarts(user_id)
        ctx.body = {
            code: 0,
            message: "全部不选中",
            result: res
        }
    }
}

module.exports = new CartController()