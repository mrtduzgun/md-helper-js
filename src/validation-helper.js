
/**
 *  Validate values
 *   
 *  @author Murat Duzgun
 *  @see https://github.com/mrtduzgun
 */

(function($){
    
    $.mdValidationHelper = function {

        var $this = this;

        return {        /* 
             *  validate if value is email
             *  
             *  @return boolean it returns true if success, otherwise false
             */
            isEmail: function (email) {
                return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
            },

            /* 
             *  validate if value is phone number has number of between 10 and 12 digits
             *  
             *  @return boolean it returns true if success, otherwise false
             */    
            isPhoneNumber: function (phoneNumber) {
                return phoneNumber &&
                       phoneNumber.replace(/[A-Za-z$-]/g, "") && 
                       phoneNumber.length >= 10 && 
                       phoneNumber.length < 12 &&
                       $this.isNumber(phoneNumber);
            },

            /* 
             *  validate if value is number
             *  
             *  @return boolean it returns true if success, otherwise false
             */
            isNumber: function (str) {
                return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(str);
            },
            
            /* 
             *  validate if value is empty (same as "empty" function in php)
             *  
             *  @return boolean it returns true if success, otherwise false
             */    
            isEmpty: function(str) {
                var undef, key, i, len;
                var emptyValues = [undef, null, false, 0, "", "0"];

                for (i = 0, len = emptyValues.length; i < len; i++) {
                    if (str === emptyValues[i]) {
                        return true;
                    }
                }

                if (typeof str === "object") {
                    for (key in str) {
                        // TODO: should we check for own properties only?
                        //if (mixed_var.hasOwnProperty(key)) {
                        return false;
                        //}
                    }
                    return true;
                }

                return false;
            },

            /* 
             *  validate if value has valid tc number (Turkish Republic Identity Number)
             *  
             *  @return boolean it returns true if success, otherwise false
             */   
            isTCNo: function(value) {
                var no = value.split('');
                var i, total1 = 0, total2 = 0, total3 = parseInt(no[0]);
                for(i=0; i < 10; i++) {
                    total1 = total1 + parseInt(no[i]);
                }

                for(i=1; i < 9; i = i + 2) {
                    total2 = total2 + parseInt(no[i]);
                    total3 = total3 + parseInt(no[i+1]);
                }

                return !(!/^[1-9][0-9]{10}$/.test(value) || (total1 % 10 != no[10]) || (total3 * 7 - total2) % 10 != no[9]);
            }
        }
    };
    
})(jQuery);