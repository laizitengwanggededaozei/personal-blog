// 博客系统主要JavaScript逻辑文件
// 涵盖所有技术要求点

// ========== JavaScript基础语法部分（40分） ==========

// 1. 变量声明（let, const）- 5分
const BLOG_CONFIG = {
    postsPerPage: 5,
    autoSaveInterval: 30000,
    maxExcerptLength: 200
};

let currentPage = 1;
let filteredPosts = [...blogPosts]; // 当前显示的文章列表
let currentTheme = localStorage.getItem('theme') || 'light';
let searchTimeout = null;

// 2. 条件语句（if...else）- 5分
function getPostDisplayType(post) {
    if (post.imageSize === 'large') {
        return 'large-image';
    } else if (post.imageSize === 'medium') {
        return 'medium-image';
    } else if (post.imageSize === 'small') {
        return 'small-image';
    } else {
        return 'no-image';
    }
}

function validateSearchInput(query) {
    if (!query || query.trim() === '') {
        showMessage('请输入搜索关键词', 'error');
        return false;
    } else if (query.length < 2) {
        showMessage('搜索关键词至少需要2个字符', 'error');
        return false;
    } else {
        return true;
    }
}

// 3. 循环结构（for, while）- 5分
function renderPostList(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    // for循环渲染文章
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postElement = createPostElement(post, i);
        container.appendChild(postElement);

        // 添加动画延迟
        setTimeout(() => {
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, i * 100);
    }

    // while循环生成分页
    const totalPages = Math.ceil(filteredPosts.length / BLOG_CONFIG.postsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    let page = 1;
    while (page <= totalPages) {
        const pageButton = createPaginationButton(page, page === currentPage);
        pagination.appendChild(pageButton);
        page++;
    }
}

function updateStatistics() {
    let totalLikes = 0;
    let totalViews = 0;
    let totalComments = 0;

    // for...of循环计算统计数据
    for (const post of blogPosts) {
        totalLikes += post.likes;
        totalViews += post.views;
        totalComments += post.comments.length;
    }

    document.getElementById('total-posts').textContent = blogPosts.length;
    document.getElementById('total-likes').textContent = totalLikes;
    document.getElementById('total-views').textContent = totalViews;
    document.getElementById('total-comments').textContent = totalComments;
}

// 4. 函数定义与调用 - 5分
function createPostElement(post, index) {
    const article = document.createElement('article');
    article.className = `post-item ${getPostDisplayType(post)} ${post.featured ? 'featured' : ''}`;
    article.style.animationDelay = `${index * 0.1}s`;

    const imageHtml = post.imageUrl ?
        `<div class="post-image">
            <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
         </div>` : '';

    article.innerHTML = `
        ${imageHtml}
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${post.category}</span>
                <span class="post-date">${blogUtils.formatRelativeTime(post.publishDate)}</span>
                <span class="post-read-time">${post.readTime} 分钟阅读</span>
            </div>
            <h2><a href="article.html?id=${post.id}" class="post-title">${post.title}</a></h2>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-stats">
                <div>
                    <span>👁 ${post.views}</span>
                    <span>❤ ${post.likes}</span>
                    <span>💬 ${post.comments.length}</span>
                </div>
                <a href="article.html?id=${post.id}" class="read-more">阅读更多</a>
            </div>
        </div>
    `;

    return article;
}

function createPaginationButton(pageNumber, isActive) {
    const button = document.createElement('button');
    button.textContent = pageNumber;
    button.className = isActive ? 'active' : '';
    button.addEventListener('click', () => goToPage(pageNumber));
    return button;
}

function showMessage(message, type = 'info') {
    const container = document.getElementById('message-container');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;

    container.appendChild(messageEl);

    // 显示动画
    setTimeout(() => messageEl.classList.add('show'), 100);

    // 自动隐藏
    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => container.removeChild(messageEl), 300);
    }, 3000);
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * BLOG_CONFIG.postsPerPage;
    const endIndex = startIndex + BLOG_CONFIG.postsPerPage;
    const pageArticles = filteredPosts.slice(startIndex, endIndex);
    renderPostList(pageArticles);

    // 滚动到文章列表顶部
    document.querySelector('.posts-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// 5. 数组操作（增删改查）- 5分
function addNewPost(postData) {
    // 添加新文章
    const newPost = {
        id: blogUtils.generateId(),
        ...postData,
        publishDate: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: [],
        views: 0,
        featured: false
    };

    blogPosts.unshift(newPost); // 添加到数组开头
    filteredPosts = [...blogPosts];
    saveToLocalStorage('blogPosts', blogPosts);
    showMessage('文章发布成功！', 'success');
}

function deletePost(postId) {
    // 删除文章
    const index = blogPosts.findIndex(post => post.id == postId);
    if (index > -1) {
        const deletedPost = blogPosts.splice(index, 1)[0];
        filteredPosts = blogPosts.filter(post =>
            filteredPosts.some(fp => fp.id === post.id)
        );
        saveToLocalStorage('blogPosts', blogPosts);
        showMessage(`文章"${deletedPost.title}"已删除`, 'success');
        return true;
    }
    return false;
}

function updatePost(postId, updateData) {
    // 修改文章
    const index = blogPosts.findIndex(post => post.id == postId);
    if (index > -1) {
        blogPosts[index] = { ...blogPosts[index], ...updateData };
        // 同步更新过滤后的列表
        const filteredIndex = filteredPosts.findIndex(post => post.id == postId);
        if (filteredIndex > -1) {
            filteredPosts[filteredIndex] = { ...filteredPosts[filteredIndex], ...updateData };
        }
        saveToLocalStorage('blogPosts', blogPosts);
        return blogPosts[index];
    }
    return null;
}

function searchPosts(keyword) {
    // 查询文章
    if (!keyword.trim()) {
        filteredPosts = [...blogPosts];
        return filteredPosts;
    }

    const lowerKeyword = keyword.toLowerCase();
    filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.excerpt.toLowerCase().includes(lowerKeyword) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)) ||
        post.category.toLowerCase().includes(lowerKeyword)
    );

    return filteredPosts;
}

