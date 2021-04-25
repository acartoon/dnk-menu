function ShowImgFloatNav() {
    this.img = $('.js-float-nav-img');
    this.init();
}

ShowImgFloatNav.prototype.init = function() {
    if(!this.img.length) return;
    this.heightBlock = $('.float-nav__img-wrap').outerHeight();
    this.resize();
    this.watchers();

}
ShowImgFloatNav.prototype.watchers = function() {
    var _this = this;
    $('.js-float-nav').on('mouseenter', function () {
        _this.img.height(_this.heightBlock);
    })

    $('.js-float-nav').on('mouseleave', function () {
        _this.img.css('height', '');
    })

}

ShowImgFloatNav.prototype.resize = function () {
    var _this = this;

    $(window).resize(function () {
        _this.heightBlock = $('.float-nav__img-wrap').outerHeight();

    })
}

function initHoverFloat() {
    var img = $('.js-float-nav-img');
    if(!img.length) return;
    var heightBlock = $('.float-nav__img-wrap').outerHeight();

    $('.js-float-nav').on('mouseenter', function () {
        img.height(heightBlock);
    })

    $('.js-float-nav').on('mouseleave', function () {
        img.css('height', '')
    })
}

function initFloatNav() {
    var floatNav = $('.js-float-nav');
    var container = floatNav.find('.swiper-container');

    if(!floatNav.length) return;
    var activeSlide = $('.float-nav__item.active').index();
    var countSlides = $('.float-nav__item').length;


    function visibleArrows() {
        var item = $('.float-nav__item');
        var arrows = $('.float-nav__arrow');
        var itemWidth = item.width();
        var itemCount = item.length;
        var screenWidth = $(window).width();
        var isItemOutside = (itemWidth * itemCount) > screenWidth;

        if(isItemOutside) {
        arrows.removeClass('hidden');
        } else {
        arrows.addClass('hidden');
        }
    }


    var swiper = new Swiper(container[0], {
        slidesPerView: 'auto',
        spaceBetween: 0,
        initialSlide: activeSlide,
        centeredSlides: true,
        // loop: countSlides > 4 ? true: false,
        navigation: {
            nextEl: floatNav.find('.swiper-arrow.right')[0],
            prevEl:floatNav.find('.swiper-arrow.left')[0],
            disabledClass: 'disabled'
        }
    })

    visibleArrows();

    $(window).resize(function () {
        visibleArrows();
    })
}

initFloatNav();

var test = new ShowImgFloatNav();
// initHoverFloat();

