// Shared blog sidebar nav - fetches blog-nav.html and injects with correct hrefs
(function () {
  const container = document.getElementById('blog-nav-container');
  if (!container) return;

  fetch('blog-nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      container.innerHTML = html;
      if (base) {
        container.querySelectorAll('a[href^="#"]').forEach(function (a) {
          a.href = base + a.getAttribute('href');
        });
      }
    })
    .catch(function () {
      container.innerHTML = '<nav class="blog-nav"><p>nav failed to load</p></nav>';
    });
})();
