const {
    goodsFormatError
} = require("../constant/err.type")
const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_id: "number"
        })
    } catch (error) {
        goodsFormatError.result = error
        return ctx.app.emit("error", goodsFormatError, ctx)
    }
    await next()
}
module.exports = {
    validator
}