function isOpenSomeMenu() {
    return !!$('.header.open-maker').length || !!$('.header.open').length;
}

function getHeaderWidth() {
    var screenWidth = $(window).width();
    var headerWidth = $('.header').height() + $('.header__maker-nav').height();
    var fixedHeaderWidth = $('.header__fixed').height();

    return (screenWidth > 767 ? headerWidth : fixedHeaderWidth);
}

function scrollTo(block) {
    var scrollTop = block.offset().top - getHeaderWidth();

    $('html, body').animate({
        scrollTop: scrollTop
    }, 500);
}


$('.js-callback').on('click', function (evt) {
    evt.preventDefault();

    var screenWidth = $(window).width();
    if(screenWidth < 768) {
        controller.closeMobileMainNav();
    }

    scrollTo($('[data-scroll="callback"]'));
    var firstInput = $('.js-form').find('.input__input').eq(0);
    firstInput.focus();
    firstInput.parent().addClass('focus');
})