function filterByCategory(category) {
    if (category === 'all') {
        filteredPosts = [...blogPosts];
    } else {
        filteredPosts = blogPosts.filter(post => post.category === category);
    }
    currentPage = 1;
    const pageArticles = filteredPosts.slice(0, BLOG_CONFIG.postsPerPage);
    renderPostList(pageArticles);
}

// 6. 对象字面量 - 5分
const blogManager = {
    // 初始化配置
    config: {
        theme: 'light',
        language: 'zh-CN',
        autoSave: true,
        showAnimations: true
    },

    // 用户偏好设置
    userPreferences: {
        postsPerPage: 5,
        defaultCategory: 'all',
        sortBy: 'date',
        sortOrder: 'desc'
    },

    // 缓存管理
    cache: {
        posts: new Map(),
        images: new Map(),
        searchResults: new Map()
    },

    // 统计信息
    statistics: {
        pageViews: 0,
        searchCount: 0,
        userActions: []
    },

    // 方法
    init: function() {
        this.loadUserPreferences();
        this.initializeTheme();
        this.bindEvents();
        this.loadCachedData();
    },

    updateStats: function(action) {
        this.statistics.userActions.push({
            action: action,
            timestamp: Date.now(),
            page: window.location.pathname
        });
        this.statistics.pageViews++;
    },

    saveUserPreferences: function() {
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    },

    loadUserPreferences: function() {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            this.userPreferences = { ...this.userPreferences, ...JSON.parse(saved) };
        }
    }
};

// 7. 事件监听与处理 - 5分
function initializeEventListeners() {
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e.target.value);
        }, 500); // 防抖处理
    });

    searchButton.addEventListener('click', function() {
        handleSearch(searchInput.value);
    });

    // 分类筛选
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除其他按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });

    // 返回顶部
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 加载更多
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        loadMorePosts();
    });
}

// ========== BOM和DOM相关技术部分（20分） ==========

// 1. 动态修改页面内容 - 5分
function updatePageContent() {
    // 动态更新页面标题
    document.title = `${blogConfig.siteName} - 技术博客分享平台`;

    // 动态更新统计信息
    updateStatistics();

    // 动态生成标签云
    generateTagCloud();

    // 动态生成最新评论
    generateRecentComments();

    // 更新导航菜单
    updateNavigationMenu();
}

function generateTagCloud() {
    const tagContainer = document.getElementById('tags-cloud');
    tagContainer.innerHTML = '';

    allTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = `${tag.name} (${tag.count})`;
        tagElement.style.backgroundColor = tag.color;
        tagElement.style.color = 'white';
        tagElement.addEventListener('click', () => filterByTag(tag.name));
        tagContainer.appendChild(tagElement);
    });
}

