const Goods = require("../model/goods.model")
class GoodsService {
    // 添加商品
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }
    // 根据id跟新商品
    async upadteGoods(id, goods) {
        const res = await Goods.update(goods, {
            where: {
                id
            }
        })
        return res[0] > 0 ? true : false
    }
    // 根据id删除商品
    async removeGoods(id) {
        const res = await Goods.destroy({
            where: {
                id
            }
        })
        return res
    }
    // 根据id恢复商品
    async restoreGoods(id) {
        const res = await Goods.restore({
            where: {
                id
            }
        })
        return res
    }
    // 获取商品列表
    async findAllGoods(pageNum, pageSize) {
        // offset：跳过的数据
        const offset = (pageNum - 1) * pageSize
        const {
            count,
            rows
        } = await Goods.findAndCountAll({
            offset,
            limit: pageSize * 1
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
}
module.exports = new GoodsService()