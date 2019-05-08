/*
 * @Author: malun
 * @Date: 2018-04-18 01:14:34
 * @Last Modified by: snakeyu
 * @Last Modified time: 2018-04-26 18:01:31
 */

require.config({
  paths: {
    template: '../../lib/arttemplate/template-web',
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    student: '../../js/tmpl/student',
    swiper: '../../lib/swiper-4.1.6/js/swiper.min',
    Sindex: '../../js/student/s_index'
  }
});

require(['Sindex'], function() {
  setInterval(function() {
    // window.location.reload();
  }, 3000);
});
