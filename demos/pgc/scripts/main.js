/**
 * Created by Samuel on 5/19/2015.
 */

/*
 Toggle Animation Variables
 */
var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    animateOverlayWidth = 168,
    animateOverlayDuration = 400,
    animateOverlayLeft = {
        left: "+=" + animateOverlayWidth +"px",
        opacity: 1.0
    },  animateOverlayRight = {
        left: "-=" + animateOverlayWidth + "px",
        opacity: 0.0
    },  animateTeamWidth = 350,
    animateTeamDuration = 400,
    animateTeamOpenLeft = {
        right: "+=" + animateTeamWidth + "px",
        opacity: 1.0
    },  animateTeamCloseRight = {
        right: "-=" + animateTeamWidth + "px",
        opacity: 0.0
    },  animateDescriptionOpenLeft = {
        marginRight: "+=" + animateTeamWidth + "px"
    },  animateDescriptionCloseRight = {
        marginRight: "-=" + animateTeamWidth + "px"
    };

AnimatorObj = function() {
    this.animateOpen = {};
    this.animateClose = {};
    this.duration = 0;
};

var SlideAnimator = function() {
    this.animateSliderPadding = 91;
    this.screenWid = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.animateSliderWidth = this.screenWid - this.animateSliderPadding;     //  must be calculated to the screen's width at animation time
    this.animateSliderDuration = 400;
    this.animateSliderOpen = {
        width: "+=" + this.animateSliderWidth + "px",
        opacity:1.0
    };  this.animateSliderClose = {
        width: "-=" + this.animateSliderWidth + "px",
        opacity:0.0
    };  this.animateContentOpen = {
        left: "+=" + this.animateSliderWidth + "px",
        opacity: 0
    };  this.animateContentClose = {
        left: "-=" + this.animateSliderWidth + "px",
        opacity: 1.0
    };  this.animateNavOpen = {
        left: "+=" + this.animateSliderWidth + "px",
        //opacity: 0
    };  this.animateNavClose = {
        left: "-=" + this.animateSliderWidth + "px",
        //opacity: 1.0
    };

    this.refreshAnimations = function() {
        this.animateSliderOpen = {
            width: "+=" + this.animateSliderWidth + "px"
        };  this.animateSliderClose = {
            width: "-=" + this.animateSliderWidth + "px"
        };  this.animateContentOpen = {
            left: "+=" + this.animateSliderWidth + "px",
            opacity: 0
        };  this.animateContentClose = {
            left: "-=" + this.animateSliderWidth + "px",
            opacity: 1.0
        };  this.animateNavOpen = {
            left: "+=" + this.animateSliderWidth + "px",
            //opacity: 0
        };  this.animateNavClose = {
            left: "-=" + this.animateSliderWidth + "px",
            //opacity: 1.0
        };
    };
};
var slideAnim = new SlideAnimator();

/*
    Opening Animation Variables
 */
var animateCurtainOpen = {
        opacity: 0
},  animateCurtainClose = {
        opacity: 1.0
},  animateCurtainDuration = 200,
    fadeInAmount = 20,
    fadeInLeft = {
        right: "+=" + fadeInAmount + "px",
        opacity: 1.0
},  fadeInUpward = {
        bottom: "+=" + fadeInAmount + "px",
        opacity: 1.0
},  homeLogoAnimationDuration = 300;



// MAIN FUNCTION
var main = function() {
    setBreakPoints();
    openingTransition();
    setClickListeners();
    setCalculatedHeights();
    //breakCopy();
    setScrollListeners();
    // var $els = $('#content-container span.screen');
    // if ($els.length > 0)
    //     sequenceHomeElements($els);

    // var $carouselElements = $('#about-carousel span.screen');
    // if($carouselElements.length > 0)
    //     sequenceHomeElements($carouselElements);

    sequenceAboutText();
};
// END MAIN FUNCTION



/*
    Call the appropriate Opening Transition functions
 */
