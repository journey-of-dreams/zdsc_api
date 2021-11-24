const Order = require("../model/order.model")
const {
    createOrder,
    findAllOrder,
    updateOrder
} = require("../service/order.service")
const {
    cancelOrderError
} = require("../constant/err.type")
class OrderController {
    // 生成订单
    async create(ctx) {
        const user_id = ctx.state.user.id
        const {
            address_id,
            goods_info,
            total
        } = ctx.request.body
        const order_number = "ZD" + Date.now()

        const res = await createOrder({
            user_id,
            address_id,
            goods_info,
            total,
            order_number
        })

        ctx.body = {
            code: 0,
            message: "订单创建成功",
            result: res
        }
    }
    // 获取订单列表
    async findAll(ctx) {
        const user_id = ctx.state.user.id
        const {
            pageNum = 1, pageSize = 10, status
        } = ctx.query
        const res = await findAllOrder(user_id, pageNum, pageSize, status)
        ctx.body = {
            code: 0,
            message: "获取订单量列表成功",
            result: res
        }
    }
    // 修改订单
    async update(ctx) {
        const status = ctx.request.body.status
        const id = ctx.params.id
        const is_admin = ctx.state.user.is_admin
        if (!is_admin && status == 4) {
            return ctx.app.emit("error", cancelOrderError, ctx)
        }
        const res = await updateOrder(id, status)
        ctx.body = {
            code: 0,
            message: "修改订单状态成功",
            result: res
        }
    }
}
module.exports = new OrderController()