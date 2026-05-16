// 二十四节气健康养生数据
// 内容摘自《药师法门健康养生随许法》

// Solar term dates: each year has 24 [month, day] pairs
// Order: 小寒, 大寒, 立春, 雨水, 惊蛰, 春分, 清明, 谷雨,
//        立夏, 小满, 芒种, 夏至, 小暑, 大暑,
//        立秋, 处暑, 白露, 秋分, 寒露, 霜降,
//        立冬, 小雪, 大雪, 冬至
export const JIEQI_DATES = {
  2024: [[1,6],[1,20],[2,4],[2,19],[3,5],[3,20],[4,4],[4,19],[5,5],[5,20],[6,5],[6,21],[7,6],[7,22],[8,7],[8,22],[9,7],[9,22],[10,8],[10,23],[11,7],[11,22],[12,6],[12,21]],
  2025: [[1,5],[1,20],[2,3],[2,18],[3,5],[3,20],[4,4],[4,20],[5,5],[5,21],[6,5],[6,21],[7,7],[7,22],[8,7],[8,22],[9,7],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,21]],
  2026: [[1,5],[1,20],[2,4],[2,18],[3,5],[3,20],[4,5],[4,20],[5,5],[5,21],[6,5],[6,21],[7,7],[7,22],[8,7],[8,23],[9,7],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,22]],
  2027: [[1,5],[1,20],[2,4],[2,19],[3,6],[3,21],[4,5],[4,20],[5,6],[5,21],[6,6],[6,22],[7,7],[7,23],[8,7],[8,23],[9,8],[9,23],[10,8],[10,24],[11,7],[11,22],[12,7],[12,22]],
  2028: [[1,6],[1,21],[2,4],[2,19],[3,5],[3,20],[4,4],[4,19],[5,5],[5,20],[6,5],[6,21],[7,7],[7,22],[8,7],[8,22],[9,7],[9,22],[10,8],[10,23],[11,7],[11,22],[12,6],[12,21]],
  2029: [[1,5],[1,20],[2,3],[2,18],[3,5],[3,20],[4,4],[4,20],[5,5],[5,21],[6,5],[6,21],[7,7],[7,22],[8,7],[8,23],[9,7],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,21]],
  2030: [[1,5],[1,20],[2,4],[2,19],[3,6],[3,21],[4,5],[4,20],[5,5],[5,21],[6,6],[6,21],[7,7],[7,23],[8,7],[8,23],[9,8],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,22]],
};