var openingTransition = function() {
    homeOpeningTransition();
    aboutOpeningTransition();
    contactOpeningTransition();
};

/*
 Opening Animation for the Home Page
 */
var homeOpeningTransition = function() {
    var curtain = $('#curtain');
    openCurtain(curtain);
    moveHomeElementsIn();
};

var moveHomeElementsIn = function() {
    var pg = $('#index-pg h1');
    pg.css("right", "198px");
    pg.css("opacity", "0");

    pg.delay(homeLogoAnimationDuration /2).animate(
        fadeInLeft,
        homeLogoAnimationDuration,
        function() {}
    );

    var desc = $('#content-container .caption');
    var offset = desc ? desc.offset() : null,
        top = offset ? offset.top : null,
        height = desc ? desc.outerHeight() : null,
        windowHeight = $(window).height();

    var bottomPosition = windowHeight - top - height - fadeInAmount;
    desc.css("bottom",bottomPosition + "px");
    desc.css("opacity","0");

    desc.delay(homeLogoAnimationDuration / 2).animate(
        fadeInUpward,
        homeLogoAnimationDuration,
        function() {
            desc.css("bottom","");
        }
    );
};

/*
 Opening Animation for the About Page
 */
var aboutOpeningTransition = function() {
    var curtain = $('#curtain');
    openCurtain(curtain);
};

/*
    Opening Animation for the Contact Page
 */
var contactOpeningTransition = function() {
    var curtain = $('#curtain');
    openCurtain(curtain);
};

/*
    Makes the curtain fully transparent, then hides it
 */
var openCurtain = function(curtain) {
    if(!curtain)
        return;

    curtain.delay(animateCurtainDuration * 2).animate(
        animateCurtainOpen,
        animateCurtainDuration,
        function() {}
    );
};

/*
    Makes the Curtain Fully Opaque
 */
var closeCurtain = function(curtain) {
    closeCurtainWithFunction(curtain, function() {});
};

/*
    Makes the Curtain Fully Opaque, calls a function 'endingFunction' after the animation
 */
var closeCurtainWithFunction = function(curtain, endingFunction) {
    if(!curtain)
        return;

    curtain.css("opacity","0");

    curtain.animate(
        animateCurtainClose,
        animateCurtainDuration,
        function() {
            setTimeout(endingFunction,animateCurtainDuration / 2);
        }
    );
};

var setBreakPoints = function() {
    // $('body').restive({
    //     breakpoints: ['700', '1000', '1280'],
    //     classes: ['r_mini', 'r_med', 'r_large'],
    //     // turbo_classes: 'is_mobile=mobi',
    //     force_dip: true
    // });
    rescaleByBreakpoints();

    $(window).resize(function() {
        rescaleByBreakpoints();
    });
};

var rescaleByBreakpoints = function() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        mini_name = 'r_mini',
        med_name = 'r_med',
        large_name = 'r_large',
        mini_size = 700,
        med_size = 1000,
        large_size = 1280,
        body = $('body');

        removeBodyClasses();

        if(w <= mini_size)
            body.addClass(mini_name);
        else if(w <= med_size)
            body.addClass(med_name);
        else if(w <= large_size)
            body.addClass(large_name);
}

var removeBodyClasses = function() {
    var mini_name = 'r_mini',
        med_name = 'r_med',
        large_name = 'r_large',
        body = $('body');

    if(body.hasClass(mini_name))
        body.removeClass(mini_name);
    if(body.hasClass(med_name))
        body.removeClass(med_name);
    if(body.hasClass(large_name))
        body.removeClass(large_name);
}

/*
    Calculates heights that must be determined at runtime
 */
var setCalculatedHeights = function() {
    setHeights();
    $( window).resize(function() {
        setHeights();
    });
};

/*
    Helper function for setCalculatedHeights - call specific height calculators here
 */
var setHeights = function() {
    setContactFormHeight();
    setAboutDescriptionHeight();
    setAboutTeamHeight();
};

