define(function(url) {
  var args = url.split('?');
  if (args[0] === url) {
    return '';
  }
  var arr = args[1].split('&');
  var obj = [];
  for (var i = 0; i < arr.length; i++) {
    var arg = arr[i].split('=');
    obj[arg[0]] = arg[1];
    return obj;
  }
  console.log('xiongwenchengdashabi');
});
