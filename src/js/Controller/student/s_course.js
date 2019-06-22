require.config({
  paths: {
    jquery: '/lib/jquery.min-1.11.3',
    tpl: '../../tmpl/student',
    cookies: '../../../lib/js.cookie',
    common: '../student/s_common',
    pagination: '../../../lib/jquery.simplePagination'

  },
  shim: {
    pagination: {
      deps: ['jquery']
    }
  }
});
require(['jquery', 'tpl', 'cookies', 'common', 'pagination'], function($, tpl, Cookies, common, pagination) {
  $(function() {
    //头部可以进行封装，复用
    var userData = {};
    $.ajaxSetup({headers: {
      'Authorization': Cookies.get('Authorization')
    }});
    var id = Cookies.get('userID');
    var childID;
    $.ajax({
      url: 'http://n.hamkd.com/api/user/' + id,
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        userData.name = response.name;
        userData.avatar = response.avatar;
        $('#s_header').html(tpl('Header', userData));
      },
      error: function() {
        console.log('获取失败');
      }
    });

    var courseCat = [];
    $.ajax({
      url: 'http://n.hamkd.com/api/student/course_category',
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        console.log('courseCat', response);
        for (var i = 0; i < response.length; i++) {
          response[i].children = [];
          for (var j = 0; j < response.length; j++) {
            if (response[j].pid === response[i].id) {
              response[i].children.push(response[j]);
            }
          }
          if (response[i].children.length > 0) {
            courseCat.push(response[i]);
          }
        };

        console.log(courseCat);
        $('.s-c-item').html(tpl('CourseCat', {courseCat: courseCat}));

        $('.accordion').on('click', '.accordion-control', function(e) {
          e.preventDefault();
          var $span = $(this).next('span');
          $span.next('.accordion-panel').not(':animated').slideToggle();
          $span.html() === '+' ? $span.html('-') : $span.html('+');
          var catIdString = $(this).text();
          $('.course-nav').html(catIdString);
        });
        $('.accordion-panel').on('click', 'li', function(e) {
          var childText = $(this).text();

          document.querySelector('.left_span').style.opacity = 1;
          $('.child_text').html(childText);
          childID = $(this).attr('name');
          $.ajax({
            url: 'http://n.hamkd.com/api/student/courses?_limit=20&_order=id&catId=' + childID,
            type: 'GET',
            data: '',
            dataType: 'json'
          }).done(function(response) {
            console.log('catId', response);
            catCourseList = response;
            $('.content_main').html(tpl('CatCourseList', {catCourseList: catCourseList}));
          });
        });
      },
      error: function() {
        console.log('获取失败');
      }
    });

    $.ajax({
      url: 'http://n.hamkd.com/api/student/course_category?pid=1',
      type: 'GET',
      data: '',
      dataType: 'json',
      success: function(response) {
        console.log('test', response);
      },
      error: function() {
        console.log('获取失败');
      }
    });
    // $.ajax({
    //   url: 'http://n.hamkd.com/api/student/courses?catId=6&_limit=20&_order=id',
    //   type: 'GET',
    //   data: '',
    //   dataType: 'json',
    //   success: function(response) {
    //     console.log('test2', response);
    //   },
    //   error: function() {
    //     console.log('获取失败');
    //   }
    // });

    var catCourseList = [];
    $.ajax({
      url: 'http://n.hamkd.com/api/student/courses?catId=6&_limit=20&_order=id',
      type: 'GET',
      data: '',
      dataType: 'json'
    }).done(function(response) {
      console.log('catId', response);
      catCourseList = response;
      $('.content_main').html(tpl('CatCourseList', {catCourseList: catCourseList}));
    });

    $('.pagination').pagination({
      items: 100,
      itemsOnPage: 10,
      cssStyle: 'light-theme',
      // onPageClick: changePage, //当页面被点击时调用的函数
      // currentPage: cur, //当前页
      prevText: '上一页',
      nextText: '下一页'
    });
  });
});
