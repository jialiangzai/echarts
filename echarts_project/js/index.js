// !和~可以自定义执行函数 四种方式
(function () {
  // 切换
  $(".monitor .tabs").on("click", "a", function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    // console.log($(this).index());
    //   选取对应索引号的content
    $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
  });
})();
// 饼图 用自调用定义函数防止变量污染，可以使用相同变量
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie"));
  // 2. 指定配置项和数据
  let option = {
    // 颜色
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    tooltip: {
      // trigger 触发方式。  非轴图形，使用item的意思是放到数据对应图形上触发提示
      trigger: 'item',
      // 格式化提示内容：
      // a 代表series系列图表名称  
      // b 代表series数据名称 data 里面的name    
      // c 代表series数据值 data 里面的value   
      // d代表  当前数据/总数据的比例
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series: [
      {
        // 图表名称
        name: '面积模式',
        // 图表类型
        type: 'pie',
        // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
        // 饼形图半径。 可以是像素。也可以是百分比（ 基于DOM容器大小）第一项是内半径，第二项是外半径（通过它可以实现饼形图大小）
        radius: [30, 90],
        // 图表中心位置 left 50%  top 50%  距离图表DOM容器
        center: ['50%', '50%'],
        // radius 半径模式，另外一种是 area 面积模式
        roseType: 'radius',

        // 数据集 value 数据的值 name 数据的名称
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' }
        ],
        // 文字调整
        label: {
          fontSize: 10
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长
          length: 6,
          // 连接文字线长
          length2: 8
        }
      }
    ]
  }
  myChart.setOption(option)
  // 监听浏览器缩放，图表对象调用缩放resize函数 jq对象兼容性不好
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();
// 柱形图
!function () {
  var item = {
    name: '',
    value: 1200,
    // 单个数据图形的颜色
    itemStyle: {
      color: '#254065'
    },
    // 鼠标经过柱子颜色 鼠标进入高亮
    emphasis: {
      itemStyle: {
        color: '#254065'
      }
    },
    // 工具提示隐藏提示
    tooltip: {
      extraCssText: 'opacity:0',//注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
      // show:false也能实现不推荐
    },

  };

  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".bar"));
  // 2. 指定配置和数据
  var option = {

    // 工具提示
    tooltip: {
      // 触发类型  经过轴触发axis  经过轴触发item
      trigger: 'item',
      // axisPointer: {            // 坐标轴指示器，坐标轴触发有效  这个模块我们此时不需要删掉即可
      // type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      // }          
    },
    // 修改线性渐变色方式 1
    color: new echarts.graphic.LinearGradient(
      // (x1,y2) 点到点 (x2,y2) 之间进行渐变
      0, 0, 0, 1,
      [
        { offset: 0, color: '#00fffb' }, // 0 起始颜色
        { offset: 1, color: '#0061ce' }  // 1 结束颜色
      ]
    ),
    // 修改线性渐变色方式 2
    // color: {
    //   type: 'linear',
    //   x: 0,
    //   y: 0,
    //   x2: 0,
    //   y2: 1,
    //   colorStops: [{
    //     offset: 0, color: 'red' // 0% 处的颜色
    //   }, {
    //     offset: 1, color: 'blue' // 100% 处的颜色
    //   }],
    //   globalCoord: false // 缺省为 false
    // },
    // 图表边界控制
    // 直角坐标系内绘图网格（区域）
    grid: {
      top: '3%',
      right: '3%',
      bottom: '3%',
      left: '0%',
      //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
      containLabel: true,
      // 是否显示直角坐标系网格
      show: true,
      //grid 四条边框的颜色
      borderColor: 'rgba(0, 240, 255, 0.3)'
    },
    // 控制x轴
    // 控制x轴
    xAxis:
    {
      // 使用类目，必须有data属性
      type: 'category',
      // 使用 data 中的数据设为刻度文字
      data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],        // 刻度设置
      axisTick: {
        // true意思：图形和刻度居中中间
        // false意思：图形在刻度之间
        alignWithLabel: true,
        // 不显示刻度
        //  show: false
      },
      // x坐标轴文字标签样式设置
      axisLabel: {
        color: '#4c9bfd',
        fontSize: 11,
        interval: 0//间隔显示，间隔几个元素显示
      },
      // x坐标轴颜色设置
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 240, 255, 0.3)',
          // width:8,  x轴线的粗细
          // opcity: 0,   如果不想显示x轴线 则改为 0
        }
      }
    },
    // 控制y轴
    yAxis: [
      {
        type: 'value',
        // 使用 data 中的数据设为刻度文字
        axisTick: {
          // 不显示刻度
          show: false
        },
        // y坐标轴文字标签样式设置
        axisLabel: {
          color: '#4c9bfd',
        },
        // y坐标轴颜色设置
        axisLine: {
          lineStyle: {
            color: 'rgba(0, 240, 255, 0.3)',
            // width:8,  x轴线的粗细
            // opcity: 0,   如果不想显示x轴线 则改为 0
          }
        },
        // y轴 分割线的样式 
        splitLine: {
          lineStyle: {
            color: 'rgba(0, 240, 255, 0.3)'
          }
        }
      }
    ],
    series: [
      {
        // 图表数据名称
        name: '用户统计',
        // 图表类型
        type: 'bar',
        // 柱子宽度
        barWidth: '60%',
        // 数据
        data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
      },

    ]
  };
  // 3. 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}();
