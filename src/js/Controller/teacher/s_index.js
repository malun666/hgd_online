require.config({
  paths: {
    'jquery': '../../../lib/jquery.min-1.11.3',
    'swiper': '../../../lib/swiper-4.1.6/js/swiper',
    'tpl': '../../tmpl/teacher',
    'cookies': '../../../lib/js.cookie',
    'util': '../../../js/Tools/Util'
  }
});

require(['jquery', 'swiper', 'tpl', 'cookies', 'util'], function($, swiper, tpl, cookies, util) {
  var init = function() {
    $.ajaxSetup({
      headers: {
        'Authorization': cookies.get('Authorization')
      }
    });
    // 加载页面头部
    loadHead();
    // 加载头部轮播图
    loadCarousel();
    // 加载教师端推荐教材
    loadRecommendedBook();
    // 加载推荐课程
    loadRecommendedCourse();
  };

  var loadRecommendedCourse = function() {
    util.ajax({
      url: '/api/teacher/courses?_limit=8&_order=id&isHot=true',
      success: function(response) {
        console.dir(response);
        $('#reCourse').html(tpl('RecommentedCourse', {
          list: response
        }));
      }
    });
  };

  var loadRecommendedBook = function() {
    util.ajax({
      url: '/api/teacher/materials?_limit=8&_order=id&isHot=true',
      success: function(response) {
        $('#reBook').html(tpl('RecommentedBook', {
          list: response
        }));
      }
    });
  };
  var loadCarousel = function() {
    util.ajax({
      url: '/api/student/carousel',
      success: function(response) {
        var carouselList = {
          list: response
        };
        $('#item_banner').html(tpl('Carousel', carouselList));
        var mySwiper = new swiper('.swiper-container', {
          autoplay: true, // 可选选项，自动滑动
          parallax: true,
          speed: 2000,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        });
      }
    });
  };
  var loadHead = function() {
    // 获取用户id
    var id = cookies.get('userID');
    util.ajax({
      url: '/api/user/' + id,
      success: function(response) {
        $('#s_header').html(tpl('Header', response));
      }
    });
  };
  init();
});
