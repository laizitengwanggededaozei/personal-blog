// 文章页面JavaScript逻辑
// 处理文章详情页的所有交互功能

// ========== 页面初始化 ==========

$(document).ready(function() {
    console.log('文章页面初始化开始...');

    // 初始化AOS动画库
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || 1;

    // 加载文章内容
    loadArticleContent(articleId);

    // 初始化所有功能
    initializeArticleFeatures();

    console.log('文章页面初始化完成');
});

// ========== 核心功能函数 ==========

function loadArticleContent(articleId) {
    console.log('加载文章ID:', articleId);

    // 模拟异步加载（满足异步编程要求）
    setTimeout(() => {
        const article = blogPosts.find(post => post.id == articleId);

        if (article) {
            // 更新文章信息
            updateArticleInfo(article);

            // 渲染文章内容
            renderArticleContent(article);

            // 生成目录
            generateTableOfContents();

            // 加载相关文章
            loadRelatedArticles(article);

            // 加载评论
            loadComments(article.comments);

            // 更新访问量
            updateViewCount(article);

            // 代码高亮
            highlightCode();

        } else {
            showError('文章不存在');
        }
    }, 800);
}

function updateArticleInfo(article) {
    // 使用jQuery选择器和DOM操作（满足jQuery技术要求）
    $('#article-title').text(article.title);
    $('#article-category').text(article.category);
    $('#article-date').text(blogUtils.formatDate(article.publishDate));
    $('#article-read-time').text(`${article.readTime} 分钟阅读`);
    $('#article-excerpt').text(article.excerpt);
    $('#article-author').text(article.author);
    $('#like-count').text(article.likes);
    $('#view-count').text(article.views);
    $('#comment-count').text(article.comments.length);
    $('#comments-count').text(article.comments.length);

    // 设置特色图片
    if (article.imageUrl) {
        $('#article-image').attr('src', article.imageUrl).attr('alt', article.title);
    } else {
        $('.article-featured-image').hide();
    }

    // 更新页面标题
    document.title = `${article.title} - 技术人生博客`;

    // 渲染标签
    renderArticleTags(article.tags);
}

function renderArticleContent(article) {
    // 隐藏加载动画
    $('.loading-content').fadeOut(300);

    // 显示文章内容（使用jQuery动画效果）
    $('#article-content').html(article.content).hide().fadeIn(600);

    // 为内容添加交互功能
    enhanceContentInteractivity();
}

function renderArticleTags(tags) {
    const tagsHtml = tags.map(tag =>
        `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`
    ).join('');

    $('#article-tags').html(tagsHtml);
}

function generateTableOfContents() {
    const headings = $('#article-content').find('h2, h3, h4');
    const tocContainer = $('#table-of-contents');

    if (headings.length === 0) {
        tocContainer.html('<p>本文暂无目录</p>');
        return;
    }

    let tocHtml = '';

    // 使用jQuery.each遍历（满足jQuery工具函数要求）
    headings.each(function(index) {
        const $heading = $(this);
        const level = parseInt($heading.prop('tagName').substring(1));
        const text = $heading.text();
        const id = `heading-${index}`;

        // 为标题添加ID
        $heading.attr('id', id);

        tocHtml += `<div class="toc-item level-${level}" data-target="#${id}">${text}</div>`;
    });

    tocContainer.html(tocHtml);

    // 目录点击事件
    $('.toc-item').click(function() {
        const target = $(this).data('target');
        scrollToElement(target);

        // 更新活动状态
        $('.toc-item').removeClass('active');
        $(this).addClass('active');
    });
}

