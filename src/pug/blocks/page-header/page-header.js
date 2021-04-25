function scrollPageHeader() {
    var jarallax = $('.jarallax');
    var screenWidth = $(window).width();
    var headerHeight = screenWidth > 768 ? $('.header__in').height() : $('.header__fixed').height();

    if(!jarallax.length) return;

    $(window).scroll(function (evt) {
        var scrollTop = $(this).scrollTop();

        var titleHeight = $('.js-scroll-to').offset().top - headerHeight;

        var co = scrollTop/titleHeight;
        jarallax.css('opacity', 1 - co);

        jarallax.css('transform', 'translate3d(0px, '+ scrollTop/3 + 'px, 0px)')
    })

    // $('.jarallax').jarallax({
    //     speed: 0.5,
    //     imgWidth: 1440,
    //     imgHeight: 720,
    //     setDefault: {marginLeft:'-20px'}
    // })
}

scrollPageHeader();

function _scrollPageHeader() {
    var jarallax = $('.jarallax');
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "200%" // this works just fine with duration 0 as well
            // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
            // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        }
    });

    new ScrollMagic.Scene({
        triggerElement: jarallax[0]
    })
        .setPin(jarallax[0], {pushFollowers: false})
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
}
