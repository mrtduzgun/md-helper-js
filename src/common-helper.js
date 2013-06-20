
(function($){
    
    $.mdCommonHelper = {
        init: function() {
            if (this._jqueryVersionIsValid())
            {
                if ($.ui && typeof $.ui != "undefined") {
                    var popupEffect = {
                        hide: 'slide',
                        show: 'slide'
                    };

                    $.extend($.ui.dialog.prototype.options, {
                        modal: true,
                        width: "auto",
                        resizable: true,
                        draggable: true,
                        zIndex: 10000
                    });

                    $.extend($.ui.dialog.prototype.options, popupEffect);
                }
                
                if ($.validator && typeof $.validator != "undefined") {
                    $.validator.setDefaults({
                        showErrors: function (errorMap, errorList) {
                        }
                    });   
                };
                $(".ghostTextboxText").each(function() {                    
                    var $this = $(this);
                    var defaultText = '';
                    $this.live("focus", function() {
                        defaultText = $(this).val();
                        $(this).val('');
                    });
                    $this.live("blur", function() {
                        $(this).val(defaultText);
                    });
                });
            }
            else {
                alert("Jquery version have to be '1.7.2' at least");
                return false;
            }
        },

        _jqueryVersionIsValid: function() {
            var digits = $.fn.jquery.split(".");
            return digits.length > 2 && 
                 parseInt(digits[0]) >= 1 && 
                (parseInt(digits[1]) === 7 && parseInt(digits[2]) >= 2) || 
                (parseInt(digits[1]) >= 8);
        },

        displayInfoPopup: function (title, content, options) {

            if (typeof options == undefined)
                options = {};

            var defaults = {
                title: title,
                width: 300,
                buttons: {
                    "Tamam": function(){
                        $(this).dialog("close");
                    }
                }
            };

            $.extend(defaults, options);
            $('<div style="font-size:15px;line-height:160%;">'+content+'</div>').dialog(defaults);
        },

        displayConfirmPopup: function (title, msg, okAction, noAction, options) {
            if (typeof options == undefined)
                options = {};

            var defaults = {
                title: title,
                width: 300,
                buttons: {
                    "Evet": function(){
                        okAction.call();
                        $(this).dialog("close");

                    },
                    "Hayır": function(){
                        if (noAction !== undefined)
                            noAction.call();
                        $(this).dialog("close");
                    }
                }
            };

            $.extend(defaults, options); 
            $('<div style="font-size:15px;line-height:160%;">'+msg+'</div>').dialog(defaults);
        },
        checkUncheckAll: function(checkAllBtn, selectedChekboxClass) {
            checkAllBtn.change(function(){
                if ($(this).attr('checked'))
                    $("."+selectedChekboxClass).attr('checked', true);
                else
                    $("."+selectedChekboxClass).removeAttr('checked');
            });

            $("."+selectedChekboxClass).change(function(){
                if ($("."+selectedChekboxClass+":checked").length == $("."+selectedChekboxClass).length)
                    checkAllBtn.attr('checked', true);
                else
                    checkAllBtn.removeAttr('checked');
            });
        },        
        
        submitForm: function(options) {
            var defaults = {
                selector: 'form',
                extraData: {},
                cache: true,
                validation: true,
                beforeSubmitValidation: null,
                successCallback: {
                    msg: "",
                    finishCallback: null
                },
                failCallback: {
                    msg: "",
                    finishCallback: null
                },
                errorCallback: {
                    msg: "",
                    finishCallback: null
                },
                beforeSubmitCallback: {
                    msg: "",
                    finishCallback: null
                }
            };
            
            options = $.extend(defaults, options);
            var form = $(options.selector);

            form.ajaxSubmit({
                success: function(response, statusText, xhr, $form){
                    if (response.msgType == "success") {
                        $.msgPopbox($.extend({
                            msgType: "success",
                            message: response.message || options.successCallback.msg,
                            finishCallback: options.successCallback.finishCallback || function(){}
                        }, response));
                    }
                    else if (response.msgType == "fail") {
                        $.msgPopbox($.extend({
                            msgType: "fail",
                            message: response.message || options.failCallback.msg,
                            finishCallback: options.failCallback.finishCallback || function(){}
                        }, response));
                    }
                    else if (response.msgType == "warning") {
                        $.msgPopbox($.extend({
                            msgType: "warning",
                            message: response.message,
                            finishCallback:function(){}
                        }, response));
                    }
                },
                data: options.extraData,
                beforeSubmit: function(formData, jqForm, opt){
                    if ((options.validation && !form.valid()) || (options.beforeSubmitValidation && 
                            !options.beforeSubmitValidation.call()))
                        return false;
                    else {
                        $.msgPopbox({
                            msgType: "loading",
                            message: options.beforeSubmitCallback.msg,
                            finishCallback: options.beforeSubmitCallback.finishCallback || function(){}
                        });
                    }
                },
                dataType: "json",
                error: function() {
                    $.msgPopbox({
                        msgType: "fail",
                        message: options.errorCallback.msg,
                        finishCallback: options.errorCallback.finishCallback || function(){}
                    });
                },
                cache: options.cache
            });
        },
        
        getPageHashTag: function() {
            return window.location.hash ? window.location.hash.replace('#', '') : "";
        },
        
        focusAndClearField: function(fieldSelector, defaultText) {
            var currentText = defaultText;
            $(fieldSelector).val(defaultText);
            $(fieldSelector).focus(function(){
                currentText = $(this).val();
                $(this).val("");
            });
            
            $(fieldSelector).blur(function(){
                $(this).val(currentText);
            });            
        },
        selectAllExceptOne: function(selectSelector, exceptOptionVal) {
            $(selectSelector).change(function () {
                if ($.inArray(exceptOptionVal+"", $(this).val()) >= 0) {
                    $(selectSelector).val(exceptOptionVal);
                }
            });
        }
    };
    
    $(function(){
        $.mdCommonHelper.init();
    });
    
})(jQuery);