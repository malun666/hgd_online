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
template('CourseCat',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,courseCat=$data.courseCat,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<ul class="accordion">\r\n    ';
$each(courseCat,function(value,key){
$out+='\r\n    <li>\r\n      <button class="accordion-control">';
$out+=$escape(value.name);
$out+='</button><span>+</span>\r\n      <ul class="accordion-panel">\r\n        <li>中国哲学</li>\r\n        <li class="notone">西方哲学</li>\r\n      </ul>\r\n    </li>\r\n    ';
});
$out+='\r\n</ul>\r\n';
return new String($out);
});/*v:1*/
template('CourseList',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,courseList=$data.courseList,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<ul>\r\n  ';
$each(courseList,function(value,key){
$out+='\r\n  <li>\r\n    <img src=';
$out+=$escape(value.img);
$out+=' alt="">\r\n    <p>';
$out+=$escape(value.title);
$out+='</p>\r\n  </li>\r\n  ';
});
$out+='\r\n</ul>\r\n';
return new String($out);
});/*v:1*/
template('Header',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$out='';$out+='<h1 class="s-h-logo left">\r\n  <a href="#"><img src="../../asset/image/logo.png" alt="logo" title="哈工大出版社在线教育" /></a>\r\n</h1>\r\n<div class="s-h-info right">\r\n  <ul class="user-list">\r\n    <li class="wrap">\r\n      <a href="" class="mes">\r\n        <span class="mes-num">1</span>\r\n      </a>\r\n    </li>\r\n    <li class="wrap">\r\n      <a href="" class="avater">\r\n        <img src="../../asset/image/avater.jpeg" class="avater" alt="" title="">\r\n      </a>\r\n      <a href="#">';
$out+=$escape(name);
$out+='<i class="triangle-down icon"></i></a>\r\n      <ul>\r\n        <li>我的资源</li>\r\n        <li class="giveout">我的订单</li>\r\n        <li class="giveout">个人资料</li>\r\n        <li class="giveout"><a href="http://localhost:38900/login.html">退出登录</a></li>\r\n      </ul>\r\n    </li>\r\n    <li class="wrap">\r\n      <a href="#">学生端<i class="triangle-down icon"></i></a>\r\n      <ul>\r\n        <li>学生端</li>\r\n        <li class="giveout">教师端</li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<div class="s-h-search">\r\n  <div class="s-select">\r\n    <a href="#">课程<i class="triangle-down-black icon"></i></a>\r\n    <ul>\r\n      <li>课程</li>\r\n      <li class="giveout">教材</li>\r\n    </ul>\r\n  </div>\r\n  <div class="s-input">\r\n    <input type="search"><span class="search-logo"></span>\r\n  </div>\r\n</div>\r\n';
return new String($out);
});/*v:1*/
template('TextBook',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,textBook=$data.textBook,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<ul>\r\n  ';
$each(textBook,function(value,key){
$out+='\r\n  <li>\r\n    <img src=';
$out+=$escape(value.imgUrl);
$out+=' alt="">\r\n    <p>';
$out+=$escape(value.title);
$out+='</p>\r\n  </li>\r\n  ';
});
$out+='\r\n</ul>\r\n';
return new String($out);
});

}()