# 德诺商务服务 - ITIN代办网站

专业ITIN个人纳税识别号代办服务网站，为华人提供美国税号申请、税务咨询、推荐奖励等一站式服务。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **部署**: Vercel (静态导出)
- **域名**: itin.denuo.site

## 页面结构

- `/` - 首页：Hero、服务介绍、优势、流程、CTA
- `/itin/` - ITIN代办：详细介绍、办理流程、所需材料
- `/referral/` - 邀请奖励：规则、流程、结算方式
- `/faq/` - 常见问题：ITIN基础、办理、费用、奖励
- `/contact/` - 联系我们：表单、微信、Telegram、Email

## 功能特性

- ✅ 移动端优先响应式设计
- ✅ 推荐码追踪（URL参数 + localStorage + Cookie）
- ✅ Google Forms 表单集成
- ✅ SEO优化（meta、OG、sitemap、robots）
- ✅ 静态导出，快速加载
- ✅ 中文优先排版

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 环境变量

无需环境变量，所有配置已内联。

## 部署

项目已配置为静态导出（`output: 'export'`），可直接部署到 Vercel。

## 联系方式

- 📧 Email: contact@denuo.site
- 💬 Telegram: @denuo_service
- 🐦 X: @denuo_service