// 第三列 第一个订单
// 订单功能
// (function () {
//   var data = {
//     day365: { orders: '20,301,987', amount: '99834' },
//     day90: { orders: '301,987', amount: '9834' },
//     day30: { orders: '1,987', amount: '3834' },
//     day1: { orders: '987', amount: '834' }
//   }

//   // 1. 准备数据
//   // var data = [
//   //   { orders: '20,301,987', amount: '99834' },
//   //   { orders: '301,987', amount: '9834' },
//   //   { orders: '1,987', amount: '3834' },
//   //   { orders: '987', amount: '834' }
//   // ]
//   // 获取显示 订单数量 容器
//   var h4Orders = $('.order h4:eq(0)')
//   // 获取显示 金额数量 容器
//   var h4Amount = $('.order h4:eq(1)')
//   $('.order .filter').on('click', 'a', function () {
//     // console.log(this);
//     // 2. 点击切换激活样式
//     $(this).addClass('active').siblings().removeClass('active')
//     // 3. 点击切换数据
//     var currdata = data[$(this).index()]
//     // console.log(this.dataset.key);
//     let currdatao = data[this.dataset.sey].orders
//     let currdataa = data[this.dataset.sey].amount
//     h4Orders.html(currdatao)
//     h4Amount.html(currdataa)
//   })
//   // 4. 开启定时器切换数据
//   var index = 0
//   var $allTab = $('.order .filter a')
//   setInterval(function () {
//     index++
//     if (index >= 4) {
//       index = 0
//     }
//     $allTab.eq(index).click()
//   }, 2000)
// })();
// 订单功能
(function () {
  // 1. 准备数据
  var data = {
    day365: { orders: '20,301,987', amount: '99834' },
    day90: { orders: '301,987', amount: '9834' },
    day30: { orders: '1,987', amount: '3834' },
    day1: { orders: '987', amount: '834' }
  }
  // 获取显示 订单数量 容器
  var $h4Orders = $('.order h4:eq(0)')
  // 获取显示 金额数量 容器
  var $h4Amount = $('.order h4:eq(1)')
  $('.order').on('click', '.filter a', function () {
    // 2. 点击切换激活样式
    $(this).addClass('active').siblings().removeClass('active')
    // 3. 点击切换数据
    var currdata = data[this.dataset.sey]
    $h4Orders.html(currdata.orders)
    $h4Amount.html(currdata.amount)
  })
  // 4. 开启定时器切换数据
  var index = 0
  var $allTab = $('.order .filter a')
  setInterval(function () {
    index++
    if (index >= 4) index = 0
    $allTab.eq(index).click()
  }, 5000)
})();
// 销售统计模块// 折线图
(function () {
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
  }
  var myChart = echarts.init(document.querySelector(".line"));
  var option = {

    // 颜色
    color: ['#00f2f1', '#ed3f35'],
    //提示
    tooltip: {
      trigger: "axis"
    },
    // 图例组件
    legend: {
      textStyle: {
        color: '#4c9bfd' // 图例文字颜色
      },
      right: '10%' // 距离右边10%
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true,// 显示边框
      borderColor: '#012f4a',// 边框颜色
      containLabel: true// 包含刻度文字在内
    },

    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        // fontSize:11,
        interval: 0,
        color: '#4c9bfd' // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      boundaryGap: false  // 去除轴内间距
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false  // 去除刻度
      },
      axisLabel: {
        color: '#4c9bfd' // 文字颜色
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a' // 分割线颜色
        }
      }
    },
    series: [{
      name: '预期销售额',
      data: data.year[0],//不在使用固定数据使用动态数据，使用动态数据
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00f2f1'
      }
    }, {
      name: '实际销售额',
      data: data.year[1],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ed3f35'
      }
    }]

  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
  // 切换
  $('.sales .caption a').on('click', function () {

    $(this).addClass('active').siblings('a').removeClass('active')
    // 点击当前的对象把当前的索引给index，a的索引是从1开始
    index = $(this).index() - 1
    // 获取自定义属性名
    let attr = $(this).attr('data-type')//核心
    //  赋值
    option.series[0].data = data[attr][0]//a从1开始
    option.series[1].data = data[attr][1]
    myChart.setOption(option)
  })
  // 动画效果
  // - 开启定时器每隔3s，自动让a触发点击事件即可
  // - 鼠标经过sales，关闭定时器，离开开启定时器
  let index = 0//索引
  let timer = setInterval(function () {
    index++;
    if (index > 3) {
      index = 0
    }
    $('.sales .caption a').eq(index).click()
  }, 3000)
  // 鼠标经过sales，关闭定时器，离开开启定时器
  $('.sales').hover(function () {
    clearInterval(timer)
  }, function () {
    timer = setInterval(function () {
      index++;
      if (index > 3) {
        index = 0
      }
      $('.sales .caption a').eq(index).click()
    }, 3000)
  })
  // 此处有bug 点击事件和鼠标离开事件没有联系 点击事件点击哪个链接把索引复制给index
  $(this).index()


})();
// 销售模块 饼形图 半圆形 设置方式
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".gauge"));
  // 2. 指定数据和配置
  var option = {

    color: [new echarts.graphic.LinearGradient(
      // (x1,y2) 点到点 (x2,y2) 之间进行渐变
      0, 0, 0, 1,
      [
        { offset: 0, color: '#00fffb' }, // 0 起始颜色
        { offset: 1, color: '#0061ce' }  // 1 结束颜色
      ]
    ), '#12274d', 'transparent'],
    series: [
      {
        type: "pie",
        radius: ["130%", "150%"],
        //是否启用防止标签重叠策略
        // avoidLabelOverlap: false,
        // 移动下位置  套住50%文字
        center: ['48%', '80%'],
        //  旋转起始角度 
        startAngle: 180,
        // 鼠标进入扇形区不变大 老：hoverOffset(推荐) 新：selectedOffset 
        hoverOffset: 0,
        labelLine: {
          normal: {
            show: false
          }
        },
        // 第一个值加第二个值=第三个值 半分比=第一个值/第三个值
        // 保持数据一致
        data: [{ value: 75 }, { value: 25 }, { value: 100 }]
      }
    ]
  };
  // 3. 把数据和配置给实例对象
  myChart.setOption(option);
})();
// 热销
(function () {
  // 模拟ajax从后端获取数据
  var hotData = [
    {
      city: '北京',  // 城市
      sales: '25, 179',  // 销售额
      flag: true, //  上升还是下降
      brands: [   //  品牌种类数据
        { name: '可爱多', num: '9,086', flag: true },
        { name: '娃哈哈', num: '8,341', flag: true },
        { name: '喜之郎', num: '7,407', flag: false },
        { name: '八喜', num: '6,080', flag: false },
        { name: '小洋人', num: '6,724', flag: false },
        { name: '好多鱼', num: '2,170', flag: true },
      ]
    },
    {
      city: '河北',
      sales: '23,252',
      flag: false,
      brands: [
        { name: '可爱多', num: '3,457', flag: false },
        { name: '娃哈哈', num: '2,124', flag: true },
        { name: '喜之郎', num: '8,907', flag: false },
        { name: '八喜', num: '6,080', flag: true },
        { name: '小洋人', num: '1,724', flag: false },
        { name: '好多鱼', num: '1,170', flag: false },
      ]
    },
    {
      city: '上海',
      sales: '20,760',
      flag: true,
      brands: [
        { name: '可爱多', num: '2,345', flag: true },
        { name: '娃哈哈', num: '7,109', flag: true },
        { name: '喜之郎', num: '3,701', flag: false },
        { name: '八喜', num: '6,080', flag: false },
        { name: '小洋人', num: '2,724', flag: false },
        { name: '好多鱼', num: '2,998', flag: true },
      ]
    },
    {
      city: '江苏',
      sales: '23,252',
      flag: false,
      brands: [
        { name: '可爱多', num: '2,156', flag: false },
        { name: '娃哈哈', num: '2,456', flag: true },
        { name: '喜之郎', num: '9,737', flag: true },
        { name: '八喜', num: '2,080', flag: true },
        { name: '小洋人', num: '8,724', flag: true },
        { name: '好多鱼', num: '1,770', flag: false },
      ]
    },
    {
      city: '山东',
      sales: '20,760',
      flag: true,
      brands: [
        { name: '可爱多', num: '9,567', flag: true },
        { name: '娃哈哈', num: '2,345', flag: false },
        { name: '喜之郎', num: '9,037', flag: false },
        { name: '八喜', num: '1,080', flag: true },
        { name: '小洋人', num: '4,724', flag: false },
        { name: '好多鱼', num: '9,999', flag: true },
      ]
    }
  ]
  let supHTML = ''
  // 遍历
  $.each(hotData, (index, item) => {
    // <s class="${item.flag ? 'icon-up' : 'icon-down'}"></s>
    supHTML += `<li>
    <span>${item.city}</span>
    <span> ${item.sales} 
    <s class=${item.flag ? "icon-up" : "icon-down"}></s>
    </span>
    </li>`;
  })
  $('.sup').html(supHTML)
  // 渲染 此时li已经存在，推荐事件委托 看触发类型
  $('.sup ').on('mouseenter', 'li', function () {
    // 赋值index变量，实现同步，关联
    index = $(this).index()
    render($(this))
  })
  function render(jq) {
    //获取属性brands 值为数组
    let ar = hotData[jq.index()].brands
    let subHTML = ''
    $('.sub').html('')
    $.each(ar, (index, item) => {
      subHTML += `<li>
     <span>${item.name}</span>
     <span> ${item.num} 
     <s class=${item.flag ? "icon-up" : "icon-down"}></s>
     </span>
     </li>`
    })
    //  渲染右侧近30天
    $('.sub').html(subHTML)
    // console.log(ar);
    // 类名操作 激活当前的tab样式，删除其他tab的样式
    jq.addClass('active').siblings('li').removeClass('active')

  }
  // 默认显示近30天
  let index = 0 //默认第一次显示 不定义index直接赋值会报错
  $('.top .sup li').eq(0).mouseenter()//页面加载/刷新时候执行
  // 创建定时器
  let timer = setInterval(function () {
    index++;
    if (index >= 5) {
      index = 0
    }
    // $('.top .sup li').eq(index).mouseenter()
    render($('.top .sup li').eq(index))
  }, 2000)
  // 鼠标进入和离开事件
  $('.top').hover(function () {
    clearInterval(timer)
  }, function () {
    clearInterval(timer)
    timer = setInterval(function () {
      index++;
      if (index >= 5) {
        index = 0
      }
      // $('.top .sup li').eq(index).mouseenter()
      render($('.top .sup li').eq(index))
    }, 2000)
  });
})();
// (function () {
//   var myChart = echarts.init(document.querySelector(".geo"));
//   var data = [
//     {
//       name: '北京',
//       selected: false,
//       value: 4500000,
//     },
//     {
//       name: '天津',
//       selected: false,
//       value: 5000000,
//     },
//     {
//       name: '上海',
//       selected: false,
//       value: 5000000,
//     },
//     {
//       name: '重庆',
//       selected: false,
//       value: 5548400,
//     },
//     {
//       name: '河北',
//       selected: false,
//       value: 5881100,
//     },
//     {
//       name: '河南',
//       selected: false,
//       value: 5985000,
//     },
//     {
//       name: '云南',
//       selected: false,
//       value: 5488100,
//     },
//     {
//       name: '辽宁',
//       selected: false,
//       value: 5794150,
//     },
//     {
//       name: '黑龙江',
//       selected: false,
//       value: 5154800,
//     },
//     {
//       name: '湖南',
//       selected: false,
//       value: 5105440,
//     },
//     {
//       name: '安徽',
//       selected: false,
//       value: 5115450,
//     },
//     {
//       name: '山东',
//       selected: false,
//       value: 5485150,
//     },
//     {
//       name: '新疆',
//       selected: false,
//       value: 5548780,
//     },
//     {
//       name: '江苏',
//       selected: false,
//       value: 7856000,
//     },
//     {
//       name: '浙江',
//       selected: false,
//       value: 8043000,
//     },
//     {
//       name: '江西',
//       selected: false,
//       value: 5488400,
//     },
//     {
//       name: '湖北',
//       selected: false,
//       value: 5481100,
//     },
//     {
//       name: '广西',
//       selected: false,
//       value: 5500000,
//     },
//     {
//       name: '甘肃',
//       selected: false,
//       value: 5488100,
//     },
//     {
//       name: '山西',
//       selected: false,
//       value: 4584150,
//     },
//     {
//       name: '内蒙古',
//       selected: false,
//       value: 3568400,
//     },
//     {
//       name: '陕西',
//       selected: false,
//       value: 3848810,
//     },
//     {
//       name: '吉林',
//       selected: false,
//       value: 5545480,
//     },
//     {
//       name: '福建',
//       selected: false,
//       value: 4545510,
//     },
//     {
//       name: '贵州',
//       selected: false,
//       value: 5544510,
//     },
//     {
//       name: '广东',
//       selected: false,
//       value: 14974000,
//     },
//     {
//       name: '青海',
//       selected: false,
//       value: 5854440,
//     },
//     {
//       name: '西藏',
//       selected: false,
//       value: 5445510,
//     },
//     {
//       name: '四川',
//       selected: false,
//       value: 6972000,
//     },
//     {
//       name: '宁夏',
//       selected: false,
//       value: 5684510,
//     },
//     {
//       name: '海南',
//       selected: false,
//       value: 512640,
//     },
//     {
//       name: '台湾',
//       selected: false,
//       value: 4448450,
//     },
//     {
//       name: '香港',
//       selected: false,
//       value: 4154870,
//     },
//     {
//       name: '澳门',
//       selected: false,
//       value: 4454580,
//     },
//   ]; //各省地图颜色数据依赖value

