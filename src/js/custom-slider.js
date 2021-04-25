function CustomSlider(params) {
    this.isNeedBtn = params.isNeedBtn ? params.isNeedBtn : false;
    this.isNeedbullet = params.isNeedbullet ? params.isNeedbullet : false;
    this.slider = params.slider;
    this.sliderTrack = params.slider.find('.' + params.sliderTrack);
    this.btnPrev = params.btnPrev ? params.slider.find('.' + params.btnPrev) : false;
    this.btnNext = params.btnNext ? params.slider.find('.' + params.btnNext) : false;
    this.bulletContainer = params.slider.find('.' + params.bulletContainer);
    this.bulletTemplate = params.bulletTemplate ? params.bulletTemplate : false;
    this.currTranslate = 0;
    this.currentSlide = 0;
    this.activeBulletClass = 'active';
    this.countSlides = this.sliderTrack.children().length - 1;
    this.steps = {
        FORVARD_FIRST: 'first',
        FORWARD_LAST: 'forward_last',
        NEXT: 'next',
        PREV: 'preview',
        BACK_FIRST: 'back_first',
        BACK_LAST: 'back_last',
    }
}

CustomSlider.prototype.init = function () {
    if(this.isNeedBtn) {
        this.watchersBtn();
    }
    this.swipe();

    if(this.isNeedbullet) {
        this.renderBullets();
        this.watchersBullet();
    }
    var _this = this;

    $(window).resize(function () {
        _this.goToSlide(_this.currentSlide);
    })
}

CustomSlider.prototype.markBullet = function (activeBullet) {
    this.bulletContainer.find('.' + this.activeBulletClass).removeClass(this.activeBulletClass);
    this.bulletContainer.children().eq(activeBullet).addClass(this.activeBulletClass);
}


CustomSlider.prototype.markButton = function () {
    this.btnPrev.attr('disabled', this.currentSlide == 0);
    this.btnNext.attr('disabled', this.currentSlide == this.countSlides);
}

CustomSlider.prototype.renderBullets = function () {
    for(var i = 0; i <= this.countSlides; i++) {
        var bullet = this.bulletTemplate.clone();
        bullet.text(i+1);
        bullet.attr('data-certificate-certificateSlider-number', i);
        this.bulletContainer.append(bullet);
    }
    this.bulletContainer.children().eq(0).addClass(this.activeBulletClass);
}

CustomSlider.prototype.watchersBullet = function () {
    var _this = this;
    this.bulletContainer.find('.custom-slider__bullet-item').on('click', function () {
        var sliderNumber = Number($(this).attr('data-certificate-certificateSlider-number'));
        _this.goToSlide(sliderNumber);
    })
}

CustomSlider.prototype.watchersBtn = function () {
    var nextStep = $.proxy(this.nextStep, this);
    var prevStep = $.proxy(this.prevStep, this);

    this.btnNext.on('click', nextStep);
    this.btnPrev.on('click', prevStep);
}

CustomSlider.prototype.endSwipe = function (distance, direction) {
    switch (direction) {
        case 'left' : //������
            this.nextStep();
            break;

        case 'right': //�����
            this.prevStep()
            break;
    }
}

CustomSlider.prototype.swipe = function () {
    var _this = this;

    function preventDefault(e) {
        e.preventDefault();
    }

    this.slider.swipe({
        swipeStatus:function (event, phase, direction, distance) {

            if (direction == 'left') {
                _this.slider.find('a').on('click', preventDefault);
                _this.transformSlider(_this.currTranslate - distance);
            } else if (direction == 'right') {
                _this.slider.find('a').on('click', preventDefault);
                _this.transformSlider(_this.currTranslate + distance);
            }
            if(phase =="cancel" || phase =="end") {
                _this.endSwipe(distance, direction);
            }

            if(phase =="cancel") {
                setTimeout(function () {
                    _this.slider.find('a').off('click', preventDefault);
                }, 500)
            }

        },
        triggerOnTouchEnd:false,
        threshold:10000,
        //maxTimeThreshold:5000,
        fingers:'all'
    })
}

