//配置依赖的模块的路径
require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    swiper: '../../../lib/swiper-4.1.6/js/swiper.min',
    tpl: '../../tmpl/student',
    cookies: '../../../lib/js.cookie'

  }
});
//进行入口处理
require(['jquery', 'swiper', 'tpl', 'cookies'], function($, Swiper, tpl, Cookies) {
  $(function() {
    //用户信息
    var userData = {};
    $.ajaxSetup({headers: {
      'Authorization': Cookies.get('Authorization')
    }});
    var id = Cookies.get('userID');
    $.ajax({
      url: 'http://n.hamkd.com/api/user/' + id,
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        userData.name = response.name;
        userData.avatar = response.avatar;
        console.log(response);
        $('#s_header').html(tpl('Header', userData));
      },
      error: function() {
        console.log('获取失败');
      }
    });
    //轮播图
    var swiperList = [];
    $.ajax({
      url: 'http://n.hamkd.com/api/student/carousel',
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        console.log('swiper:', response);
        swiperList = response;
        // $('#s_banner').html(tpl('Swiper', {swiperList: swiperList}));
        var mySwiper = new Swiper('.swiper-container', {
          autoplay: true, //可选选项，自动滑动
          parallax: true,
          speed: 2000,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        });
      },
      error: function() {
        console.log('获取失败');
      }
    });

    //推荐课程列表请求 --- 可以封装在js文件中
    var courseList = [];
    $.ajax({
      url: 'http://n.hamkd.com/api/student/courses?_limit=10&_order=id&isHot=true',
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        courseList = response;
        console.log('course:', courseList);
        console.log(tpl('CourseList', courseList));
        $('#courseList').html(tpl('CourseList', {courseList: courseList}));
      },
      error: function() {
        console.log('获取失败');
      }
    });
    //推荐教材列表请求
    //偷懒了，直接把地址写进页面中了
    var textBook = [];
    $.ajax({
      url: 'http://n.hamkd.com/api/student/materials?_limit=10&_order=id&isHot=true',
      type: 'GET',
      data: '',
      success: function(response) {
        textBook = response;
        console.log('textBook:', textBook);
        $('.s-t-content').html(tpl('TextBook', {textBook: textBook}));
      },
      error: function() {
        console.log('获取失败');
      }
    });
  });
});
