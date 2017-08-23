var els = document.body.querySelectorAll('*');

var el;
for (var i = els.length - 1; i >= 0; i--) {
  el = els[i];
  
  if (parseFloat(getComputedStyle(el).height) == 0 && el.children.length == 0) {
    el.parentNode.removeChild(el);
  }
}