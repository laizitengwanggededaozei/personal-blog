// jQuery技术功能模块 - 涵盖所有40分技术点

// ========== jQuery基础及特效部分（40分） ==========

$(document).ready(function() {
    console.log('jQuery功能模块加载完成');
    initializeAllJQueryFeatures();
});

function initializeAllJQueryFeatures() {
    // 初始化所有jQuery功能
    initializeSelectors();
    initializeEventHandlers();
    initializeAnimations();
    initializeAjaxFeatures();
    initializeDOMOperations();
    initializeChainedEffects();
    initializeFormHandlers();
    initializeUtilityFunctions();
}

// 1. 选择器应用 - 5分
function initializeSelectors() {
    console.log('初始化jQuery选择器...');

    // ID选择器
    $('#search-input').attr('placeholder', 'jQuery搜索功能已启用...');

    // 类选择器
    $('.post-item').addClass('jquery-enhanced');

    // 属性选择器 - 为所有带data属性的元素添加样式
    $('[data-category]').css({
        'transition': 'all 0.3s ease',
        'cursor': 'pointer'
    });

    // 伪类选择器 - 奇偶行效果
    $('.post-item:even').addClass('even-post');
    $('.post-item:odd').addClass('odd-post');

    // 层级选择器 - 文章内的图片
    $('.post-item .post-image img').addClass('lazy-load-image');

    // 表单选择器
    $(':input').addClass('form-enhanced');

    // 内容选择器 - 包含特定文字的元素
    $('.post-title:contains("JavaScript")').addClass('js-related');

    // 可见性选择器
    $('.post-item:visible').each(function(index) {
        $(this).attr('data-visible-index', index);
    });

    console.log('选择器应用完成');
}

// 2. 事件处理 - 5分
function initializeEventHandlers() {
    console.log('初始化jQuery事件处理...');

    // click事件 - 文章点赞
    $('.post-stats').on('click', '.like-btn', function(e) {
        e.preventDefault();
        const $this = $(this);
        const postId = $this.closest('.post-item').data('post-id');
        handleLikeClick($this, postId);
    });

    // mouseover/mouseout事件 - 文章悬停效果
    $('.post-item').hover(
        function() {
            $(this).addClass('hovered');
            $(this).find('.post-image img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).removeClass('hovered');
            $(this).find('.post-image img').css('transform', 'scale(1)');
        }
    );

    // change事件 - 主题选择
    $('<select id="theme-selector"><option value="light">浅色主题</option><option value="dark">深色主题</option></select>')
        .appendTo('.navbar')
        .on('change', function() {
            const theme = $(this).val();
            switchTheme(theme);
        });

    // input事件 - 实时搜索
    $('#search-input').on('input', function() {
        const query = $(this).val();
        performLiveSearch(query);
    });

    // submit事件 - 评论表单
    $(document).on('submit', '.comment-form', function(e) {
        e.preventDefault();
        submitComment($(this));
    });

    // focus/blur事件 - 输入框效果
    $('input, textarea').focus(function() {
        $(this).addClass('focused');
    }).blur(function() {
        $(this).removeClass('focused');
    });

    // double click事件 - 快速编辑
    $('.post-title').dblclick(function() {
        enableQuickEdit($(this));
    });

    // keypress事件 - 快捷键
    $(document).keypress(function(e) {
        if (e.ctrlKey && e.which === 115) { // Ctrl+S
            e.preventDefault();
            saveCurrentData();
        }
    });

    console.log('事件处理初始化完成');
}

// 3. 动画效果 - 5分
function initializeAnimations() {
    console.log('初始化jQuery动画效果...');

    // fadeIn/fadeOut效果 - 消息提示
    window.showJQueryMessage = function(message, type = 'info') {
        const $message = $(`<div class="jquery-message ${type}">${message}</div>`);
        $message.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'padding': '15px 25px',
            'background': type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db',
            'color': 'white',
            'border-radius': '5px',
            'z-index': '10000',
            'display': 'none'
        });

        $('body').append($message);
        $message.fadeIn(300).delay(3000).fadeOut(300, function() {
            $(this).remove();
        });
    };

    // slideUp/slideDown效果 - 侧边栏切换
    $('.widget h3').click(function() {
        $(this).next().slideToggle(400);
        $(this).toggleClass('collapsed');
    });

    // animate自定义动画 - 文章加载动画
    $('.post-item').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'translateY(50px)'
        });

        $(this).delay(index * 100).animate({
            'opacity': 1
        }, 600, function() {
            $(this).css('transform', 'translateY(0)');
        });
    });

    // 滚动动画效果
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();

        // 视差滚动效果
        $('.search-section').css('transform', `translateY(${scrollTop * 0.5}px)`);

        // 进度条动画
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;

        $('.reading-progress').animate({
            width: progress + '%'
        }, 50);
    });

    // 点击波纹效果
    $('.filter-btn, .read-more').on('click', function(e) {
        const $this = $(this);
        const x = e.pageX - $this.offset().left;
        const y = e.pageY - $this.offset().top;

        const $ripple = $('<div class="ripple"></div>');
        $ripple.css({
            'position': 'absolute',
            'width': '20px',
            'height': '20px',
            'background': 'rgba(255,255,255,0.6)',
            'border-radius': '50%',
            'left': x - 10,
            'top': y - 10,
            'transform': 'scale(0)',
            'pointer-events': 'none'
        });

        $this.css('position', 'relative').append($ripple);

        $ripple.animate({
            'transform': 'scale(4)',
            'opacity': 0
        }, 600, function() {
            $(this).remove();
        });
    });

    console.log('动画效果初始化完成');
}

