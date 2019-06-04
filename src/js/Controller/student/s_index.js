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
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: true, //可选选项，自动滑动
      parallax: true,
      speed: 2000,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    });
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
      }
    });
  });
});
