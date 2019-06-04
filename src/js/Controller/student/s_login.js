//配置依赖的模块的路径
require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    sha1: '../../../lib/sha1',
    ajaxSetup: '../../../js/student/ajaxSetup',
    cookie: '../../../lib/js.cookie'

  }
});
//进行入口处理
require(['jquery', 'cookie', 'sha1'], function($, Cookies, sha1) {
  $(function() {
    //未写表单验证
    $('#submitBtn').on('click', function(e) {
      e.preventDefault();
      var dataArr = [];
      dataArr = $('#login').serializeArray();

      $.ajax({
        url: 'http://n.hamkd.com/api/userlogin',
        type: 'POST',
        data: dataArr,
        dataType: 'json',
        success: function(response) {
          if (response.code === 0) {
            alert('用户名或者密码错误');
            return;
          }

          if (response.user.isTeacher === true) {
            Cookies.set('Authorization', dataArr[1]);
            Cookies.set('userID', response.user.id);
            window.location.href = '/view/student/t_index.html';
          } else {
            Cookies.set('Authorization', dataArr[1]);
            Cookies.set('userID', response.user.id);
            window.location.href = '/view/student/s_index.html';
          }
        }
      });
    });
  });
});
