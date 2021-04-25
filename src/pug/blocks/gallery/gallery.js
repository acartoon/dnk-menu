function InitGallery() {
    this.gallery = $('.js-full-size-gallery');
    this.slider = '';
    // if(!this.gallery.length) return;
    console.log(this.gallery)
}

InitGallery.prototype.renderSlider = function () {
    var _this = this;
    var sliderWrapperTemplate = $('<div class="modal-gallery js-modal-gallery">\n' +
        '            <div class="modal-gallery__container swiper-container">\n' +
        '              <div class="modal-gallery__arrows">\n' +
        '                <div class="modal-gallery__arrow left"></div>\n' +
        '                <div class="modal-gallery__arrow right"></div>\n' +
        '              </div>\n' +
        '              <div class="modal-gallery__wrapper swiper-wrapper"></div>\n' +
        '            </div>\n' +
        '            <div class="modal-gallery__bullets bullet-list"></div>\n' +
        '          </div>');

    var sliderItemTemplate = $('<div class="modal-gallery__item swiper-slide"></div>');

   this.slider = sliderWrapperTemplate.clone();

    this.gallery.each(function () {
        var sliderItem = sliderItemTemplate.clone();
        sliderItem.append($(this).clone())
        _this.slider.find('.swiper-wrapper').append(sliderItem);
    });

}

InitGallery.prototype.initSlider = function () {
    var slider = $('.js-modal-gallery');
    var swiperWrapper = slider.find('.swiper-container');

    var swiper = new Swiper(swiperWrapper[0], {
        slidesPerView: 'auto',
        spaceBetween: 0,
        navigation: {
            nextEl: slider.find('.modal-gallery__arrow.right')[0],
            prevEl: slider.find('.modal-gallery__arrow.left')[0],
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

InitGallery.prototype.init = function () {
    this.renderSlider();

    $('.modal .modal__inner').append(this.slider);
    this.openModal();
    this.initSlider();

}

InitGallery.prototype.openModal = function () {
    $('.modal').addClass('open');
    overflowHidden();
}

// var gallery = new InitGallery();
// gallery.init();