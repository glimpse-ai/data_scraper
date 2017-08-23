var els = document.body.querySelectorAll('*');
var el;
for (var i = 0; i < els.length; i++) {
  el = els[i];
  
  if (el.style.display == 'none' || el.style.visibility == 'hidden' || el.style.opacity == '0') {
    el.parentNode.removeChild(el);
  }
}