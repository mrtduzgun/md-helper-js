
(function($){
    
    $.mdCacheHelper = {
        writeToCache: function (key, value) {
            $(document).data(key, value);
        },

        readFromCache: function (key) {
            return $(document).data(key);
        },

        isExistInCache: function (key) {
            return $(document).data(key) ? true : false;
        }
    };
    
})(jQuery);

