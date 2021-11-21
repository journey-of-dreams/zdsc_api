// model相当于表
const {
    DataTypes
} = require("sequelize")

const seq = require("../db/seq")

// 创建模型(Model zd_user -> zd_users)
// 表名推断：未指定确切表名时，sequelize会自动将模型名的负数作为表名，因此因此定义了zd_users表
const User = seq.define("zd_user", {
    // id会被sequelize自动创建
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // comment：表示注释
        comment: "用户名，唯一"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码"
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员，0：不是管理员（默认）；1：是管理、员"
    },
})
// 强制同步数据库
// User.sync({
//     force: true,
// })
module.exports = User