/*
    Set the adaptive Scrollbar Listeners where appropriate
 */
var setScrollListeners = function() {
    setAboutDescriptionScrollListeners();
    setAboutTeamScrollListeners();
};

/*
    Dynamically adjusts scrollbar size for the About Page's Description Container
 */
var setAboutDescriptionScrollListeners = function() {
    var desc = $('#about-description');
    setScrollListener(desc);
};

/*
    Dynamically adjusts scrollbar size for the About Page's Team Container
 */
var setAboutTeamScrollListeners = function() {
    var team = $('#about-team');
    setScrollListener(team);
};

/*
    Adds Scroll Listeners to an element
 */
var setScrollListener = function(el) {
    el.addClass("thin");
    // If user has Javascript disabled, the thick scrollbar is shown
    el.mouseover(function(){
        $(this).removeClass("thin");
    });
    el.mouseout(function(){
        $(this).addClass("thin");
    });
    el.scroll(function () {
        $("body").addClass("thin");
    });
};

var setAboutDescriptionHeight = function() {
    var about = $('#about-description'),
        body = $('body');
    if(body.hasClass('r_mini')) { // Mobile
        var nav = $('#nav-main'),
            carousel = $('#about-carousel'),
            outsideElements = [nav, carousel];
        setCalculatedHeightByArray(about, outsideElements);
    } else {
        var carousel = $('#about-carousel');
        setCalculatedHeight(about, carousel);
    }
};

var setAboutTeamHeight = function() {
    var about = $('#about-team'),
        body = $('body');
    if(body.hasClass('r_mini')) {
        var nav = $('#nav-main'),
            carousel = $('#about-carousel'),
            outsideElements = [nav, carousel];
        setCalculatedHeightByArray(about, outsideElements);
    } else {
        var carousel = $('#about-carousel');
        setCalculatedHeight(about, carousel);
    }
};

/*
    Sets the height of the contact form to fill the remaining space aside from the map
 */
var setContactFormHeight = function() {
    var body = $('body');

    if(body.hasClass('r_mini')) {
        var nav = $('#nav-main'),
            form = $('#contact-form-frame');

        setCalculatedHeight(form,nav);
    } else
    // if(body.hasClass('r_med'))
    {
        var form = $('#contact-form-frame'),
            nav = $('#nav-main'),
            footer = $('.footer.container'),
            outsideElements = [nav, footer];

        setCalculatedHeightByArray(form,outsideElements);
    }
    // else {
    //     var form = $('#contact-form-frame'),
    //         footer = $('.footer.container');

    //     setCalculatedHeight(form,footer);
    // }
};

/*
    Generic height calculator, takes into consideration the height of the footer
 */
var setCalculatedHeight = function(adjustable, reference) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        referenceHeight = reference.height(),
        footerHeight = 0,
        body = $('body');
    if(body.hasClass('r_mini')
        //|| body.hasClass('r_med')
    )
        footerHeight = 0;
    var calculatedHeight = h - referenceHeight - footerHeight;

    adjustable.height(calculatedHeight);
};

var setCalculatedHeightByArray = function(adjustable, references) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var referenceHeight = 0;
    references.forEach(function(entry) {
        referenceHeight = referenceHeight + entry.height();
    });
    var footerHeight = 0,
        body = $('body');
    if(body.hasClass('r_mini')
        //|| body.hasClass('r_med')
    )
        footerHeight = 0;
    var calculatedHeight = h - referenceHeight - footerHeight;

    adjustable.height(calculatedHeight);
};

/*
    After the window size becomes too small, breaks down the copyright into two lines
 */
var breakCopy = function() {
    var spacerSet = false;
    var breakWidth = 1200;
    $( window ).resize(function() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if(w < breakWidth && !spacerSet) {
            $('#copy-line-spacer').html("<br />");
            spacerSet = true;
        }

        if(w >= breakWidth && spacerSet) {
            $('#copy-line-spacer').html("");
            spacerSet = false;
        }
    });
};

