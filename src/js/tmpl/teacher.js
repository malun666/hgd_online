/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('banner',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,banner=$data.banner,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="swiper-container">\r\n    <div class="swiper-wrapper">\r\n        ';
$each(banner,function(value,i){
$out+='\r\n        <div class="swiper-slide">\r\n            <a href="#">\r\n                <img src=';
$out+=$escape('../../asset/image/'+value.imgUrl);
$out+=' alt=';
$out+=$escape(value.imgTitle);
$out+='>\r\n            </a>\r\n        </div>\r\n        ';
});
$out+='\r\n    </div>\r\n    <div class="swiper-pagination"></div>\r\n</div>';
return new String($out);
});/*v:1*/
template('footer','<div class="tmpl-footer">\r\n    <p>\r\n        <span>Copyrignt © 2004-2016哈尔滨工业大学出版社</span>\r\n        <span>版权所有</span>\r\n        <span>京ICP备11017824号-7</span>\r\n    </p>\r\n</div>');/*v:1*/
template('header',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,message=$data.message,icon=$data.icon,user=$data.user,type=$data.type,$out='';$out+='<!--S 头部模板 -->\n<div class="tmpl-header">\n  <!-- 左侧logo区域 -->\n  <div class="tmh-left">\n    <div class="logo">\n      <img src=\'../../asset/image/logo.png\' alt="HITP">\n    </div>\n    <div class="name">\n      <img src=\'../../asset/image/logo2.png\' alt="哈尔滨工业大学">\n    </div>\n  </div>\n  <!-- 中间搜索区域 -->\n\n  <div class="tmh-center">\n    <div class="tmh-select">\n      <input type="tmh-text">\n      <svg class="icon" aria-hidden="true">\n        <use xlink:href="#icon-ziyuan3"></use>\n      </svg>\n    </div>\n  </div>\n\n\n  <!-- 右侧用户区域 -->\n  <div class="tmh-right">\n    <!-- 消息 -->\n    <div class="tmh-message">\n      <a href="#">\n        <svg class="icon" aria-hidden="true">\n          <use xlink:href="#icon-ziyuan2"></use>\n        </svg>\n        <span>';
$out+=$escape(message);
$out+='</span>\n      </a>\n    </div>\n    <!-- 用户信息 -->\n    <div class="tmh-user">\n      <img src=';
$out+=$escape('../../asset/image/'+icon);
$out+=' alt="头像">\n      <div class="user">\n        <div class="show">\n          ';
$out+=$escape(user);
$out+='\n          <svg class="icon" aria-hidden="true">\n            <use xlink:href="#icon-ziyuan1"></use>\n          </svg>\n        </div>\n        <div class="hid">\n          <ul>\n            <li>\n              <a href="#">我的资源</a>\n            </li>\n            <li>\n              <a href="#">我的订单</a>\n            </li>\n            <li>\n              <a href="#">个人资料</a>\n            </li>\n            <li>\n              <a href="#">退出登录</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <!-- 客户端 -->\n\n      <div class="SwitchMe user">\n        <div class="show">\n          ';
$out+=$escape(type+'端');
$out+='\n          <svg class="icon" aria-hidden="true">\n            <use xlink:href="#icon-ziyuan1"></use>\n          </svg>\n        </div>\n        <div class="hid">\n          <ul>\n            <li>\n              <a href="#">教师端</a>\n            </li>\n            <li>\n              <a href="#">学生端</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n<!--e 头部模板 -->';
return new String($out);
});/*v:1*/
template('nav',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,nav=$data.nav,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+='<div class="tTemNav">\r\n    <p></p>\r\n    <div class="conationer">\r\n        <div class="nav-left">\r\n            <ul>\r\n                ';
$each(nav.left,function(value,i){
$out+='\r\n                <li>\r\n                    <a href=';
$out+=$escape(value.url);
$out+='>';
$out+=$escape(value.name);
$out+='</a>\r\n                </li>\r\n                ';
});
$out+='\r\n\r\n            </ul>\r\n        </div>\r\n        <div class="nav-right">\r\n            <ul>\r\n                ';
$each(nav.right,function(value,i){
$out+='\r\n                <li>\r\n                    <a href=';
$out+=$escape(value.url);
$out+='>';
$out+=$escape(value.name);
$out+='</a>\r\n                </li>\r\n                ';
});
$out+='\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <p class="nav-bg"></p>\r\n</div>';
return new String($out);
});/*v:1*/
template('textbook',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,ebook=$data.ebook,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+='<ul>\r\n    ';
$each(ebook,function(value,i){
$out+='\r\n    <li>\r\n        <a href="#">\r\n            <img src=';
$out+=$escape('../../asset/image/'+value.imgUrl);
$out+=' alt="';
$out+=$escape(value.name);
$out+='">\r\n            <span>';
$out+=$escape(value.ebook_des);
$out+='</span>\r\n        </a>\r\n    </li>\r\n    ';
});
$out+='\r\n</ul>';
return new String($out);
});

}()