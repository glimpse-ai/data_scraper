/*
Remove data-keep attribute from all els
 */

var els = document.body.querySelectorAll('*');

for (var i = 0; i < els.length; i++) {
  if (els[i].hasAttribute('data-keep')) {
    els[i].removeAttribute('data-keep');
  }
}

if (document.body.hasAttribute('data-keep')) {
  document.body.removeAttribute('data-keep');
}