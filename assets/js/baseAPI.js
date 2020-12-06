//每次调用$.get()或者是post()或$.ajax()的时候，
//会优先调用ajaxprefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {

  //在发起真正的Ajax请求之前，提议拼接请求的跟路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  console.log(options.url);
})