/*
    Sets the appropriate click listeners;
 */
var setClickListeners = function() {
    var modalCookie = getCookie('termsAgree'),
        agree = 'agreed';
    if(modalCookie != agree) {
        showModal();
        setModalListeners();
    } else {                // Navigate like normal
        toggleSlider();     // Mobile Navigation
        toggleOverlay();    // Desktop Navigation
        toggleTeam();       // Opens up the 'Team' content from the right
        setRedirects();     // Navigation buttons - redirects with JS
    }
};

var showModal = function() {
    $('#terms-and-conditions').css('display','block');
};

var setModalListeners = function() {
    $('#terms-agree').click(function() {
        setCookieMinutes('termsAgree','agreed',5);
        $('#terms-and-conditions').fadeOut(400);
        setClickListeners(); // Reinstate Navigation
    });
    $('#terms-disagree').click(function() {
        setCookieMinutes('termsAgree','disagreed',5);
        window.location.href = "../../index.html";
    });
};

/*
    Makes the Bars/X buttons transition the navigation Overlay
 */
var toggleOverlay = function() {
    var openButton = $('#nav-overlay-open-button'),
        closeButton = $('#nav-overlay-close-button'),
        overlay = $('#nav-overlay');

    toggleElement(openButton,closeButton,overlay,animateOverlayLeft,animateOverlayRight,animateOverlayDuration);
};

function setCookie(cname, cvalue, exdays) {
    // var d = new Date();
    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    // var expires = "expires="+d.toUTCString();
    // document.cookie = cname + "=" + cvalue + "; " + expires;
    setCookieTime(cname, cvalue, (exdays*24*60*60*1000));
}

function setCookieMinutes(cname, cvalue, exminutes) {
    setCookieTime(cname, cvalue, (exminutes*60*1000));
}