// 4. Ajax数据交互 - 5分
function initializeAjaxFeatures() {
    console.log('初始化jQuery Ajax功能...');

    // 模拟API端点数据
    const mockAPI = {
        '/api/posts': blogPosts,
        '/api/comments': getAllComments(),
        '/api/stats': blogStats,
        '/api/tags': allTags
    };

    // 模拟Ajax请求函数
    function mockAjaxRequest(url, options = {}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (mockAPI[url]) {
                    resolve({
                        success: true,
                        data: mockAPI[url],
                        message: '数据获取成功'
                    });
                } else {
                    reject({
                        success: false,
                        error: '接口不存在',
                        message: '请求失败'
                    });
                }
            }, Math.random() * 1000 + 500); // 模拟网络延迟
        });
    }

    // Ajax加载更多文章
    window.loadMorePostsAjax = function() {
        const $loadBtn = $('#load-more-btn');
        $loadBtn.text('加载中...').prop('disabled', true);

        $.ajax({
            url: '/api/posts',
            method: 'GET',
            data: {
                page: currentPage + 1,
                limit: BLOG_CONFIG.postsPerPage
            },
            beforeSend: function() {
                showJQueryMessage('正在加载文章...', 'info');
            },
            success: function(response) {
                if (response.success) {
                    const newPosts = response.data.slice(currentPage * BLOG_CONFIG.postsPerPage);
                    appendPostsToList(newPosts);
                    currentPage++;
                    showJQueryMessage('文章加载成功！', 'success');
                }
            },
            error: function(xhr, status, error) {
                showJQueryMessage('加载失败，请重试', 'error');
                console.error('Ajax错误:', error);
            },
            complete: function() {
                $loadBtn.text('加载更多').prop('disabled', false);
            }
        });
    };

    // Ajax搜索功能
    window.performAjaxSearch = function(keyword) {
        if (!keyword.trim()) return;

        $.ajax({
            url: '/api/posts',
            method: 'GET',
            data: { search: keyword },
            dataType: 'json',
            timeout: 5000,
            beforeSend: function() {
                $('#search-btn').html('<span class="loading-spinner">🔄</span>搜索中...');
            },
            success: function(data) {
                const results = data.data.filter(post =>
                    post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    post.content.toLowerCase().includes(keyword.toLowerCase())
                );
                displaySearchResults(results, keyword);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                showJQueryMessage(`搜索失败: ${textStatus}`, 'error');
            },
            complete: function() {
                $('#search-btn').html('搜索');
            }
        });
    };

    // Ajax提交评论
    window.submitCommentAjax = function(postId, commentData) {
        return $.ajax({
            url: `/api/posts/${postId}/comments`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(commentData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        }).done(function(response) {
            showJQueryMessage('评论提交成功！', 'success');
            addCommentToList(response.data);
        }).fail(function() {
            showJQueryMessage('评论提交失败', 'error');
        });
    };

    // Ajax获取统计数据
    function loadStatsAjax() {
        $.get('/api/stats')
            .done(function(data) {
                updateStatsDisplay(data.data);
            })
            .fail(function() {
                console.error('统计数据加载失败');
            });
    }

    // 使用 $.when 处理多个Ajax请求
    function loadAllDataAjax() {
        const postsRequest = $.get('/api/posts');
        const statsRequest = $.get('/api/stats');
        const tagsRequest = $.get('/api/tags');

        $.when(postsRequest, statsRequest, tagsRequest)
            .done(function(postsData, statsData, tagsData) {
                console.log('所有数据加载完成');
                // 处理所有数据
            })
            .fail(function() {
                showJQueryMessage('数据加载失败', 'error');
            });
    }

    console.log('Ajax功能初始化完成');
}

