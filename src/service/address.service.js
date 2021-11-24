const Address = require("../model/address.model")

class AddressService {
    // 添加地址
    async createAddr(params) {
        return await Address.create(params)
    }
    // 获取地址列表
    async findAllAddr(user_id) {
        return await Address.findAll({
            attributes: ["id", "consignee", "phone", "address", "isDefault"],
            where: {
                user_id
            }
        })
    }
    // 修改地址
    async updateAddr(id, params) {
        return await Address.update(params, {
            where: {
                id
            }
        })
    }
    // 删除地址
    async removeAddr(id) {
        return await Address.destroy({
            where: {
                id
            }
        })
    }
    // 设置默认地址
    async setDefaultAddr(user_id, id) {
        await Address.update({
            isDefault: false
        }, {
            where: {
                user_id
            }
        })
        return await Address.update({
            isDefault: true
        }, {
            where: {
                id
            }
        })

    }
}
module.exports = new AddressService()