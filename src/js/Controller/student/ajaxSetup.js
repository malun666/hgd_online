define(['jquery', 'Cookies'], function($, Cookies) {
  return $.ajaxSetup({
    headers: {
      'Authorization': Cookies.get('Authorization')
    },
    StatusCode: {
      401: function() {
        window.location.href = '/login.html';
      }
    }
  });
});