// 5. DOM操作 - 5分
function initializeDOMOperations() {
    console.log('初始化jQuery DOM操作...');

    // append/prepend操作 - 动态添加元素
    $('.sidebar').prepend('<div class="welcome-widget"><h3>欢迎访问</h3><p>这是使用jQuery动态添加的欢迎信息！</p></div>');

    // after/before操作 - 在元素前后插入
    $('.search-section').after('<div class="jquery-notice">jQuery功能已启用</div>');

    // html/text操作 - 内容修改
    $('.footer p').first().html('&copy; 2025 技术人生博客 - <em>Powered by jQuery</em>');

    // attr/prop操作 - 属性管理
    $('.post-item img').each(function() {
        const $img = $(this);
        $img.attr('data-original-src', $img.attr('src'))
            .prop('loading', 'lazy')
            .addClass('jquery-enhanced-img');
    });

    // css操作 - 样式修改
    $('.nav-menu a').css({
        'transition': 'all 0.3s ease',
        'position': 'relative'
    });

    // addClass/removeClass/toggleClass - 类操作
    $('.post-item').on('click', function() {
        $(this).toggleClass('selected');
        $(this).siblings().removeClass('selected');
    });

    // data操作 - 数据存储
    $('.post-item').each(function(index) {
        const $post = $(this);
        $post.data('index', index)
            .data('created-time', Date.now())
            .data('view-count', Math.floor(Math.random() * 1000));
    });

    // clone操作 - 元素复制
    const $originalPost = $('.post-item').first();
    if ($originalPost.length) {
        const $clonedPost = $originalPost.clone()
            .addClass('cloned-post')
            .find('.post-title').text('这是克隆的文章标题').end()
            .appendTo('#posts-container');
    }

    // wrap/unwrap操作 - 包装元素
    $('.post-title').wrap('<div class="title-wrapper"></div>');

    // remove/empty操作 - 删除元素
    setTimeout(() => {
        $('.cloned-post').fadeOut(2000, function() {
            $(this).remove();
        });
    }, 5000);

    // 动态创建复杂DOM结构
    const $quickActions = $(`
        <div class="quick-actions">
            <h4>快速操作</h4>
            <button class="btn-small" data-action="top">返回顶部</button>
            <button class="btn-small" data-action="search">快速搜索</button>
            <button class="btn-small" data-action="random">随机文章</button>
        </div>
    `);

    $('.sidebar').append($quickActions);

    // 为快速操作绑定事件
    $('.quick-actions').on('click', '.btn-small', function() {
        const action = $(this).data('action');
        handleQuickAction(action);
    });

    console.log('DOM操作初始化完成');
}

