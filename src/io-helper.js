
(function($){
    
    $.mdIOHelper = {
        trimAll: function (str) {
            return (str && typeof str != "undefined") ? str.replace(/\s+/g, '') : false;
        },

        deleteFile: function(title, url, $this, messages, successCallback) {

            /*
             * messages = {
             *    opening:          "Popup ilk acildigindan cikan mesaj"
             *    unexpectedError:  "Beklenmeyen bir hata sirasinda cikan mesaj"
             *    success:          "İslem basarili oldugunda cikan mesaj"
             *    fail:             "Islem basarisiz oldugunda cikan mesaj"
             * }
             */

            commonHelper.displayConfirmPopup(title, 
                messages.opening, function() {
                    $.ajax({
                        type: "POST",
                        url: url,
                        success: function(response){

                            if (response == "unexpected_error") {
                                $.msgPopbox({
                                    message: messages.unexpectedError,
                                    msgType: "fail",
                                    timeout: 3000
                                });
                                return false;
                            }

                            if( response==="success" ){
                                $($this).parents(".md-framebox").remove();
                                $.msgPopbox({
                                    message: messages.success,
                                    msgType: "success",
                                    timeout: 3000,
                                    finishCallback: successCallback
                                });
                            }else{
                                $.msgPopbox({
                                    message: messages.fail,
                                    msgType: "fail",
                                    timeout: 3000
                                });
                            }
                        }
                    });
            });
        },

        /* Takes an ISO time and returns a string representing how
         * long ago the date represents.
         */
        prettyDate: function (date_str) {
            var time_formats = [
                [60, 'seconds', 1], // 60
                [120, '1 minute ago', '1 minute from now'], // 60*2
                [3600, 'minutes', 60], // 60*60, 60
                [7200, '1 hour ago', '1 hour from now'], // 60*60*2
                [86400, 'hours', 3600], // 60*60*24, 60*60
                [172800, 'yesterday', 'tomorrow'], // 60*60*24*2
                [604800, 'days', 86400], // 60*60*24*7, 60*60*24
                [1209600, 'last week', 'next week'], // 60*60*24*7*4*2
                [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
                [4838400, 'last month', 'next month'], // 60*60*24*7*4*2
                [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
                [58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
                [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
                [5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
                [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
            ];
            var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if(time.substr(time.length-4,1)==".") time =time.substr(0,time.length-4);
            var seconds = (new Date - new Date(time)) / 1000;
            var token = 'ago', list_choice = 1;
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = 'from now';
                list_choice = 2;
            }
            var i = 0, format;
            while (format = time_formats[i++])
                if (seconds < format[0]) {
                    if (typeof format[2] == 'string')
                        return format[list_choice];
                    else
                        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                }
            return time;
        },

        toISOString: function(date) {
            function pad(n) { return n < 10 ? '0' + n : n }
            return date.getUTCFullYear() + '-'
                + pad(date.getUTCMonth() + 1) + '-'
                + pad(date.getUTCDate()) + 'T'
                + pad(date.getUTCHours()) + ':'
                + pad(date.getUTCMinutes()) + ':'
                + pad(date.getUTCSeconds()) + 'Z';
        }
    };
})(jQuery);
