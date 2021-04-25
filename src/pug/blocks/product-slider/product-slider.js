function initProductCardSlider() {
    var slider = $('.js-product-slider');
    if(!slider.length) return;
    var sliderContainer = slider.find('.swiper-container');

    var slidesCount = slider.find('.swiper-slide');
    if(slidesCount < 2) return;

    var swiper = new Swiper(sliderContainer[0], {
        slidesPerView: 'auto',
        spaceBetween: 0,
        grabCursor: true,
        navigation: {
            nextEl: slider.find('.swiper-arrow.right')[0],
            prevEl: slider.find('.swiper-arrow.left')[0],
            disabledClass: 'disabled'
        },
        pagination: {
            el: slider.find('.bullet-list')[0],
            type: 'bullets',
            bulletClass: 'bullet-list__item',
            bulletActiveClass: 'active',
        },
    })
}

initProductCardSlider();

