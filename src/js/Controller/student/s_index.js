//配置依赖的模块的路径
require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    swiper: '../../../lib/swiper-4.1.6/js/swiper.min'

  }
});
//进行入口处理
require(['jquery', 'swiper'], function($, Swiper) {
  $(function() {
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: true, //可选选项，自动滑动
      parallax: true,
      speed: 2000,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    });
  });
});
