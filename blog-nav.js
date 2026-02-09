// Shared blog sidebar nav - fetches blog-nav.html and injects with correct hrefs
(function () {
  const container = document.getElementById('blog-nav-container');
  if (!container) return;

  // On article pages (e.g. technical-blog-rag.html), category/series links point to technical-blog.html
  const isArticlePage = /technical-blog-rag|technical-blog\/[^/]+\.html/.test(window.location.pathname) ||
    window.location.pathname.endsWith('technical-blog-rag.html');
  const base = isArticlePage ? 'technical-blog.html' : '';

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
