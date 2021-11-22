const Cart = require("../model/cart.model")
const {
    Op
} = require("sequelize")

class CartService {
    // 加入购物车
    async createOrUpdate(user_id, goods_id) {
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }
        })
        if (res) {
            // 已经存在，数量加1
            await res.increment("number")
            return await res.reload()
        } else {
            //    创建一条数据
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }
}
module.exports = new CartService()