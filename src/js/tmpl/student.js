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
template('footer','<div class="s-container">\n  <p>\n    <span>Copyrignt &copy; 2004-2016哈尔滨工业大学出版社</span>\n    <span>版权所有</span>\n    <span>京ICP备11017824号-7</span>\n  </p>\n</div>\n');/*v:1*/
template('header','<div class="s-container">\n  <div class="s-index-header-logo">\n    <h1>\n      <a href="#">\n        <img src="../../asset/image/s_index_logo.png" alt="">\n      </a>\n    </h1>\n  </div>\n  <ul class="user">\n    <li class="message">\n      <span></span>\n      <sup>1</sup>\n    </li>\n    <li class="userInfo">\n      <span>张三\n        <i></i>\n      </span>\n      <ul>\n        <li>\n          <a href="#">我的资源</a>\n        </li>\n        <li>\n          <a href="#">我的订单</a>\n        </li>\n        <li>\n          <a href="#">个人资料</a>\n        </li>\n        <li>\n          <a href="#">退出登录</a>\n        </li>\n      </ul>\n    </li>\n    <li class="beforeLogin">\n      <span>\n        登录\n        <i></i>\n      </span>\n      <ul>\n        <li>\n          <a href="#">登录</a>\n        </li>\n        <li>\n          <a href="#">注册</a>\n        </li>\n      </ul>\n    </li>\n    <li class="port">\n      <span>教师端\n        <i></i>\n      </span>\n      <ul>\n        <li>\n          <a href="#">学生端</a>\n        </li>\n        <li>\n          <a href="#">教师端</a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n\n  <form action="" class="search">\n    <div class=\'keyWord\'>\n      课程\n      <i class="bottomFollow"></i>\n      <ul class=\'s-index-bottomFollowList\'>\n        <li>\n          <a href="#">课程</a>\n        </li>\n        <li>\n          <a href="#">教材</a>\n        </li>\n      </ul>\n    </div>\n    <input type="text" class="searchBox">\n    <button class="btn"></button>\n  </form>\n\n\n\n\n</div>\n');/*v:1*/
template('nav','<div class="s-container">\n\n  <div class="nav-left">\n    <ul>\n      <li>\n        <a href="#" class=\'active\'>首页</a>\n      </li>\n      <li>\n        <a href="">课程</a>\n      </li>\n      <li>\n        <a href="#">教材</a>\n      </li>\n\n      <li class="line">\n        <a href="#">我的学习</a>\n      </li>\n    </ul>\n  </div>\n  <div class="nav-right">\n    <ul>\n      <li>\n        <a href="#">通过课程邀请码计入课程</a>\n      </li>\n      <li class="line">\n        <a href="#">通过序列号获取资源权限</a>\n      </li>\n    </ul>\n  </div>\n\n</div>\n');

}()