export const JIEQI_DATA = [
  // 0 - 小寒
  {
    index: 0,
    name: { zh: '小寒', en: 'Minor Cold' },
    season: 'winter',
    advice: {
      zh: '小寒这个节气里面我们适合于吃核桃仁饼，用核桃仁五十克打碎，然后放面粉二百五十克，放一点白糖混合在一起，加水搅匀以后烙薄饼吃就可以了。核桃你敲出来像人的大脑组织一样，所以它能够健脑的，供养里面供养核桃表示是肝脑涂地，头目脑髓都能够供养的意思。',
      en: 'During Minor Cold, eat walnut pancakes. Crush 50g walnuts, mix with 250g flour and a little sugar, add water, mix well and make thin pancakes. Walnuts resemble the brain and are nourishing for the brain.'
    },
    diet: {
      zh: '用核桃仁五十克打碎，然后放面粉二百五十克，放一点白糖混合在一起，加水搅匀以后烙薄饼吃就可以了。',
      en: 'Crush 50g walnuts, mix with 250g flour and a little sugar, add water, mix and make thin pancakes.'
    },
    herbalRecipe: {
      zh: '核桃仁五十克，面粉二百五十克，白糖适量。',
      en: 'Walnuts 50g, flour 250g, sugar to taste.'
    },
    exercise: {
      zh: '冬季里面适合于让阳气归根，让阳气收藏于肾，不要剧烈运动，精神内守。',
      en: 'In winter, let yang qi return to its root and be stored in the kidneys. Avoid vigorous exercise and maintain inner tranquility.'
    },
    avoidance: {
      zh: '小雪、大雪、冬至、小寒要防寒邪，我们人在这些时间就要用汤水来滋养。',
      en: 'Protect against cold pathogen during Minor Cold. Use warm soups for nourishment.'
    }
  },

  // 1 - 大寒
  {
    index: 1,
    name: { zh: '大寒', en: 'Major Cold' },
    season: 'winter',
    advice: {
      zh: '大寒是一年的最后一个节气，适合于强肝壮胆，就能够帮助阳气升发，防风寒。汤水方面可以喝黄花合欢汤，用黄花菜二十五克，合欢花十克，加水煮半个小时，睡前一个小时的时候放一点蜂蜜来喝，就能够治疗健忘、治疗失眠，如果心中很郁闷，可以疏解心中的郁闷之气。当然在大寒的时候也可以吃八宝饭，用糯米五百克，莲子二百五十克，大枣二百五十克，薏米和蜜冬瓜条各一百五十克，蜜樱桃八十克，龙眼肉八十克，瓜子仁二十克，白糖适量，用这些来做八宝饭，一家这个量应该就够了。',
      en: 'Major Cold is the last solar term of the year, suitable for strengthening liver and gallbladder to help yang qi rise and prevent wind-cold. Drink daylily-albizzia soup or make eight-treasure rice.'
    },
    diet: {
      zh: '可以吃八宝饭，用糯米五百克，莲子二百五十克，大枣二百五十克，薏米和蜜冬瓜条各一百五十克，蜜樱桃八十克，龙眼肉八十克，瓜子仁二十克，白糖适量。',
      en: 'Eight-treasure rice: glutinous rice 500g, lotus seeds 250g, jujube dates 250g, Job\'s tears and candied winter melon strips 150g each, candied cherries 80g, longan flesh 80g, melon seeds 20g, sugar to taste.'
    },
    herbalRecipe: {
      zh: '黄花合欢汤：黄花菜二十五克，合欢花十克，加水煮半个小时，睡前一个小时的时候放一点蜂蜜来喝，就能够治疗健忘、治疗失眠，如果心中很郁闷，可以疏解心中的郁闷之气。黄花菜，古语里面叫做萱草，白居易有一句诗叫做"萱草解忘忧"，所以萱草——黄花菜是能够消除心中的郁闷之气的。',
      en: 'Daylily-albizzia soup: daylily 25g, albizzia flowers 10g, boil in water for 30 minutes, add honey 1 hour before sleep. Treats forgetfulness and insomnia, relieves melancholy.'
    },
    exercise: {
      zh: '冬季里面适合于让阳气归根，让阳气收藏于肾，不要剧烈运动，精神内守。',
      en: 'In winter, let yang qi return to its root, avoid vigorous exercise, maintain inner tranquility.'
    },
    avoidance: {
      zh: '大寒、立春、雨水、惊蛰这四个节气要避风邪，风邪如果跑到体表就容易引起皮肤瘙痒、荨麻疹；如果跑到关节里面去就会引起关节痛；如果跑到筋脉里面去就会引起抽搐。',
      en: 'Avoid wind pathogen during Major Cold. Wind pathogen on skin causes itching and hives; in joints causes joint pain; in tendons causes convulsions.'
    }
  },

  // 2 - 立春
  {
    index: 2,
    name: { zh: '立春', en: 'Start of Spring' },
    season: 'spring',
    advice: {
      zh: '立春的时候是要壮胆，胆气足则百病不粘，所以立春这个节气里面多敲胆经是特别好的，《黄帝内经·灵枢》上面就有说，特别是左侧的胆经在立春这个节气里面阳气是最旺盛的。药师法门就讲了眼耳鼻舌身意六根解脱法门。身根触，身根就是接触，在立春这个节气里面怎么用身根接触来养生呢？当然就是泡脚，泡脚是最简单的了，立春的时候泡脚。',
      en: 'At Start of Spring, strengthen the gallbladder. Tapping the gallbladder meridian is especially beneficial. The simplest health practice is foot soaking.'
    },
    diet: {
      zh: '立春还是比较冷的，所以应该准备一点热水中途加温，保持这个水温。',
      en: 'Since Start of Spring is still cold, prepare hot water to maintain temperature during foot soaking.'
    },
    herbalRecipe: {
      zh: '治疗冠心病泡脚方：川芎三十克，香附十五克，丹参五十克，然后檀香十克，用这四种熬一点水，煎好以后泡的时候就放五克冰片溶到药液里面去，趁热气先熏一下，然后再泡脚二十到三十分钟，每一天早晚泡两次的话，对于治疗冠心病有很好的帮助。失眠、心肾不交泡脚方：活磁石五十克，酸枣仁和柏子仁各三十克，用当归二十克和夜交藤十五克，这五种药煎水以后，睡前半个小时泡脚，就能够凝神安心，能够提高睡眠质量。高血压泡脚方：用钩藤二十克，切碎以后放少量的冰片，用布包好，把布包扎紧，放在盆子里面用开水泡一下，温度适合的时候，早上起来和晚上睡觉以前都泡二十分钟。',
      en: 'Coronary heart disease foot soak: Ligusticum 30g, Cyperus 15g, Salvia 50g, Sandalwood 10g, boil then add 5g borneol. Insomnia foot soak: magnetite 50g, Ziziphus and Platycladus seeds 30g each, Angelica 20g, Caulis Polygoni 15g. Hypertension foot soak: Uncaria 20g with borneol.'
    },
    exercise: {
      zh: '立春这个节气里面多敲胆经是特别好的，特别是左侧的胆经在立春这个节气里面阳气是最旺盛的。',
      en: 'Tapping the gallbladder meridian is especially good during Start of Spring, particularly the left side where yang qi is most vigorous.'
    },
    avoidance: {
      zh: '大寒、立春、雨水、惊蛰这四个节气要避风邪。',
      en: 'Avoid wind pathogen during these four solar terms: Major Cold, Start of Spring, Rain Water, Awakening of Insects.'
    }
  },

  // 3 - 雨水
  {
    index: 3,
    name: { zh: '雨水', en: 'Rain Water' },
    season: 'spring',
    advice: {
      zh: '雨水标志着一年降雨的开始。我们看表上跟寅时相对的这一行下来就是立春、雨水，底下的十二消息卦就是地天泰卦，我们说三阳开泰，因为底下是三个阳卦、三个阳爻。雨水是标志着一年降雨的开始，借助大地向上升腾的阳气，花草树木也都渐渐地抽出新的苗芽，所以这个时候我们用六根解脱门的话是可以用舌根，舌根当然是尝，用食疗，食疗可以用枸杞子、黄芪，然后菊花泡水喝。雨水这个节气里面我们应该要多锻炼肺经，因为容易有倒春寒。',
      en: 'Rain Water marks the start of annual rainfall. Use tongue/taste for healing — herbal food therapy with wolfberry, astragalus and chrysanthemum tea. Exercise the lung meridian as late-spring cold snaps are common.'
    },
    diet: {
      zh: '食疗可以用枸杞子、黄芪，然后菊花泡水喝。',
      en: 'Herbal food therapy: drink tea made from wolfberry, astragalus and chrysanthemum.'
    },
    herbalRecipe: {
      zh: '食疗可以用枸杞子、黄芪，然后菊花泡水喝。雨水这个节气里面我们应该要多锻炼肺经，因为容易有倒春寒。',
      en: 'Food therapy: wolfberry, astragalus, and chrysanthemum steeped in water. Exercise the lung meridian during Rain Water to guard against late spring cold.'
    },
    exercise: {
      zh: '雨水这个节气里面我们应该要多锻炼肺经，因为容易有倒春寒。',
      en: 'Exercise the lung meridian frequently during Rain Water, as late-spring cold snaps are common.'
    },
    avoidance: {
      zh: '大寒、立春、雨水、惊蛰这四个节气要避风邪，风邪如果跑到体表就容易引起皮肤瘙痒、荨麻疹；如果跑到关节里面去就会引起关节痛；如果跑到筋脉里面去就会引起抽搐。',
      en: 'Avoid wind pathogen. Wind on skin causes itching/hives; in joints causes pain; in tendons causes convulsions.'
    }
  },

  // 4 - 惊蛰
  {
    index: 4,
    name: { zh: '惊蛰', en: 'Awakening of Insects' },
    season: 'spring',
    advice: {
      zh: '惊蛰的时候适合于清一下大肠，大肠清干净了，我们的气血升发就会有一个好的环境。有便秘的人注意看一下自己的食指，食指上面的青筋会暴出来，因为你的健康一定是看手上的青筋可以看得到，健康的人手背上面是看不到青筋的，青筋是隐藏在里面的。如果身体不好的时候，血液里面的毒素就沉积太多，青筋就暴露出来，浮在手上来了。',
      en: 'Awakening of Insects is suitable for clearing the large intestine. A clean large intestine provides a good environment for qi and blood to rise. Check the index finger for protruding veins which indicate intestinal issues.'
    },
    diet: {
      zh: '惊蛰这个节气里面的食疗方，可以用柏子仁十克，核桃仁二十五克，白芝麻二十五克，这三种打成粉以后，再放一点大米煮粥，将要熟的时候再放一点蜂蜜进去，这样就能够润肠，能够治便秘，能够改善睡眠，能够帮助清理大肠。',
      en: 'Food therapy: Platycladus seed 10g, walnut 25g, white sesame 25g — grind to powder, cook porridge with rice, add honey when almost done. Moistens intestines, treats constipation, improves sleep, clears the large intestine.'
    },
    herbalRecipe: {
      zh: '柏子仁十克，核桃仁二十五克，白芝麻二十五克，这三种打成粉以后，再放一点大米煮粥，将要熟的时候再放一点蜂蜜进去。',
      en: 'Platycladus seed 10g, walnut 25g, white sesame 25g — grind, cook with rice as porridge, add honey near the end.'
    },
    exercise: {
      zh: '惊蛰的时候适合于清一下大肠，大肠清干净了，我们的气血升发就会有一个好的环境。',
      en: 'Clear the large intestine during Awakening of Insects to create a good environment for qi and blood circulation.'
    },
    avoidance: {
      zh: '大寒、立春、雨水、惊蛰这四个节气要避风邪。',
      en: 'Avoid wind pathogen during Major Cold, Start of Spring, Rain Water, and Awakening of Insects.'
    }
  },

  // 5 - 春分
  {
    index: 5,
    name: { zh: '春分', en: 'Spring Equinox' },
    season: 'spring',
    advice: {
      zh: '从春分这个节气开就告别风季，进入到暖季了，春暖花开。但是这个时候还是乍暖还寒时候，人体里面的阴阳也在浮动，这个时候应该要调和阴阳，尤其是春分开始，人就容易春困。防春困也很简单，就是做一个香囊来闻就好了，做一个香囊，用一个绳子挂在脖子上也行，放在口袋里面也行，让这个香气透出来就能够醒脑，能够防春困。',
      en: 'Spring Equinox bids farewell to wind season and enters the warm season. Balance yin and yang. To prevent spring drowsiness, make a fragrant sachet to carry.'
    },
    diet: {
      zh: '如果用食物的话，早餐可以用百合和大米煮粥吃，百合六十克，大米可以适量，两百克或者两百五十克煮粥吃就好了，能够润肺止咳、清心安神。',
      en: 'For meals, cook lily bulb porridge for breakfast: lily bulb 60g with rice 200-250g. Moistens lungs, stops cough, clears the mind and calms the spirit.'
    },
    herbalRecipe: {
      zh: '防春困香囊方一：用冰片、樟脑各三克，用高良姜十五克，桂皮三十克，全部磨成粉混合在一起，然后密封在瓶子里面，做一个小小的布袋子，把药粉每一次取五克装在小布袋子里面去，放在身上就可以防春困，大概每十天到十五天换一次药粉就可以了。防春困香囊方二：四味药，川芎、白芷各十克，苍术二十克，丁香五十克，也是磨粉，每次用五克装在小布袋子。其实春困主要的原因是因为体内的阳气不足。',
      en: 'Anti-drowsiness sachet recipe 1: borneol and camphor 3g each, galangal 15g, cinnamon bark 30g — grind and mix, use 5g per sachet. Recipe 2: Ligusticum and Angelica dahurica 10g each, Atractylodes 20g, cloves 50g.'
    },
    exercise: {
      zh: '春分这个时候应该要调和阴阳，防春困。',
      en: 'Balance yin and yang during Spring Equinox, and prevent spring drowsiness.'
    },
    avoidance: {
      zh: '春分、清明、谷雨、立夏就要避火邪，所以在这些时间就不要去进补了。',
      en: 'Avoid fire pathogen during Spring Equinox, Qingming, Grain Rain, and Start of Summer. Do not take tonics during these periods.'
    }
  },

  // 6 - 清明
  {
    index: 6,
    name: { zh: '清明', en: 'Qingming' },
    season: 'spring',
    advice: {
      zh: '清明时候肝火旺起来了，这个时候就不能够再进补了，到了清明这个节气以后如果还吃补品的话就容易上火了，所以食物是要以柔肝养肝的食品为主，这个时候因为肝火旺起来，所以金克木、木刑金，容易有一些咳嗽等等，可以用"山药止咳饮"，用六十克山药熬点水，然后弃渣留汁，加甘蔗汁五十毫升，酸石榴汁二十毫升，再把它重新煮沸，煮得沸腾以后摊凉就可以喝，能够健脾益肺、滋阴益精。',
      en: 'During Qingming, liver fire rises — stop taking tonics. Focus on foods that soften and nourish the liver. Use yam cough drink for coughs caused by liver fire overpowering metal/lungs.'
    },
    diet: {
      zh: '食物是要以柔肝养肝的食品为主。如果用食物的话，早餐可以用百合和大米煮粥吃，百合六十克，大米可以适量，两百克或者两百五十克煮粥吃就好了，能够润肺止咳、清心安神。',
      en: 'Focus on liver-nourishing foods. Cook lily bulb and rice porridge for breakfast: lily bulb 60g with rice 200-250g. Moistens lungs, stops cough, clears mind.'
    },
    herbalRecipe: {
      zh: '山药止咳饮：用六十克山药熬点水，然后弃渣留汁，加甘蔗汁五十毫升，酸石榴汁二十毫升，再把它重新煮沸，煮得沸腾以后摊凉就可以喝，能够健脾益肺、滋阴益精。',
      en: 'Yam cough drink: boil 60g yam in water, strain, add 50ml sugarcane juice and 20ml pomegranate juice, reboil and cool. Strengthens spleen, benefits lungs, nourishes yin and essence.'
    },
    exercise: {
      zh: '清明时候肝火旺起来了，注意调和肝气。',
      en: 'Liver fire rises during Qingming — focus on harmonizing liver qi.'
    },
    avoidance: {
      zh: '春分、清明、谷雨、立夏就要避火邪，所以在这些时间就不要去进补了。',
      en: 'Avoid fire pathogen. Do not take tonics during Spring Equinox, Qingming, Grain Rain, and Start of Summer.'
    }
  },

  // 7 - 谷雨
  {
    index: 7,
    name: { zh: '谷雨', en: 'Grain Rain' },
    season: 'spring',
    advice: {
      zh: '谷雨这个时候我们要能够借助天地阳气升发，进一步来提升脾胃的功能，脾胃功能好了就不会累积脂肪，当然就能够体型好，身体健康，所以能够健脾胃是最好的减肥方法。有些老人家说："我都年纪老了，不像年轻人成天去讲苗条，我不需要减肥了。"其实确实上了年纪的人不需要讲苗条了，但是更需要健康。如果是比较体型肥胖的人，医学上的研究说他患冠心病的几率比体型正常的人要高出二到五倍，患糖尿病的几率是比正常人要高出六到九倍。所以中国古语说："千金难买老来瘦。"',
      en: 'During Grain Rain, harness the rising yang qi to enhance spleen and stomach function. A healthy spleen-stomach prevents fat accumulation. Strengthening the spleen-stomach is the best weight loss method.'
    },
    diet: {
      zh: '十二药叉大将养生粥：就是五种米、五豆，就是五种米加上五种豆子，加上莲子和芡实，那五种米当然就是大米、小米、紫米还有玉米、薏米。大米用一千克、小米用四百克，后面的紫米、玉米、薏米各一百克就可以了。然后扁豆、红豆、黄豆、绿豆、黑豆各一百克，加上莲子和芡实各一百克。可以看到五谷为养，大米能够生发胃气，小米颜色是黄的，黄色入脾，能够健脾。五种豆子，扁豆是白的，后面的红豆、黄豆、绿豆、黑豆刚好五种颜色，五色入五脏，能够滋养五脏。中医上面有一个叫"五福饮"，用五种药物来养心、肝、脾、肺、肾，比方说用党参来养肺；用当归来养肝；用炙甘草来养心；用炒白术来养脾等等，这个就是很著名的一个"五福饮"（处方：党参9克[养肺]，熟地黄9克[养肾]，当归6～9克[养肝]，炒白术15克[养脾]，炙甘草9克[养心]）。扁豆是能够和中补脾，能够清暑化湿的，最后两种水生植物的种子——莲子能够入心，芡实能够入肾，能够宁神养心，固涩心肾的精气。所以这十二种食物来做养生粥是谷雨这个节气非常适合的粥品。',
      en: 'Twelve Yaksha Generals Porridge: 5 grains (rice 1kg, millet 400g, purple rice/corn/Job\'s tears 100g each) + 5 beans (hyacinth/red/yellow/green/black beans 100g each) + lotus seeds and fox nuts 100g each. Five grains nourish, five colors enter five organs.'
    },
    herbalRecipe: {
      zh: '五福饮：党参9克[养肺]，熟地黄9克[养肾]，当归6～9克[养肝]，炒白术15克[养脾]，炙甘草9克[养心]。',
      en: 'Five Blessings Drink: Codonopsis 9g (lungs), Rehmannia 9g (kidneys), Angelica 6-9g (liver), fried Atractylodes 15g (spleen), roasted Licorice 9g (heart).'
    },
    exercise: {
      zh: '谷雨这个时候我们要能够借助天地阳气升发，进一步来提升脾胃的功能。',
      en: 'Harness the rising yang qi of heaven and earth to enhance spleen-stomach function.'
    },
    avoidance: {
      zh: '春分、清明、谷雨、立夏就要避火邪，所以在这些时间就不要去进补了。',
      en: 'Avoid fire pathogen during Spring Equinox, Qingming, Grain Rain, and Start of Summer. Do not take tonics.'
    }
  },

  // 8 - 立夏
  {
    index: 8,
    name: { zh: '立夏', en: 'Start of Summer' },
    season: 'summer',
    advice: {
      zh: '立夏的时候是宜健脾护心，要睡好子午觉。小满就开始进入到暑季了，有很多能量外耗，因此气虚的人一到夏天的时候就容易大汗淋漓、气喘吁吁，并且在外面呆久了就容易中暑，所以我们立夏开始就要健脾、养气血。健脾的食疗方、养气的食疗方大家都知道了，四君子汤——人参、白术、茯苓、甘草。用四君子汤熬点水，然后弃渣留汁，再加米进去煮粥喝，在立夏这个节气里面多喝是很有帮助的。',
      en: 'Start of Summer is suitable for strengthening spleen and protecting heart. Sleep well during noon hours. Use Four Gentlemen Soup (Ginseng, Atractylodes, Poria, Licorice) to make porridge.'
    },
    diet: {
      zh: '用四君子汤熬点水，然后弃渣留汁，再加米进去煮粥喝，在立夏这个节气里面多喝是很有帮助的。饮品方面，可以用菊花三十克、麦冬十五克，加水煮沸以后弃渣留汁，冷却后再加蜂蜜进去，就能够生津止渴，因为麦冬是能够生津液的，能够清心健脑、清肝明目、解乏。',
      en: 'Cook Four Gentlemen Soup, strain and add rice for porridge. For drinks: chrysanthemum 30g and Ophiopogon 15g, boil, strain, cool and add honey. Generates fluids, clears heart and liver, relieves fatigue.'
    },
    herbalRecipe: {
      zh: '四君子汤：人参、白术、茯苓、甘草。饮品方：菊花三十克、麦冬十五克，加水煮沸以后弃渣留汁，冷却后再加蜂蜜进去。',
      en: 'Four Gentlemen Soup: Ginseng, Atractylodes, Poria, Licorice. Drink: chrysanthemum 30g, Ophiopogon 15g, boiled, strained, add honey when cooled.'
    },
    exercise: {
      zh: '立夏的时候是宜健脾护心，要睡好子午觉。',
      en: 'Strengthen spleen and protect heart during Start of Summer. Sleep well during the noon hours.'
    },
    avoidance: {
      zh: '春分、清明、谷雨、立夏就要避火邪，所以在这些时间就不要去进补了。',
      en: 'Avoid fire pathogen. Do not take tonics during Start of Summer.'
    }
  },

  // 9 - 小满
  {
    index: 9,
    name: { zh: '小满', en: 'Grain Buds' },
    season: 'summer',
    advice: {
      zh: '小满这个时候就很闷热、潮湿，这个节气里面适合于祛湿。可以用两种祛湿的方：一种是山药冬瓜汤，这个是我们常用的，因为祛湿很重要，湿很重就困脾，脾胃伤了以后就五脏失养、百病丛生，并且湿气重了以后就会容易形成痰湿体质，痰湿淤积久了就会形成一种痰核，痰核就变成一种固体的存在，痰核如果在皮肤底下就叫做脂肪瘤，有一些人皮肤底下到处有那种硬块，那个就是脂肪瘤了。在子宫里面有痰核的话，就会有子宫肌瘤了。',
      en: 'Grain Buds is hot and humid — suitable for dispelling dampness. Dampness is very harmful: it impairs the spleen, leading to deficiency of all five organs and various diseases. Accumulated phlegm-dampness forms nodules (lipomas, uterine fibroids).'
    },
    diet: {
      zh: '一种是山药冬瓜汤，还有一种方法就是，用薏仁五十克、百合二十克，再放一点米，看自己能够吃多少，一百克或者两百克都可以，煮粥吃，因为薏仁能够健脾祛湿，能够利水消肿，百合也能够清心安神和润肺。',
      en: 'Yam and winter melon soup. Or: Job\'s tears 50g, lily bulb 20g with rice (100-200g) as porridge. Job\'s tears strengthens spleen and dispels dampness; lily bulb clears heart and moistens lungs.'
    },
    herbalRecipe: {
      zh: '祛湿方一：山药冬瓜汤。祛湿方二：用薏仁五十克、百合二十克，再放一点米煮粥吃，因为薏仁能够健脾祛湿，能够利水消肿，百合也能够清心安神和润肺。',
      en: 'Dampness recipe 1: Yam and winter melon soup. Recipe 2: Job\'s tears 50g, lily bulb 20g with rice as porridge.'
    },
    exercise: {
      zh: '小满这个时候就很闷热、潮湿，注意祛湿健脾。',
      en: 'Focus on dispelling dampness and strengthening the spleen during Grain Buds.'
    },
    avoidance: {
      zh: '小满、芒种、夏至、小暑就是要避暑邪和湿邪。',
      en: 'Avoid summer-heat and dampness pathogens during Grain Buds, Grain in Ear, Summer Solstice, and Minor Heat.'
    }
  },

  // 10 - 芒种
  {
    index: 10,
    name: { zh: '芒种', en: 'Grain in Ear' },
    season: 'summer',
    advice: {
      zh: '芒种这个时候是南方梅雨季节到来的时候，很潮热，容易发霉，但是心血不足的人可以借助芒种这把"天之大火"来点亮心火，心血不足、心脏功能不太好的人可以借助芒种这个节气，让心脏功能旺起来。当然我们也可以用这个千古名方四物汤来补血——当归、川芎、白芍和熟地。芒种的时候，因为天气炎热起来，所以我们体内的阳气就浮到表面上来抵御外在气候的炎热，人体里面就形成一个外阳内阴，所以我们其实是应该少喝那些冰冻的饮料，否则的话就会伤元气了。',
      en: 'Grain in Ear brings the southern plum rain season — hot and humid. Those with insufficient heart-blood can harness the "great fire of heaven" to ignite heart fire. Use the classic Four Substances Decoction for blood nourishment. Avoid cold drinks as yang qi floats to the surface.'
    },
    diet: {
      zh: '一般的人只是吃一副就好了，就能够帮助我们延缓衰老，如果心脏功能比较弱的人就可以多吃几天，在这个节气里面吃都可以。芒种的时候，因为天气炎热起来，所以我们体内的阳气就浮到表面上来抵御外在气候的炎热，人体里面就形成一个外阳内阴，所以我们其实是应该少喝那些冰冻的饮料，否则的话就会伤元气了。',
      en: 'One dose of Four Substances Decoction can help delay aging; those with weak heart function may take more during this period. Avoid iced drinks as internal yang floats outward.'
    },
    herbalRecipe: {
      zh: '千古名方四物汤来补血——当归、川芎、白芍和熟地。心血不足、心脏功能比较弱的人就可以多吃几天，在这个节气里面吃都可以。芒种的时候，因为天气炎热起来，所以我们体内的阳气就浮到表面上来抵御外在气候的炎热，所以是外阳内阴，其实里面还是很阴的，阳气不足了，我们就图痛快总是喝很多冷饮，其实就让里面更凉了，这个是一种伤害体内元气的方法。',
      en: 'The classic Four Substances Decoction for nourishing blood: Angelica (Dang Gui), Ligusticum (Chuan Xiong), White Peony (Bai Shao), and Prepared Rehmannia (Shu Di). Those with heart-blood deficiency can take it for several days during this solar term. During Grain in Ear, as the weather heats up, yang qi floats to the surface to resist external heat — internally we remain yin-deficient. Avoid excess cold drinks as they further damage internal yuan qi.'
    },
    exercise: {
      zh: '心血不足的人可以借助芒种这个节气，让心脏功能旺起来。',
      en: 'Those with heart-blood deficiency can use this solar term to invigorate heart function.'
    },
    avoidance: {
      zh: '小满、芒种、夏至、小暑就是要避暑邪和湿邪。而且芒种的时候，天气热起来，蚊子也多起来，可以在临睡觉以前口服一片维生素B1就可以了，不要长期大量服。应该少喝那些冰冻的饮料，否则的话就会伤元气了。',
      en: 'Avoid summer-heat and dampness pathogens. Take one vitamin B1 before sleep to repel mosquitoes (do not take long-term). Reduce iced drinks to protect yuan qi.'
    }
  },

  // 11 - 夏至
  {
    index: 11,
    name: { zh: '夏至', en: 'Summer Solstice' },
    season: 'summer',
    advice: {
      zh: '夏至这个节气要能够潜阳归根，滋阴养肾，冬至一阳生、夏至一阴生，夏至之日白天最长、夜晚最短，刚好跟冬至是相反、相对的，就表示阳气旺盛，天地的阳气旺盛到极点了，然后就开始衰退，所以是阳气升极而降。冬至日是白天最短，夜晚最长，表示阴旺盛到了极点而开始衰退了，阳气虚亏到了极点而开始生发了，所以冬至日是阴极而阳生的关键时刻。在冬至的时候我们要能够帮助阳气顺利生发，这个很重要，所以冬至、夏至这两天都很重要。而且如果是冬至、夏至的时候，最好不做很累的事情，或者最好能够闭闭关，养一下气，如果吃西药，除了每一天必服的、不服会出问题的之外，这两天最好是不吃西药，因为西药其实是要耗元气，把我们储存的生命的元气激出来，看到治病的效果，所以治病的效果立竿见影，原因就是这个，但是是会消耗元气的，所以在这两天除了必服不可的之外，就不服是比较好的。',
      en: 'Summer Solstice requires subduing yang and returning it to the root, nourishing yin and kidneys. Yang qi peaks and begins to decline. This is one of the two most critical days (with Winter Solstice). Rest, avoid strenuous activity, and if possible avoid Western medicine on this day as it depletes yuan qi.'
    },
    diet: {
      zh: '夏至养生茶：用五味子、西洋参、龙眼肉各五克，然后放冰糖二十克，炖服，多放点水，这一天当茶喝，也就能够养心安神、补益肝肾，这是夏至养生茶。',
      en: 'Summer Solstice tea: Schisandra, American ginseng, longan flesh 5g each, rock sugar 20g, stew and drink as tea throughout the day. Nourishes heart, calms spirit, supplements liver and kidneys.'
    },
    herbalRecipe: {
      zh: '四逆汤（潜阳归根方）：制附片十克（制附片是以江油那个地方出的是最好的，虽然只有十克，仍然还是要加水先煎一个小时，因为它是有小毒性的），然后用炙甘草和干姜各十克，再用生龙骨粉、生牡蛎粉各三十克，用山萸肉三十克，用白芍二十克，再放一把黄豆就可以了，总共八味。刚好在夏至这一天吃一剂，早晚服就能够帮助我们顺利地引阳归根。夏至养生茶：用五味子、西洋参、龙眼肉各五克，然后放冰糖二十克，炖服。',
      en: 'Sini Decoction (yang-subduing formula): prepared Aconite 10g (pre-boil 1 hour), roasted Licorice and dried Ginger 10g each, raw Dragon Bone and Oyster Shell powder 30g each, Cornus 30g, white Peony 20g, plus soybeans. Take one dose on Summer Solstice day. Summer Solstice tea: Schisandra, American Ginseng, Longan 5g each, rock sugar 20g.'
    },
    exercise: {
      zh: '夏至之日是阳气开始沉降的关键时刻，最好不做很累的事情，或者最好能够闭闭关，养一下气。',
      en: 'Summer Solstice is the critical moment when yang qi begins to descend. Avoid exhausting activities; rest and conserve qi.'
    },
    avoidance: {
      zh: '小满、芒种、夏至、小暑就是要避暑邪和湿邪。如果吃西药，除了每一天必服的、不服会出问题的之外，这两天最好是不吃西药，因为西药其实是要耗元气。应该少喝那些冰冻的饮料。',
      en: 'Avoid summer-heat and dampness pathogens. Avoid Western medicine on Solstice day unless essential, as it depletes yuan qi. Reduce iced drinks.'
    }
  },

  // 12 - 小暑
  {
    index: 12,
    name: { zh: '小暑', en: 'Minor Heat' },
    season: 'summer',
    advice: {
      zh: '每一年大概都是公历七月七日左右，这个时候全国南北方都进入到炎热的天气里面，要防中暑，饮食就适合于比较清淡，养生的食物可以用大枣五十克，龙眼肉十五克，黑豆五十克来煮汤喝，能够治疗阴虚盗汗，能够治疗血虚心悸，如果老是觉得心悸、心脏很不舒服，可以用这个方法。而且"夏气通于心"，心经气血旺盛，和它相表里的小肠经也就跟着气血旺盛起来了。',
      en: 'Around July 7th, the whole country enters hot weather. Prevent heatstroke with light diet. Cook soup with jujube dates 50g, longan flesh 15g, black beans 50g — treats yin-deficiency night sweats and blood-deficiency palpitations. "Summer qi connects to the heart" — heart and small intestine meridians are most vigorous.'
    },
    diet: {
      zh: '养生的食物可以用大枣五十克，龙眼肉十五克，黑豆五十克来煮汤喝，能够治疗阴虚盗汗，能够治疗血虚心悸。',
      en: 'Jujube dates 50g, longan flesh 15g, black beans 50g — cook as soup. Treats yin-deficiency night sweats and blood-deficiency palpitations.'
    },
    herbalRecipe: {
      zh: '大枣五十克，龙眼肉十五克，黑豆五十克来煮汤喝。',
      en: 'Jujube 50g, longan flesh 15g, black beans 50g, cook as soup.'
    },
    exercise: {
      zh: '如果我们有老寒肩，肩周炎很久了，颈椎病也很久了，很不舒服，你就可以在小暑这个节气里面每一天练练铁砂掌，一直到老这个肩膀都是好的，不会有肩周炎。我们当然不需要去砍沙袋了，我们就砍小鱼际，用手心对着自己这么砍就可以了。抬起手，手心向自己，让双手小鱼际互相砍。当然你在这个时候，如果有肩周炎、有颈椎病这样做就可以了。当然最好的时间，什么时候砍？最好的时间是下午的一点到三点，因为这个时候是气血流注在小肠经的时候。如果肩膀有老寒肩，最好能够每一天砍够两百下，你一辈子肩膀都不会出问题，而且还有好处是能够改善听力，因为它也会走到耳朵这个地方，还有能够延缓衰老，因为它会走到哪里？经过鱼尾纹这个地方，所以砍的话，鱼尾纹就会减少，八十岁像二十岁一样。',
      en: 'Practice "Iron Sand Palm" — clap the outer edges of your palms (small intestine meridian) together daily. Best time: 1-3 PM when qi flows in the small intestine meridian. Clap 200+ times daily to prevent frozen shoulder, improve hearing, and reduce crow\'s feet wrinkles.'
    },
    avoidance: {
      zh: '小满、芒种、夏至、小暑就是要避暑邪和湿邪。饮食就适合于比较清淡。',
      en: 'Avoid summer-heat and dampness pathogens. Keep diet light and simple.'
    }
  },

  // 13 - 大暑
  {
    index: 13,
    name: { zh: '大暑', en: 'Major Heat' },
    season: 'summer',
    advice: {
      zh: '大暑是一年最热的时候，是最适合于冬病夏治，所以如果有一些是秋冬发病的那种病，比方说天气一转凉他就有哮喘，他就有肺气肿，哮喘发起来都没办法躺下去睡觉，他要拿两床被子垫起来，这个人只能坐在那里睡觉，你看这多辛苦。这种人吃什么中药西药都不见效，那怎么办呢？在大暑这个时候，你就可以借这个火来把这个寒气去掉，因为那个是寒气入到身体的深处，用什么药物都难见效，你就要用好大暑这个节气，为什么？大暑是最热的时候，天地之间是火，人体里面也是火，用里火外火这两把火把寒气赶走，这个就是最好的利用。',
      en: 'Major Heat is the hottest time of year, most suitable for "treating winter diseases in summer." Use the double fire of heaven and body to expel deep cold pathogens. This is the best time to address chronic conditions like asthma and emphysema triggered by cold weather.'
    },
    diet: {
      zh: '一切阳虚的人都可以用好大暑天的大火和心中的火，把体内的寒气能够去掉，当然就是早上一碗汤、晚上一粒药这样就可以了。早上一碗汤很简单，就是生姜，你把生姜切细，用开水泡，温的时候放一点蜂蜜兑着喝就可以了。晚上一粒药就是金匮肾气丸，金匮肾气丸有时候也叫做桂附地黄丸，都是一种，买那种金匮肾气丸，每天晚上临睡前一小时候吃一粒，这样就把大暑这个节气的火好好地运用起来了，一点都没有浪费，把体内的寒气就赶跑掉了。还有暑热难挡，所以往往不开胃，胃口不好，就可以喝大麦茶了，很简单。用大麦放在铁锅里面炒，炒到微微的焦，然后用罐子装起来，每一天你可以用开水反复冲泡，又香又好喝还能养胃、开胃。',
      en: 'Morning: ginger tea (sliced ginger steeped in hot water with honey). Evening: one Jin Gui Shen Qi Wan (kidney qi pill). For poor appetite in heat: roast barley in iron wok until slightly charred, store in jar, steep with hot water daily as barley tea.'
    },
    herbalRecipe: {
      zh: '一切阳虚的人都可以用好大暑天的大火和心中的火，把体内的寒气能够去掉，当然就是早上一碗汤，晚上一粒药这样就可以了。早上一碗汤，就是生姜，你把生姜切细，用开水泡，温的时候放一点蜂蜜兑着喝就可以了。晚上一粒药就是金匮肾气丸，金匮肾气丸有时候也叫做桂附地黄丸，都是一种，买那种金匮肾气丸，每天晚上临睡前一小时候吃一粒，这样就把大暑这个节气的火好好地运用起来了，一点都没有浪费，把体内的寒气也赶跑掉了。还有暑热难挡，所以往往不开胃，胃口不好，就可以喝大麦茶了，很简单。用大麦放在铁锅里面炒，炒到微微的焦，然后用罐子装起来，每一天你可以用开水反复冲泡，又香又好喝还能养胃、开胃，当然也可以加水去把它煮沸再来喝也行。',
      en: 'Morning ginger soup: slice ginger, steep in hot water, add honey when warm. Evening: Jin Gui Shen Qi Wan (Gui Fu Di Huang Wan), one pill 1 hour before sleep. Barley tea: dry-roast barley until slightly charred, steep in hot water.'
    },
    exercise: {
      zh: '大暑是最热的时候，适合于冬病夏治，用里火外火这两把火把寒气赶走。',
      en: 'Major Heat is ideal for treating winter diseases in summer, using internal and external fire to drive away cold pathogens.'
    },
    avoidance: {
      zh: '大暑、立秋、处暑、白露就要避开湿邪，因为湿邪是会催生肿瘤的。',
      en: 'Avoid dampness pathogen during Major Heat, Start of Autumn, End of Heat, and White Dew — dampness can promote tumor growth.'
    }
  },

  // 14 - 立秋
  {
    index: 14,
    name: { zh: '立秋', en: 'Start of Autumn' },
    season: 'autumn',
    advice: {
      zh: '立秋这个节气我们适合于清热、排湿，可以用五味食物熬点粥喝，也就是百合二十克，银耳四十克，莲子十五克，糯米可以放五十克或者可以加大一点，差不多熬好的时候可以放一点冰糖进去，因为百合能够润肺止咳、清心安神，银耳能够润肺生津。还有一种就是用鱼腥草、白梨（梨子）、冰糖炖汤喝，因为鱼腥草能够提高我们肌体的免疫力，而且能够清热、利尿、解毒，立秋的时候我们经过了整整一个夏季的闷热，所以身体里面积聚了一些热火、一些湿气，所以到立秋这个时候容易犯牙痛，容易心烦失眠，所以就喝鱼腥草白梨汤也是很好的。',
      en: 'Start of Autumn is suitable for clearing heat and expelling dampness. Cook five-ingredient porridge: lily bulb 20g, tremella 40g, lotus seeds 15g, glutinous rice 50g+, add rock sugar. Or make Houttuynia and pear soup with rock sugar — Houttuynia boosts immunity, clears heat, promotes urination and detoxifies.'
    },
    diet: {
      zh: '五味食物粥：百合二十克，银耳四十克，莲子十五克，糯米可以放五十克或者可以加大一点，差不多熬好的时候可以放一点冰糖进去。鱼腥草白梨冰糖汤：用鱼腥草、白梨（梨子）、冰糖炖汤喝。',
      en: 'Five-ingredient porridge: lily bulb 20g, tremella 40g, lotus seeds 15g, glutinous rice 50g+, rock sugar. Houttuynia pear soup: Houttuynia, white pear, rock sugar stewed together.'
    },
    herbalRecipe: {
      zh: '百合二十克，银耳四十克，莲子十五克，糯米五十克，冰糖适量。鱼腥草、白梨、冰糖炖汤。',
      en: 'Lily bulb 20g, tremella 40g, lotus seeds 15g, glutinous rice 50g, rock sugar. Or: Houttuynia, pear, rock sugar soup.'
    },
    exercise: {
      zh: '立秋这个节气里面还有一个就是最好能够通一通膀胱经，这个我们昨天已经学过了，就是做那个摇篮式，你仰卧在地上，两腿弯曲起来，手抱住，头往上抬刚好就形成一个弓，一个摇篮，前后这么摇动几下，你这个头往后仰，然后它会自己往前这个样子，就很舒服应该是，如果方法正确的话。而且它能够刺激到我们两条重要的经络，应该说是三条：中间是督脉，两边是两条膀胱经。督脉就是总督一身的阳气，当然做这个摇篮式是下午三点钟，气血经过膀胱经的时候做是最好了，尤其是那些腰酸背疼、腰肌劳损，做这个是效果挺好的。',
      en: 'Practice the "cradle pose" to open the bladder meridian: lie on back, bend legs, hold with hands, lift head forming an arch, rock back and forth. Best at 3 PM when qi flows through the bladder meridian. Stimulates the Du meridian and both bladder meridians. Especially good for lower back pain.'
    },
    avoidance: {
      zh: '大暑、立秋、处暑、白露就要避开湿邪，因为湿邪是会催生肿瘤的。',
      en: 'Avoid dampness pathogen during Major Heat, Start of Autumn, End of Heat, and White Dew — dampness promotes tumor growth.'
    }
  },

  // 15 - 处暑
  {
    index: 15,
    name: { zh: '处暑', en: 'End of Heat' },
    season: 'autumn',
    advice: {
      zh: '这个时候也是适合排毒祛湿，我们可以熬一点黄金粥，黄金粥就表示它里面基本上都是黄色的，小米、玉米、南瓜，再放一些大枣就可以了，除了大枣是红色的之外，其他都是黄色的，是比较好的一个养脾健胃食疗法。饮料方面我们可以用玉米须三十克，空心菜六十克，熬水，然后弃渣留汁来喝，在处暑的时候你用这个当茶喝是非常好的，玉米须是很常见，但是大家都浪费了，其实玉米须收藏起来很好的，它能够降压、降糖、利尿。',
      en: 'End of Heat is suitable for detoxification and dampness removal. Make "golden porridge" with millet, corn, pumpkin, and jujube dates — all yellow foods to nourish the spleen and stomach. Drink corn silk tea: corn silk 30g and water spinach 60g, boiled as tea — lowers blood pressure, blood sugar, and promotes urination.'
    },
    diet: {
      zh: '黄金粥：小米、玉米、南瓜，再放一些大枣，除了大枣是红色的之外，其他都是黄色的，是比较好的一个养脾健胃食疗法。饮料：用玉米须三十克，空心菜六十克，熬水，然后弃渣留汁来喝。',
      en: 'Golden porridge: millet, corn, pumpkin, jujube dates. Drink: corn silk 30g, water spinach 60g, boiled and strained as tea.'
    },
    herbalRecipe: {
      zh: '玉米须三十克，空心菜六十克，熬水弃渣留汁来喝，能够降压、降糖、利尿。',
      en: 'Corn silk 30g, water spinach 60g, boiled as tea. Lowers blood pressure, blood sugar, promotes urination.'
    },
    exercise: {
      zh: '处暑时候适合排毒祛湿，注意养脾健胃。',
      en: 'Focus on detoxification, dampness removal, and spleen-stomach nourishment during End of Heat.'
    },
    avoidance: {
      zh: '大暑、立秋、处暑、白露就要避开湿邪，因为湿邪是会催生肿瘤的。',
      en: 'Avoid dampness pathogen during Major Heat, Start of Autumn, End of Heat, and White Dew — dampness promotes tumor growth.'
    }
  },

  // 16 - 白露
  {
    index: 16,
    name: { zh: '白露', en: 'White Dew' },
    season: 'autumn',
    advice: {
      zh: '白露适合于养肾，古话说"白露勿露身，早晚要叮咛"，白露这个节气就开始温差大，天气转凉了，所以不要露身，早晚要添衣，从这个节气开始，天地的阳气就开始向内收敛，而肾是主收藏的，所以这个时候肾就开始收纳阳气了，收纳阳气准备过冬了。这个时候我们适合于喝一种益肾养元气茶，是七种药物，用制何首乌五克，生地五克，枸杞子五克，黄芪三克，菊花三克，再放上大枣三粒，再放一点点冰糖，多放点水煮开，把这个当茶喝是非常好的，能够益肾养元气的茶。因为制何首乌能够平补肝肾；枸杞子、生地能够补肾滋阴；黄芪当然是能够健脾益气；菊花能够清热；大枣能够健脾、调和五脏。而且这个茶你长喝都不会上火，不腻不燥，而且因为它寒热食物都有，搭配得非常好，尤其适合于在秋分的时候吃的一个食疗方法。',
      en: 'White Dew is suitable for nourishing the kidneys. The old saying goes: "During White Dew, don\'t expose the body; be reminded morning and evening." Temperature differences widen, so add clothing morning and evening. The kidneys begin storing yang qi for winter. Drink kidney-nourishing yuan qi tea with seven ingredients.'
    },
    diet: {
      zh: '益肾养元气茶：用制何首乌五克，生地五克，枸杞子五克，黄芪三克，菊花三克，再放上大枣三粒，再放一点点冰糖，多放点水煮开，把这个当茶喝。因为制何首乌能够平补肝肾；枸杞子、生地能够补肾滋阴；黄芪当然是能够健脾益气；菊花能够清热；大枣能够健脾、调和五脏。而且这个茶你长喝都不会上火，不腻不燥。',
      en: 'Kidney-nourishing yuan qi tea: prepared Polygonum 5g, Rehmannia 5g, wolfberry 5g, Astragalus 3g, chrysanthemum 3g, jujube dates 3, a little rock sugar. Can be drunk long-term without causing excess heat.'
    },
    herbalRecipe: {
      zh: '益肾养元气茶：制何首乌五克，生地五克，枸杞子五克，黄芪三克，菊花三克，大枣三粒，冰糖少许。尤其是昨天说的那个半月痕不足的人，你在白露这个节气最好喝足十五天，就喝这个茶。',
      en: 'Kidney yuan qi tea: prepared Polygonum 5g, Rehmannia 5g, wolfberry 5g, Astragalus 3g, chrysanthemum 3g, jujube 3, rock sugar. Those with insufficient nail moons should drink for the full 15 days of this solar term.'
    },
    exercise: {
      zh: '白露开始天地的阳气就开始向内收敛，肾是主收藏的，这个时候肾就开始收纳阳气了，收纳阳气准备过冬了。',
      en: 'From White Dew, heaven and earth\'s yang qi begins to converge inward. The kidneys begin storing yang qi in preparation for winter.'
    },
    avoidance: {
      zh: '大暑、立秋、处暑、白露就要避开湿邪，因为湿邪是会催生肿瘤的。白露勿露身，早晚要叮咛，不要露身，早晚要添衣。',
      en: 'Avoid dampness pathogen. Don\'t expose the body during White Dew; add clothing morning and evening.'
    }
  },

  // 17 - 秋分
  {
    index: 17,
    name: { zh: '秋分', en: 'Autumnal Equinox' },
    season: 'autumn',
    advice: {
      zh: '秋分这个时候最适合于养肺了，秋分和春分一样，阳光几乎都是直射赤道，所以是昼夜相等的时候，白天和晚上的时间刚好相等，但是不同的，春分称之为天门开，这个时候就阳气升腾，从此以后天气就越来越暖和，秋分这个时候就称之为地门关、地门闭，表示阴气渐盛，从此天气就越来越凉了。所以中国的古谚上说："秋分雷始收声。"雷声是天空之中阳气很旺盛的一种表现，秋分时候阳气衰弱了，所以从此以后基本上也就听不到雷声了。',
      en: 'Autumnal Equinox is most suitable for nourishing the lungs. Like Spring Equinox, sunlight falls directly on the equator with equal day and night. But unlike spring when "heaven\'s gate opens," autumn is when "earth\'s gate closes" — yin qi grows, weather cools. The Chinese proverb says: "Thunder ceases at Autumnal Equinox."'
    },
    diet: {
      zh: '可以用一点黄芪，用黄芪来煮水，煮水以后弃渣留汁，（水要多放一点，后面还要放其他的），弃渣留汁以后，汁里面加上薏苡仁、扁豆、绿豆、莲子、大枣，将要熟的时候再放一点枸杞子进去，这样来煮粥吃能够长期吃都不会燥、不会腻，而且因为它寒热食物都有，搭配得非常好，尤其适合于在秋分的时候吃的一个食疗方法。对于经常失眠的人，或者睡眠很差的人，就可以用酸枣仁，捣碎它然后加上小米来煮粥，吃以前放一点蜂蜜，在睡觉以前一个小时喝，就能够帮助我们改善睡眠。',
      en: 'Boil Astragalus, strain, add Job\'s tears, hyacinth beans, mung beans, lotus seeds, jujube dates, and wolfberry near the end. A balanced porridge for long-term use. For insomnia: crush Ziziphus seeds, cook with millet as porridge, add honey, eat 1 hour before sleep.'
    },
    herbalRecipe: {
      zh: '秋分这个时候养生的食疗方，可以用一点黄芪，用黄芪来煮水，煮水以后弃渣留汁（水要多放一点，后面还要放其他的），弃渣留汁以后，汁里面加上薏苡仁、扁豆、绿豆、莲子、大枣，将要熟的时候再放一点枸杞子进去，这样来煮粥吃能够长期吃都不会燥、不会腻，而且因为它寒热食物都有，搭配得非常好，尤其适合于在秋分的时候吃的一个食疗方法。对于经常失眠的人，或者睡眠很差的人，就可以用酸枣仁，捣碎它然后加上小米来煮粥，吃以前放一点蜂蜜，在睡觉以前的一个小时喝，就能够帮助我们改善睡眠。',
      en: 'Lung-nourishing porridge: Astragalus water with Job\'s tears, hyacinth beans, mung beans, lotus seeds, dates, wolfberry. Sleep aid: crushed Ziziphus with millet porridge and honey, 1 hour before bed.'
    },
    exercise: {
      zh: '秋分这个时候最适合于养肺，注意调和阴阳。',
      en: 'Autumnal Equinox is most suitable for nourishing the lungs. Focus on balancing yin and yang.'
    },
    avoidance: {
      zh: '秋分、寒露、霜降、立冬要避免燥邪，天气干燥这个人就老得快，所以要用汤水来滋养。',
      en: 'Avoid dryness pathogen during Autumnal Equinox, Cold Dew, Frost\'s Descent, and Start of Winter. Dryness ages you quickly — use soups for nourishment.'
    }
  },

  // 18 - 寒露
  {
    index: 18,
    name: { zh: '寒露', en: 'Cold Dew' },
    season: 'autumn',
    advice: {
      zh: '寒露就是天凉、露水重，这个时候秋天的燥气就非常明显，可以润燥、清咽喉，可以用桔梗清咽茶——桔梗五克，百合五克，菊花三克，炙甘草三克，然后放一粒胖大海，放一点冰糖进去，开水反复冲。因为桔梗能够宣肺利咽，能够止咳，能够开肺气之郁结，宣心气之郁闷。',
      en: 'Cold Dew brings cool weather and heavy dew. Autumn dryness is very pronounced. Moisten dryness and clear the throat with Platycodon tea: Platycodon 5g, lily bulb 5g, chrysanthemum 3g, roasted licorice 3g, one Sterculia seed, rock sugar, steeped in hot water. Platycodon opens the lungs, benefits the throat, stops cough, and relieves chest congestion.'
    },
    diet: {
      zh: '桔梗清咽茶：桔梗五克，百合五克，菊花三克，炙甘草三克，然后放一粒胖大海，放一点冰糖进去，开水反复冲。',
      en: 'Platycodon throat-clearing tea: Platycodon 5g, lily bulb 5g, chrysanthemum 3g, roasted licorice 3g, one Sterculia seed, rock sugar, steeped repeatedly in hot water.'
    },
    herbalRecipe: {
      zh: '桔梗清咽茶：桔梗五克，百合五克，菊花三克，炙甘草三克，胖大海一粒，冰糖适量，开水反复冲。因为桔梗能够宣肺利咽，能够止咳，能够开肺气之郁结，宣心气之郁闷。',
      en: 'Platycodon throat tea: Platycodon 5g, lily bulb 5g, chrysanthemum 3g, roasted licorice 3g, Sterculia 1, rock sugar. Platycodon opens lungs, benefits throat, stops cough, relieves lung and heart qi stagnation.'
    },
    exercise: {
      zh: '寒露时候秋天的燥气就非常明显，注意润燥养肺。',
      en: 'Autumn dryness is very pronounced during Cold Dew. Focus on moistening dryness and nourishing the lungs.'
    },
    avoidance: {
      zh: '秋分、寒露、霜降、立冬要避免燥邪，天气干燥这个人就老得快，所以要用汤水来滋养。',
      en: 'Avoid dryness pathogen. Dryness ages quickly — use soups and liquids for nourishment.'
    }
  },

  // 19 - 霜降
  {
    index: 19,
    name: { zh: '霜降', en: 'Frost\'s Descent' },
    season: 'autumn',
    advice: {
      zh: '"霜降一过百草枯"，所以中国的古语说："霜降无霜，主来岁饥荒。"霜降这一天如果没有霜，来岁的收成就不太好了，这个时候用平补的方法比较好。可以用茯苓十克，大枣三粒，当归三克，枸杞子十克来煎水喝。茯苓能够渗湿利水，能够健脾。松树边上挖下去，往往就能够找到茯苓，它是松树的精气凝结形成的，如果把表皮全部削掉，里面的核心部分就叫做茯神，那个药就是安神，能够养心，药效是不同的。',
      en: '"After Frost\'s Descent, all grasses wither." The Chinese proverb says: "No frost at Frost\'s Descent means famine next year." Use gentle tonifying methods. Drink tea of Poria 10g, jujube 3, Angelica 3g, wolfberry 10g. Poria drains dampness, benefits water metabolism, strengthens spleen. The core of Poria (fushen) calms the spirit and nourishes the heart.'
    },
    diet: {
      zh: '可以用茯苓十克，大枣三粒，当归三克，枸杞子十克来煎水喝。茯苓能够渗湿利水，能够健脾。',
      en: 'Poria 10g, jujube dates 3, Angelica 3g, wolfberry 10g — decoct as tea. Poria drains dampness and strengthens spleen.'
    },
    herbalRecipe: {
      zh: '茯苓十克，大枣三粒，当归三克，枸杞子十克来煎水喝。茯苓能够渗湿利水，能够健脾。松树边上挖下去，往往就能够找到茯苓，它是松树的精气凝结形成的，如果把表皮全部削掉，里面的核心部分就叫做茯神，那个药就是安神，能够养心，药效是不同的。',
      en: 'Poria 10g, jujube 3, Angelica 3g, wolfberry 10g as decoction. Poria is formed from pine tree essence; its core (fushen) calms spirit and nourishes heart.'
    },
    exercise: {
      zh: '霜降时候用平补的方法比较好，注意养脾健胃。',
      en: 'Use gentle tonifying methods during Frost\'s Descent. Focus on nourishing spleen and stomach.'
    },
    avoidance: {
      zh: '秋分、寒露、霜降、立冬要避免燥邪，天气干燥这个人就老得快，所以要用汤水来滋养。',
      en: 'Avoid dryness pathogen during Autumnal Equinox, Cold Dew, Frost\'s Descent, and Start of Winter. Use soups for nourishment.'
    }
  },

  // 20 - 立冬
  {
    index: 20,
    name: { zh: '立冬', en: 'Start of Winter' },
    season: 'winter',
    advice: {
      zh: '冬季也是六个节气，我们在冬季里面适合于让阳气归根，让阳气收藏于肾，"冬雪雪冬小大寒"，立冬、小雪、大雪、冬至、小寒、大寒，这个是冬季的六个节气。立冬时候是属于干季的最后一个节气，燥气是最重的，所以立冬这一天不能够大补，其实在《黄帝内经》的六季，立冬是干季的最后一个节气，不适合于大补，可以清补。比方说我们有"制何首乌粥"，这个去年（2010）讲过，用制何首乌二十五克，放五粒红枣，加一点粳米。制何首乌先熬水出来，然后渣不要了，再放大枣和粳米进去，将熟的时候放一点红糖。',
      en: 'Winter has six solar terms for yang qi to return to root and be stored in kidneys. Start of Winter is the last term of the dry season — heaviest dryness, so no heavy tonics. Light nourishment only. Make "prepared Polygonum porridge": prepared Polygonum 25g, red dates 5, glutinous rice. Boil Polygonum first, discard dregs, add dates and rice, add brown sugar when nearly done.'
    },
    diet: {
      zh: '制何首乌粥：用制何首乌二十五克，放五粒红枣，加一点粳米。制何首乌先熬水出来，然后渣不要了，再放大枣和粳米进去，将熟的时候放一点红糖。',
      en: 'Prepared Polygonum porridge: prepared Polygonum 25g, red dates 5, glutinous rice. Boil Polygonum, discard dregs, add dates and rice, add brown sugar when nearly done.'
    },
    herbalRecipe: {
      zh: '制何首乌粥：制何首乌二十五克，红枣五粒，粳米适量，红糖少许。制何首乌先熬水出来，然后渣不要了，再放大枣和粳米进去，将熟的时候放一点红糖。',
      en: 'Prepared Polygonum porridge: Polygonum 25g, red dates 5, rice, brown sugar. Boil Polygonum first, strain, then cook dates and rice in the liquid, add sugar when nearly done.'
    },
    exercise: {
      zh: '冬季里面适合于让阳气归根，让阳气收藏于肾，不要剧烈运动，精神内守。',
      en: 'In winter, let yang qi return to root and be stored in kidneys. Avoid vigorous exercise, maintain inner tranquility.'
    },
    avoidance: {
      zh: '秋分、寒露、霜降、立冬要避免燥邪，天气干燥这个人就老得快，所以要用汤水来滋养。立冬这一天不能够大补。',
      en: 'Avoid dryness pathogen. Do not use heavy tonics on Start of Winter day.'
    }
  },

  // 21 - 小雪
  {
    index: 21,
    name: { zh: '小雪', en: 'Minor Snow' },
    season: 'winter',
    advice: {
      zh: '小雪是欲补先清，首先要清肠，然后再来清补。可以用苹果胡萝卜粥——苹果一百五十克，包菜一百五十克，胡萝卜一百克，剁成泥以后把汁滤出来，然后再放米进去煮粥吃，这样将要熟的时候可以放蜂蜜，有些人担心破坏维生素，也可以先把米煮好，差不多熟的时候再把蔬菜水果汁放进去，将要吃的时候再调一点蜂蜜进去，这样就能够保全蔬菜汁里面的维生素。',
      en: 'Minor Snow requires clearing before tonifying — first clear the intestines, then nourish gently. Apple-carrot porridge: apple 150g, cabbage 150g, carrot 100g — mash and extract juice, cook with rice as porridge, add honey when nearly done. To preserve vitamins, cook rice first, add vegetable-fruit juice near the end, then honey before eating.'
    },
    diet: {
      zh: '苹果胡萝卜粥：苹果一百五十克，包菜一百五十克，胡萝卜一百克，剁成泥以后把汁滤出来，然后再放米进去煮粥吃，将要熟的时候可以放蜂蜜。',
      en: 'Apple-carrot porridge: apple 150g, cabbage 150g, carrot 100g — mash, extract juice, cook with rice, add honey when almost done.'
    },
    herbalRecipe: {
      zh: '苹果一百五十克，包菜一百五十克，胡萝卜一百克，粳米适量，蜂蜜适量。',
      en: 'Apple 150g, cabbage 150g, carrot 100g, rice, honey to taste.'
    },
    exercise: {
      zh: '冬季里面适合于让阳气归根，让阳气收藏于肾，不要剧烈运动，精神内守。',
      en: 'In winter, let yang qi return to root and be stored in kidneys. Avoid vigorous exercise.'
    },
    avoidance: {
      zh: '小雪、大雪、冬至、小寒要防寒邪，我们人在这些时间就要用汤水来滋养。小雪是欲补先清，首先要清肠。',
      en: 'Prevent cold pathogen during Minor Snow. Clear the intestines before tonifying.'
    }
  },

  // 22 - 大雪
  {
    index: 22,
    name: { zh: '大雪', en: 'Major Snow' },
    season: 'winter',
    advice: {
      zh: '大雪是最适合于进补的时候，"小雪应清肠，大雪宜进补"。一年四季二十四个节气真正能够进补的就是大雪这个节气，大雪这个节气里面你怎么补都能够吸收，效果最好。所以我们这个时候要做好内在阳气的保养封藏工作，在大雪这个节气里面不要熬夜，不要剧烈运动，精神内守。对于所有的人都适合的大雪这个节气当然就是八珍汤了，八珍汤也就是四君子汤加上四物汤，四君子能够补气，四物能够补血，气血双补。当然如果你身体很健康，就在大雪这个节气里面喝一剂八珍汤就好了，如果觉得想利用大雪这个节气来进补的话，就整个十五天你都喝这个八珍汤，一般都是不会上火的，当然如果你本来就湿热很重，你要先清湿热。',
      en: 'Major Snow is the best time for tonifying in the entire year. "Minor Snow clears intestines, Major Snow is for tonics." This is the only solar term where any tonic is well absorbed. Protect inner yang qi: no late nights, no vigorous exercise, maintain inner tranquility. Eight-Treasure Soup (Ba Zhen Tang = Four Gentlemen + Four Substances) supplements both qi and blood. One dose if healthy; drink throughout the full 15 days for deeper tonification.'
    },
    diet: {
      zh: '八珍汤：四君子汤加上四物汤，四君子能够补气，四物能够补血，气血双补。如果你身体很健康，就在大雪这个节气里面喝一剂八珍汤就好了，如果觉得想利用大雪这个节气来进补的话，就整个十五天你都喝这个八珍汤，一般都是不会上火的，当然如果你本来就湿热很重，你要先清湿热。',
      en: 'Eight-Treasure Soup: Four Gentlemen (qi) + Four Substances (blood). Drink one dose if healthy, or daily for the full 15 days for deep tonification. Clear dampness-heat first if you have it.'
    },
    herbalRecipe: {
      zh: '对于所有的人都适合的大雪这个节气当然就是八珍汤了，八珍汤也就是四君子汤加上四物汤，四君子能够补气，四物能够补血，气血双补。当然如果你身体很健康，就在大雪这个节气里面喝一剂八珍汤就好了，如果觉得想利用大雪这个节气来进补的话，就整个十五天你都喝这个八珍汤，一般都是不会上火的，当然如果你本来就湿热很重，你要先清湿热。',
      en: 'Eight-Treasure Soup is suitable for everyone during Major Snow: Four Gentlemen Decoction (Ginseng, Atractylodes, Poria, Licorice) for qi + Four Substances Decoction (Angelica, Ligusticum, White Peony, prepared Rehmannia) for blood. If healthy, one dose suffices; for tonification, drink throughout the 15-day period. Generally won\'t cause excess heat, but clear dampness-heat first if needed.'h qi and blood.'
    },
    exercise: {
      zh: '在大雪这个节气里面不要熬夜，不要剧烈运动，精神内守。',
      en: 'During Major Snow: no late nights, no vigorous exercise, maintain inner tranquility and spirit.'
    },
    avoidance: {
      zh: '小雪、大雪、冬至、小寒要防寒邪，我们人在这些时间就要用汤水来滋养。如果你本来就湿热很重，你要先清湿热再进补。',
      en: 'Prevent cold pathogen. Use soups for nourishment. Clear dampness-heat before tonifying if you have it.'
    }
  },

  // 23 - 冬至
  {
    index: 23,
    name: { zh: '冬至', en: 'Winter Solstice' },
    season: 'winter',
    advice: {
      zh: '冬至的时候适合于养阳气，冬至是白天最短，夜晚最长的一天，冬至一阳生，阴阳转换的时刻，冬至对应的这个就是复卦，地雷复，最下面一个是阳爻，是一点阳气萌生的时候，所以古人有这个养生智慧，他也很重视这一天，静养阳气，不要干扰阴阳的转化和阳气的萌生。这个时候我们就可以吃四逆汤，前面夏至里面就讲过了四逆汤，也就是制附片十克先煎一小时，干姜十克，炙甘草十克水煎服就可以了。也可以用肉苁蓉十五克（内蒙古大家如果去过就知道那边会产那种肉苁蓉，称为沙漠人参），然后加一点大米适量煮粥吃，也是能够养阳气的一个食疗方。',
      en: 'Winter Solstice is for nourishing yang qi. It has the shortest day and longest night — the moment of yin-yang transition (yi yang sheng, one yang is born). Corresponds to the Fu hexagram (Earth over Thunder). Quietly nurture yang qi without disturbing the transition. Take Sini Decoction: prepared Aconite 10g (pre-boil 1 hour), dried ginger 10g, roasted licorice 10g. Or Cistanche porridge: Cistanche 15g with rice.'
    },
    diet: {
      zh: '也可以用肉苁蓉十五克（内蒙古大家如果去过就知道那边会产那种肉苁蓉，称为沙漠人参），然后加一点大米适量煮粥吃，也是能够养阳气的一个食疗方。',
      en: 'Cistanche 15g (called "desert ginseng") cooked with rice as porridge — a food therapy for nourishing yang qi.'
    },
    herbalRecipe: {
      zh: '四逆汤：制附片十克先煎一小时，干姜十克，炙甘草十克水煎服。肉苁蓉粥：肉苁蓉十五克，大米适量煮粥吃。',
      en: 'Sini Decoction: prepared Aconite 10g (pre-boil 1 hour), dried Ginger 10g, roasted Licorice 10g. Cistanche porridge: Cistanche 15g with rice.'
    },
    exercise: {
      zh: '冬至是阳气开始萌生的关键时刻，静养阳气，不要干扰阴阳的转化和阳气的萌生。最好不做很累的事情，或者最好能够闭闭关，养一下气。',
      en: 'Winter Solstice is the critical moment when yang qi begins to sprout. Quietly nurture it without disturbance. Avoid exhausting activities; retreat and conserve qi.'
    },
    avoidance: {
      zh: '小雪、大雪、冬至、小寒要防寒邪。冬至、夏至这两天最好不做很累的事情，如果吃西药，除了每一天必服的、不服会出问题的之外，这两天最好是不吃西药，因为西药其实是要耗元气。',
      en: 'Prevent cold pathogen. Avoid exhausting activities on Winter Solstice. Unless essential, avoid Western medicine on this day as it depletes yuan qi.'
    }
  },
];

export function getCurrentJieqi(date = new Date()) {
  const year = date.getFullYear();
  const dates = JIEQI_DATES[year];
  if (!dates) return { current: JIEQI_DATA[0], next: JIEQI_DATA[1] };

  const month = date.getMonth() + 1;
  const day = date.getDate();

  let currentIdx = 0;
  for (let i = dates.length - 1; i >= 0; i--) {
    const [m, d] = dates[i];
    if (month > m || (month === m && day >= d)) {
      currentIdx = i;
      break;
    }
  }

  const nextIdx = (currentIdx + 1) % 24;
  return {
    current: JIEQI_DATA[currentIdx],
    next: JIEQI_DATA[nextIdx],
    startDate: dates[currentIdx],
    endDate: dates[nextIdx] || (JIEQI_DATES[year + 1] ? JIEQI_DATES[year + 1][0] : null)
  };
}
