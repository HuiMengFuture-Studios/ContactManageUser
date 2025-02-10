$(document).ready(function () {
  fetch('/components/navbar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // 对插入的内容进行转义，防止 XSS 攻击
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      document.getElementById('navbar-container').innerHTML = doc.body.innerHTML;
      // 确保 app.js 的逻辑在 navbar.html 加载完成后执行
      setupNavbar();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      document.getElementById('navbar-container').innerHTML = '<p>加载导航栏失败，请检查网络连接。</p>';
    });
});


function setupNavbar() {
  $(document).ready(function () {
    // 获取当前页面的URL路径
    const path = window.location.pathname;
    console.log(path);

    // 移除所有导航项的active类
    $('.navbar-nav .nav-item').removeClass('active');

    // 根据URL路径激活相应的导航项
    $('.navbar-nav .nav-item').each(function () {
      const url = $(this).data('url');
      if (path.endsWith('/' + url + '.html') || (url === '' && path === '/')) {
        console.log('active:' + url);
        $(this).addClass('active');
      } else {
        console.log('not active:' + url);
      }
    });
  });
}
