// 博客假数据文件
// 所有图片使用 placeholder.com 占位图片服务

// 1. 文章数据（不同长度和图片尺寸）
const blogPosts = [
    {
        id: 1,
        title: "JavaScript ES6+新特性深度解析",
        excerpt: "深入探讨ES6到ES2023的新特性，包括箭头函数、解构赋值、模块化、Promise、async/await等核心概念。通过实际项目案例，帮助开发者掌握现代JavaScript编程技巧。",
        content: `
        <h2>前言</h2>
        <p>JavaScript ES6（ECMAScript 2015）发布至今已经过去多年，但其带来的新特性依然是现代前端开发的基石。本文将深入解析ES6+的核心特性，并通过实际代码示例展示其应用。</p>
        
        <h3>1. 变量声明：let 和 const</h3>
        <p>ES6引入了块级作用域的概念，let和const解决了var的诸多问题：</p>
        <pre><code>// var的问题
        for (var i = 0; i < 3; i++) {
            setTimeout(() => console.log(i), 100); // 输出3个3
        }
        
        // let的解决方案
        for (let i = 0; i < 3; i++) {
            setTimeout(() => console.log(i), 100); // 输出0,1,2
        }</code></pre>
        
        <h3>2. 箭头函数</h3>
        <p>箭头函数不仅简化了语法，更重要的是解决了this绑定问题：</p>
        <pre><code>const obj = {
            name: 'JavaScript',
            greet: function() {
                // 传统函数
                setTimeout(function() {
                    console.log('Hello ' + this.name); // this指向window
                }, 1000);
                
                // 箭头函数
                setTimeout(() => {
                    console.log('Hello ' + this.name); // this指向obj
                }, 1000);
            }
        };</code></pre>
        
        <h3>3. 解构赋值</h3>
        <p>解构赋值让我们能够从数组或对象中提取值，赋值给不同的变量：</p>
        <pre><code>// 对象解构
        const user = { name: 'Tom', age: 25, city: 'Beijing' };
        const { name, age } = user;
        
        // 数组解构
        const colors = ['red', 'green', 'blue'];
        const [primary, secondary] = colors;</code></pre>
        
        <h3>总结</h3>
        <p>ES6+特性极大地提升了JavaScript的开发效率和代码质量。掌握这些特性不仅能写出更优雅的代码，也是现代前端开发的必备技能。</p>
        `,
        category: "技术",
        tags: ["JavaScript", "ES6", "前端开发", "编程技巧"],
        author: "张三",
        publishDate: "2025-05-15",
        readTime: 8,
        likes: 156,
        comments: [
            { id: 1, author: "李四", content: "讲解得很详细，ES6确实革命性地改变了JavaScript开发方式！", date: "2025-05-16" },
            { id: 2, author: "王五", content: "箭头函数的this绑定问题一直困扰我，这次终于理解了，谢谢分享！", date: "2025-05-17" },
            { id: 3, author: "赵六", content: "希望能多写一些关于异步编程的文章", date: "2025-05-18" }
        ],
        views: 2345,
        featured: true,
        imageUrl: "https://via.placeholder.com/800x400/3498db/ffffff?text=JavaScript+ES6%2B",
        imageSize: "large" // 大图片
    },
    {
        id: 2,
        title: "React Hooks最佳实践指南",
        excerpt: "从useState到useEffect，从自定义Hook到性能优化，全面掌握React Hooks的使用技巧。",
        content: `
        <h2>React Hooks革命</h2>
        <p>React Hooks的出现彻底改变了我们编写React组件的方式。本文将分享一些Hooks的最佳实践。</p>
        
        <h3>useState的正确使用</h3>
        <pre><code>// 对象状态的更新
        const [user, setUser] = useState({ name: '', age: 0 });
        
        // 错误方式
        setUser({ name: 'Tom' }); // 这会丢失age属性
        
        // 正确方式
        setUser(prev => ({ ...prev, name: 'Tom' }));</code></pre>
        
        <h3>useEffect的依赖管理</h3>
        <p>正确管理useEffect的依赖数组是避免无限循环和性能问题的关键。</p>
        `,
        category: "技术",
        tags: ["React", "Hooks", "前端框架"],
        author: "李四",
        publishDate: "2025-05-10",
        readTime: 6,
        likes: 89,
        comments: [
            { id: 4, author: "张三", content: "Hooks确实让函数组件更加强大了！", date: "2025-05-11" }
        ],
        views: 1234,
        featured: true,
        imageUrl: "https://via.placeholder.com/600x300/e74c3c/ffffff?text=React+Hooks",
        imageSize: "medium" // 中等图片
    },
    {
        id: 3,
        title: "生活中的编程思维",
        excerpt: "编程不仅仅是工作，更是一种思维方式。让我们看看如何将编程思维应用到日常生活中，提升效率和解决问题的能力。",
        content: `
        <h2>编程思维的力量</h2>
        <p>作为程序员，我们不仅在电脑前编写代码，更重要的是培养了一种独特的思维方式。这种思维方式可以帮助我们在生活的各个方面变得更加高效。</p>
        
        <h3>函数化思维</h3>
        <p>将复杂的生活任务分解为小的、可管理的"函数"。比如：</p>
        <ul>
            <li>早餐制作 = 准备食材() + 烹饪() + 盛盘()</li>
            <li>健身计划 = 热身() + 主要训练() + 拉伸()</li>
        </ul>
        
        <h3>调试思维</h3>
        <p>当生活中遇到问题时，像调试代码一样系统性地分析：</p>
        <ol>
            <li>确定问题现象</li>
            <li>找出可能的原因</li>
            <li>逐一验证假设</li>
            <li>应用解决方案</li>
            <li>验证结果</li>
        </ol>
        
        <h3>版本控制思维</h3>
        <p>生活也需要"版本控制"，记录重要的决策和变化，这样可以在需要时"回滚"到之前的状态。</p>
        
        <p>编程思维让我们更加理性、系统化地处理问题，这是我们程序员独有的优势。</p>
        `,
        category: "生活",
        tags: ["编程思维", "生活感悟", "效率提升"],
        author: "王五",
        publishDate: "2025-05-08",
        readTime: 4,
        likes: 67,
        comments: [
            { id: 5, author: "赵六", content: "很有意思的视角，确实编程思维在生活中很有用！", date: "2025-05-09" }
        ],
        views: 892,
        featured: false,
        imageUrl: "https://via.placeholder.com/400x200/2ecc71/ffffff?text=Programming+Life",
        imageSize: "small" // 小图片
    },
    {
        id: 4,
        title: "Node.js微服务架构实战",
        excerpt: "从单体应用到微服务架构的演进过程，详细介绍如何使用Node.js构建可扩展的微服务系统，包括服务发现、负载均衡、容错处理等关键技术。本文将通过一个实际的电商系统案例，展示微服务架构的设计思路和实现细节。",
        content: `
        <h2>微服务架构的兴起</h2>
        <p>随着业务的快速发展，单体应用的弊端逐渐显现。微服务架构作为一种新的软件架构模式，为我们提供了更好的解决方案。</p>
        
        <h3>什么是微服务</h3>
        <p>微服务是一种架构风格，它将单个应用程序开发为一组小型服务，每个服务运行在自己的进程中，服务间通过轻量级的通信机制（通常是HTTP RESTful API）进行通信。</p>
        
        <h3>Node.js在微服务中的优势</h3>
        <ul>
            <li><strong>轻量级：</strong>Node.js的事件驱动、非阻塞I/O模型使其非常适合构建轻量级的微服务</li>
            <li><strong>快速启动：</strong>相比于Java等语言，Node.js服务启动速度更快</li>
            <li><strong>生态丰富：</strong>npm生态系统提供了大量的微服务相关工具和库</li>
            <li><strong>统一技术栈：</strong>前后端都使用JavaScript，降低了开发成本</li>
        </ul>
        
        <h3>实战案例：电商系统微服务拆分</h3>
        <h4>1. 用户服务 (User Service)</h4>
        <pre><code>const express = require('express');
        const app = express();
        
        // 用户注册
        app.post('/api/users/register', async (req, res) => {
            try {
                const user = await createUser(req.body);
                res.json({ success: true, user });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        });
        
        // 用户认证
        app.post('/api/users/login', async (req, res) => {
            // 认证逻辑
        });
        
        app.listen(3001, () => {
            console.log('User service running on port 3001');
        });</code></pre>
        
        <h4>2. 商品服务 (Product Service)</h4>
        <pre><code>const express = require('express');
        const app = express();
        
        // 获取商品列表
        app.get('/api/products', async (req, res) => {
            const products = await getProducts(req.query);
            res.json(products);
        });
        
        // 获取商品详情
        app.get('/api/products/:id', async (req, res) => {
            const product = await getProductById(req.params.id);
            res.json(product);
        });
        
        app.listen(3002, () => {
            console.log('Product service running on port 3002');
        });</code></pre>
        
        <h4>3. 订单服务 (Order Service)</h4>
        <pre><code>const express = require('express');
        const axios = require('axios');
        const app = express();
        
        // 创建订单
        app.post('/api/orders', async (req, res) => {
            try {
                // 调用用户服务验证用户
                const userResponse = await axios.get(\`http://user-service:3001/api/users/\${req.body.userId}\`);
                
                // 调用商品服务验证商品
                const productResponse = await axios.get(\`http://product-service:3002/api/products/\${req.body.productId}\`);
                
                // 创建订单
                const order = await createOrder(req.body);
                res.json({ success: true, order });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
        });
        
        app.listen(3003, () => {
            console.log('Order service running on port 3003');
        });</code></pre>
        
        <h3>服务发现与负载均衡</h3>
        <p>在微服务架构中，服务发现是一个关键问题。我们可以使用Consul、Eureka或者简单的DNS来实现服务发现。</p>
        
        <pre><code>// 使用Consul进行服务注册
        const consul = require('consul')();
        
        // 注册服务
        consul.agent.service.register({
            name: 'user-service',
            address: '127.0.0.1',
            port: 3001,
            check: {
                http: 'http://127.0.0.1:3001/health',
                interval: '10s'
            }
        }, (err) => {
            if (err) throw err;
            console.log('Service registered');
        });</code></pre>
        
        <h3>容错处理</h3>
        <p>微服务架构中，服务间的调用可能失败，我们需要实现熔断器模式来处理这种情况：</p>
        
        <pre><code>const CircuitBreaker = require('opossum');
        
        // 配置熔断器
        const options = {
            timeout: 3000,
            errorThresholdPercentage: 50,
            resetTimeout: 30000
        };
        
        const breaker = new CircuitBreaker(callExternalService, options);
        
        breaker.fallback(() => {
            return { error: 'Service temporarily unavailable' };
        });
        
        async function callExternalService(url) {
            const response = await axios.get(url);
            return response.data;
        }</code></pre>
        
        <h3>API网关</h3>
        <p>API网关作为系统的统一入口，处理路由、认证、限流等横切关注点：</p>
        
        <pre><code>const express = require('express');
        const httpProxy = require('http-proxy-middleware');
        const app = express();
        
        // 用户服务代理
        app.use('/api/users', httpProxy({
            target: 'http://user-service:3001',
            changeOrigin: true
        }));
        
        // 商品服务代理
        app.use('/api/products', httpProxy({
            target: 'http://product-service:3002',
            changeOrigin: true
        }));
        
        // 订单服务代理
        app.use('/api/orders', httpProxy({
            target: 'http://order-service:3003',
            changeOrigin: true
        }));
        
        app.listen(3000, () => {
            console.log('API Gateway running on port 3000');
        });</code></pre>
        
        <h3>监控与日志</h3>
        <p>微服务架构中，监控和日志收集变得更加重要。我们可以使用ELK Stack（Elasticsearch, Logstash, Kibana）来实现统一的日志管理：</p>
        
        <pre><code>const winston = require('winston');
        
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
                new winston.transports.Console()
            ]
        });
        
        // 在业务代码中使用
        app.post('/api/orders', async (req, res) => {
            logger.info('Creating new order', { userId: req.body.userId, productId: req.body.productId });
            
            try {
                const order = await createOrder(req.body);
                logger.info('Order created successfully', { orderId: order.id });
                res.json({ success: true, order });
            } catch (error) {
                logger.error('Failed to create order', { error: error.message, userId: req.body.userId });
                res.status(400).json({ success: false, error: error.message });
            }
        });</code></pre>
        
        <h3>Docker化部署</h3>
        <p>使用Docker可以简化微服务的部署和管理：</p>
        
        <pre><code># Dockerfile
        FROM node:16-alpine
        
        WORKDIR /app
        
        COPY package*.json ./
        RUN npm ci --only=production
        
        COPY . .
        
        EXPOSE 3001
        
        CMD ["node", "server.js"]</code></pre>
        
        <pre><code># docker-compose.yml
        version: '3.8'
        
        services:
          user-service:
            build: ./user-service
            ports:
              - "3001:3001"
            environment:
              - DB_HOST=postgres
              - DB_PORT=5432
            depends_on:
              - postgres
        
          product-service:
            build: ./product-service
            ports:
              - "3002:3002"
            environment:
              - DB_HOST=postgres
              - DB_PORT=5432
            depends_on:
              - postgres
        
          order-service:
            build: ./order-service
            ports:
              - "3003:3003"
            environment:
              - DB_HOST=postgres
              - DB_PORT=5432
            depends_on:
              - postgres
              - user-service
              - product-service
        
          postgres:
            image: postgres:13
            environment:
              - POSTGRES_DB=ecommerce
              - POSTGRES_USER=admin
              - POSTGRES_PASSWORD=password
            volumes:
              - postgres_data:/var/lib/postgresql/data
        
        volumes:
          postgres_data:</code></pre>
        
        <h3>总结</h3>
        <p>微服务架构虽然解决了单体应用的许多问题，但也带来了新的挑战，如服务间通信、数据一致性、分布式事务等。在选择微服务架构时，需要权衡其带来的好处和复杂性。</p>
        
        <p>Node.js以其轻量级、高性能的特点，非常适合构建微服务。结合Docker、Kubernetes等容器化技术，可以构建出高可用、可扩展的微服务系统。</p>
        
        <p>在实际项目中，建议从单体应用开始，当业务复杂度和团队规模达到一定程度时，再考虑拆分为微服务。记住，架构的选择应该服务于业务，而不是为了技术而技术。</p>
        `,
        category: "技术",
        tags: ["Node.js", "微服务", "架构设计", "Docker", "分布式系统"],
        author: "赵六",
        publishDate: "2025-05-05",
        readTime: 15,
        likes: 234,
        comments: [
            { id: 6, author: "张三", content: "微服务架构确实是趋势，但复杂度也不容小觑。", date: "2025-05-06" },
            { id: 7, author: "李四", content: "Node.js在微服务方面确实有优势，轻量级是关键。", date: "2025-05-07" },
            { id: 8, author: "王五", content: "Docker化部署的例子很实用，收藏了！", date: "2025-05-08" }
        ],
        views: 3456,
        featured: true,
        imageUrl: "https://via.placeholder.com/900x500/34495e/ffffff?text=Node.js+Microservices+Architecture",
        imageSize: "large" // 大图片
    },
    {
        id: 5,
        title: "关于工作与生活平衡的思考",
        excerpt: "在快节奏的互联网行业中，如何找到工作与生活的平衡点？",
        content: `
        <h2>找寻平衡</h2>
        <p>作为程序员，我们常常面临工作与生活难以平衡的问题。高强度的工作、紧迫的项目deadline、不断学习新技术的压力，让我们很容易忽略生活的其他方面。</p>
        
        <h3>时间管理的艺术</h3>
        <p>有效的时间管理是实现平衡的关键：</p>
        <ul>
            <li>使用番茄工作法提高工作效率</li>
            <li>设定明确的工作边界</li>
            <li>学会说"不"，拒绝不必要的加班</li>
        </ul>
        
        <h3>健康的重要性</h3>
        <p>身体是革命的本钱，没有健康的身体，再好的工作也无法胜任。</p>
        
        <p>记住，我们工作是为了更好地生活，而不是让工作占据整个生活。</p>
        `,
        category: "思考",
        tags: ["工作", "生活", "平衡", "健康"],
        author: "张三",
        publishDate: "2025-05-01",
        readTime: 3,
        likes: 45,
        comments: [],
        views: 567,
        featured: false,
        imageUrl: "", // 无图片
        imageSize: "none"
    },
    {
        id: 6,
        title: "CSS Grid布局完全指南",
        excerpt: "CSS Grid是目前最强大的CSS布局系统，本文将全面介绍Grid布局的各种用法。",
        content: `
        <h2>CSS Grid简介</h2>
        <p>CSS Grid Layout是CSS中最强大的布局系统。它是一个二维系统，这意味着它可以同时处理列和行，不像flexbox那样主要是一维系统。</p>
        
        <h3>基础概念</h3>
        <p>Grid布局由以下几个核心概念组成：</p>
        <ul>
            <li><strong>Grid Container</strong>：网格容器</li>
            <li><strong>Grid Items</strong>：网格项目</li>
            <li><strong>Grid Lines</strong>：网格线</li>
            <li><strong>Grid Tracks</strong>：网格轨道</li>
            <li><strong>Grid Cells</strong>：网格单元格</li>
            <li><strong>Grid Areas</strong>：网格区域</li>
        </ul>
        
        <h3>基本语法</h3>
        <pre><code>.container {
            display: grid;
            grid-template-columns: 200px 200px 200px;
            grid-template-rows: 100px 100px;
            gap: 10px;
        }</code></pre>
        
        <h3>实际应用示例</h3>
        <p>让我们创建一个典型的网页布局：</p>
        <pre><code>.page-layout {
            display: grid;
            grid-template-areas: 
                "header header header"
                "sidebar main main"
                "footer footer footer";
            grid-template-columns: 200px 1fr 200px;
            grid-template-rows: 80px 1fr 60px;
            min-height: 100vh;
        }
        
        .header { grid-area: header; }
        .sidebar { grid-area: sidebar; }
        .main { grid-area: main; }
        .footer { grid-area: footer; }</code></pre>
        
        <p>CSS Grid让布局变得前所未有的简单和灵活！</p>
        `,
        category: "技术",
        tags: ["CSS", "Grid", "布局", "前端"],
        author: "李四",
        publishDate: "2025-04-28",
        readTime: 5,
        likes: 78,
        comments: [
            { id: 9, author: "王五", content: "Grid确实比flexbox更适合复杂布局！", date: "2025-04-29" }
        ],
        views: 1123,
        featured: false,
        imageUrl: "https://via.placeholder.com/500x300/9b59b6/ffffff?text=CSS+Grid+Layout",
        imageSize: "medium" // 中等图片
    }
];

