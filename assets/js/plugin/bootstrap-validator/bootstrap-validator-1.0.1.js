(function(global, factory, plugin){
    factory.call(global, global.jQuery, plugin);
}(typeof window === 'undefined'?this:window, function($, plugin){
    var __i18n__ = {
        "en": {
            "errorMsg": "* valid failed",
            "notForm": "* is not form element"
        }
    }
    // 配置
    var __DEFS__ = { // 默认项
        raise: "change",
        language: "en",
        i18n: "en",
        pix: "bv-", // 前缀
        errorMsg: null, // 默认错误提示信息
    }
    // 默认规则引擎
    var __RULES__ = {
        require: function(){
            return this.val() && this.val() !== "";
        },
        number: function(){
            return !isNaN(this.val());
        },
        integer: function(){
            return Math.round(this.val()) === this.val();
        },
        email: function(){
            return  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.val());
        },
        length: function(){
            return this.val().length === Number(this.data(__DEFS__.pix+"length"));
        },
        regex: function(){
            return new RegExp(this.data(__DEFS__.pix+"regex")).test(this.val());
        }
        // ...
    }
    // 国际化 

    // 真正被创建的闭包并且只被执行一次
    $.fn[plugin] = function(options){
        this.getMessage = $.fn[plugin].getMessage;
        var that = $.extend(this, __DEFS__, options); // 先扩展默认值, 再用用户设置的默认值覆盖
        if(this.is("form")){
            var $fields = this.find("input, textarea, select").not("[type=submit],[type=button],[type=reset]"); // 目标表单元素
            // console.log($fields);
            $fields.on(this.raise, function(){
                var $field = $(this);
                var $group = $field.parents(".form-group:first"); // 找到它所在的gruop元素
                $group.removeClass("has-error has-success"); // 还原规则
                $group.find(".help-block").remove();
                var result = false; //校验当前元素的结果, 默认为失败
                var msg;
                // 当前校验元素到底配置了那些
                $.each(__RULES__, function(rule, active){
                    if($field.data(that.pix + rule)){
                        result = active.call($field);
                        console.log(rule + "=>" + result);
                        if(!result){
                            msg = $field.data(that.pix+rule+"-message") || that.getMessage(that.language, "errorMsg");  // 获得配置的错误提示信息
                            $group.addClass("has-error");
                            $field.after("<span class='help-block'>"+msg+"</span")
                            return false;
                        }else{
                            // 校验成功
                            $group.addClass("has-success");
                        }
                    }
                })
            })
            this.extendRules = $.fn[plugin].extendRules;
            return this;
        }else{
            throw new Error(that.getMessage(that.language, "notForm"))
        }
    };
    $.fn[plugin].extendRules = function(rules){
        $.extend(__RULES__, rules);
    }
    $.fn[plugin].addLocal = function(language, data){
        __i18n__[language] = data;
    }
    $.fn[plugin].getMessage = function(language, key){
        try{
            return __i18n__[language][key];
        }catch(e){
            return ""; 
        }
        
    }
}, "bootstrapValidator"))