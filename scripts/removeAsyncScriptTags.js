var scripts = document.body.querySelectorAll('script');

for (var i = scripts.length - 1; i >= 0; i--) {
  scripts[i].parentNode.removeChild(scripts[i]);
}