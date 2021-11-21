# 一、项目初始化

## 1 npm初始化

```javascript
npm init -y
```

生成`package.json`文件：

- 记录项目依赖

## 2 git初始化

```javascript
git init
git add . //添加到缓存区
git commit -m "说明文字" //提交到版本库
```

生成.git隐藏文件夹，git的本地仓库

## 3 创建ReadMe说明文件

# 二、搭建项目

## 1 安装Koa框架

```javascript
npm i koa
```

## 2 编写最基本的app

创建src/main.js

```javascript
const Koa = require("koa")

const app = new Koa()

app.use((ctx, next)=>{
    
})
app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
})
```

## 3 测试

在终端，使用`node src/main.js`

# 三 项目的基本优化

## 1 自动重启服务

安装nodemon工具

```javascript
npm i nodemon
```

编写package.json脚本

```javascript
"scripts": {
    "dev":"nodemon src/main.js",
  },
```

执行npm run dev启动服务

## 2 读取配置文件

安装dotenv，会读根目录中的.env文件，将配置写入`process.env`中

```javascript
npm i dotenv
```

创建.env文件

```javascript
APP_PORT = 8000
```

创建`src/config/config.default.js`

```javascript
const dotenv = require("dotenv")

dotenv.config()

module.exports = process.env
```

改写main.js

```javascript
const Koa = require("koa")
const {
    APP_PORT
} = require("./config/config.default")
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = "hello nodejs"
})
app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

# 四 添加路由

## 1 安装koa-router

```javascript
npm i koa-router
```

步骤：

1. 导入包
2. 实例化对象
3. 编写路由

4. 注册中间件

## 2 编写路由

创建src/router目录，编写user.route.js

```javascript
const Router = require("koa-router")

const userRouter = new Router({
    prefix: "/user"
})

userRouter.get("/", (ctx, next) => {
    ctx.body = "hello user"
})
module.exports = userRouter
```

## 3. 将main.js和app拆分

将main.js中有关app的业务拆分出去

创建`app/index.js`

```javascript
const Koa = require("koa")

const app = new Koa()

const userRouter = require("../router/user.route")
app.use(userRouter.routes())

module.exports = app
```

改写main.js

```javascript
const {
    APP_PORT
} = require("./config/config.default")
const app = require("./app")


app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

## 4 将路由和控制器拆分

路由：解析URL，分析给控制器对应的方法

控制器：处理不同的业务

改写`user.route.js`

```javascript
const Router = require("koa-router")
const {
    register,
    login
} = require("../controller/user.controller")

const userRouter = new Router({
    prefix: "/user"
})

// 注册
userRouter.post("/register", register)
// 登录
userRouter.post("/login", login)
module.exports = userRouter
```

创建`controller/user.controller.js`

```javascript
class UserController {
    async register(ctx, next) {
        ctx.body = "用户注册成功"
    }
    async login(ctx, next) {
        ctx.body = "登陆成功"
    }
}
module.exports = new UserController()
```

# 五 解析body

## 1 安装koa-body

```javascript
npm i koa-body
```

## 2 注册中间件

```javascript
const koaBody = require('koa-body');
app.use(koaBody()); //要在处理路由之前注册koabody中间件
```

## 3 改写user.controller.js并拆分service层

```javascript
// 处理路由业务
const {
    createUser
} = require("../service/user.service")
class UserController {
    async register(ctx, next) {
        // 1.获取数据
        const {
            user_name,
            password
        } = ctx.request.body
        // 2.操作数据库
        const res = await createUser(user_name, password)
        console.log(res);
        // 3.返回结果
        ctx.body = ctx.request.body
    }
    async login(ctx, next) {
        ctx.body = "登陆成功"
    }
}
module.exports = new UserController()
```

```javascript
// 操作数据库
class UserService {
    async createUser(user_name, password) {
        // todo：写入数据库
        return "写入数据库成功"
    }
}
module.exports = new UserService()
```

# 六 数据库操作

sequelize ORM数据库工具

ORM：对象关系映射

- 数据表映射（对应）一个类
- 数据表中的数据行（记录）对应一个对象
- 数据表中的字段对应对象的属性
- 数据表中的操作对应对象中的方法

## 1 安装sequelize

```javascript
npm i mysql2 sequelize
```

## 2 连接数据库

`src/db/seq.js`

```javascript
const {
    Sequelize
} = require('sequelize');
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require("../config/config.default")

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: "mysql"
})

module.exports = seq
```

## 3 编写配置文件

`.env`

```javascript
APP_PORT = 8000

MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PWD = 123456
MYSQL_DB = zdsc
```

#  七 创建Model模型

## 1 拆分Model层

sequelize主要通过Model对应的数据表

创建`src/model/user.model.js`

```javascript
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
        comment: "是否为管理员，0：不是管理员（默认）；1：是管理员"
    },
})
// 强制同步数据库
// User.sync({
//     force: true,
// })
module.exports = User
```

