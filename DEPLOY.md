# 🚀 快速部署指南

## 前置要求

1. **代码仓库**
   - GitHub 或 GitLab 账号
   - 本地项目已完成开发

2. **推荐平台**
   - Vercel（推荐，Next.js 官方支持）
   - Netlify
   - Cloudflare Pages

## 方法一：Vercel 部署（最简单）

### 步骤 1：推送到 GitHub

```bash
# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交代码
git commit -m "Initial commit: 初二数学学习应用"

# 4. 创建 GitHub 仓库后，添加远程地址
git remote add origin https://github.com/你的用户名/仓库名.git

# 5. 推送代码
git branch -M main
git push -u origin main
```

### 步骤 2：在 Vercel 部署

1. **访问 Vercel**
   - 打开 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New" > "Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置部署**
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`（保持默认）
   - **Build Command**: `pnpm run build`（自动检测）
   - **Output Directory**: `.next`（自动检测）
   - **Install Command**: `pnpm install`（自动检测）

4. **环境变量**（可选）
   - 本项目不需要额外环境变量
   - 如有需要，点击 "Environment Variables" 添加

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待 2-3 分钟构建完成

### 步骤 3：获取访问链接

部署成功后，你会看到：
- 默认域名：`https://你的项目名.vercel.app`
- 部署日志和状态

### 步骤 4：自定义域名（可选）

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的自定义域名
4. 配置 DNS 记录

## 方法二：Netlify 部署

### 步骤 1：推送到 GitHub（同上）

### 步骤 2：在 Netlify 部署

1. **访问 Netlify**
   - 打开 [netlify.com](https://netlify.com)
   - 使用 GitHub 账号登录

2. **添加站点**
   - 点击 "Add new site" > "Import an existing project"
   - 选择你的 GitHub 仓库

3. **构建设置**
   ```yaml
   Build command: pnpm run build
   Publish directory: .next
   Base directory: ./
   ```

4. **高级配置**
   - 添加环境变量：
     - `NODE_VERSION`: `20`

5. **部署**
   - 点击 "Deploy site"

## 方法三：Cloudflare Pages 部署

### 步骤 1：推送到 GitHub（同上）

### 步骤 2：在 Cloudflare Pages 部署

1. **访问 Cloudflare Pages**
   - 打开 [pages.cloudflare.com](https://pages.cloudflare.com)
   - 登录 Cloudflare 账号

2. **创建项目**
   - 点击 "Create a project"
   - 连接你的 GitHub 仓库

3. **构建设置**
   ```yaml
   Framework preset: Next.js
   Build command: pnpm run build
   Build output directory: .next
   ```

4. **部署**
   - 点击 "Save and Deploy"

## 常见问题

### Q: 构建失败怎么办？

**A:**
1. 检查日志中的错误信息
2. 确保 `package.json` 中的 scripts 正确
3. 确保没有遗漏依赖
4. 检查 TypeScript 错误

### Q: 如何更新部署？

**A:**
1. 修改本地代码
2. 提交并推送到 GitHub
3. 部署平台会自动检测并重新部署

### Q: 如何查看部署日志？

**A:**
- Vercel: 项目页面 > Deployments > 点击具体部署
- Netlify: Deploys > 点击具体部署
- Cloudflare Pages: 项目页面 > Builds

### Q: 如何设置自定义域名？

**A:**
每个平台都支持自定义域名：
1. 在项目设置中找到 "Domains"
2. 添加你的域名
3. 按照提示配置 DNS 记录

## 性能优化建议

1. **启用 CDN**
   - Vercel、Netlify、Cloudflare 都有全球 CDN

2. **图片优化**
   - 本项目已配置 Next.js Image 组件

3. **代码分割**
   - Next.js 自动进行代码分割

4. **缓存策略**
   - 静态资源自动缓存
   - API 路由可自定义缓存

## 安全建议

1. **环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用平台提供的环境变量功能

2. **HTTPS**
   - 所有推荐平台都提供免费 HTTPS

3. **访问控制**
   - 如需限制访问，可添加认证中间件

## 成本说明

### 免费额度
- **Vercel**: 100GB 带宽/月，6000分钟构建/月
- **Netlify**: 100GB 带宽/月，300分钟构建/月
- **Cloudflare Pages**: 无限带宽，无限构建

### 何时需要付费
- 超出免费额度
- 需要更多团队成员
- 需要高级功能（如 A/B 测试）

## 部署后的维护

### 监控
- 查看访问日志
- 监控性能指标
- 设置错误报警

### 更新
- 定期更新依赖
- 修复安全问题
- 优化性能

### 备份
- 定期备份代码
- 备份数据库（如有）

## 获取帮助

- **Vercel 文档**: https://vercel.com/docs
- **Netlify 文档**: https://docs.netlify.com
- **Cloudflare Pages 文档**: https://developers.cloudflare.com/pages

---

**部署成功后，你就可以分享链接给其他人使用了！** 🎉
