const {
    createAddr,
    findAllAddr,
    updateAddr,
    removeAddr,setDefaultAddr
} = require("../service/address.service")

class AddressController {
    // 添加地址
    async create(ctx) {
        const {
            consignee,
            phone,
            address
        } = ctx.request.body
        const user_id = ctx.state.user.id
        const res = await createAddr({
            consignee,
            phone,
            address,
            user_id
        })
        ctx.body = {
            code: 0,
            message: "添加地址成功",
            result: res
        }
    }
    // 查询地址列表
    async findAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await findAllAddr(user_id)
        ctx.body = {
            code: 0,
            message: "获取地址列表成功",
            result: res
        }
    }
    // 修改地址
    async update(ctx) {
        const {
            consignee,
            phone,
            address
        } = ctx.request.body
        const res = await updateAddr(ctx.params.id, {
            consignee,
            phone,
            address
        })
        ctx.body = {
            code: 0,
            message: "修改地址成功",
            result: res
        }
    }
    // 删除地址
    async remove(ctx) {
        const res = await removeAddr(ctx.params.id)
        ctx.body = {
            code: 0,
            message: "删除地址成功",
            result: res
        }
    }
    // 设置默认地址
    async setDefault(ctx) {
        const user_id = ctx.state.user.id
        const res = await setDefaultAddr(user_id,ctx.params.id)
        ctx.body = {
            code: 0,
            message: "设置默认地址成功",
            result: res
        }
    }
}

module.exports = new AddressController()