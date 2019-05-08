/*
 * @Author: snakeyu
 * @Date: 2018-04-25 19:06:31
 * @Last Modified by: snakeyu
 * @Last Modified time: 2018-04-26 19:07:50
 */

require(['jquery', 'template', 'student', 'swiper'], function(
  $,
  template,
  student,
  Swiper
) {
  var data = {
    head: {
      page: 't-index',
      user: {
        name: '张三',
        type: '教师端',
        resource: '#',
        goods: '#',
        Information: '#',
        exit: '#'
      },
      message: {
        number: 2,
        url: '#'
      },
      img: {
        logo: '../../asset/image/logo.png',
        logo2: '../../asset/image/logo2.png',
        hed: '../../asset/image/hed.png'
      }
    },
    nav: {
      left: [
        { name: '首页', url: '#' },
        { name: '教材', url: '#' },
        { name: '我的教学', url: '#' }
      ],
      right: {
        build: { name: '建立课程', url: '#' },
        serial: { name: '通过序列号获取资源权限', url: '#' }
      }
    }
  };
  // 轮播图
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination'
    }
  });
  $('nav').html(student('nav', data.nav));
  $('header').html(student('header', data.head));
  $('footer').html(student('footer', {}));
});
