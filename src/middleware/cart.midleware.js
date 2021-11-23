const {
    ruleFormatError
} = require("../constant/err.type")
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (error) {
            ruleFormatError.result = error
            return ctx.app.emit("error", ruleFormatError, ctx)
        }
        await next()
    }
}
module.exports = {
    validator
}