//   option = {
//     backgroundColor: '#142452',
//     tooltip: {
//       trigger: 'item',
//     },
//     // 游标
//     visualMap: {
//       // orient: 'horizontal', //横置
//       type: 'continuous',
//       itemWidth: 16,
//       itemHeight: 120,
//       text: ['高', '低'],
//       showLabel: true,
//       seriesIndex: [0],
//       min: 4000000,
//       max: 10000000,
//       calculable: true, //开启游标
//       left: 50,
//       bottom: 30,
//       inRange: {
//         color: ['#8ED861', '#85CE4E', '#EED000', '#EEAE00', '#209FA9', '#F5903D', '#EE8C00', '#EE3B3B'],
//       },
//       textStyle: {
//         color: '#ffffff',
//         fontSize: 12,
//       },
//     },

//     legend: {
//       orient: 'vertical',
//       top: 'right',
//       left: 'bottom',
//       data: ['已完成', '进行中', '未完成'],
//       textStyle: {
//         //图例文字的样式
//         color: '#00FFFF',
//         fontSize: 12,
//       },
//     },

//     geo: {
//       map: 'china',
//       roam: false, //开关可移动可放大
//     },

//     series: [
//       {
//         name: '飞信消息发送量',
//         type: 'map',
//         mapType: 'china',
//         showLegendSymbol: false, //去掉指示点
//         itemStyle: {
//           normal: {
//             borderWidth: 1, //区域边框宽度
//             borderColor: '#00a6dc', //区域边框颜色
//             areaColor: '#224E7F', //区域颜色
//             label: {
//               show: false, //是否显示各省名称
//               textStyle: {
//                 color: '#ff5500', //显示各省名称颜色
//               },
//             },
//           },
//           emphasis: {
//             areaColor: '#f0690f', //区域颜色，鼠标悬停颜色
//             label: {
//               show: true, //鼠标悬浮时是否显示各省名称
//               textStyle: {
//                 color: '#fdf1f6', //鼠标悬浮时显示各省名称的颜色
//               },
//             },
//           },
//         },
//         data: data,
//       },
//     ],
//   };

//   myChart.setOption(option);
//   window.addEventListener('resize', function () {
//     myChart.resize()
//   });
// })()
