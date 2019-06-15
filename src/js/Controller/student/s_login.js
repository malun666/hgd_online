//配置依赖的模块的路径
require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    sha1: '/lib/sha1',
    cookie: '/lib/js.cookie',
    validate: '/lib/jquery.validate.min'
  }
});
//进行入口处理
require(['jquery', 'cookie', 'sha1', 'validate'], function($, Cookies, sha1, validate) {
  $(function() {
    //表单验证未完善
    $('#login').validate({
      rules: {
        userName: {
          required: true, // 必填
          minlength: 3
        },
        password: {
          required: true,
          minlength: 3
        }
      },
      messages: {
        username: {
        },
        password: {
        }
      }
    });
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
