const {
    DataTypes
} = require("sequelize")
const seq = require("../db/seq")

const Address = seq.define("zd_address", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户id"
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "收货人"
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: "手机号"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "地址"
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: "是否为默认地址"
    }
})

// Address.sync({
//     force: true
// })

module.exports = Address