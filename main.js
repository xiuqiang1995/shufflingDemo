let $buttons = $('#buttonWrapper>button');
let $slides = $('#slides');
//获取所有幻灯片
let $images = $slides.children('img')
    //假的第一页
let $firstCopy = $images.eq(0).clone(true);
//假的最后一页
let $lastCopy = $images.eq($images.length - 1).clone(true);
//假的第一页加到最后一页后面
$slides.append($firstCopy);
//假的最后一页加到第一页前面
$slides.prepend($lastCopy);
//幻灯片整体左移275px，不然第一页显示的是假的最后一页
$slides.css({ transform: 'translateX(-275px)' })
    //当前页下标
let current = 0;
//轮播定时器触发间隔
let intervalTime = 1000;

//上一页、下一页
$(next).on('click', function() {
    goToSlide(current + 1);
})
$(previous).on('click', function() {
        goToSlide(current - 1);
    })
    //自动轮播
var timer = setInterval(function() {
        goToSlide(current + 1)
    }, intervalTime)
    //鼠标移入暂停、移出恢复
$('.container').on('mouseenter', function() {
    window.clearInterval(timer);
}).on('mouseleave', function() {
    timer = setInterval(function() {
        goToSlide(current + 1)
    }, intervalTime)
})

$('#buttonWrapper').on('click', 'button', function(e) {
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlide(index);
})

function goToSlide(index) {
    if (index > $images.length - 1) {
        index = 0;
    } else if (index < 0) {
        index = $images.length - 1;
    }
    if (current === $images.length - 1 && index === 0) {
        //从最后一张到第一张,先到假的第一张上，再隐藏幻灯片，再瞬间切换到真的第一张,再显示幻灯片
        //为什么要用 ` `
        $slides.css({ transform: `translateX(${- (index+4) * 275}px)` }).one('transitionend', function() {
            //动画结束后 （这个过程有点久，导致bug出现）
            //hide() show() 连用时，浏览器会忽略hide 导致hide无效 使用offset断开这两个操作便可以使hide生效
            $slides.hide().offset();
            $slides.css({ transform: `translateX(${- (index+1) * 275}px)` }).show();
        })
    } else if (current === 0 && index === $images.length - 1) {
        //从第一张到最后一张
        $slides.css({ transform: 'translateX(0px)' }).one('transitionend', function() {
            //动画结束后
            //hide() show() 连用时，浏览器会忽略hide 导致hide无效 使用offset断开这两个操作便可以使hide生效
            $slides.hide().offset();
            $slides.css({ transform: `translateX(${- (index+1) * 275}px)` }).show();
        })
    } else {
        $slides.css({ transform: `translateX(${- (index+1) * 275}px)` })
    }
    current = index;
}