// 6. 效果链式调用 - 5分
function initializeChainedEffects() {
    console.log('初始化jQuery链式效果...');

    // 复杂链式动画 - 文章展示效果
    $('.post-item')
        .hide()
        .each(function(index) {
            $(this)
                .delay(index * 200)
                .fadeIn(600)
                .queue(function(next) {
                    $(this).addClass('animated');
                    next();
                })
                .animate({ marginTop: '0px' }, 300)
                .queue(function(next) {
                    $(this).css('box-shadow', '0 5px 15px rgba(0,0,0,0.1)');
                    next();
                });
        });

    // 搜索框焦点链式效果
    $('#search-input')
        .focus(function() {
            $(this)
                .animate({ width: '120%' }, 300)
                .animate({ borderWidth: '3px' }, 200)
                .queue(function(next) {
                    $(this).addClass('search-focused');
                    next();
                });
        })
        .blur(function() {
            $(this)
                .animate({ width: '100%' }, 300)
                .animate({ borderWidth: '1px' }, 200)
                .queue(function(next) {
                    $(this).removeClass('search-focused');
                    next();
                });
        });

    // 通知消息链式效果
    window.showChainedNotification = function(message) {
        const $notification = $('<div class="chained-notification"></div>')
            .text(message)
            .css({
                'position': 'fixed',
                'top': '-100px',
                'left': '50%',
                'transform': 'translateX(-50%)',
                'background': '#3498db',
                'color': 'white',
                'padding': '15px 30px',
                'border-radius': '25px',
                'z-index': 10000
            })
            .appendTo('body')
            .animate({ top: '20px' }, 500)
            .delay(2000)
            .animate({ top: '-100px' }, 500)
            .queue(function(next) {
                $(this).remove();
                next();
            });
    };

    // 侧边栏小部件展开效果
    $('.widget')
        .css('opacity', 0)
        .each(function(index) {
            $(this)
                .delay(index * 300)
                .animate({ opacity: 1 }, 500)
                .animate({ 'padding-top': '25px' }, 200)
                .queue(function(next) {
                    $(this).addClass('widget-loaded');
                    next();
                });
        });

    // 标签云悬停链式效果
    $('.tag')
        .mouseenter(function() {
            $(this)
                .stop()
                .animate({ fontSize: '1.1em' }, 150)
                .animate({ marginTop: '-2px' }, 100);
        })
        .mouseleave(function() {
            $(this)
                .stop()
                .animate({ fontSize: '1em' }, 150)
                .animate({ marginTop: '0px' }, 100);
        });

    console.log('链式效果初始化完成');
}

