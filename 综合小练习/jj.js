// 在文本框内输入
// 点击按钮创建对象后验证是否为空及合法
// 设置本地存储在进行渲染点击删除删除在列表对应的一项
// 本地数据也删除
// 数据可视化
// 通过类创建对象
class Student {
    constructor(stuname, score, salary) {
        this.stuname = stuname
        this.stuscore = score
        this.stusalary = salary
    }
}
// 获取对象。
let stuName = document.querySelector('#username');
let stuScore = document.querySelector('#score');
let stuSalary = document.querySelector('#salary');
let tbody = document.querySelector('tbody');

$('.btn').on('click', function () {
    // alert('12')
    let stuname = stuName.value
    let score = stuScore.value
    let salary = stuSalary.value

    // console.log(stuname, score, salary);
    // 判断
    if (stuname == '') {
        alert('请输入名字')
        return
    }
    if (isNaN(score) == true || isNaN(salary == true)) {
        alert('请输入数字')
        stuScore.value = '';
        stuSalary.value = '';

    } else {
        // 创建对象
        let stu = new Student(stuname, score, salary)
        // 本地存储获取
        let stuary = getData()
        // 如果本地存储没有设置新的本地存储
        stuary.push(stu)
        // 更新本地
        localStorage.setItem('stuList', JSON.stringify(stuary))
        // 加载到页面
        loadtable()
        stuname.value = ''
        stuScore.value = '';
        stuSalary.value = '';
        loadData_line();

        loadData_bar();

    }
})
// 本地获取
function getData() {
    let list = localStorage.getItem('stuList')
    if (list == null) {
        return []
    } else {
        return JSON.parse(list)
    }
}
loadtable()

// 加载表格jq
function loadtable() {
    // 向标签内部添加首先清空
    $('tbody').empty()
    // 从本地存储获取
    let stuary = getData()
    // console.log(stuary);
    // 遍历
    $.each(stuary, (index, item) => {

       
        $('tbody').append(
            `<tr>
    <td>${item.stuname}</td>
         <td>${item.stuscore}</td>
         <td>${item.stusalary}</td>
         <td>
             <a href="javascript:;" class="del"  data-msg="${index}">删除</a>
         </td>
         </tr>
    `


        )

    });
    // stuary.forEach(function (item, index) {
    //     // 创建元素
    //     let tr = document.createElement('tr');
    //     tr.innerHTML = `
    //                         <td>${item.stuname}</td>
    //                         <td>${item.stuscore}</td>
    //                         <td>${item.stusalary}</td>
    //                         <td>
    //                             <a href="javascript:;" class="del"  data-msg="${index}">删除</a>
    //                         </td>
    //                     `;
    //     // 将创建好的元素添加到tbody标签中
    //     tbody.appendChild(tr);
    // });

}
// 点击删除事件
$(tbody).on('click', '.del', function () {
    if (confirm('确定要删除')) {
        // 获取a对应的索引
        let inde=$(this).attr('data-msg')
        //淡出效果
        $(this).parents('tr').fadeOut('fast','linear',function (){
            // 页面移除当前标签
            $(this).remove()
            // 本地移除
            let list= getData()
            list.splice(inde,1)
            // 更新本地存储和页面渲染
            localStorage.setItem('stuList',JSON.stringify(list))
            loadtable()

            loadData_line();

            loadData_bar();

        })
    }
})
// 数据可视化
// g) 封装一个用来获取学生姓名, 考试成绩, 薪资方法
let getMsg={
    getNnames: function () {
        let stu=[]
        let list=getData()
        // 遍历本地数据
        $.each(list,function (item) {
            stu.push(item.stuname)
        })
        return stu
    },
        //获取成绩
        getScores: function () {
            let stu = [];
            let list = getData();
            // 遍历本地数据获取所有学生姓名
            list.forEach(function (item) {
                stu.push(item.stuscore);
            });
            return stu;
        },
        //获取薪资
        getSalary: function () {
            let stu = [];
            let list = getData();
            // 遍历本地数据获取所有学生姓名
            list.forEach(function (item) {
                stu.push(item.stusalary);
            });
            return stu;
        }
    
}
loadData_line() 
// 渲染折线图
function loadData_line() {
    let  myChart = echarts.init(document.getElementById('line'));
    let option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            //姓名, 通过程序获取姓名
            data: getMsg.getNnames()
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            // 学生考试成绩, 通过程序获取
            data: getMsg.getScores(),
            type: 'line',
            areaStyle: {}
        }]
    };
    myChart.setOption(option);
    //判断当前是否有数据,如果没有数据则需要将统计图移除
    let list=getData()
    if (list.length==0) {
        // 清空属性和标签
        let line_box = document.querySelector('#line');
        //移除标签身上的属性
        line_box.removeAttribute('_echarts_instance_');
        //清空标签中的内容
        line_box.innerHTML = '';
    }
}
function loadData_bar() {
    let myChart = echarts.init(document.getElementById('bar'));
    let option = {
        xAxis: {
            type: 'category',
            data: getMsg.getNnames()
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: getMsg.getSalary(),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }]
    };
    myChart.setOption(option);

    //判断当前是否有数据,如果没有数据则需要将统计图移除
    let list = getData();
    if (list.length == 0) {
        //获取对应的标签
        let line_box = document.querySelector('#bar');
        //移除标签身上的属性
        line_box.removeAttribute('_echarts_instance_');
        //清空标签中的内容
        line_box.innerHTML = '';
    }
}
loadData_bar();
