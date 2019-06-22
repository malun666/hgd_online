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
template('CatCourseList',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,catCourseList=$data.catCourseList,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<ul>\n  ';
$each(catCourseList,function(value,key){
$out+='\n  <li>\n    <a href="/view/student/s_course_detail.html?id=';
$out+=$escape(value.id);
$out+='">\n      <img src=';
$out+=$escape(value.img);
$out+=' alt="">\n      <p>课程名称</p>\n    </a>\n    <span>';
$out+=$escape(value.author);
$out+='</span><span>';
$out+=$escape(value.college);
$out+='</span>\n  </li>\n  ';
});
$out+='\n</ul>\n';
return new String($out);
});/*v:1*/
template('CourseCat',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,courseCat=$data.courseCat,value=$data.value,key=$data.key,$escape=$utils.$escape,value_=$data.value_,key_=$data.key_,$out='';$out+='<ul class="accordion">\n    ';
$each(courseCat,function(value,key){
$out+='\n    <li>\n      <button class="accordion-control">';
$out+=$escape(value.name);
$out+='</button><span>+</span>\n      <ul class="accordion-panel">\n        ';
$each(value.children,function(value_,key_){
$out+='\n        <li class="notone" name=';
$out+=$escape(value_.id);
$out+='>';
$out+=$escape(value_.name);
$out+='</li>\n        ';
});
$out+='\n      </ul>\n    </li>\n    ';
});
$out+='\n</ul>\n';
return new String($out);
});/*v:1*/
template('CourseDetail',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,courseDetail=$data.courseDetail,$out='';$out+='\n  <div class="detail_top">\n    <p>课程名称</p>\n    <h2>';
$out+=$escape(courseDetail.title);
$out+='</h2>\n  </div>\n\n  <div class="c_detail_main clearfix">\n    <div class="main_article left">\n      <h2>课程介绍</h2>\n      ';
$out+=$escape(courseDetail.textbook);
$out+='\n      <h2>教师介绍</h2>\n      ';
$out+=$escape(courseDetail.aboutauthor);
$out+='\n      <h2>课程目录</h2>\n      ';
$out+=$escape(courseDetail.catalog);
$out+='\n    </div>\n    <div class="main_aside right">\n      <ul>\n        <li>选用的教材</li>\n        <li>相关课程</li>\n      </ul>\n    </div>\n  </div>\n';
return new String($out);
});/*v:1*/
template('CourseList',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,courseList=$data.courseList,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<ul>\n  ';
$each(courseList,function(value,key){
$out+='\n  <li>\n    <a href="/view/student/s_course_detail.html?id=';
$out+=$escape(value.id);
$out+='">\n      <img src=';
$out+=$escape(value.img);
$out+=' alt="王二蛋">\n    </a>\n    <p>';
$out+=$escape(value.id + value.title);
$out+='</p>\n  </li>\n  ';
});
$out+='\n</ul>\n';
return new String($out);
});/*v:1*/
template('Header',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$out='';$out+='<h1 class="s-h-logo left">\n  <a href="#"><img src="../../asset/image/logo.png" alt="logo" title="哈工大出版社在线教育" /></a>\n</h1>\n<div class="s-h-info right">\n  <ul class="user-list">\n    <li class="wrap">\n      <a href="" class="mes">\n        <span class="mes-num">1</span>\n      </a>\n    </li>\n    <li class="wrap">\n      <a href="" class="avater">\n        <img src="../../asset/image/avater.jpeg" class="avater" alt="" title="">\n      </a>\n      <a href="#">';
$out+=$escape(name);
$out+='<i class="triangle-down icon"></i></a>\n      <ul>\n        <li>我的资源</li>\n        <li class="giveout">我的订单</li>\n        <li class="giveout">个人资料</li>\n        <li class="giveout"><a href="http://localhost:38900/login.html">退出登录</a></li>\n      </ul>\n    </li>\n    <li class="wrap">\n      <a href="#">学生端<i class="triangle-down icon"></i></a>\n      <ul>\n        <li>学生端</li>\n        <li class="giveout">教师端</li>\n      </ul>\n    </li>\n  </ul>\n</div>\n<div class="s-h-search">\n  <div class="s-select">\n    <a href="#">课程<i class="triangle-down-black icon"></i></a>\n    <ul>\n      <li>课程</li>\n      <li class="giveout">教材</li>\n    </ul>\n  </div>\n  <div class="s-input">\n    <input type="search"><span class="search-logo"></span>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('Swiper',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,swiperList=$data.swiperList,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<div class="swiper-container  s-b-container"></div>\n  <div class="swiper-wrapper">\n    ';
$each(swiperList,function(value,key){
$out+='\n    <div class="swiper-slide"><img src=';
$out+=$escape(value.imgUrl);
$out+=' alt="" title=';
$out+=$escape(value.title);
$out+='></div>\n    ';
});
$out+='\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('TextBook',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,textBook=$data.textBook,value=$data.value,key=$data.key,$escape=$utils.$escape,$out='';$out+='<ul>\n  ';
$each(textBook,function(value,key){
$out+='\n  <li>\n    <img src=';
$out+=$escape(value.imgUrl);
$out+=' alt="">\n    <p>';
$out+=$escape(value.title);
$out+='</p>\n  </li>\n  ';
});
$out+='\n</ul>\n';
return new String($out);
});

}()