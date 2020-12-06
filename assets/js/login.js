$(function () {

  //点击"去注册账号"的链接
  $('#link_red').on('click', function () {
    // console.log(123);
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击去登陆的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //通过form.vaerfy（）函数来自定义规则
  form.verify({
    pwd: [/^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进项一次判断
      //如果失败，则return
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return "两次密码不一致"
      }
    }
  })

  //监听注册表单的提交事件

  $('#form_reg').on('submit', function (e) {
    //阻止默认的提交行为
    e.preventDefault()
    //发起ajax的post请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val()
    }
    $.post('/api/reguser', data,
      function (res) {
        if (res.status !== 0) {
          // return console.log(res.message);
          return layer.msg(res.message)
        }
        layer.msg('注册成功,请登陆');
        // console.log('注册成功');
        //模拟人的点击行为   
        $('#link_login').click()
      })
  })


  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/code/index.html'
      }
    })
  })


})





