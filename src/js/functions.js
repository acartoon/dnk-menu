function overflowHidden() {
    $('html').css('overflow', 'hidden');
}

function overflowInherit() {
    $('html').css('overflow', 'inherit');
}

function getScrollbarSize() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';
    // add innerdiv
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    // remove divs
    outer.parentNode.removeChild(outer);

    var scrollWidth;

    if(document.body.offsetHeight > window.innerHeight) {
        scrollWidth = widthNoScroll - widthWithScroll;
    } else {
        scrollWidth = 0;
    }
    return scrollWidth;
}
//возвращает true если блок находится выше окна браузера
function isTop(block, scrollTop) {
    // var scrollTop = $(window).scrollTop();
    var offsetTop = block.offset().top;

    return offsetTop < scrollTop;
}

function inViewport(block, scrollTop) {
    //var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var headerHeight = $('.header').height();

    var offsetTop = block.offset().top;
    var offsetBottom = block.outerHeight();
    var bottomY = offsetTop + offsetBottom;

    var isVisibilityTop = (offsetTop > scrollTop) && (offsetTop < scrollTop + windowHeight);
    var isVisibilityBottom = (bottomY > scrollTop) && (bottomY < scrollTop + windowHeight);

    //если верхняя часть и нижняя часть находится в рамках окна
    if(isVisibilityTop) {
        return true;
    }

    // if(isVisibilityTop && isVisibilityBottom) {
    //     return true;
    // }
    //
    // if(et > wt && et < wt + wh) {
    //     return console.log(true)
    //
    // }
}

//отрисовывает нумерацию у заголовком
function initCounterHeaders() {
    var counters = $('.js-counter-title');
    if(!counters.length) return;

    counters.each(function (i) {
        var currCounter = i + 1;
        var count = currCounter < 10 ? '0' + currCounter : currCounter;
        $(this).text(count);
    })

}

initCounterHeaders()

$('.js-open-region').on('click', function () {
    alert('тут будет модалка выбора города');
})