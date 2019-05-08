/*
 * @Author: malun
 * @Date: 2018-04-18 01:14:34
 * @Last Modified by: lianqinghua
 * @Last Modified time: 2018-04-25 11:00:34
 */

require.config({
  paths: {
    template: '../lib/arttemplate/template-web',
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    header: '../js/tmpl/header',
    footer: '../js/tmpl/footer',
    index: '../js/index',
    icon: '../asset/font/font_611071_tk9pu742kb1brzfr/iconfont'
  }
});

require(['index']);