// 7. 表单处理 - 5分
function initializeFormHandlers() {
    console.log('初始化jQuery表单处理...');

    // 创建动态评论表单
    const commentFormHTML = `
        <form class="comment-form jquery-form" style="margin-top: 20px; padding: 20px; background: var(--card-bg); border-radius: 10px;">
            <h4>发表评论</h4>
            <div class="form-group">
                <label for="comment-author">姓名 <span class="required">*</span></label>
                <input type="text" id="comment-author" name="author" required>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <label for="comment-email">邮箱</label>
                <input type="email" id="comment-email" name="email">
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <label for="comment-content">评论内容 <span class="required">*</span></label>
                <textarea id="comment-content" name="content" rows="4" required placeholder="请输入您的评论..."></textarea>
                <span class="error-message"></span>
                <div class="char-count">0/500</div>
            </div>
            <div class="form-actions">
                <button type="submit" class="submit-btn">提交评论</button>
                <button type="button" class="preview-btn">预览</button>
                <button type="reset" class="reset-btn">重置</button>
            </div>
        </form>
    `;

    $('.posts-section').append(commentFormHTML);

    // 表单验证
    $('.jquery-form').on('submit', function(e) {
        e.preventDefault();

        const $form = $(this);
        let isValid = true;

        // 清除之前的错误信息
        $form.find('.error-message').text('').hide();
        $form.find('.form-group').removeClass('has-error');

        // 验证必填字段
        $form.find('[required]').each(function() {
            const $field = $(this);
            const value = $field.val().trim();
            const $group = $field.closest('.form-group');
            const $error = $group.find('.error-message');

            if (!value) {
                $error.text('此字段为必填项').show();
                $group.addClass('has-error');
                isValid = false;
            }
        });

        // 验证邮箱格式
        const $email = $form.find('input[type="email"]');
        if ($email.val() && !isValidEmail($email.val())) {
            const $group = $email.closest('.form-group');
            $group.find('.error-message').text('请输入有效的邮箱地址').show();
            $group.addClass('has-error');
            isValid = false;
        }

        // 验证评论长度
        const $content = $form.find('textarea[name="content"]');
        if ($content.val().length > 500) {
            const $group = $content.closest('.form-group');
            $group.find('.error-message').text('评论内容不能超过500字符').show();
            $group.addClass('has-error');
            isValid = false;
        }

        if (isValid) {
            submitFormAjax($form);
        } else {
            // 滚动到第一个错误字段
            const $firstError = $form.find('.has-error').first();
            $('html, body').animate({
                scrollTop: $firstError.offset().top - 100
            }, 500);
        }
    });

    // 实时字符计数
    $('#comment-content').on('input', function() {
        const length = $(this).val().length;
        const $counter = $(this).siblings('.char-count');
        $counter.text(`${length}/500`);

        if (length > 450) {
            $counter.css('color', '#e74c3c');
        } else if (length > 400) {
            $counter.css('color', '#f39c12');
        } else {
            $counter.css('color', '#7f8c8d');
        }
    });

    // 表单字段焦点效果
    $('.jquery-form input, .jquery-form textarea').focus(function() {
        $(this).closest('.form-group').addClass('focused');
    }).blur(function() {
        $(this).closest('.form-group').removeClass('focused');
    });

    // 预览功能
    $('.preview-btn').click(function() {
        const content = $('#comment-content').val();
        if (content.trim()) {
            showCommentPreview(content);
        } else {
            showJQueryMessage('请先输入评论内容', 'error');
        }
    });

    // 重置表单
    $('.reset-btn').click(function() {
        const $form = $(this).closest('form');
        $form[0].reset();
        $form.find('.error-message').hide();
        $form.find('.form-group').removeClass('has-error focused');
        $('#comment-content').trigger('input'); // 重置字符计数
    });

    // 表单序列化和数据处理
    function submitFormAjax($form) {
        const formData = $form.serialize();
        const formObject = $form.serializeArray().reduce((obj, item) => {
            obj[item.name] = item.value;
            return obj;
        }, {});

        console.log('表单数据:', formObject);

        // 模拟Ajax提交
        $form.find('.submit-btn').text('提交中...').prop('disabled', true);

        setTimeout(() => {
            showJQueryMessage('评论提交成功！', 'success');
            $form[0].reset();
            $form.find('.submit-btn').text('提交评论').prop('disabled', false);
            $('#comment-content').trigger('input');
        }, 2000);
    }

    console.log('表单处理初始化完成');
}