// 2. 标签数据
const allTags = [
    { name: "JavaScript", count: 15, color: "#f39c12" },
    { name: "React", count: 8, color: "#3498db" },
    { name: "Node.js", count: 6, color: "#2ecc71" },
    { name: "CSS", count: 10, color: "#e74c3c" },
    { name: "前端开发", count: 12, color: "#9b59b6" },
    { name: "编程思维", count: 4, color: "#34495e" },
    { name: "生活感悟", count: 3, color: "#16a085" },
    { name: "架构设计", count: 5, color: "#d35400" },
    { name: "性能优化", count: 7, color: "#c0392b" },
    { name: "工具推荐", count: 6, color: "#8e44ad" }
];

// 3. 分类数据
const categories = [
    { name: "技术", count: 12, description: "前端、后端、架构等技术文章" },
    { name: "生活", count: 5, description: "生活感悟和个人体验" },
    { name: "思考", count: 8, description: "对行业和技术的深度思考" },
    { name: "分享", count: 6, description: "工具、资源和经验分享" }
];

// 4. 用户数据
const currentUser = {
    id: 1,
    name: "博客管理员",
    avatar: "https://via.placeholder.com/100x100/3498db/ffffff?text=Admin",
    email: "admin@blog.com",
    bio: "全栈开发工程师，热爱技术分享",
    socialLinks: {
        github: "https://github.com/admin",
        weibo: "https://weibo.com/admin",
        email: "mailto:admin@blog.com"
    },
    stats: {
        posts: 31,
        comments: 156,
        likes: 892,
        followers: 234
    }
};

