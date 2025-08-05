# 🚀 Qwen-Image Premium Website

一个为 Qwen-Image AI 图像生成模型打造的超高端、现代化官方网站。

## ✨ 特色功能

### 🎨 **顶级视觉设计**
- **渐变背景** - 多彩渐变色彩，营造科技感
- **3D 悬浮效果** - 卡片和按钮的立体悬浮动画
- **玻璃拟态设计** - 现代化毛玻璃效果导航栏
- **粒子动画系统** - 动态粒子背景效果
- **加载动画** - 专业的页面加载转场

### 🖼️ **交互式图片展示**
- **模态框查看** - 点击图片全屏查看
- **键盘导航** - 支持方向键切换图片
- **悬浮效果** - 图片悬浮时的放大和信息显示
- **响应式网格** - 自适应不同屏幕尺寸

### 🎭 **高级动画效果**
- **滚动触发动画** - 元素进入视窗时的动画
- **视差滚动** - 背景元素的视差效果
- **计数器动画** - 数字递增动画
- **涟漪效果** - 按钮点击涟漪动画
- **打字机效果** - 文字逐字显示动画

### 📱 **完美响应式**
- **移动端优化** - 完美适配手机和平板
- **触摸友好** - 优化的触摸交互体验
- **自适应布局** - 智能调整内容布局

## 🗂️ 文件结构

```
qwenimage/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # 交互脚本
├── README.md           # 说明文档
└── images/             # 图片资源
    ├── merge3.jpg      # 综合展示拼图
    ├── bench.png       # 性能基准图表
    ├── aliyun.png      # 阿里云古街场景
    ├── tongyi.png      # 通义书房场景
    ├── book.png        # 书店橱窗展示
    ├── small.png       # 月光诗歌场景
    ├── s2.jpg          # 中文演示者
    ├── bi.png          # 双语演示者
    └── s3.jpg          # 创意海报
```

## 🚀 快速开始

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd qwenimage
   ```

2. **直接打开**
   - 双击 `index.html` 文件
   - 或在浏览器中打开 `file:///path/to/index.html`

3. **本地服务器**（推荐）
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx serve .
   
   # 使用 PHP
   php -S localhost:8000
   ```

## 🎯 核心技术

### **CSS 特性**
- CSS Grid & Flexbox 布局
- CSS 变量 (Custom Properties)
- 高级动画和过渡效果
- 媒体查询响应式设计
- Backdrop-filter 毛玻璃效果

### **JavaScript 功能**
- Intersection Observer API (滚动动画)
- 模态框图片查看器
- 粒子系统动画
- 平滑滚动导航
- 性能优化的事件处理

### **设计理念**
- Apple 风格设计语言
- 渐变色彩搭配
- 微交互设计
- 现代化排版
- 无障碍访问支持

## 🎨 自定义配置

### **颜色主题**
在 `styles.css` 中修改 CSS 变量：
```css
:root {
    --primary-blue: #007AFF;
    --primary-purple: #764ba2;
    --primary-pink: #f093fb;
    /* 更多颜色变量... */
}
```

### **动画设置**
调整动画持续时间和缓动函数：
```css
.fade-in {
    transition: all 0.8s ease;
}
```

### **响应式断点**
修改媒体查询断点：
```css
@media (max-width: 768px) {
    /* 移动端样式 */
}
```

## 🔧 高级功能

### **隐藏彩蛋**
- 输入 Konami Code (↑↑↓↓←→←→BA) 激活彩虹效果

### **键盘快捷键**
- `ESC` - 关闭模态框
- `←/→` - 切换图片
- 方向键 - 图片导航

### **性能优化**
- 图片懒加载
- 事件节流和防抖
- 动画性能优化
- 资源预加载

## 📊 SEO 优化

- **结构化数据** - Schema.org 标记
- **Open Graph** - 社交媒体分享优化
- **Twitter Cards** - Twitter 分享卡片
- **语义化 HTML** - 正确的标签层级
- **Meta 标签** - 完整的 SEO 信息

## 🌐 浏览器支持

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ IE 不支持

## 📝 更新日志

### v1.0.0 (2025-01-XX)
- 🎉 初始版本发布
- ✨ 完整的响应式设计
- 🎨 高端视觉效果
- 📱 移动端优化
- 🚀 性能优化

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

- **Qwen Team** - *初始工作* - [Qwen](https://github.com/QwenLM)

## 🙏 致谢

- 感谢 Qwen-Image 团队提供的优秀 AI 模型
- 感谢开源社区的技术支持
- 特别感谢所有贡献者和用户的反馈

---

**🎉 享受您的高端 Qwen-Image 网站体验！**