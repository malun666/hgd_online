require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    tpl: '../../tmpl/student',
    cookies: '../../../lib/js.cookie',
    common: '../student/s_common'

  }
});
require(['jquery', 'tpl', 'cookies', 'common'], function($, tpl, Cookies, common) {
  $(function() {
    //头部可以进行封装，复用
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
        $('#s_header').html(tpl('Header', userData));
      }
    });

    $('.accordion').on('click', '.accordion-control', function(e) {
      e.preventDefault();
      var $span = $(this).next('span');
      $span.next('.accordion-panel').not(':animated').slideToggle();
      $span.html() === '+' ? $span.html('-') : $span.html('+');
    });
  });
});
