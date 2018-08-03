# 表单校验框架
## 使用示例参照index.html
## 开启表单验证
    $(selector).bootstrapValidator({
        raise: "keyup", // 设置触发的方式 默认为change
        language: "zh", // 用户配置语言 默认为"en"
    });
## 目前支持的配置项
    - require 必须填写
    - email 填写的内容必须是标准的email格式
    - number 必须是数字
    - integer 必须是整数
    - regex 必须符合正则表达式配置的格式
    - length 长度必须是多少位
## 扩展配置项方法
    1. 找到assets/js/common.js文件
    2. 添加自己的配置, 可参照示例
