# 本项目用到的第三方中间件

## `sequelize`

- 连接数据库的工具

## `koa-router`

- 解析路由，获取路由参数
- prefix添加路由前缀
- 调用`allowedMethods`方法区分500与未实现的错误

## `koa-body`

- 通过`ctx.request.body`获取提交的数据

- 支持文件上传

  ```javascript
  // 简单配置
   //要在处理路由之前注册koabody中间件
  app.use(koaBody({
      multipart: true,
      formidable: {
          // 在配置选项option里，不推荐使用相对路径(在option里的相对路径，不是相对的当前的文件，而是相对于脚本文件）
          uploadDir: path.join(__dirname, "../upload"),
          keepExtensions: true
      }
  }));
  ```

## `bcryptjs`

- 密码加密，优于`md5`

## `dotenv`

- 将`.env`文件中的环境变量加载进`process.env`对象中

## `jsonwebtoken`

- 设置token

  ```javascript
  // 1.获取用户信息，在token的payload中，记录id，user_name，is_admin
  const {
      password,
      ...userInfo
  } = await getUserInfo({
      user_name
  })
  
  ctx.body = {
      code: 0,
      message: "用户登陆成功",
      result: {
          token: jwt.sign(userInfo, JWT_SECRET, {
              // 设置过期时间
              expiresIn: "1d"
          })
      }
  }
  ```

## `koa-parameter`

- 设置传递参数的规则，验证参数是否合法

  ```javascript
  try {
      ctx.verifyParams({
          goods_name: {
              type: "string",
              required: true
          },
      })
  } catch (err) {
      goodsFormatError.result = err
      return ctx.app.emit("error",goodsFormatError,ctx)
  }
  ```

## `koa-static`

- 使静态文件可以通过`http://localhost:8080/12.png`的方式访问

