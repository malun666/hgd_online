require.config({
  paths: {
    'jquery': '../../../lib/jquery.min-1.11.3',
    'cookie': '../../../lib/js.cookie',
    'sha1': '../../../lib/sha1',
    'util': '../../../js/Tools/Util',
    'ajaxSetup': '../../../js/Controller/student/ajaxSetup'
  }
});

require(['jquery', 'util', 'cookie', 'sha1'], function($, util, cookie, sha1) {
  var login = {
    init: function() {
      login.bindEvent();
    },
    bindEvent: function() {
      // 表单验证
      $('#username').on('blur', this.onUsernNameBlur);
      $('#password').on('blur', this.onPassWordBlur);
      // 提交表单
      $('#subBtn').on('click', this.onSubBtnClick);
    },
    onPassWordBlur: function() {
      if ($(this).parent().find('.error').length > 0) {
        $(this).parent().find('.error').remove();
      }
      if ($.trim($(this).val()) === '') {
        $(this).after('<div class="error">密码不能为空!</div>');
      }
    },
    onUsernNameBlur: function() {
      if ($(this).parent().find('.error').length > 0) {
        $(this).parent().find('.error').remove();
      }
      if ($.trim($(this).val()) === '') {
        $(this).after('<div class="error">用户名不能为空!</div>');
      }
    },
    onSubBtnClick: function() {
      $('#username').triggerHandler('blur');
      $('#password').triggerHandler('blur');
      if ($('#loginForm').find('.error').length > 0) {
        return false;
      }
      // 表单验证通过
      var data = $('#loginForm').serializeArray();
      data[1].value = b64_sha1(data[1].value); // 密码加密
      // console.log(data);
      util.ajax({
        type: 'post',
        url: 'http://n.hamkd.com/api/userlogin',
        data: data,
        success: function(response) {

        }
      });
    }
  };
  $(login.init);
});