function generateRecentComments() {
    const commentsContainer = document.getElementById('recent-comments');
    commentsContainer.innerHTML = '';

    // 获取所有评论并按时间排序
    const allComments = [];
    blogPosts.forEach(post => {
        post.comments.forEach(comment => {
            allComments.push({
                ...comment,
                postTitle: post.title,
                postId: post.id
            });
        });
    });

    // 显示最新5条评论
    allComments.slice(0, 5).forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-content">${blogUtils.truncateText(comment.content, 50)}</div>
            <div class="comment-meta">
                来自《<a href="article.html?id=${comment.postId}">${comment.postTitle}</a>》
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

function updateNavigationMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navigationMenu.forEach(item => {
        const link = navMenu.querySelector(`a[href="${item.url}"]`);
        if (link) {
            if (item.url === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// 2. 响应用户操作（点击、滚动）- 5分
function initializeScrollHandlers() {
    let isScrolling = false;

    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 显示/隐藏返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    if (scrollTop > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }

    // 导航栏滚动效果
    const header = document.querySelector('.header');
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--card-bg)';
        header.style.backdropFilter = 'none';
    }

    // 懒加载图片
    lazyLoadImages();

    // 进度条更新
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    updateReadingProgress(progress);
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (isElementInViewport(img) && !img.src) {
            img.src = img.dataset.src;
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function updateReadingProgress(progress) {
    // 如果页面有进度条元素，更新进度
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// 3. 控制浏览器窗口行为 - 5分
function initializeBrowserControls() {
    // 本地存储管理
    loadFromLocalStorage();

    // 浏览器历史管理
    initializeHistoryManagement();

    // 窗口大小变化处理
    window.addEventListener('resize', handleWindowResize);

    // 页面可见性变化
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 页面卸载前保存数据
    window.addEventListener('beforeunload', function(e) {
        saveCurrentState();

        // 如果有未保存的草稿，提示用户
        const hasUnsavedChanges = checkUnsavedChanges();
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '您有未保存的更改，确定要离开吗？';
            return e.returnValue;
        }
    });
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`数据已保存到本地存储: ${key}`);
    } catch (error) {
        console.error('保存到本地存储失败:', error);
        showMessage('保存失败，请检查浏览器设置', 'error');
    }
}

function loadFromLocalStorage(key = null) {
    try {
        if (key) {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } else {
            // 加载所有相关数据
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                currentTheme = savedTheme;
                document.documentElement.setAttribute('data-theme', currentTheme);
            }

            const savedPosts = localStorage.getItem('blogPosts');
            if (savedPosts) {
                // 可以选择是否使用本地保存的文章数据
                console.log('发现本地保存的文章数据');
            }
        }
    } catch (error) {
        console.error('从本地存储加载失败:', error);
    }
}

function initializeHistoryManagement() {
    // 监听浏览器后退/前进
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            handleStateChange(e.state);
        }
    });

    // 保存初始状态
    const initialState = {
        page: 'index',
        category: 'all',
        currentPage: 1
    };
    history.replaceState(initialState, '', window.location.href);
}

function handleStateChange(state) {
    if (state.category && state.category !== 'all') {
        filterByCategory(state.category);
    }
    if (state.currentPage) {
        goToPage(state.currentPage);
    }
}

function handleWindowResize() {
    // 响应式布局调整
    const width = window.innerWidth;
    const postsContainer = document.getElementById('posts-container');

    if (width < 768) {
        // 移动端布局
        postsContainer.classList.add('mobile-layout');
    } else {
        postsContainer.classList.remove('mobile-layout');
    }

    // 重新计算轮播图尺寸
    if (window.featuredSwiper) {
        window.featuredSwiper.update();
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        // 页面隐藏时暂停某些操作
        console.log('页面已隐藏');
    } else {
        // 页面可见时恢复操作
        console.log('页面已显示');
        updateStatistics();
    }
}

// 4. 其他DOM操作效果 - 5分
function createDynamicElements() {
    // 动态创建进度条
    createReadingProgressBar();

    // 动态创建工具提示
    initializeTooltips();

    // 动态创建模态框
    createModalDialog();

    // 创建动画效果
    initializeAnimations();
}

function createReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--secondary-color);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
}

function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            showTooltip(e.target, e.target.getAttribute('data-tooltip'));
        });

        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = text;
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    tooltip.style.opacity = '1';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

function createModalDialog() {
    const modal = document.createElement('div');
    modal.id = 'modal-overlay';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <div class="modal-header">
                <h3 id="modal-title">标题</h3>
                <button id="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    float: right;
                    margin-top: -10px;
                ">&times;</button>
            </div>
            <div class="modal-body" id="modal-body">
                内容
            </div>
            <div class="modal-footer">
                <button id="modal-confirm" class="btn btn-primary">确定</button>
                <button id="modal-cancel" class="btn btn-secondary">取消</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 绑定关闭事件
    modal.querySelector('#modal-close').addEventListener('click', closeModal);
    modal.querySelector('#modal-cancel').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showModal(title, content, onConfirm) {
    const modal = document.getElementById('modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const confirmBtn = document.getElementById('modal-confirm');

    titleEl.textContent = title;
    bodyEl.innerHTML = content;
    modal.style.display = 'flex';

    // 移除之前的事件监听器
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    if (onConfirm) {
        newConfirmBtn.addEventListener('click', function() {
            onConfirm();
            closeModal();
        });
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'none';
}

// 8. 异步编程基础（setTimeout, Promise）- 5分
function initializeAsyncOperations() {
    // 自动保存功能
    startAutoSave();

    // 模拟异步加载数据
    loadDataWithPromise();

    // 延迟初始化某些功能
    delayedInitialization();
}

function startAutoSave() {
    setInterval(() => {
        const currentData = {
            posts: blogPosts,
            userPreferences: blogManager.userPreferences,
            statistics: blogManager.statistics,
            timestamp: Date.now()
        };

        saveToLocalStorage('autoSave', currentData);
        console.log('自动保存完成:', new Date().toLocaleTimeString());
    }, BLOG_CONFIG.autoSaveInterval);
}

function loadDataWithPromise() {
    // 模拟异步加载文章数据
    const loadPosts = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (blogPosts && blogPosts.length > 0) {
                resolve(blogPosts);
            } else {
                reject('文章数据加载失败');
            }
        }, 1000);
    });

    // 模拟异步加载用户数据
    const loadUser = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentUser) {
                resolve(currentUser);
            } else {
                reject('用户数据加载失败');
            }
        }, 800);
    });

    // 使用Promise.all同时加载
    Promise.all([loadPosts, loadUser])
        .then(([posts, user]) => {
            console.log('所有数据加载完成:', { posts: posts.length, user: user.name });
            hideLoadingIndicator();
            renderInitialContent();
        })
        .catch(error => {
            console.error('数据加载失败:', error);
            showMessage('数据加载失败，请刷新页面重试', 'error');
        });
}

function delayedInitialization() {
    // 延迟初始化轮播图，等待DOM完全加载
    setTimeout(() => {
        initializeFeaturedSwiper();
    }, 500);

    // 延迟加载非关键功能
    setTimeout(() => {
        initializeAdvancedFeatures();
    }, 2000);
}

function initializeAdvancedFeatures() {
    // 初始化高级功能
    console.log('初始化高级功能...');

    // 预加载下一页内容
    preloadNextPage();

    // 初始化性能监控
    initializePerformanceMonitoring();
}

function preloadNextPage() {
    const nextPageIndex = currentPage + 1;
    const startIndex = (nextPageIndex - 1) * BLOG_CONFIG.postsPerPage;
    const endIndex = startIndex + BLOG_CONFIG.postsPerPage;

    if (startIndex < filteredPosts.length) {
        console.log(`预加载第${nextPageIndex}页内容`);
        // 预加载图片
        const nextPagePosts = filteredPosts.slice(startIndex, endIndex);
        nextPagePosts.forEach(post => {
            if (post.imageUrl) {
                const img = new Image();
                img.src = post.imageUrl;
            }
        });
    }
}

// ========== 工具函数和辅助方法 ==========

function handleSearch(query) {
    if (!validateSearchInput(query)) {
        return;
    }

    blogManager.updateStats('search');
    const results = searchPosts(query);

    if (results.length === 0) {
        showMessage(`未找到包含"${query}"的文章`, 'info');
    } else {
        showMessage(`找到 ${results.length} 篇相关文章`, 'success');
    }

    currentPage = 1;
    const pageArticles = results.slice(0, BLOG_CONFIG.postsPerPage);
    renderPostList(pageArticles);

    // 保存搜索历史
    saveSearchHistory(query);
}

