// 核心应用逻辑

// 工具函数：获取URL参数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 埋点统计函数 (Fake Door Testing)
function trackEvent(eventName, data) {
    console.log(`[Analytics] Event: ${eventName}`, data);
    // 实际项目中这里会发送请求到后端
    showToast(`📊 埋点已记录: ${eventName}`);
}

// 简单的 Toast 提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50 animate-fade-in-up';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// 首页逻辑：渲染瀑布流 (小红书风格 - 错落布局 + 营销文案)
function initHome() {
    const container = document.getElementById('recipe-container');
    if (!container) return;

    // 营销文案库
    const marketingTags = [
        "😭 巨好吃！", "🔥 减脂神器", "✅ 亲测掉秤", "绝绝子✨", "0难度", "低卡饱腹"
    ];

    window.recipeData.forEach((recipe, index) => {
        const card = document.createElement('a');
        card.href = `detail.html?id=${recipe.id}`;
        // 使用 inline-block 配合 columns 实现瀑布流，break-inside-avoid 防止切断
        card.className = 'block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group break-inside-avoid mb-2';
        
        // 随机高度比例 (模拟真实瀑布流)
        // 偶数项更长一点，或者随机
        const aspectClass = index % 3 === 0 ? 'aspect-[3/5]' : 'aspect-[3/4]';
        
        // 随机营销文案
        const tagText = marketingTags[index % marketingTags.length];

        // 计算卡路里
        const stdCal = recipe.nutrition.standard.calories;
        const healthyCal = recipe.nutrition.healthy.calories;

        card.innerHTML = `
            <!-- 图片容器 -->
            <div class="relative w-full ${aspectClass} bg-gray-100 overflow-hidden">
                <img src="${recipe.image}" alt="${recipe.title}" class="absolute h-full w-full object-cover group-hover:scale-105 transition-transform duration-700">
                
                <!-- 多图标记 (右上角) -->
                <div class="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                    <i class="far fa-clone"></i>
                    <span>${Math.floor(Math.random() * 4) + 2}</span>
                </div>

                <!-- 核心对比数据 (左上角) -->
                <div class="absolute top-2 left-2 bg-[#D92E20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                     ↓${Math.round((stdCal - healthyCal) / stdCal * 100)}% 热量
                </div>

                <!-- 吸睛文案 (图片底部覆盖) -->
                <div class="absolute bottom-2 left-2 right-2">
                    <div class="inline-block bg-yellow-300 text-black text-xs font-black px-2 py-1 rounded-md shadow-md transform -rotate-1 origin-bottom-left">
                        ${tagText}
                    </div>
                    <div class="mt-1 flex items-center gap-1">
                        <span class="text-white text-[10px] bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
                            <i class="fas fa-fire text-orange-400 mr-0.5"></i>${healthyCal}卡
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="p-2.5 relative">
                <!-- 标题 -->
                <h3 class="font-bold text-gray-800 text-[14px] leading-snug mb-2 line-clamp-2">${recipe.title} <span class="text-gray-400 font-normal text-xs">| 改良版</span></h3>
                
                <!-- 用户信息 -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 min-w-0">
                        <div class="w-4 h-4 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                             <img src="https://api.dicebear.com/7.x/notionists/svg?seed=${recipe.id}" alt="user" class="w-full h-full object-cover">
                        </div>
                        <span class="text-[10px] text-gray-400 truncate">湘味大厨</span>
                    </div>
                    
                    <div class="flex items-center gap-1 text-gray-300 flex-shrink-0">
                        <i class="far fa-heart text-xs hover:text-red-400 transition"></i>
                        <span class="text-[10px] text-gray-400 font-medium">${Math.floor(Math.random() * 900) + 100}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 详情页逻辑：处理数据展示与模式切换
function initDetail() {
    const recipeId = getQueryParam('id');
    const recipe = window.recipeData.find(r => r.id === recipeId);
    
    if (!recipe) {
        document.body.innerHTML = '<div class="p-10 text-center">未找到菜谱</div>';
        return;
    }

    // 绑定基础信息
    document.getElementById('recipe-title').innerText = recipe.title;
    document.getElementById('recipe-image').src = recipe.image;
    document.getElementById('recipe-desc').innerText = recipe.desc;

    // 状态：是否开启健康模式
    let isHealthyMode = false;

    // 渲染函数
    function render() {
        const modeKey = isHealthyMode ? 'healthy' : 'standard';
        const nutrition = recipe.nutrition[modeKey];
        
        // 1. 更新仪表盘
        updateBar('fat-bar', nutrition.fat, 50, isHealthyMode); // 假设50g是高脂阈值
        updateBar('protein-bar', nutrition.protein, 40, true); // 蛋白质越高越好
        updateBar('carb-bar', nutrition.carb, 50, false);
        
        document.getElementById('calories-val').innerText = `${nutrition.calories} kcal`;
        document.getElementById('purine-badge').className = 
            `px-2 py-1 rounded text-xs font-bold ${nutrition.purine === 'high' ? 'bg-red-100 text-red-600' : (nutrition.purine === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600')}`;
        document.getElementById('purine-badge').innerText = 
            nutrition.purine === 'high' ? '⚠️ 高嘌呤' : (nutrition.purine === 'medium' ? '😐 中嘌呤' : '🟢 低嘌呤');

        // 2. 更新食材列表
        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';
        
        recipe.ingredients.forEach(ing => {
            // 过滤显示：显示 'common' 和 当前模式特有的食材
            if (ing.type === 'common' || ing.type === (isHealthyMode ? 'healthy_only' : 'standard_only')) {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center py-2 border-b border-gray-100 last:border-0';
                li.innerHTML = `
                    <span class="text-gray-700">
                        ${ing.name}
                        ${ing.note ? `<span class="text-xs text-green-600 ml-1">(${ing.note})</span>` : ''}
                    </span>
                    <span class="font-medium text-gray-900">${ing.amount}${ing.unit}</span>
                `;
                ingredientsList.appendChild(li);
            }
        });

        // 3. 更新步骤 (这里简单处理，实际可能步骤也会变)
        const stepsList = document.getElementById('steps-list');
        stepsList.innerHTML = recipe.steps.map((step, idx) => 
            `<li class="mb-3 text-sm text-gray-700 leading-relaxed"><span class="font-bold text-red-500 mr-1">${idx + 1}.</span> ${step}</li>`
        ).join('');
        
        // 4. 更新UI状态
        const modeToggle = document.getElementById('mode-toggle');
        const modeLabel = document.getElementById('mode-label');
        if (isHealthyMode) {
            modeToggle.classList.add('bg-green-500', 'justify-end');
            modeToggle.classList.remove('bg-gray-300', 'justify-start');
            modeLabel.innerText = "健康改良版 (已生效)";
            modeLabel.classList.add('text-green-600');
        } else {
            modeToggle.classList.remove('bg-green-500', 'justify-end');
            modeToggle.classList.add('bg-gray-300', 'justify-start');
            modeLabel.innerText = "传统正宗版";
            modeLabel.classList.remove('text-green-600');
        }
    }

    // 辅助：更新进度条
    function updateBar(id, value, max, isGood) {
        const bar = document.getElementById(id);
        const percent = Math.min((value / max) * 100, 100);
        bar.style.width = `${percent}%`;
        
        // 颜色逻辑：如果是坏指标(脂肪)，越高越红；如果是好指标(蛋白)，越高越绿
        if (isGood) {
            bar.className = 'h-full rounded-full bg-green-500 transition-all duration-500';
        } else {
            bar.className = `h-full rounded-full transition-all duration-500 ${percent > 80 ? 'bg-red-500' : (percent > 40 ? 'bg-yellow-400' : 'bg-green-400')}`;
        }
        // 更新数值显示
        document.getElementById(id + '-val').innerText = `${value}g`;
    }

    // 绑定事件
    document.getElementById('mode-toggle-wrapper').addEventListener('click', () => {
        isHealthyMode = !isHealthyMode;
        render();
        trackEvent('toggle_mode', { mode: isHealthyMode ? 'healthy' : 'standard', recipe: recipe.title });
    });

    document.getElementById('btn-buy').addEventListener('click', () => {
        trackEvent('click_buy', { recipe: recipe.title });
        alert('🚧 [商业验证埋点] \n感谢您的兴趣！\n\n我们的“低脂食材包”供应链正在紧急搭建中...\n(实际产品这里会跳转到电商页)');
    });

    document.getElementById('btn-live').addEventListener('click', () => {
        trackEvent('click_live', { recipe: recipe.title });
        alert('🚧 [商业验证埋点] \n感谢您的兴趣！\n\n大厨直播课即将上线，请关注通知。\n(实际产品这里会跳转到直播预约)');
    });

    // 初始化渲染
    render();
}

// 页面加载入口
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('page-home')) {
        initHome();
    } else if (document.getElementById('page-detail')) {
        initDetail();
    }
});
