var main = function() {
    setBreakPoints();
};

var setBreakPoints = function() {
    $('body').restive({
        breakpoints: ['480', '800', '1280'],
        classes: ['rp_480', 'rp_800', 'rp_1280'],
        turbo_classes: 'is_mobile=mobi',
        force_dip: true
    });
};

(function($, window, document, undefined) {
    $(document).ready(main);

})(jQuery, this, document);