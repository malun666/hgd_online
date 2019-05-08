/*
 * @Author: lianqinghua
 * @Date: 2018-04-23 17:56:46
 * @Last Modified by: lianqinghua
 * @Last Modified time: 2018-04-27 10:10:21
 */
require([
  'jquery',
  'template',
  'icon',
  'teacher',
  'swiper',
  'api'
], function($, template, icon, teacher, Swiper, api) {
  console.log(api);
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/api/te_user',
    success: function(data) {
      // header
      $('header').html(teacher('header', data));
    }
  });
  $.ajax(
    {
      type: 'GET',
      url: '/api/te_system',
      dataType: 'json',
      success: function(data) {
        // banner图
        $('#banner').html(teacher('banner', data));
        // 轮播图
        var mySwiper = new Swiper('.swiper-container', {
          loop: true,
          autoplay: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        });
        console.log(mySwiper);
      }

    });
  $.ajax(
    {
      type: 'GET',
      url: '/api/te_book',
      dataType: 'json',
      success: function(data) {
        // 热门教材
        $('#textbook').html(teacher('textbook', data));
      }

    });
  // 主导航
  $('nav').html(teacher('nav', {
    nav: {
      left: [
        { 'name': '首页', 'url': '#' },
        { 'name': '教材', 'url': '#' },
        { 'name': '我的教学', 'url': '#' }
      ],
      right: [
        { name: '建立课程', url: '#' },
        { name: '通过序列号获取资源权限', url: '#' }
      ]
    }
  }));

  // footer
  $('footer').html(teacher('footer', {}));
});
