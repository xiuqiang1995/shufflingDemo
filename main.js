var allButtons = $('#buttons > span');
for (let index = 0; index < allButtons.length; index++) {
    $(allButtons[index]).on('click', function(e) {
        //jq api index() 获取当前选中元素是兄弟中的第几个
        var i = $(e.currentTarget).index();
        var n = i * -300;
        $('#images').css({
            transform: 'translate(' + n + 'px)'
        })
        m = i;
        //给按钮增加激活的样式
        activeBtn(allButtons.eq(m));
    })
}
//自动轮播
var m = 1;
activeBtn(allButtons.eq(0));
var size = allButtons.length;
var timerId = setTimer();
//鼠标移入时，暂停轮播
$('.window').on('mouseenter', function() {
        window.clearInterval(timerId);
    })
    //鼠标移出时，恢复轮播
$('.window').on('mouseleave', function() {
    timerId = setTimer();
})

function activeBtn($btn) {
    //siblings('.red') 接收一个选择器，找到具有该选择器兄弟节点
    //.removeClass('red') 移除它的red属性
    $btn.addClass('red').siblings('.red').removeClass('red');
}

function playSlide(index) {
    //eq(n % 3) 找到第 n%3 个元素，并包装成jq对象
    allButtons.eq(index).trigger('click')
}

function setTimer() {
    return setInterval(() => {
        console.log(new Date());
        playSlide(m % size);
        m++;
    }, 1000)
}