// 5. 统计数据
const blogStats = {
    totalPosts: 31,
    totalComments: 156,
    totalLikes: 892,
    totalViews: 12456,
    monthlyViews: [
        { month: "1月", views: 1200 },
        { month: "2月", views: 1500 },
        { month: "3月", views: 1800 },
        { month: "4月", views: 2100 },
        { month: "5月", views: 2300 }
    ],
    popularPosts: [1, 4, 2], // 文章ID
    recentActivity: [
        { type: "comment", content: "新评论：很棒的文章！", time: "2分钟前" },
        { type: "like", content: "有人点赞了你的文章", time: "5分钟前" },
        { type: "view", content: "文章《JavaScript ES6+新特性深度解析》被浏览", time: "10分钟前" }
    ]
};

// 6. 配置数据
const blogConfig = {
    siteName: "技术人生",
    siteDescription: "记录技术成长，分享编程心得",
    postsPerPage: 5,
    featuredPostsCount: 3,
    recentCommentsCount: 5,
    popularTagsCount: 10,
    autoSaveInterval: 30000, // 30秒
    themes: ["light", "dark"],
    defaultTheme: "light"
};

// 7. 导航菜单数据
const navigationMenu = [
    { name: "首页", url: "index.html", active: true },
    { name: "归档", url: "archive.html", active: false },
    { name: "分类", url: "category.html", active: false },
    { name: "标签", url: "tags.html", active: false },
    { name: "关于", url: "about.html", active: false },
    { name: "管理", url: "admin.html", active: false }
];

// 8. 工具函数
const blogUtils = {
    // 格式化日期
    formatDate: function(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // 格式化相对时间
    formatRelativeTime: function(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "昨天";
        if (diffDays < 7) return `${diffDays}天前`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)}周前`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)}个月前`;
        return `${Math.ceil(diffDays / 365)}年前`;
    },

    // 截取文本
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    },

    // 生成随机ID
    generateId: function() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    // 获取文章摘要
    getExcerpt: function(content, maxLength = 200) {
        // 移除HTML标签
        const textContent = content.replace(/<[^>]*>/g, '');
        return this.truncateText(textContent, maxLength);
    },

    // 计算阅读时间
    calculateReadTime: function(content) {
        const wordsPerMinute = 200; // 平均阅读速度
        const textContent = content.replace(/<[^>]*>/g, '');
        const wordCount = textContent.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }
};

// 导出数据（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        blogPosts,
        allTags,
        categories,
        currentUser,
        blogStats,
        blogConfig,
        navigationMenu,
        blogUtils
    };
}