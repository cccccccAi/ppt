// 核心食谱数据 (Mock Data)
const recipes = [
    {
        id: "recipe_001",
        title: "农家小炒肉",
        image: "https://images.unsplash.com/photo-1663047242686-3532395345e5?q=80&w=600&auto=format&fit=crop",
        tags: ["热门", "可改良"],
        desc: "湘菜经典，香辣下饭，但传统做法油多肉肥。",
        nutrition: {
            standard: { fat: 45, protein: 18, carb: 5, purine: "medium", calories: 480 },
            healthy: { fat: 15, protein: 25, carb: 5, purine: "low", calories: 280 }
        },
        ingredients: [
            { name: "五花肉", amount: 200, unit: "g", type: "standard_only" },
            { name: "里脊肉", amount: 180, unit: "g", type: "healthy_only", note: "高蛋白低脂" },
            { name: "青椒/杭椒", amount: 200, unit: "g", type: "common" },
            { name: "豆豉", amount: 10, unit: "g", type: "common" },
            { name: "蒜瓣", amount: 15, unit: "g", type: "common" },
            { name: "菜籽油", amount: 50, unit: "ml", type: "standard_only" },
            { name: "橄榄油/喷雾油", amount: 15, unit: "ml", type: "healthy_only", note: "减油70%" }
        ],
        steps: [
            "肉切薄片，用少许生抽抓匀。",
            "青椒斜切，干锅煸炒至虎皮状盛出。",
            "锅中放油，煸炒肉片至变色。",
            "加入豆豉蒜末爆香，倒入青椒翻炒。",
            "加入盐、酱油调味，大火快炒出锅。"
        ]
    },
    {
        id: "recipe_002",
        title: "剁椒鱼头",
        image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=600&auto=format&fit=crop",
        tags: ["高蛋白", "低嘌呤(改良)"],
        desc: "鲜辣适口，鱼头胶质丰富，需注意盐分。",
        nutrition: {
            standard: { fat: 20, protein: 30, carb: 8, purine: "high", calories: 350 },
            healthy: { fat: 12, protein: 32, carb: 8, purine: "medium", calories: 280 }
        },
        ingredients: [
            { name: "雄鱼头", amount: 700, unit: "g", type: "standard_only" },
            { name: "草鱼头/瘦身鱼", amount: 600, unit: "g", type: "healthy_only", note: "选中小个头" },
            { name: "剁辣椒", amount: 100, unit: "g", type: "standard_only" },
            { name: "自制低盐剁椒", amount: 80, unit: "g", type: "healthy_only", note: "减盐30%" },
            { name: "姜葱蒜", amount: 30, unit: "g", type: "common" },
            { name: "蒸鱼豉油", amount: 30, unit: "ml", type: "common" }
        ],
        steps: [
            "鱼头处理干净，抹盐和料酒腌制10分钟。",
            "盘底铺姜葱，放上鱼头。",
            "铺上厚厚的剁椒，水开后上锅蒸12分钟。",
            "出锅淋上蒸鱼豉油，撒葱花。",
            "浇上热油激发香气（健康版可省去浇油步骤）。"
        ]
    },
    {
        id: "recipe_003",
        title: "永州血鸭",
        image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=600&auto=format&fit=crop",
        tags: ["特色", "需控油"],
        desc: "色泽红润，鸭血裹满鸭肉，风味独特。",
        nutrition: {
            standard: { fat: 40, protein: 25, carb: 2, purine: "high", calories: 450 },
            healthy: { fat: 18, protein: 28, carb: 2, purine: "medium", calories: 300 }
        },
        ingredients: [
            { name: "嫩鸭", amount: 500, unit: "g", type: "standard_only" },
            { name: "去皮鸭腿肉", amount: 400, unit: "g", type: "healthy_only", note: "去皮减脂" },
            { name: "鸭血", amount: 100, unit: "ml", type: "common" },
            { name: "青红椒", amount: 50, unit: "g", type: "common" },
            { name: "毛豆米", amount: 50, unit: "g", type: "common" }
        ],
        steps: [
            "鸭肉切小块，大火爆炒干水分。",
            "加入大量油继续煸炒至焦香。",
            "放入辣椒、姜蒜焖煮。",
            "出锅前倒入鸭血快速翻炒，使每一块肉都裹上鸭血。",
            "收汁出锅。"
        ]
    },
    {
        id: "recipe_004",
        title: "手撕包菜",
        image: "https://images.unsplash.com/photo-1625938145744-e380515242a7?q=80&w=600&auto=format&fit=crop",
        tags: ["高纤维", "素菜"],
        desc: "脆嫩爽口，简单易做，但饭店做法往往重油。",
        nutrition: {
            standard: { fat: 25, protein: 3, carb: 10, purine: "low", calories: 280 },
            healthy: { fat: 8, protein: 3, carb: 10, purine: "low", calories: 120 }
        },
        ingredients: [
            { name: "包菜", amount: 400, unit: "g", type: "common" },
            { name: "五花肉片", amount: 50, unit: "g", type: "standard_only" },
            { name: "猪油", amount: 30, unit: "g", type: "standard_only" },
            { name: "植物油", amount: 10, unit: "g", type: "healthy_only", note: "少油清炒" },
            { name: "干辣椒", amount: 5, unit: "g", type: "common" },
            { name: "陈醋", amount: 15, unit: "ml", type: "common" }
        ],
        steps: [
            "包菜洗净手撕成片。",
            "五花肉煸出油脂（健康版省略）。",
            "爆香干辣椒蒜片。",
            "下包菜大火快炒至断生。",
            "沿锅边淋入陈醋，加盐调味出锅。"
        ]
    }
];

// 导出数据供其他模块使用
window.recipeData = recipes;