// 8. 工具函数应用 - 5分
function initializeUtilityFunctions() {
    console.log('初始化jQuery工具函数...');

    // $.each 遍历处理
    $.each(blogPosts, function(index, post) {
        // 为每篇文章添加jQuery数据
        $(`[data-post-id="${post.id}"]`).data('post-info', {
            index: index,
            wordCount: post.content.length,
            estimatedReadTime: Math.ceil(post.content.length / 200)
        });
    });

    // $.map 数据转换
    const postTitles = $.map(blogPosts, function(post, index) {
        return {
            id: post.id,
            title: post.title,
            index: index
        };
    });
    console.log('文章标题映射:', postTitles);

    // $.grep 数据过滤
    const techPosts = $.grep(blogPosts, function(post) {
        return post.category === '技术';
    });
    console.log('技术类文章:', techPosts.length, '篇');

    // $.extend 对象合并
    const defaultSettings = {
        theme: 'light',
        postsPerPage: 5,
        showComments: true,
        enableAnimations: true
    };

    const userSettings = {
        theme: 'dark',
        postsPerPage: 10
    };

    const finalSettings = $.extend({}, defaultSettings, userSettings);
    console.log('合并后的设置:', finalSettings);

    // $.inArray 数组查找
    const categories = ['技术', '生活', '思考', '分享'];
    $('.filter-btn').each(function() {
        const category = $(this).data('category');
        const index = $.inArray(category, categories);
        $(this).data('category-index', index);
    });

    // $.isArray, $.isFunction, $.isPlainObject 类型检测
    function processData(data) {
        if ($.isArray(data)) {
            console.log('处理数组数据:', data.length, '项');
        } else if ($.isPlainObject(data)) {
            console.log('处理对象数据:', Object.keys(data).length, '个属性');
        } else if ($.isFunction(data)) {
            console.log('执行函数');
            data();
        }
    }

    // $.makeArray 转换为数组
    const nodeList = document.querySelectorAll('.post-item');
    const postArray = $.makeArray(nodeList);
    console.log('转换后的数组长度:', postArray.length);

    // $.trim 字符串处理
    $('#search-input').on('input', function() {
        const trimmedValue = $.trim($(this).val());
        $(this).data('trimmed-value', trimmedValue);
    });

    // $.parseJSON 和 JSON 处理
    const settingsJSON = '{"theme":"dark","language":"zh-CN"}';
    try {
        const settings = $.parseJSON(settingsJSON);
        console.log('解析的设置:', settings);
    } catch (e) {
        console.error('JSON解析失败:', e);
    }

    // 自定义工具函数
    $.extend({
        // 格式化数字
        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        // 获取随机文章
        getRandomPost: function() {
            const randomIndex = Math.floor(Math.random() * blogPosts.length);
            return blogPosts[randomIndex];
        },

        // 计算相对时间
        getRelativeTime: function(date) {
            const now = new Date();
            const diff = now - new Date(date);
            const minutes = Math.floor(diff / 60000);

            if (minutes < 60) return minutes + '分钟前';
            if (minutes < 1440) return Math.floor(minutes / 60) + '小时前';
            return Math.floor(minutes / 1440) + '天前';
        }
    });

    // 使用自定义工具函数
    $('.post-stats').each(function() {
        const $stats = $(this);
        const views = parseInt($stats.find('.view-count').text()) || 0;
        $stats.find('.view-count').text($.formatNumber(views));
    });

    console.log('工具函数初始化完成');
}

// ========== 辅助函数 ==========

function handleLikeClick($btn, postId) {
    const post = blogPosts.find(p => p.id == postId);
    if (post) {
        post.likes++;
        $btn.html(`❤ ${post.likes}`);
        $btn.addClass('liked');

        // 心形动画效果
        $btn.animate({ fontSize: '1.2em' }, 150)
            .animate({ fontSize: '1em' }, 150);

        showJQueryMessage('已点赞！', 'success');
    }
}

function performLiveSearch(query) {
    if (query.length < 2) return;

    const results = blogPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );

    // 显示搜索建议
    showSearchSuggestions(results, query);
}

function showSearchSuggestions(results, query) {
    const $suggestions = $('#search-suggestions');
    if ($suggestions.length === 0) {
        $('<div id="search-suggestions" class="search-suggestions"></div>')
            .insertAfter('#search-input');
    }

    if (results.length > 0) {
        const suggestionHTML = results.slice(0, 5).map(post =>
            `<div class="suggestion-item" data-post-id="${post.id}">
                <strong>${post.title}</strong>
                <small>${post.category}</small>
            </div>`
        ).join('');

        $('#search-suggestions').html(suggestionHTML).show();

        // 点击建议项
        $('.suggestion-item').click(function() {
            const postId = $(this).data('post-id');
            window.location.href = `article.html?id=${postId}`;
        });
    } else {
        $('#search-suggestions').hide();
    }
}

