define(['jquery'], function($) {
  return {
    ajax: function(param) {
      $.ajax({
        type: param.type || 'get',
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
