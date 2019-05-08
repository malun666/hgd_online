/*
 * @Author: lianqinghua
 * @Date: 2018-04-23 17:56:46
 * @Last Modified by: lianqinghua
 * @Last Modified time: 2018-04-25 14:55:30
 */
require([
  'template',
  'icon',
  'header',
  'footer'
], function(template, icon, headTpl, footTpl) {
  var data = {
    head: {
      page: 't-index',
      user: {
        name: '张三',
        type: '教师端',
        resource: '#',
        goods: '#',
        Information: '#',
        exit: '#'
      },
      message: {
        number: 2,
        url: '#'
      },
      img: {
        logo: '../../asset/image/logo.png',
        logo2: '../../asset/image/logo2.png',
        hed: '../../asset/image/hed.png'
      }
    }
  };
  var head = document.getElementById('header');
  var foot = document.getElementById('footer');
  head.innerHTML += headTpl('header', data.head);
  foot.innerHTML += footTpl('footer', {});
});