function switchTheme(theme) {
    $('html').removeClass('light dark').addClass(theme);
    localStorage.setItem('theme', theme);
    showJQueryMessage(`已切换到${theme === 'light' ? '浅色' : '深色'}主题`, 'success');
}

function enableQuickEdit($title) {
    const originalText = $title.text();
    const $input = $('<input type="text" class="quick-edit-input">')
        .val(originalText)
        .css({
            'width': '100%',
            'font-size': 'inherit',
            'font-weight': 'inherit',
            'border': '2px solid #3498db',
            'border-radius': '3px',
            'padding': '5px'
        });

    $title.hide().after($input);
    $input.focus().select();

    $input.blur(function() {
        const newText = $(this).val() || originalText;
        $title.text(newText).show();
        $(this).remove();
    }).keypress(function(e) {
        if (e.which === 13) { // Enter键
            $(this).blur();
        }
    });
}

function handleQuickAction(action) {
    switch (action) {
        case 'top':
            $('html, body').animate({ scrollTop: 0 }, 800);
            break;
        case 'search':
            $('#search-input').focus();
            break;
        case 'random':
            const randomPost = $.getRandomPost();
            window.location.href = `article.html?id=${randomPost.id}`;
            break;
    }
}

function submitComment($form) {
    const commentData = {
        author: $form.find('[name="author"]').val(),
        email: $form.find('[name="email"]').val(),
        content: $form.find('[name="content"]').val(),
        timestamp: new Date().toISOString()
    };

    console.log('提交评论:', commentData);
    showJQueryMessage('评论提交成功！', 'success');
    $form[0].reset();
}

function saveCurrentData() {
    const data = {
        posts: blogPosts,
        settings: blogManager.userPreferences,
        timestamp: Date.now()
    };
    localStorage.setItem('blogData', JSON.stringify(data));
    showJQueryMessage('数据已保存', 'success');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showCommentPreview(content) {
    const $preview = $('<div class="comment-preview"></div>')
        .html(`
            <h4>评论预览</h4>
            <div class="preview-content">${content}</div>
            <button class="close-preview">关闭预览</button>
        `)
        .css({
            'position': 'fixed',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)',
            'background': 'white',
            'padding': '20px',
            'border-radius': '10px',
            'box-shadow': '0 10px 30px rgba(0,0,0,0.3)',
            'z-index': 10000,
            'max-width': '500px',
            'width': '90%'
        });

    $('body').append($preview);

    $preview.find('.close-preview').click(function() {
        $preview.remove();
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
    return allComments;
}

function appendPostsToList(posts) {
    posts.forEach((post, index) => {
        const $postElement = $(createPostElement(post, index));
        $('#posts-container').append($postElement);
    });
}

function displaySearchResults(results, keyword) {
    filteredPosts = results;
    currentPage = 1;
    const pageArticles = results.slice(0, BLOG_CONFIG.postsPerPage);
    renderPostList(pageArticles);

    showJQueryMessage(`找到 ${results.length} 篇包含"${keyword}"的文章`, 'success');
}

function addCommentToList(comment) {
    // 将新评论添加到评论列表
    const $commentElement = $(`
        <div class="comment-item new-comment">
            <div class="comment-author">${comment.author}</div>
            <div class="comment-content">${comment.content}</div>
            <div class="comment-date">${new Date().toLocaleDateString()}</div>
        </div>
    `);

    $('.comments-list').prepend($commentElement);
    $commentElement.hide().slideDown(300);
}

function updateStatsDisplay(stats) {
    $.each(stats, function(key, value) {
        $(`#${key}`).text($.formatNumber(value));
    });
}

console.log('jQuery功能模块加载完成');