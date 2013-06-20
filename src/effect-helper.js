
(function($){
    
    $.mdEffectHelper = {
        
        smoothScroll: function (target, top) {
            if (top && typeof top !== undefined)
                top += target.offset().top;
            else
                top = target.offset().top;

            $('html, body').animate({scrollTop: top}, 'slow');
            return false;
        }
    };
    
})(jQuery);