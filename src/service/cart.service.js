const Cart = require("../model/cart.model")
const Goods = require("../model/goods.model")
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
    // 获取购物车列表
    async findCarts(pageSize, pageNum) {
        let offset = (pageNum - 1) * pageSize
        const {
            count,
            rows
        } = await Cart.findAndCountAll({
            attributes: ["id", "number", "selected"],
            offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ["id", "goods_name", "goods_price", "goods_img"]
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    // 更新购物车
    async updateCarts(params) {
        const {
            id,
            selected,
            number
        } = params
        // findByPk：通过主键查询
        const res = await Cart.findByPk(id)
        if (!res) {
            return false
        } else {
            res.number = number ? number : res.number
            res.selected = selected ? selected : res.selected
            return await res.save()
        }
    }
    // 批量删除购物车
    async removeCarts(ids,user_id) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                },
                user_id
            }
        })
    }
    // 全选
    async selectAllCarts(user_id) {
        return await Cart.update({
            selected: true
        }, {
            where: {
                user_id
            }
        })
    }
    // 全不选
    async unselectAllCarts(user_id) {
        return await Cart.update({
            selected: false
        }, {
            where: {
                user_id
            }
        })
    }
}
module.exports = new CartService()