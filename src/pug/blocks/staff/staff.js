function staffGrid() {
    var staffBlock = $('.js-staff');
    if(!staffBlock.length) return;


    staffBlock.each(function () {
        var staffItem = $(this).find('.js-staff-content');
        if(!staffItem.length) return;
        applyWight(staffItem)
    })

    $(window).resize(function () {
        $('.js-staff-content').parent().css('width', '');
        var screenWidth = $(window).width();

        if(screenWidth > 767) {
            staffBlock.each(function () {
                var staffItem = $(this).find('.js-staff-content');
                if(!staffItem.length) return;
                applyWight(staffItem)
            })
        }
    })

    function applyWight(content) {
        var maxWidth = 0;

        content.each(function () {
            var width = $(this).width();
            maxWidth = width > maxWidth ? width : maxWidth;
        })

        content.each(function () {
            $(this).parent().css('width', maxWidth);
        })
    }
}

staffGrid();