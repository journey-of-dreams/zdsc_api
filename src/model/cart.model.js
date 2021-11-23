const {
    DataTypes
} = require("sequelize")
const seq = require("../db/seq")
const Goods = require("./goods.model")

const Cart = seq.define("zd_cart", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id"
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "商品id"
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "商品数量"
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "选中状态"
    },
})

Cart.belongsTo(Goods, {
    foreignKey: "goods_id",
    as: "goods_info"
})
// Cart.sync({
//     force: true
// })
module.exports = Cart