function loadRelatedArticles(currentArticle) {
    // 使用jQuery.grep过滤相关文章
    const relatedPosts = $.grep(blogPosts, function(post) {
        return post.id !== currentArticle.id &&
            (post.category === currentArticle.category ||
                post.tags.some(tag => currentArticle.tags.includes(tag)));
    });

    // 随机选择3篇相关文章
    const shuffled = relatedPosts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    if (selected.length === 0) {
        $('#related-articles').html('<p>暂无相关文章</p>');
        return;
    }

    const relatedHtml = selected.map(post => `
        <div class="related-article-item" onclick="window.location.href='article.html?id=${post.id}'">
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}">` : ''}
            <div class="related-article-content">
                <div class="related-article-title">${post.title}</div>
                <div class="related-article-excerpt">${blogUtils.truncateText(post.excerpt, 80)}</div>
            </div>
        </div>
    `).join('');

    $('#related-articles').html(relatedHtml);
}

function loadComments(comments) {
    if (comments.length === 0) {
        $('#comments-list').html('<p class="no-comments">还没有评论，快来抢沙发吧！</p>');
        return;
    }

    const commentsHtml = comments.map((comment, index) => `
        <div class="comment-item" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${blogUtils.formatRelativeTime(comment.date)}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
            <div class="comment-actions">
                <button class="comment-action like-comment" data-comment-id="${comment.id}">
                    👍 点赞
                </button>
                <button class="comment-action reply-comment" data-comment-id="${comment.id}">
                    💬 回复
                </button>
            </div>
        </div>
    `).join('');

    $('#comments-list').html(commentsHtml);
}

// ========== 交互功能 ==========

function initializeArticleFeatures() {
    // 初始化各种功能
    initializeScrollProgress();
    initializeFloatingToolbar();
    initializeCommentForm();
    initializeShareFeature();
    initializeFontPanel();
    initializeCodeHighlight();
    initializeImageZoom();
    initializeKeyboardShortcuts();
    loadSidebarData();
}

function initializeScrollProgress() {
    // 阅读进度条（BOM操作 - 监听滚动事件）
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const documentHeight = $(document).height();
        const windowHeight = $(this).height();

        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        $('.reading-progress-bar').css('width', Math.min(progress, 100) + '%');

        // 目录高亮更新
        updateTocHighlight(scrollTop);

        // 浮动工具栏显示控制
        if (scrollTop > 300) {
            $('.floating-toolbar').fadeIn();
        } else {
            $('.floating-toolbar').fadeOut();
        }
    });
}

function initializeFloatingToolbar() {
    // 返回顶部（jQuery事件处理和动画）
    $('#scroll-top-btn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
    });

    // 目录切换
    $('#toggle-toc-btn').click(function() {
        $('.toc-widget').slideToggle(400);
        $(this).toggleClass('active');
    });

    // 字体设置
    $('#font-size-btn').click(function() {
        $('#font-panel').toggleClass('active');
    });

    // 主题切换
    $('#theme-toggle-btn').click(function() {
        toggleTheme();
    });

    // 全屏阅读
    $('#fullscreen-btn').click(function() {
        toggleFullscreen();
    });
}

function initializeCommentForm() {
    // 字符计数（实时输入事件）
    $('#comment-content').on('input', function() {
        const length = $(this).val().length;
        $('#char-count').text(length);

        const counter = $('#char-count').parent();
        if (length > 450) {
            counter.css('color', '#e74c3c');
        } else if (length > 400) {
            counter.css('color', '#f39c12');
        } else {
            counter.css('color', '#7f8c8d');
        }
    });

    // 预览功能
    $('#preview-btn').click(function() {
        const content = $('#comment-content').val().trim();
        if (!content) {
            showJQueryMessage('请先输入评论内容', 'error');
            return;
        }

        $('#preview-content').html(marked ? marked(content) : content);
        $('#comment-preview-modal').fadeIn(300);
    });

    // 表单提交（Ajax提交）
    $('#comment-form').submit(function(e) {
        e.preventDefault();
        submitComment($(this));
    });

    // 模态框控制
    $('#close-preview, #edit-comment').click(function() {
        $('#comment-preview-modal').fadeOut(300);
    });

    $('#submit-comment').click(function() {
        $('#comment-preview-modal').fadeOut(300);
        $('#comment-form').submit();
    });
}

function initializeShareFeature() {
    // 分享按钮点击
    $('.share-btn').click(function() {
        $('#share-menu').fadeIn(300);
    });

    $('#close-share').click(function() {
        $('#share-menu').fadeOut(300);
    });

    // 分享平台选择
    $('#share-menu .share-btn').click(function(e) {
        e.stopPropagation();
        const platform = $(this).data('platform');
        shareToplatform(platform);
    });

    // 点击遮罩关闭
    $('#share-menu').click(function(e) {
        if (e.target === this) {
            $(this).fadeOut(300);
        }
    });
}

function initializeFontPanel() {
    // 字体大小控制
    $('.size-btn').click(function() {
        $('.size-btn').removeClass('active');
        $(this).addClass('active');

        const size = $(this).data('size');
        changeFontSize(size);
    });

    // 行间距控制
    $('#line-height-range').on('input', function() {
        const lineHeight = $(this).val();
        $('#article-content').css('line-height', lineHeight);

        // 保存用户偏好（localStorage）
        localStorage.setItem('preferred-line-height', lineHeight);
    });

    // 加载用户偏好
    const savedLineHeight = localStorage.getItem('preferred-line-height');
    if (savedLineHeight) {
        $('#line-height-range').val(savedLineHeight);
        $('#article-content').css('line-height', savedLineHeight);
    }
}

function initializeCodeHighlight() {
    // 代码高亮（使用highlight.js插件）
    if (typeof hljs !== 'undefined') {
        $('pre code').each(function(i, block) {
            hljs.highlightElement(block);
        });
    }

    // 代码复制功能
    $('pre').each(function() {
        const $pre = $(this);
        const $copyBtn = $('<button class="copy-code-btn">复制代码</button>');

        $copyBtn.css({
            'position': 'absolute',
            'top': '10px',
            'right': '10px',
            'background': '#3498db',
            'color': 'white',
            'border': 'none',
            'padding': '5px 10px',
            'border-radius': '3px',
            'cursor': 'pointer',
            'font-size': '12px'
        });

        $pre.css('position', 'relative').append($copyBtn);

        $copyBtn.click(function() {
            const code = $pre.find('code').text();
            copyToClipboard(code);

            $copyBtn.text('已复制').css('background', '#2ecc71');
            setTimeout(() => {
                $copyBtn.text('复制代码').css('background', '#3498db');
            }, 2000);
        });
    });
}

function initializeImageZoom() {
    // 图片点击放大
    $('#article-content img').click(function() {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt') || '图片';

        const $modal = $(`
            <div class="image-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            ">
                <img src="${src}" alt="${alt}" style="
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                ">
            </div>
        `);

        $('body').append($modal);
        $modal.hide().fadeIn(300);

        $modal.click(function() {
            $(this).fadeOut(300, function() {
                $(this).remove();
            });
        });
    });
}

function initializeKeyboardShortcuts() {
    // 键盘快捷键（事件监听）
    $(document).keydown(function(e) {
        // Ctrl/Cmd + K: 快速搜索
        if ((e.ctrlKey || e.metaKey) && e.which === 75) {
            e.preventDefault();
            window.location.href = 'index.html';
        }

        // Esc: 关闭模态框
        if (e.which === 27) {
            $('.modal-overlay, .share-menu, .image-modal').fadeOut(300);
            $('#font-panel').removeClass('active');
        }

        // 上下箭头: 滚动文章
        if (e.which === 38) { // 上箭头
            e.preventDefault();
            $(window).scrollTop($(window).scrollTop() - 100);
        }
        if (e.which === 40) { // 下箭头
            e.preventDefault();
            $(window).scrollTop($(window).scrollTop() + 100);
        }
    });
}

function loadSidebarData() {
    // 加载热门文章
    loadPopularArticles();

    // 加载标签云
    loadSidebarTags();
}

function loadPopularArticles() {
    // 根据浏览量排序获取热门文章
    const popularPosts = blogPosts
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    const popularHtml = popularPosts.map(post => `
        <div class="popular-article-item" onclick="window.location.href='article.html?id=${post.id}'">
            <img src="${post.imageUrl || 'https://via.placeholder.com/60x60/95a5a6/ffffff?text=No+Image'}" 
                 alt="${post.title}" class="popular-article-thumb">
            <div class="popular-article-info">
                <a href="article.html?id=${post.id}" class="popular-article-title">${post.title}</a>
                <div class="popular-article-meta">
                    <span>👁 ${post.views}</span>
                    <span>❤ ${post.likes}</span>
                </div>
            </div>
        </div>
    `).join('');

    $('#popular-articles').html(popularHtml);
}

function loadSidebarTags() {
    // 加载侧边栏标签云
    const tagsHtml = allTags.slice(0, 10).map(tag =>
        `<span class="tag" style="background: ${tag.color}" onclick="filterByTag('${tag.name}')">${tag.name}</span>`
    ).join('');

    $('#sidebar-tags').html(tagsHtml);
}

// ========== 辅助功能函数 ==========

function updateTocHighlight(scrollTop) {
    let activeIndex = -1;

    $('#article-content h2, #article-content h3, #article-content h4').each(function(index) {
        const elementTop = $(this).offset().top;
        if (elementTop <= scrollTop + 100) {
            activeIndex = index;
        }
    });

    $('.toc-item').removeClass('active');
    if (activeIndex >= 0) {
        $('.toc-item').eq(activeIndex).addClass('active');
    }
}

function scrollToElement(target) {
    const $target = $(target);
    if ($target.length) {
        $('html, body').animate({
            scrollTop: $target.offset().top - 100
        }, 600, 'swing');
    }
}

function enhanceContentInteractivity() {
    // 为文章内容添加交互功能

    // 段落双击选中
    $('#article-content p').dblclick(function() {
        selectText(this);
    });

    // 链接新窗口打开
    $('#article-content a').attr('target', '_blank');

    // 表格响应式处理
    $('#article-content table').wrap('<div class="table-responsive"></div>');

    // 引用块特效
    $('#article-content blockquote').prepend('<div class="quote-icon">💬</div>');
}

function submitComment(form) {
    const formData = {
        author: form.find('#comment-author').val(),
        email: form.find('#comment-email').val(),
        content: form.find('#comment-content').val(),
        timestamp: new Date().toISOString()
    };

    // 简单验证
    if (!formData.author.trim() || !formData.content.trim()) {
        showJQueryMessage('请填写必要信息', 'error');
        return;
    }

    // 模拟Ajax提交
    const $submitBtn = form.find('button[type="submit"]');
    $submitBtn.text('提交中...').prop('disabled', true);

    // 使用Promise模拟异步提交
    new Promise((resolve) => {
        setTimeout(resolve, 2000);
    }).then(() => {
        // 添加到评论列表
        const newCommentHtml = `
            <div class="comment-item new-comment" style="display: none;">
                <div class="comment-header">
                    <span class="comment-author">${formData.author}</span>
                    <span class="comment-date">刚刚</span>
                </div>
                <div class="comment-content">${formData.content}</div>
                <div class="comment-actions">
                    <button class="comment-action like-comment">👍 点赞</button>
                    <button class="comment-action reply-comment">💬 回复</button>
                </div>
            </div>
        `;

        if ($('#comments-list .no-comments').length) {
            $('#comments-list').html(newCommentHtml);
        } else {
            $('#comments-list').prepend(newCommentHtml);
        }

        $('.new-comment').slideDown(400);

        // 更新评论数量
        const currentCount = parseInt($('#comments-count').text()) || 0;
        $('#comments-count').text(currentCount + 1);
        $('#comment-count').text(currentCount + 1);

        // 重置表单
        form[0].reset();
        $('#char-count').text('0');

        showJQueryMessage('评论发表成功！', 'success');

        $submitBtn.text('发表评论').prop('disabled', false);
    });
}

function shareToplatform(platform) {
    const url = window.location.href;
    const title = $('#article-title').text();
    const description = $('#article-excerpt').text();

    let shareUrl = '';

    switch (platform) {
        case 'weibo':
            shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        case 'wechat':
            // 微信分享通常需要通过二维码
            generateQRCode(url);
            return;
        case 'qq':
            shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        case 'link':
            copyToClipboard(url);
            showJQueryMessage('链接已复制到剪贴板', 'success');
            $('#share-menu').fadeOut(300);
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        $('#share-menu').fadeOut(300);
    }
}

function changeFontSize(size) {
    const $content = $('#article-content');
    let fontSize = '1.1rem';

    switch (size) {
        case 'small':
            fontSize = '1rem';
            break;
        case 'medium':
            fontSize = '1.1rem';
            break;
        case 'large':
            fontSize = '1.3rem';
            break;
    }

    $content.css('font-size', fontSize);

    // 保存用户偏好
    localStorage.setItem('preferred-font-size', size);

    showJQueryMessage(`字体大小已调整为${size === 'small' ? '小号' : size === 'medium' ? '中号' : '大号'}`, 'success');
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 按钮动画
    $('#theme-toggle-btn').css('transform', 'rotate(180deg)');
    setTimeout(() => {
        $('#theme-toggle-btn').css('transform', 'rotate(0deg)');
    }, 300);

    showJQueryMessage(`已切换到${newTheme === 'light' ? '浅色' : '深色'}主题`, 'success');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            $('body').addClass('fullscreen-reading');
            showJQueryMessage('已进入全屏阅读模式', 'success');
        });
    } else {
        document.exitFullscreen().then(() => {
            $('body').removeClass('fullscreen-reading');
            showJQueryMessage('已退出全屏模式', 'success');
        });
    }
}

function updateViewCount(article) {
    // 模拟更新访问量
    article.views++;
    $('#view-count').text(article.views);

    // 保存到localStorage
    const viewedArticles = JSON.parse(localStorage.getItem('viewedArticles') || '[]');
    if (!viewedArticles.includes(article.id)) {
        viewedArticles.push(article.id);
        localStorage.setItem('viewedArticles', JSON.stringify(viewedArticles));
    }
}

function highlightCode() {
    // 如果有highlight.js库，进行代码高亮
    if (typeof hljs !== 'undefined') {
        $('#article-content pre code').each(function(i, block) {
            hljs.highlightElement(block);
        });
    }
}

function showError(message) {
    $('#article-content').html(`
        <div class="error-message" style="text-align: center; padding: 3rem; color: #e74c3c;">
            <h2>❌ ${message}</h2>
            <p>请检查文章链接是否正确</p>
            <button onclick="window.location.href='index.html'" class="btn-primary" style="margin-top: 1rem;">
                返回首页
            </button>
        </div>
    `);
}

function copyToClipboard(text) {
    // 现代浏览器的复制功能
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('复制成功');
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        console.log('复制成功');
    } catch (err) {
        console.error('复制失败:', err);
    }

    document.body.removeChild(textArea);
}

function generateQRCode(url) {
    // 简单的二维码生成（实际项目中可以使用QRCode.js库）
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

    const $qrModal = $(`
        <div class="qr-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        ">
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
            ">
                <h3>微信扫码分享</h3>
                <img src="${qrCodeUrl}" alt="二维码" style="margin: 1rem 0;">
                <p>使用微信扫一扫分享文章</p>
                <button onclick="$(this).closest('.qr-modal').remove()" style="
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">关闭</button>
            </div>
        </div>
    `);

    $('body').append($qrModal);
    $('#share-menu').fadeOut(300);
}

function selectText(element) {
    if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

function filterByTag(tagName) {
    // 跳转到首页并按标签筛选
    window.location.href = `index.html?tag=${encodeURIComponent(tagName)}`;
}

// ========== 页面离开前保存状态 ==========

window.addEventListener('beforeunload', function() {
    // 保存阅读进度
    const scrollPosition = $(window).scrollTop();
    const documentHeight = $(document).height();
    const readingProgress = (scrollPosition / documentHeight) * 100;

    localStorage.setItem('reading-progress', JSON.stringify({
        articleId: new URLSearchParams(window.location.search).get('id'),
        progress: readingProgress,
        timestamp: Date.now()
    }));
});

// 页面加载时恢复阅读进度
$(window).on('load', function() {
    const savedProgress = localStorage.getItem('reading-progress');
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const currentArticleId = new URLSearchParams(window.location.search).get('id');

        // 如果是同一篇文章且保存时间在24小时内
        if (progressData.articleId === currentArticleId &&
            Date.now() - progressData.timestamp < 24 * 60 * 60 * 1000) {

            const targetScroll = (progressData.progress / 100) * $(document).height();

            if (targetScroll > 100) { // 只有滚动位置超过100px才提示
                const shouldRestore = confirm('检测到您上次的阅读进度，是否继续阅读？');
                if (shouldRestore) {
                    $('html, body').animate({ scrollTop: targetScroll }, 1000);
                }
            }
        }
    }
});

console.log('文章页面JavaScript加载完成');