# 🌐 获取 Vercel 访问链接 - 手动操作步骤

## 🎯 最快速的方法（5分钟搞定）

---

## 第一步：登录 Vercel

1. **打开浏览器，访问**：
   ```
   https://vercel.com
   ```

2. **注册或登录**
   - 点击右上角的 **"Sign Up"** 或 **"Login"**
   - 选择 **"Continue with GitHub"**（用 GitHub 账号登录）
   - 授权 Vercel 访问你的 GitHub 仓库

---

## 第二步：导入项目

1. **进入 Vercel 仪表盘**
   - 登录后会自动跳转到仪表盘
   - 或者点击 "Add New" → "Project"

2. **导入你的仓库**
   - 在 "Import Git Repository" 列表中找到：
     ```
     math-learning-app
     ```
   - 点击仓库右侧的 **"Import"** 按钮

---

## 第三步：配置部署（自动检测，通常不需要改）

Vercel 会自动检测并填充配置，检查以下内容：

```
✓ Framework Preset: Next.js
✓ Root Directory: ./
✓ Build Command: pnpm run build
✓ Output Directory: .next
✓ Install Command: pnpm install
```

**如果配置正确，直接点击底部的 "Deploy" 按钮**

---

## 第四步：等待部署完成

### 部署进度

你会看到构建进度：

```
Running build...
Cloning repository...
Installing dependencies...
Building application...
✓ Build completed in 2m 30s
Uploading...
✓ Upload completed
Deploying...
✓ Deployed to Production
```

**预计时间**：2-5 分钟

### 部署成功标志

看到以下页面就成功了：

```
🎉 Congratulations!

Your application is now live!

Preview Deployment: https://math-learning-app.vercel.app
```

---

## 第五步：获取并复制访问链接

部署成功后，你会看到：

### 1. 访问链接位置

在 Vercel 页面上，你会看到几个链接：

```
✓ Production Deployment
  https://math-learning-app.vercel.app

✓ Preview Deployment
  https://math-learning-app-xxxx.vercel.app
```

**复制第一个链接**（Production Deployment）

### 2. 你的访问链接

格式通常是：
```
https://你的项目名.vercel.app
```

例如：
```
https://math-learning-app.vercel.app
```

### 3. 测试链接

- **在浏览器中打开链接**
- 应该能看到你的应用
- 测试各个功能是否正常

---

## ✅ 完成！现在你可以：

### 1. 分享链接

把复制好的链接发给朋友：

```
https://math-learning-app.vercel.app
```

### 2. 在任何设备上使用

- ✅ 电脑浏览器
- ✅ 手机浏览器
- ✅ 平板电脑
- ✅ 完美适配各种屏幕

### 3. 自定义项目名（可选）

如果不喜欢默认的项目名，可以修改：

1. 在 Vercel 项目页面，点击 **"Settings"**
2. 点击 **"General"**
3. 找到 "Project Name"
4. 修改名称，例如：`math-app-2024`
5. 保存

新的链接会变成：
```
https://math-app-2024.vercel.app
```

---

## 📊 查看部署详情

### 查看部署历史

1. 在 Vercel 项目页面，点击 **"Deployments"**
2. 可以看到所有部署记录
3. 点击任意部署查看详细信息

### 查看访问数据

1. 在项目页面，点击 **"Analytics"**
2. 可以看到：
   - 访问次数
   - 访问用户数
   - 地区分布
   - 设备类型

---

## 🔄 如何更新应用？

### 方法一：自动更新（推荐）

当你推送新代码到 GitHub 时：

```bash
git add .
git commit -m "更新内容"
git push
```

Vercel 会自动检测并重新部署，几秒钟后更新生效！

### 方法二：手动触发

1. 在 Vercel 项目页面，点击 **"Deployments"**
2. 点击最近的部署
3. 点击右上角的 **"..."** 菜单
4. 选择 **"Redeploy"**

---

## 🎁 高级功能

### 绑定自定义域名（完全免费）

1. 在项目页面，点击 **"Domains"**
2. 点击 **"Add Domain"**
3. 输入你的域名，例如：`math.yourdomain.com`
4. 配置 DNS 记录
5. 完成！

### 设置环境变量

如果需要环境变量：

1. 在项目页面，点击 **"Settings"**
2. 点击 **"Environment Variables"**
3. 添加变量名和值
4. 保存并重新部署

### 查看日志

1. 在项目页面，点击 **"Deployments"**
2. 点击具体的部署
3. 点击 **"Functions"** 或 **"Build Logs"**
4. 查看详细日志

---

## ❓ 常见问题

### Q: 部署需要多长时间？

A: 第一次部署需要 3-5 分钟，后续更新只需要 1-2 分钟。

### Q: 部署失败怎么办？

A: 查看构建日志，通常是因为：
- 依赖安装失败
- 构建脚本错误
- 配置问题

查看日志后会显示具体错误信息。

### Q: 访问链接可以改吗？

A: 可以！修改项目名即可，或者在 Domains 中添加自定义域名。

### Q: 需要付费吗？

A: 不需要！Vercel 免费版完全够用：
- 100GB 带宽/月
- 无限部署
- 免费 HTTPS
- 全球 CDN

### Q: 可以限制访问吗？

A: 需要！可以添加密码保护或使用身份验证。

---

## 📋 操作清单

复制以下步骤，逐一完成：

- [ ] 1. 访问 https://vercel.com
- [ ] 2. 用 GitHub 账号登录
- [ ] 3. 导入 math-learning-app 仓库
- [ ] 4. 检查配置（Next.js, pnpm run build）
- [ ] 5. 点击 Deploy
- [ ] 6. 等待 2-5 分钟
- [ ] 7. 复制访问链接
- [ ] 8. 在浏览器测试链接
- [ ] 9. 分享给朋友

---

## 🎯 快速链接

- **Vercel 官网**：https://vercel.com
- **你的 GitHub 仓库**：https://github.com/zxq428952-pixel/math-learning-app
- **Vercel 文档**：https://vercel.com/docs

---

## 💡 小技巧

### 1. 保存访问链接

把你的访问链接保存到记事本：
```
https://math-learning-app.vercel.app
```

### 2. 创建快捷方式

在浏览器中：
- 打开访问链接
- 按 Ctrl+D (Cmd+D) 添加书签
- 方便以后访问

### 3. 分享到社交媒体

- 把链接发到微信、QQ
- 发到社交媒体
- 让更多人使用

---

**现在就去 Vercel 部署吧！5分钟后你就能分享给朋友了！** 🚀✨
