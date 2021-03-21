$('.js-nav').mouseenter(function () {
    $('.main-menu').addClass('open');

    // var height = $(this).find($('.main-nav-dropdown__wrap')).innerHeight();
    // var newHeight = height > 320 ? height : 320;
    // $('.main-nav-dropdown').height(newHeight);

});

$('.js-nav').mouseleave(function () {
    $('.main-menu').removeClass('open')
});