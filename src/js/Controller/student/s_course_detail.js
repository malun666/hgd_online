require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    tpl: '../../tmpl/student',
    cookies: '../../../lib/js.cookie',
    common: '../student/s_common',

  }
});
require(['jquery', 'tpl', 'cookies', 'common'], function ($, tpl, Cookies, common) {
  $(function () {
    //头部可以进行封装，复用
    var userData = {};
    $.ajaxSetup({
      headers: {
        'Authorization': Cookies.get('Authorization')
      }
    });
    var id = Cookies.get('userID');
    $.ajax({
      url: 'http://n.hamkd.com/api/user/' + id,
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        userData.name = response.name;
        userData.avatar = response.avatar;
        $('#s_header').html(tpl('Header', userData));
      }
    });

    $.ajax({
      url: 'http://n.hamkd.com/api/user/' + id,
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        userData.name = response.name;
        userData.avatar = response.avatar;
        $('#s_header').html(tpl('Header', userData));
      }
    });
    //定义从url上获取参数
    function getParamWithURL(url) {
      var args = url.split('?');
      if (args[0] === url) {
        return '';
      }
      var arr = args[1].split('&');
      var obj = [];
      for (var i = 0; i < arr.length; i++) {
        var arg = arr[i].split('=');
        obj[arg[0]] = arg[1];
      }
      return obj;
    }

    //获取id参数值并get详情信息
    var urlID = window.location.href;
    console.log(urlID);
    var id_ = getParamWithURL(urlID).id;
    var courseDetail = [];
    $.ajax({
      url: 'http://n.hamkd.com/api/student/courses?id=' + id_,
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        courseDetail = response[0];
        console.log(courseDetail);
        // $('.courseDetail').html('xiongwencheng');
        $('.courseDetail').html(tpl('CourseDetail', {courseDetail: courseDetail}));
      }
    });
  });
});
