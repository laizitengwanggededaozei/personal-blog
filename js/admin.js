// 后台管理系统JavaScript逻辑
// 实现完整的博客后台管理功能

// ========== 全局变量和配置 ==========

let currentEditingPost = null;
let selectedPosts = [];
let charts = {};
let autoSaveTimer = null;

// ========== 页面初始化 ==========

$(document).ready(function() {
    console.log('后台管理系统初始化开始...');

    // 初始化所有功能
    initializeAdminFeatures();

    // 加载仪表盘数据
    loadDashboardData();

    console.log('后台管理系统初始化完成');
});

function initializeAdminFeatures() {
    // 初始化各种功能模块
    initializeNavigation();
    initializeFormValidation();
    initializeDataTables();
    initializeEditor();
    initializeImageUpload();
    initializeAnalytics();
    initializeQuickActions();
    initializeBatchOperations();
    initializeSettings();
}

// ========== 导航和标签页管理 ==========

function initializeNavigation() {
    // 标签页切换（jQuery事件处理）
    $('.admin-nav .nav-link').click(function(e) {
        e.preventDefault();

        const targetTab = $(this).data('tab');
        switchTab(targetTab);

        // 更新导航状态
        $('.nav-item').removeClass('active');
        $(this).closest('.nav-item').addClass('active');

        // 更新URL（BOM操作）
        history.pushState({tab: targetTab}, '', `#${targetTab}`);
    });

    // 浏览器前进后退处理
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.tab) {
            switchTab(e.state.tab);
            updateNavigation(e.state.tab);
        }
    });

    // 退出登录
    $('.logout-btn').click(function() {
        showConfirmDialog('确认退出', '您确定要退出管理系统吗？', function() {
            // 清除登录状态
            localStorage.removeItem('admin-session');
            showJQueryMessage('已退出登录', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    });
}

function switchTab(tabId) {
    // 隐藏所有标签页
    $('.tab-panel').removeClass('active');

    // 显示目标标签页（jQuery动画）
    $(`#${tabId}`).addClass('active').hide().fadeIn(300);

    // 根据标签页加载对应数据
    loadTabData(tabId);
}

function updateNavigation(activeTab) {
    $('.nav-item').removeClass('active');
    $(`.nav-link[data-tab="${activeTab}"]`).closest('.nav-item').addClass('active');
}

function loadTabData(tabId) {
    switch (tabId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'posts':
            loadPostsTable();
            break;
        case 'comments':
            loadCommentsData();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

// ========== 仪表盘数据 ==========

function loadDashboardData() {
    // 更新统计数字（DOM操作）
    updateAdminStats();

    // 加载最近活动
    loadRecentActivity();

    // 绑定快速操作事件
    bindQuickActions();
}

function updateAdminStats() {
    // 计算统计数据（数组操作）
    const totalPosts = blogPosts.length;
    const totalComments = blogPosts.reduce((sum, post) => sum + post.comments.length, 0);
    const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
    const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);

    // 动画更新数字
    animateNumber('#total-posts-admin', totalPosts);
    animateNumber('#total-comments-admin', totalComments);
    animateNumber('#total-views-admin', totalViews);
    animateNumber('#total-likes-admin', totalLikes);
}

function animateNumber(selector, targetValue) {
    const $element = $(selector);
    const startValue = 0;
    const duration = 1500;

    $({ value: startValue }).animate({ value: targetValue }, {
        duration: duration,
        easing: 'swing',
        step: function() {
            $element.text(Math.floor(this.value));
        },
        complete: function() {
            $element.text(targetValue);
        }
    });
}

function loadRecentActivity() {
    const activities = [
        { icon: '📝', text: '发布了新文章《JavaScript ES6+新特性深度解析》', time: '2分钟前' },
        { icon: '💬', text: '有新评论等待审核', time: '15分钟前' },
        { icon: '👁', text: '网站访问量达到新高峰', time: '1小时前' },
        { icon: '❤', text: '文章《React Hooks最佳实践指南》获得10个点赞', time: '2小时前' },
        { icon: '🔧', text: '更新了网站设置', time: '昨天' }
    ];

    const activityHtml = activities.map(activity => `
        <div class="activity-item">
            <span class="activity-icon">${activity.icon}</span>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');

    $('#activity-list').html(activityHtml);
}

function bindQuickActions() {
    $('.action-btn').click(function() {
        const action = $(this).data('action');
        handleQuickAction(action);
    });
}

function handleQuickAction(action) {
    switch (action) {
        case 'new-post':
            switchTab('editor');
            clearEditor();
            break;
        case 'view-comments':
            switchTab('comments');
            break;
        case 'export-data':
            exportAllData();
            break;
        case 'backup':
            backupWebsite();
            break;
    }
}

// ========== 文章管理 ==========

function loadPostsTable() {
    const tableBody = $('#posts-table-body');
    tableBody.empty();

    // 使用jQuery.each遍历文章（jQuery工具函数）
    $.each(blogPosts, function(index, post) {
        const row = createPostTableRow(post, index);
        tableBody.append(row);
    });

    // 绑定表格事件
    bindTableEvents();

    // 初始化全选功能
    initializeSelectAll();
}

function createPostTableRow(post, index) {
    const statusClass = post.published ? 'status-published' : 'status-draft';
    const statusText = post.published ? '已发布' : '草稿';

    return $(`
        <tr data-post-id="${post.id}">
            <td><input type="checkbox" class="post-checkbox" value="${post.id}"></td>
            <td>
                <div class="post-title-cell">
                    <strong>${post.title}</strong>
                    <div style="font-size: 0.8rem; color: #666; margin-top: 2px;">
                        ${blogUtils.truncateText(post.excerpt, 60)}
                    </div>
                </div>
            </td>
            <td><span class="category-badge">${post.category}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${blogUtils.formatDate(post.publishDate)}</td>
            <td>${post.views.toLocaleString()}</td>
            <td>${post.likes}</td>
            <td>
                <div class="table-actions">
                    <button class="table-btn edit" data-action="edit" data-post-id="${post.id}">编辑</button>
                    <button class="table-btn delete" data-action="delete" data-post-id="${post.id}">删除</button>
                </div>
            </td>
        </tr>
    `);
}

function bindTableEvents() {
    // 编辑按钮
    $('.table-btn.edit').click(function() {
        const postId = $(this).data('post-id');
        editPost(postId);
    });

    // 删除按钮
    $('.table-btn.delete').click(function() {
        const postId = $(this).data('post-id');
        const post = blogPosts.find(p => p.id == postId);

        showConfirmDialog(
            '确认删除',
            `您确定要删除文章《${post.title}》吗？此操作不可撤销。`,
            function() {
                deletePost(postId);
            }
        );
    });

    // 搜索功能
    $('#search-posts').on('input', function() {
        const query = $(this).val().toLowerCase();
        filterTable(query);
    });

    // 分类筛选
    $('#filter-category').change(function() {
        const category = $(this).val();
        filterTableByCategory(category);
    });
}

function initializeSelectAll() {
    $('#select-all-posts').change(function() {
        const isChecked = $(this).is(':checked');
        $('.post-checkbox').prop('checked', isChecked);
        updateSelectedPosts();
    });

    $(document).on('change', '.post-checkbox', function() {
        updateSelectedPosts();

        // 更新全选状态
        const totalCheckboxes = $('.post-checkbox').length;
        const checkedCheckboxes = $('.post-checkbox:checked').length;

        $('#select-all-posts').prop('checked', totalCheckboxes === checkedCheckboxes);
    });
}

function updateSelectedPosts() {
    selectedPosts = $('.post-checkbox:checked').map(function() {
        return parseInt($(this).val());
    }).get();

    // 显示/隐藏批量操作按钮
    if (selectedPosts.length > 0) {
        $('.batch-actions').fadeIn();
    } else {
        $('.batch-actions').fadeOut();
    }
}

function filterTable(query) {
    $('#posts-table-body tr').each(function() {
        const text = $(this).text().toLowerCase();
        if (text.includes(query)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function filterTableByCategory(category) {
    if (!category) {
        $('#posts-table-body tr').show();
        return;
    }

    $('#posts-table-body tr').each(function() {
        const postCategory = $(this).find('.category-badge').text();
        if (postCategory === category) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// ========== 文章编辑器 ==========

function initializeEditor() {
    // 编辑器工具栏事件
    $('.toolbar-btn').click(function() {
        const command = $(this).data('command');
        executeEditorCommand(command);
    });

    // 实时预览
    $('#post-content').on('input', function() {
        updatePreview();
        autoSavePost();
    });

    // 表单提交
    $('#post-editor-form').submit(function(e) {
        e.preventDefault();
        savePost();
    });

    // 保存草稿按钮
    $('#save-draft').click(function() {
        savePost(false);
    });

    // 发布文章按钮
    $('#publish-post').click(function() {
        savePost(true);
    });

    // 预览切换
    $('#toggle-preview').click(function() {
        $('.preview-section').slideToggle();
    });

    // 标题变化时自动生成URL别名
    $('#post-title').on('input', function() {
        const title = $(this).val();
        const slug = generateSlug(title);
        $('#post-slug').val(slug);
    });
}

function executeEditorCommand(command) {
    const textarea = $('#post-content')[0];
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let replacement = '';

    switch (command) {
        case 'bold':
            replacement = `**${selectedText || '粗体文本'}**`;
            break;
        case 'italic':
            replacement = `*${selectedText || '斜体文本'}*`;
            break;
        case 'heading':
            replacement = `## ${selectedText || '标题'}`;
            break;
        case 'link':
            replacement = `[${selectedText || '链接文本'}](https://example.com)`;
            break;
        case 'image':
            replacement = `![${selectedText || '图片描述'}](图片链接)`;
            break;
        case 'code':
            replacement = selectedText.includes('\n')
                ? `\`\`\`\n${selectedText || '代码'}\n\`\`\``
                : `\`${selectedText || '代码'}\``;
            break;
        case 'quote':
            replacement = `> ${selectedText || '引用文本'}`;
            break;
        case 'list':
            replacement = `- ${selectedText || '列表项'}`;
            break;
    }

    // 替换选中文本
    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    // 设置光标位置
    textarea.focus();
    textarea.setSelectionRange(start + replacement.length, start + replacement.length);

    // 更新预览
    updatePreview();
}

function updatePreview() {
    const content = $('#post-content').val();

    // 简单的Markdown解析（实际项目中建议使用专业的Markdown解析库）
    let html = content
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\`(.*?)\`/gim, '<code>$1</code>')
        .replace(/^> (.*)$/gim, '<blockquote>$1</blockquote>')
        .replace(/^- (.*)$/gim, '<li>$1</li>')
        .replace(/\n/gim, '<br>');

    $('#preview-content').html(html || '<p>在左侧输入内容，这里将显示实时预览...</p>');
}

function autoSavePost() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        const formData = getEditorFormData();
        localStorage.setItem('post-draft', JSON.stringify(formData));

        // 显示自动保存提示
        showJQueryMessage('草稿已自动保存', 'info');
    }, 5000);
}

function savePost(publish = false) {
    const formData = getEditorFormData();

    // 表单验证
    if (!validatePostForm(formData)) {
        return;
    }

    // 设置发布状态
    formData.published = publish;
    formData.publishDate = publish ? new Date().toISOString().split('T')[0] : formData.publishDate;

    if (currentEditingPost) {
        // 更新现有文章
        updatePost(currentEditingPost.id, formData);
        showJQueryMessage('文章更新成功！', 'success');
    } else {
        // 创建新文章
        const newPost = {
            id: blogUtils.generateId(),
            ...formData,
            views: 0,
            likes: 0,
            comments: []
        };

        addNewPost(newPost);
        showJQueryMessage(publish ? '文章发布成功！' : '草稿保存成功！', 'success');
    }

    // 清除自动保存的草稿
    localStorage.removeItem('post-draft');

    // 返回文章管理页面
    setTimeout(() => {
        switchTab('posts');
        clearEditor();
    }, 1000);
}

function getEditorFormData() {
    return {
        title: $('#post-title').val().trim(),
        excerpt: $('#post-excerpt').val().trim(),
        content: $('#post-content').val().trim(),
        category: $('#post-category').val(),
        tags: $('#post-tags').val().split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: $('#post-featured').is(':checked'),
        publishDate: $('#post-publish-date').val() || new Date().toISOString().split('T')[0],
        slug: $('#post-slug').val().trim(),
        metaDescription: $('#post-meta-description').val().trim()
    };
}

function validatePostForm(formData) {
    const errors = [];

    if (!formData.title) {
        errors.push('请输入文章标题');
    }

    if (!formData.content) {
        errors.push('请输入文章内容');
    }

    if (formData.content.length < 100) {
        errors.push('文章内容至少需要100个字符');
    }

    if (errors.length > 0) {
        showJQueryMessage(errors.join('；'), 'error');
        return false;
    }

    return true;
}

function editPost(postId) {
    const post = blogPosts.find(p => p.id == postId);
    if (!post) return;

    currentEditingPost = post;

    // 填充表单数据
    $('#post-title').val(post.title);
    $('#post-excerpt').val(post.excerpt);
    $('#post-content').val(post.content);
    $('#post-category').val(post.category);
    $('#post-tags').val(post.tags.join(', '));
    $('#post-featured').prop('checked', post.featured);
    $('#post-publish-date').val(post.publishDate);
    $('#post-slug').val(post.slug || generateSlug(post.title));
    $('#post-meta-description').val(post.metaDescription || '');

    // 更新预览
    updatePreview();

    // 切换到编辑器标签页
    switchTab('editor');

    showJQueryMessage(`正在编辑文章：${post.title}`, 'info');
}

function clearEditor() {
    currentEditingPost = null;
    $('#post-editor-form')[0].reset();
    $('#preview-content').html('<p>在左侧输入内容，这里将显示实时预览...</p>');

    // 设置默认发布时间
    const now = new Date();
    $('#post-publish-date').val(now.toISOString().slice(0, 16));
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// ========== 图片上传 ==========

function initializeImageUpload() {
    // 图片上传区域点击事件
    $('#image-upload-area').click(function() {
        $('#featured-image').click();
    });

    // 文件选择处理
    $('#featured-image').change(function() {
        const file = this.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // 删除图片
    $('#remove-image').click(function() {
        removeImage();
    });

    // 拖拽上传
    $('#image-upload-area').on('dragover', function(e) {
        e.preventDefault();
        $(this).addClass('dragover');
    }).on('dragleave', function(e) {
        e.preventDefault();
        $(this).removeClass('dragover');
    }).on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('dragover');

        const file = e.originalEvent.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });
}

function handleImageUpload(file) {
    // 验证文件类型和大小
    if (!file.type.startsWith('image/')) {
        showJQueryMessage('请选择图片文件', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB限制
        showJQueryMessage('图片大小不能超过5MB', 'error');
        return;
    }

    // 使用FileReader预览图片
    const reader = new FileReader();
    reader.onload = function(e) {
        showImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // 模拟上传过程
    showJQueryMessage('图片上传中...', 'info');

    // 实际项目中这里应该上传到服务器
    setTimeout(() => {
        showJQueryMessage('图片上传成功！', 'success');
    }, 1500);
}

function showImagePreview(src) {
    $('#preview-image').attr('src', src);
    $('.upload-placeholder').hide();
    $('#image-preview').show();
}

function removeImage() {
    $('.upload-placeholder').show();
    $('#image-preview').hide();
    $('#featured-image').val('');
}

// ========== 评论管理 ==========

function loadCommentsData() {
    const allComments = getAllComments();
    const commentsHtml = allComments.map(comment => createCommentAdminItem(comment)).join('');

    $('#admin-comments-list').html(commentsHtml || '<p>暂无评论</p>');

    // 绑定评论操作事件
    bindCommentActions();
}

function createCommentAdminItem(comment) {
    return `
        <div class="comment-admin-item" data-comment-id="${comment.id}">
            <div class="comment-admin-header">
                <div class="comment-admin-author">${comment.author}</div>
                <div class="comment-admin-meta">
                    来自《<a href="article.html?id=${comment.postId}">${comment.postTitle}</a>》
                    · ${blogUtils.formatRelativeTime(comment.date)}
                </div>
            </div>
            <div class="comment-admin-content">${comment.content}</div>
            <div class="comment-admin-actions">
                <button class="comment-admin-btn approve-btn" data-action="approve">审核通过</button>
                <button class="comment-admin-btn reject-btn" data-action="reject">拒绝</button>
                <button class="comment-admin-btn spam-btn" data-action="spam">标记垃圾</button>
            </div>
        </div>
    `;
}

function bindCommentActions() {
    $('.comment-admin-btn').click(function() {
        const action = $(this).data('action');
        const commentId = $(this).closest('.comment-admin-item').data('comment-id');
        handleCommentAction(action, commentId);
    });
}

function handleCommentAction(action, commentId) {
    const $commentItem = $(`.comment-admin-item[data-comment-id="${commentId}"]`);

    switch (action) {
        case 'approve':
            $commentItem.fadeOut(300, function() {
                $(this).remove();
            });
            showJQueryMessage('评论已审核通过', 'success');
            break;
        case 'reject':
            $commentItem.fadeOut(300, function() {
                $(this).remove();
            });
            showJQueryMessage('评论已拒绝', 'success');
            break;
        case 'spam':
            $commentItem.fadeOut(300, function() {
                $(this).remove();
            });
            showJQueryMessage('评论已标记为垃圾', 'success');
            break;
    }
}

// ========== 数据分析 ==========

function initializeAnalytics() {
    // 日期范围选择器
    $('#apply-date-range').click(function() {
        const startDate = $('#start-date').val();
        const endDate = $('#end-date').val();

        if (startDate && endDate) {
            loadAnalyticsData(startDate, endDate);
        } else {
            showJQueryMessage('请选择日期范围', 'error');
        }
    });

    // 设置默认日期范围（最近30天）
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    $('#start-date').val(startDate.toISOString().split('T')[0]);
    $('#end-date').val(endDate.toISOString().split('T')[0]);
}

function loadAnalyticsData(startDate, endDate) {
    // 加载图表数据
    createViewsChart();
    createCategoryChart();
    createPopularPostsChart();
    createInteractionChart();
}

function createViewsChart() {
    const ctx = document.getElementById('views-chart');
    if (!ctx) return;

    // 销毁已存在的图表
    if (charts.viewsChart) {
        charts.viewsChart.destroy();
    }

    // 模拟访问量数据
    const data = {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        datasets: [{
            label: '访问量',
            data: [120, 190, 300, 500, 200, 300, 450],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    charts.viewsChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '网站访问量趋势'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createCategoryChart() {
    const ctx = document.getElementById('category-chart');
    if (!ctx) return;

    if (charts.categoryChart) {
        charts.categoryChart.destroy();
    }

    // 统计各分类文章数量
    const categoryStats = {};
    blogPosts.forEach(post => {
        categoryStats[post.category] = (categoryStats[post.category] || 0) + 1;
    });

    const data = {
        labels: Object.keys(categoryStats),
        datasets: [{
            data: Object.values(categoryStats),
            backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']
        }]
    };

    charts.categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '文章分类分布'
                }
            }
        }
    });
}

function createPopularPostsChart() {
    const popularPosts = blogPosts
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    const chartHtml = popularPosts.map(post => `
        <div class="popular-post-item">
            <div class="popular-post-title">${blogUtils.truncateText(post.title, 30)}</div>
            <div class="popular-post-views">${post.views.toLocaleString()}</div>
        </div>
    `).join('');

    $('#popular-posts-chart').html(chartHtml);
}

function createInteractionChart() {
    const ctx = document.getElementById('interaction-chart');
    if (!ctx) return;

    if (charts.interactionChart) {
        charts.interactionChart.destroy();
    }

    const data = {
        labels: ['点赞', '评论', '分享', '收藏'],
        datasets: [{
            label: '用户互动',
            data: [892, 156, 89, 234],
            backgroundColor: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12']
        }]
    };

    charts.interactionChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '用户互动数据'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ========== 表单验证 ==========

function initializeFormValidation() {
    // 使用jQuery Validation插件
    if (typeof $.fn.validate !== 'undefined') {
        // 网站设置表单验证
        $('#site-settings-form').validate({
            rules: {
                siteName: {
                    required: true,
                    minlength: 2
                },
                adminEmail: {
                    required: true,
                    email: true
                }
            },
            messages: {
                siteName: {
                    required: '请输入网站名称',
                    minlength: '网站名称至少需要2个字符'
                },
                adminEmail: {
                    required: '请输入管理员邮箱',
                    email: '请输入有效的邮箱地址'
                }
            },
            submitHandler: function(form) {
                saveSettings('site', $(form).serialize());
            }
        });

        // 显示设置表单验证
        $('#display-settings-form').validate({
            rules: {
                postsPerPage: {
                    required: true,
                    number: true,
                    min: 1,
                    max: 20
                }
            },
            messages: {
                postsPerPage: {
                    required: '请输入每页文章数',
                    number: '请输入有效的数字',
                    min: '每页至少显示1篇文章',
                    max: '每页最多显示20篇文章'
                }
            },
            submitHandler: function(form) {
                saveSettings('display', $(form).serialize());
            }
        });
    }
}

// ========== 批量操作 ==========

function initializeBatchOperations() {
    $('#batch-delete').click(function() {
        if (selectedPosts.length === 0) {
            showJQueryMessage('请选择要删除的文章', 'error');
            return;
        }

        showConfirmDialog(
            '批量删除',
            `您确定要删除选中的 ${selectedPosts.length} 篇文章吗？此操作不可撤销。`,
            function() {
                batchDeletePosts();
            }
        );
    });

    $('#batch-publish').click(function() {
        if (selectedPosts.length === 0) {
            showJQueryMessage('请选择要发布的文章', 'error');
            return;
        }

        batchPublishPosts();
    });

    $('#batch-draft').click(function() {
        if (selectedPosts.length === 0) {
            showJQueryMessage('请选择要设为草稿的文章', 'error');
            return;
        }

        batchDraftPosts();
    });
}

function batchDeletePosts() {
    selectedPosts.forEach(postId => {
        deletePost(postId);
    });

    showJQueryMessage(`已删除 ${selectedPosts.length} 篇文章`, 'success');
    selectedPosts = [];
    loadPostsTable();
}

function batchPublishPosts() {
    selectedPosts.forEach(postId => {
        const post = blogPosts.find(p => p.id == postId);
        if (post) {
            post.published = true;
            post.publishDate = new Date().toISOString().split('T')[0];
        }
    });

    showJQueryMessage(`已发布 ${selectedPosts.length} 篇文章`, 'success');
    selectedPosts = [];
    loadPostsTable();
}

function batchDraftPosts() {
    selectedPosts.forEach(postId => {
        const post = blogPosts.find(p => p.id == postId);
        if (post) {
            post.published = false;
        }
    });

    showJQueryMessage(`已设为草稿 ${selectedPosts.length} 篇文章`, 'success');
    selectedPosts = [];
    loadPostsTable();
}

// ========== 设置管理 ==========

function initializeSettings() {
    // 数据导出
    $('#export-all-data').click(function() {
        exportAllData();
    });

    // 数据导入
    $('#import-data-btn').click(function() {
        $('#import-data-file').click();
    });

    $('#import-data-file').change(function() {
        const file = this.files[0];
        if (file) {
            importData(file);
        }
    });

    // 清空数据
    $('#clear-all-data').click(function() {
        showConfirmDialog(
            '危险操作',
            '⚠️ 您确定要清空所有数据吗？此操作将删除所有文章、评论和设置，且不可恢复！',
            function() {
                clearAllData();
            }
        );
    });
}

function loadSettingsData() {
    // 加载当前设置到表单
    $('#site-name').val(blogConfig.siteName);
    $('#site-description').val(blogConfig.siteDescription);
    $('#posts-per-page').val(blogConfig.postsPerPage);
    $('#default-theme').val(blogConfig.defaultTheme);
}

function saveSettings(type, formData) {
    // 解析表单数据
    const data = {};
    formData.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        data[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    // 保存到配置
    Object.assign(blogConfig, data);

    // 保存到localStorage
    localStorage.setItem('blogConfig', JSON.stringify(blogConfig));

    showJQueryMessage('设置保存成功！', 'success');
}

function exportAllData() {
    const exportData = {
        posts: blogPosts,
        config: blogConfig,
        stats: blogStats,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `blog-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    showJQueryMessage('数据导出成功！', 'success');
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);

            if (importedData.posts && Array.isArray(importedData.posts)) {
                // 合并数据
                blogPosts.splice(0, blogPosts.length, ...importedData.posts);

                if (importedData.config) {
                    Object.assign(blogConfig, importedData.config);
                }

                // 保存到localStorage
                localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
                localStorage.setItem('blogConfig', JSON.stringify(blogConfig));

                showJQueryMessage('数据导入成功！', 'success');

                // 刷新页面数据
                loadDashboardData();
                loadPostsTable();
            } else {
                throw new Error('无效的数据格式');
            }
        } catch (error) {
            showJQueryMessage('数据导入失败：' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    // 清空所有数据
    blogPosts.splice(0);

    // 重置配置为默认值
    Object.assign(blogConfig, {
        siteName: "技术人生",
        siteDescription: "记录技术成长，分享编程心得",
        postsPerPage: 5,
        defaultTheme: "light"
    });

    // 清除localStorage
    localStorage.removeItem('blogPosts');
    localStorage.removeItem('blogConfig');
    localStorage.removeItem('post-draft');

    showJQueryMessage('所有数据已清空', 'success');

    // 刷新页面
    setTimeout(() => {
        location.reload();
    }, 1000);
}

function backupWebsite() {
    showJQueryMessage('正在备份网站...', 'info');

    // 模拟备份过程
    setTimeout(() => {
        exportAllData();
        showJQueryMessage('网站备份完成！', 'success');
    }, 2000);
}

// ========== 辅助函数 ==========

function showConfirmDialog(title, message, onConfirm) {
    $('#confirm-title').text(title);
    $('#confirm-message').text(message);
    $('#confirm-modal').fadeIn(300);

    // 移除之前的事件监听器
    $('#confirm-ok').off('click').on('click', function() {
        $('#confirm-modal').fadeOut(300);
        if (onConfirm) onConfirm();
    });

    $('#confirm-cancel').off('click').on('click', function() {
        $('#confirm-modal').fadeOut(300);
    });
}

function initializeQuickActions() {
    $('#new-post-btn').click(function() {
        switchTab('editor');
        clearEditor();
    });
}

function getAllComments() {
    const allComments = [];
    blogPosts.forEach(post => {
        post.comments.forEach(comment => {
            allComments.push({
                ...comment,
                postId: post.id,
                postTitle: post.title
            });
        });
    });
    return allComments.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ========== 页面加载时的初始化 ==========

// 检查是否已登录（模拟）
function checkAuthStatus() {
    const session = localStorage.getItem('admin-session');
    if (!session) {
        // 模拟登录检查
        localStorage.setItem('admin-session', JSON.stringify({
            user: 'admin',
            loginTime: Date.now()
        }));
    }
}

// 页面加载完成后检查认证状态
$(window).on('load', function() {
    checkAuthStatus();

    // 检查URL哈希，自动切换到对应标签页
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchTab(hash);
        updateNavigation(hash);
    }

    // 加载保存的草稿
    const savedDraft = localStorage.getItem('post-draft');
    if (savedDraft && !currentEditingPost) {
        try {
            const draftData = JSON.parse(savedDraft);
            const shouldLoad = confirm('检测到未保存的草稿，是否恢复？');
            if (shouldLoad) {
                Object.keys(draftData).forEach(key => {
                    $(`#post-${key}`).val(draftData[key]);
                });
                updatePreview();
                showJQueryMessage('草稿已恢复', 'success');
            }
        } catch (e) {
            console.error('草稿恢复失败:', e);
        }
    }
});

console.log('后台管理系统JavaScript加载完成');