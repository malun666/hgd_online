require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3'
  }
});

require(['jquery'], function($) {
  $(function() {
    var aList = $('.xiong');
    aList.click(function(event) {
      // event.preventDefault();
      for (var i = 0; i < aList.length; i++) {
        aList[i].className = 'xiong';
      }
      event.target.className = 'xiong color';
    });
  });
});
