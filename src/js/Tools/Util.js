define(['jquery'], function($) {
  return {
    ajax: function(param) {
      $.ajax({
        type: param.type || 'get',
        contentType: 'application/x-www-form-urlencoded',
        url: param.url,
        data: param.data || {},
        dataType: param.dataType || 'json',
        success: function(response) {
          param.success(response);
        }
      });
    }
  };
});
