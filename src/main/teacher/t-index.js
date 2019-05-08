/*
 * @Author: malun
 * @Date: 2018-04-18 01:14:34
 * @Last Modified by: lianqinghua
 * @Last Modified time: 2018-04-25 18:38:08
 */

require.config({
  paths: {
    template: '../../lib/arttemplate/template-web',
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    teacher: '../../js/tmpl/teacher',
    Tindex: '../../js/teacher/t-index',
    swiper: '../../lib/swiper-4.1.6/js/swiper.min',
    icon: '../../asset/font/font_611071_tk9pu742kb1brzfr/iconfont'
  }
});

require(['Tindex']);