CustomSlider.prototype.goToSlide = function (numberSlide) {
    var translateX;
    if(numberSlide != 0 && numberSlide != this.countSlides) {
        translateX = ((numberSlide - 1) * this.getSlideWidth()) + this.firstStepTranslate();
    } else if(numberSlide == this.countSlides) {
        translateX = ((numberSlide - 2) * this.getSlideWidth()) + this.firstStepTranslate() + this.lastStepTranslate();
    } else if (numberSlide == 0) {
        translateX = 0;
    }
    this.currTranslate = -translateX;
    this.translateSlider(this.currTranslate);
    this.currentSlide = numberSlide;
    if(this.isNeedBtn) {
        this.markButton();
    }
    if(this.isNeedbullet) {
        this.markBullet(this.currentSlide);
    }
}

CustomSlider.prototype.nextStep = function () {
    console.log(this.currentSlide)
    var step;
    if(this.currentSlide == 0) {
        step = this.steps.FORVARD_FIRST;
    } else if(this.currentSlide == this.countSlides - 1) {
        step = this.steps.FORWARD_LAST;
    } else if(this.currentSlide == this.countSlides) {
        //return;
    } else {
        step = this.steps.NEXT;
    }
    this.stepsSlide(step);
}

CustomSlider.prototype.prevStep = function () {
    var step;
    if(this.currentSlide == 0) {
        //return;
    } else if(this.currentSlide == 1) {
        step = this.steps.BACK_FIRST;
    } else if(this.currentSlide == this.countSlides) {
        step = this.steps.BACK_LAST;
    } else {
        step = this.steps.PREV;
    }
    this.stepsSlide(step);

}

CustomSlider.prototype.getSlideWidth = function() {
    return this.sliderTrack.children().eq(0).outerWidth(true);
}

CustomSlider.prototype.containerWidth = function() {
    return this.sliderTrack.width();
}

CustomSlider.prototype.translateSlider = function(width) {
    this.transformSlider(width);
    this.sliderTrack.css('transition', 'transform 350ms ease-in-out');
}

CustomSlider.prototype.transformSlider = function(width) {
    this.sliderTrack.css('transition', '');
    this.sliderTrack.css('transform', 'translate3d(' + width + 'px, 0px, 0px)');
}

CustomSlider.prototype.firstStepTranslate = function () {
    var slideWidth = this.getSlideWidth();
    var containerWidth = this.containerWidth();
    return (slideWidth * 1.5) - (containerWidth/2);
}

CustomSlider.prototype.lastStepTranslate = function () {
    var slideWidth = this.getSlideWidth();
    var containerWidth = this.containerWidth();
    return slideWidth - (containerWidth - slideWidth)/2;
}

CustomSlider.prototype.stepsSlide = function (step) {

    switch (step) {
        case this.steps.FORVARD_FIRST:
            this.currTranslate = this.firstStepTranslate() * -1;
            this.currentSlide += 1;
            break;

        case this.steps.BACK_FIRST:
            this.currTranslate = this.currTranslate + this.firstStepTranslate();
            this.currentSlide -=1;
            break;

        case this.steps.FORWARD_LAST:
            this.currTranslate = this.currTranslate - this.lastStepTranslate();
            this.currentSlide += 1;
            break;

        case this.steps.BACK_LAST:

            this.currTranslate = this.currTranslate + this.lastStepTranslate();
            this.currentSlide -= 1;
            break;

        case this.steps.NEXT:
            this.currTranslate = this.currTranslate - this.getSlideWidth();
            this.currentSlide += 1;
            break;

        case this.steps.PREV:
            this.currTranslate = this.currTranslate + this.getSlideWidth();
            this.currentSlide -= 1;
            break;
    }

    this.translateSlider(this.currTranslate);
    if(this.isNeedBtn) {
        this.markButton();
    }
    if(this.isNeedbullet) {
        this.markBullet(this.currentSlide);
    }
}