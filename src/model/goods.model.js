const {
    DataTypes
} = require("sequelize")

const seq = require("../db/seq")

const Goods = seq.define("zd_good", {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        comment: "商品名称"
    },
    goods_price: {
        // 价格推荐使用decimal类型
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "商品价格"
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "商品库存"
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "商品图片地址"
    }
}, {
    paranoid: true
})
// Goods.sync({
//     force: true
// })
module.exports = Goods