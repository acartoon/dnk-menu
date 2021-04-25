$('.js-custom-slider').each(function () {
    var sliderParams = {
        slider: $(this),
        sliderTrack: 'custom-slider__slider-track',
        btnPrev: 'custom-slider__prev',
        btnNext: 'custom-slider__next',
        bulletContainer: 'custom-slider__bullet-list',
        bulletTemplate: $('<li class="custom-slider__bullet-item"></li>'),
        isNeedBtn: false,
        isNeedbullet: true,

    }
    var certificateSlider = new CustomSlider(sliderParams);
    certificateSlider.init()
})





function initSliderVideo() {
    var slider = $('.js-slider-video');

    if(!slider.length) return;
    var container = slider.find('.swiper-container');

    var swiper = new Swiper(container[0], {
        slidesPerView: 'auto',
    })
}

initSliderVideo();