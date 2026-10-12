# PEAKPAL 网站源码

登山社交与出行服务的前端交互演示，包含注册与资料填写、伙伴配对、聊天、个人中心、社区动态、营地预约和山峰观测。

## 本地查看

安装 Node.js 后，在本目录运行：

```sh
npm run dev
```

打开 http://127.0.0.1:4173 。无需安装第三方依赖。也可直接用浏览器打开 `index.html`。

## 文件与检查

- `index.html`：网页入口。
- `styles.css`、`refinements.css`：页面样式。
- `script.js`、`enhancements.js`：页面与交互逻辑。
- `assets/`：页面图片与插画。
- `server.mjs`、`build.mjs`：本地预览和静态构建。
- `verify.mjs`：交互验证。

运行 `npm run build` 生成 `dist/`；运行 `node verify.mjs` 检查主要交互。

资料、聊天和模拟订单保存在当前浏览器。此版本未接入真实账户、消息、支付或监控服务。

[原始 Figma 设计](https://www.figma.com/design/0m8klx7ZsQuGsBWmUaTpnT/PEAKPAL?node-id=0-1)
