const Order = require("../model/order.model")
class OrderService {
    // 生成订单
    async createOrder(params) {
        return await Order.create(params)
    }
    // 获取订单列表
    async findAllOrder(user_id, pageNum, pageSize, status) {
        const whereOpt = {}
        status && Object.assign(whereOpt, {
            status
        })
        Object.assign(whereOpt, {
            user_id
        })
        const account = (pageNum - 1) * pageSize
        const {
            count,
            rows
        } = await Order.findAndCountAll({
            attributes: ["id", "goods_info", "total", "order_number", "status"],
            offset: account,
            limit: pageSize * 1,
            where: whereOpt
        })
        return {
            pageNum,
            pageSize,
            count,
            status,
            list: rows
        }

    }
    // 修改订单
    async updateOrder(id, status) {
        return await Order.update({
            status
        }, {
            where: {
                id
            }
        })
    }
}
module.exports = new OrderService()