require.config({
  paths: {
    'jquery': '../../../lib/jquery.min-1.11.3'
  }
});

require(['jquery'], function($) {
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
      console.log(data);
    }
  };
  $(login.init);
});
