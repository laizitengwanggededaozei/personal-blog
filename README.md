技术人生博客
一个功能完整的静态博客网站，使用纯HTML、CSS、JavaScript开发。

🚀 功能特性
前台功能
📱 响应式设计，支持多种设备
🔍 文章搜索和分类筛选
🏷️ 标签云和热门标签
📖 文章阅读进度条
💬 评论系统
📤 文章分享功能
🌓 明暗主题切换
📊 访问统计显示
后台功能
📝 文章管理（增删改查）
✍️ 富文本编辑器
💬 评论管理
📈 数据分析和图表
⚙️ 系统设置
📁 数据导入导出
🛠️ 技术栈
前端: HTML5、CSS3、JavaScript ES6+
框架: jQuery 3.6.0
插件:
Swiper.js (轮播图)
AOS (动画效果)
Highlight.js (代码高亮)
Chart.js (图表)
图标: 使用Emoji图标
图片: Placeholder.com占位图片
📁 项目结构
博客项目/
├── index.html              # 首页
├── about.html              # 关于页面
├── article.html            # 文章详情页
├── admin.html              # 管理后台
├── css/
│   └── style.css           # 主样式文件
└── js/
    ├── data.js             # 模拟数据
    ├── main.js             # 主要逻辑
    ├── jquery-features.js  # jQuery功能
    ├── article.js          # 文章页逻辑
    └── admin.js            # 管理页逻辑
🚀 快速开始
克隆或下载项目文件
使用任意HTTP服务器运行项目
访问 index.html 查看首页
使用Live Server (推荐)
# 如果使用VS Code，安装Live Server插件
# 右键点击index.html，选择"Open with Live Server"
使用Python服务器
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
使用Node.js服务器
# 安装http-server
npm install -g http-server

# 运行服务器
http-server
📚 页面说明
首页 (index.html)
文章列表展示
搜索和筛选功能
轮播精选文章
侧边栏统计信息
关于页面 (about.html)
个人信息展示
技能和经验介绍
联系方式和表单
文章页面 (article.html)
文章内容展示
目录导航
评论系统
相关文章推荐
管理后台 (admin.html)
文章管理
数据统计
系统设置
🎨 自定义配置
修改站点信息
编辑 js/data.js 文件中的 blogConfig 对象：

const blogConfig = {
    siteName: "你的博客名称",
    siteDescription: "你的博客描述",
    postsPerPage: 5,
    // ...其他配置
};
添加文章
在 js/data.js 文件的 blogPosts 数组中添加新文章：

{
    id: 新ID,
    title: "文章标题",
    excerpt: "文章摘要",
    content: "文章内容(支持HTML)",
    category: "分类",
    tags: ["标签1", "标签2"],
    // ...其他字段
}
主题定制
修改 css/style.css 中的CSS变量：

:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ...其他颜色变量 */
}
📱 响应式支持
桌面端: 1200px+
平板端: 768px - 1199px
手机端: 320px - 767px
🌟 特色功能
主题切换
支持明暗主题，用户选择会保存到本地存储。

数据持久化
使用localStorage保存用户偏好和文章数据。

搜索功能
支持标题、内容、标签的全文搜索。

性能优化
图片懒加载
代码分割
防抖处理
🔧 开发说明
技术要求达成
✅ JavaScript基础语法 (40分)
✅ jQuery技术应用 (40分)
✅ BOM和DOM操作 (20分)
代码特点
模块化设计
详细注释
错误处理
性能优化
📄 许可证
MIT License

🤝 贡献
欢迎提交Issue和Pull Request！

📞 联系方式
如有问题，请通过以下方式联系：

邮箱: your-email@example.com
GitHub: your-github-username