function saveSearchHistory(query) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    if (!searchHistory.includes(query)) {
        searchHistory.unshift(query);
        searchHistory = searchHistory.slice(0, 10); // 只保留最近10次搜索
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

function filterByTag(tagName) {
    filteredPosts = blogPosts.filter(post =>
        post.tags.some(tag => tag === tagName)
    );
    currentPage = 1;
    const pageArticles = filteredPosts.slice(0, BLOG_CONFIG.postsPerPage);
    renderPostList(pageArticles);
    showMessage(`显示标签"${tagName}"的文章`, 'info');
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);

    showMessage(`已切换到${currentTheme === 'light' ? '浅色' : '深色'}主题`, 'success');
}

function loadMorePosts() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.textContent = '加载中...';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
        const currentDisplayed = currentPage * BLOG_CONFIG.postsPerPage;
        if (currentDisplayed < filteredPosts.length) {
            currentPage++;
            const startIndex = (currentPage - 1) * BLOG_CONFIG.postsPerPage;
            const endIndex = startIndex + BLOG_CONFIG.postsPerPage;
            const newPosts = filteredPosts.slice(startIndex, endIndex);

            newPosts.forEach((post, index) => {
                const postElement = createPostElement(post, currentDisplayed + index);
                document.getElementById('posts-container').appendChild(postElement);

                setTimeout(() => {
                    postElement.style.opacity = '1';
                    postElement.style.transform = 'translateY(0)';
                }, index * 100);
            });

            loadMoreBtn.textContent = '加载更多';
            loadMoreBtn.disabled = false;

            if (currentPage * BLOG_CONFIG.postsPerPage >= filteredPosts.length) {
                loadMoreBtn.style.display = 'none';
            }
        }
    }, 1000);
}

function initializeFeaturedSwiper() {
    if (typeof Swiper !== 'undefined') {
        // 先渲染轮播内容
        renderFeaturedPosts();

        // 初始化轮播
        window.featuredSwiper = new Swiper('.featured-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

function renderFeaturedPosts() {
    const featuredContainer = document.getElementById('featured-posts');
    const featuredPosts = blogPosts.filter(post => post.featured);

    featuredContainer.innerHTML = '';
    featuredPosts.forEach(post => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="featured-post" onclick="window.location.href='article.html?id=${post.id}'">
                <img src="${post.imageUrl}" alt="${post.title}">
                <div class="featured-post-content">
                    <h3>${post.title}</h3>
                    <p class="excerpt">${blogUtils.truncateText(post.excerpt, 100)}</p>
                    <div class="post-meta">
                        <span>${post.category}</span>
                        <span>${post.readTime} 分钟阅读</span>
                    </div>
                </div>
            </div>
        `;
        featuredContainer.appendChild(slide);
    });
}

function renderInitialContent() {
    updatePageContent();
    const initialPosts = filteredPosts.slice(0, BLOG_CONFIG.postsPerPage);
    renderPostList(initialPosts);
}

function hideLoadingIndicator() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

function saveCurrentState() {
    const state = {
        currentPage: currentPage,
        filteredPosts: filteredPosts,
        currentTheme: currentTheme,
        timestamp: Date.now()
    };
    saveToLocalStorage('currentState', state);
}

function checkUnsavedChanges() {
    // 检查是否有未保存的更改
    // 这里可以检查表单数据、草稿等
    return false; // 默认没有未保存的更改
}

function initializePerformanceMonitoring() {
    // 性能监控
    const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log('页面加载时间:', entry.loadEventEnd - entry.loadEventStart, 'ms');
            }
        }
    });

    if ('PerformanceObserver' in window) {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    }
}

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('博客系统初始化开始...');

    // 初始化管理器
    blogManager.init();

    // 初始化事件监听器
    initializeEventListeners();

    // 初始化浏览器控制
    initializeBrowserControls();

    // 初始化滚动处理
    initializeScrollHandlers();

    // 创建动态元素
    createDynamicElements();

    // 初始化异步操作
    initializeAsyncOperations();

    console.log('博客系统初始化完成！');
});