function setCookieTime(cname, cvalue, extime) {
    var d = new Date();
    d.setTime(d.getTime() + (extime));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
/*
    Opens up the 'Team' container
 */
var toggleTeam = function() {
    animateAboutTeam();
    animateAboutDescription();
};
/*
    Helper function for toggleTeam - animates the Team container
 */
var animateAboutTeam = function() {
    var openButton = $('#team-link'),
        closeButton = $('#close-team-link'),
        team = $('#about-team');

    toggleElementWithFunctions(openButton,
        closeButton,
        team,
        animateTeamOpenLeft,
        function() {openButton.addClass('hidden'); closeButton.removeClass('hidden')},
        animateTeamCloseRight,
        function() {openButton.removeClass('hidden'); closeButton.addClass('hidden')},
        animateTeamDuration);
};
/*
    Helper function for toggleTeam - animates the Description container
 */
var animateAboutDescription = function() {
    var openButton = $('#team-link'),
        closeButton = $('#close-team-link'),
        desc = $('#about-description');

    toggleElement(openButton, closeButton, desc, animateDescriptionOpenLeft, animateDescriptionCloseRight, animateTeamDuration);
};

var toggleSlider = function() {
    var sAnim = new AnimatorObj();
    sAnim.animateOpen = slideAnim.animateSliderOpen;
    sAnim.animateClose = slideAnim.animateSliderClose;
    sAnim.duration = slideAnim.animateSliderDuration;

    var cAnim = new AnimatorObj();
    cAnim.animateOpen = slideAnim.animateContentOpen;
    cAnim.animateClose = slideAnim.animateContentClose;
    cAnim.duration = slideAnim.animateSliderDuration;

    var nAnim = new AnimatorObj();
    nAnim.animateOpen = slideAnim.animateNavOpen;
    nAnim.animateClose = slideAnim.animateNavClose;
    nAnim.duration = slideAnim.animateSliderClose;

    $(window).resize(function() {
        slideAnim.screenWid = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        slideAnim.animateSliderWidth = slideAnim.screenWid - slideAnim.animateSliderPadding;
        slideAnim.refreshAnimations();
        sAnim.animateOpen = slideAnim.animateSliderOpen;
        sAnim.animateClose = slideAnim.animateSliderClose;
        cAnim.animateOpen = slideAnim.animateContentOpen;
        cAnim.animateClose = slideAnim.animateContentClose;
        nAnim.animateOpen = slideAnim.animateNavOpen;
        nAnim.animateClose = slideAnim.animateNavClose;
    });

    animateSlider(sAnim);
    animateContentContainer(cAnim);
    animateAbout(cAnim);
    animateContact(cAnim);
    animateCarousel(cAnim);
    animateNavContainer(nAnim);
};
/*
    Helper Function for toggleSlider, moves the Slider into the screen
 */
var animateSlider = function(anim) {
    var openButton = $('#nav-slider-open-button'),
        closeButton = $('#nav-slider-close-button'),
        slider = $('#nav-slider');

    //toggleElement(openButton,closeButton, slider, anim.animateSliderOpen, anim.animateSliderClose, anim.animateSliderDuration);
    toggleElementWithAnimator(openButton,closeButton,slider,anim);
};
var animateCarousel = function(anim) {
    var openButton = $('#nav-slider-open-button'),
        closeButton = $('#nav-slider-close-button'),
        carousel = $('#about-carousel'),
        contact = $('#nav-slider .contact');
    toggleElementWithAnimatorAndFunctions(openButton,
        closeButton,
        carousel,
        anim,
        function() {openButton.css('visibility','hidden');
            closeButton.css('visibility','visible');
            contact.css('visibility','visible')},
        function() {openButton.css('visibility','visible');
            closeButton.css('visibility','hidden')
            contact.css('visibility','hidden')});
};
/*
    Helper function for toggleSlider, moves the Content Container off the screen
 */
var animateContentContainer = function(anim) {
    var openButton = $('#nav-slider-open-button'),
        closeButton = $('#nav-slider-close-button'),
        content = $('#content-container .content'),
        contact = $('#nav-slider .contact');
    toggleElementWithAnimatorAndFunctions(openButton,
        closeButton,
        content,
        anim,
        function() {openButton.css('visibility','hidden');
            closeButton.css('visibility','visible');
            contact.css('visibility','visible')},
        function() {openButton.css('visibility','visible');
            closeButton.css('visibility','hidden')
            contact.css('visibility','hidden')});
};
var animateAbout = function(anim) {
    var openButton = $('#nav-slider-open-button'),
        closeButton = $('#nav-slider-close-button'),
        label = $('#about-description .label'),
        bg = $('.content.container .bg'),
        desc = $('#about-description'),
        contact = $('#nav-slider .contact');

        toggleElementWithAnimatorAndFunctions(openButton,closeButton,label,anim,
            function() {openButton.css('visibility','hidden');
                closeButton.css('visibility','visible');
                contact.css('visibility','visible')},
            function() {openButton.css('visibility','visible');
                closeButton.css('visibility','hidden')
                contact.css('visibility','hidden')});
        toggleElementWithAnimator(openButton,closeButton,desc,anim);
        toggleElementWithAnimator(openButton,closeButton,bg,anim);
};
var animateContact = function(anim) {
    var openButton = $('#nav-slider-open-button'),
        closeButton = $('#nav-slider-close-button'),
        form = $('#contact-form-frame'),
        shade = $('#mobile-shade'),
        contact = $('#nav-slider .contact');


    toggleElementWithAnimatorAndFunctions(openButton,closeButton,form,anim,
        function() {openButton.css('visibility','hidden');
            closeButton.css('visibility','visible');
            contact.css('visibility','visible')},
        function() {openButton.css('visibility','visible');
            closeButton.css('visibility','hidden')
            contact.css('visibility','hidden')});
    toggleElementWithAnimator(openButton,closeButton,shade,anim);
};
/*
    Helper function for toggleSlider, moves the Nav Container off the screen
 */
var animateNavContainer = function(anim) {
    var openButton = $('#nav-slider-open-button'),
        closeButton = $('#nav-slider-close-button'),
        nav = $('#nav-main');

    //toggleElement(openButton,closeButton, nav, anim.animateNavOpen, anim.animateNavClose, anim.animateSliderDuration);
    toggleElementWithAnimator(openButton,closeButton,nav,anim);
};

var toggleElementWithAnimator = function(openButton,closeButton,el,animator) {
    toggleElementWithAnimatorAndFunctions(openButton,closeButton,el,animator,function(){},function(){});
};

var toggleElementWithAnimatorAndFunctions = function(openButton,closeButton,el,animator,openFunction,closeFunction) {
    if(!(openButton && el && closeButton))
        return;

    var isElementShowing = false;
    // Open up Element with animation
    openButton.click(function() {
        if(!isElementShowing) {
            el.animate(
                animator.animateOpen,
                animator.duration, // ms duration
                openFunction);
            isElementShowing = true;
        }
    });
    // Close element with animation
    closeButton.click(function() {
        if(isElementShowing) {
            el.animate(
                animator.animateClose,
                animator.duration, // ms duration
                closeFunction);
            isElementShowing = false;
        }
    });
};

var toggleElement = function(openButton, closeButton, el, animationOpen, animationClose, duration) {
    toggleElementWithFunctions(openButton, closeButton, el, animationOpen, function() {}, animationClose, function() {}, duration);
};

/*
    Generic Element Toggler with animation and functions
 */
var toggleElementWithFunctions = function(openButton, closeButton, el, animationOpen, openFunction, animationClose, closeFunction, duration) {
    if(!(openButton && el && closeButton))
        return;
    var isElementShowing = false;
    // Open up Element with animation
    openButton.click(function() {
        if(!isElementShowing) {
            el.animate(
                animationOpen,
                duration, // ms duration
                openFunction);
            isElementShowing = true;
        }
    });
    // Close element with animation
    closeButton.click(function() {
        if(isElementShowing) {
            el.animate(
                animationClose,
                duration, // ms duration
                closeFunction);
            isElementShowing = false;
        }
    });
};

/*
    Sets the appropriate listeners to redirect the user after animations
 */
var setRedirects = function() {
    setHomeRedirect();
    setAboutRedirect();
    setContactRedirect();
};

var setHomeRedirect = function() {
    $('#home-link').click(function() {
        setRedirect("./index.html");
    });
};

var setAboutRedirect = function() {
    $('#about-link').click(function() {
        setRedirect("./about.html");
    });
};

var setContactRedirect = function() {
    $('#contact-link').click(function() {
        setRedirect("./contact.html");
    });
};

var setRedirect = function(redirect) {
    window.location.href = redirect;
};

var sequenceElements = function($els, delay, fadeout, fadein) {
    var n = $els.length,          // get number of screens
        c = 0;                    // counter

    $els.not(':eq('+c+')').hide();// hide all images but the one indexed 'c'

    (function loop(){
        $els.delay(delay).fadeOut(fadeout).eq(++c%n).fadeIn(fadein, loop );
    })();
}

var sequenceHomeElements = function($els) {
    // var n = $els.length,          // get number of screens
    //     c = 0;                    // counter

    // $els.not(':eq('+c+')').hide();// hide all images but the one indexed 'c'

    // (function loop(){
    //     $els.delay(6000).fadeOut(800).eq(++c%n).fadeIn(800, loop );
    // })();
    sequenceElements($els, 6000, 800, 800);
};

var sequenceAboutText = function() {
    var $labels = $('#about-carousel .screen'),
    fadeTime = 0,
    delayTime = 24024 / 3; // 24.024 s = 24024 ms div. by 3 labels

    if($labels.length > 0)
        sequenceElements($labels, delayTime, fadeTime, fadeTime);
};

(function($, window, document, undefined) {
    $(document).ready(main);

})(jQuery, this, document);
