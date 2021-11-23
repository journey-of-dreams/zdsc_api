const path = require("path")

const {
    createGoods,
    upadteGoods,
    removeGoods,
    restoreGoods,
    findAllGoods
} = require("../service/goods.server")
const {
    fileUploadError,
    unSupportFileType,
    editGoodsError,
    deleteGoodsError,
    restoreGoodsError,
    uniqueConstraintError
} = require("../constant/err.type")

class GoodsController {
    // 上传
    async upload(ctx, next) {
        const {
            file
        } = ctx.request.files || []
        const fileTypes = ["image/jpeg", "image/png"]
        if (file) {
            if (!fileTypes.includes(file.type)) {
                return ctx.app.emit("error", unSupportFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: "文件上传成功",
                result: {
                    // basename:返回路径中的最后一部分
                    goods_img: path.basename(file.path)
                }
            }

        } else {
            return ctx.app.emit("error", fileUploadError, ctx)
        }
    }
    // 发布商品
    async create(ctx) {
        try {
            const res = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: "发布商品成功",
                result: res
            }
        } catch (error) {
            uniqueConstraintError.result = error.fields
            ctx.app.emit("error", uniqueConstraintError, ctx)
        }
    }
    // 修改商品
    async update(ctx) {
        const res = await upadteGoods(ctx.params.id, ctx.request.body)
        if (res) {
            ctx.body = {
                code: 0,
                message: "修改商品成功"
            }
        } else {
            return ctx.app.emit("error", editGoodsError, ctx)
        }
    }
    // 删除商品
    async remove(ctx) {
        const res = await removeGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: "下架商品成功",
                result: ""
            }
        } else {
            return ctx.app.emit("error", deleteGoodsError, ctx)
        }

    }
    // 恢复商品
    async restore(ctx) {
        const res = await restoreGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: "上架商品成功",
                result: ""
            }
        } else {
            return ctx.app.emit("error", restoreGoodsError, ctx)
        }
    }
    // 获取商品列表
    async findAll(ctx) {
        // 解析pageNum和pageSize
        const {
            pageNum = 1,
                pageSize = 10
        } = ctx.request.query
        const res = await findAllGoods(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: "获取商品列表陈成功",
            result: res
        }
    }
}

module.exports = new GoodsController()