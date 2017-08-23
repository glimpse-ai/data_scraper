var acceptedAttrsMap = arguments[0];

var els = document.body.querySelectorAll('*');

var el;
for (var i = 0; i < els.length; i++) {
  el = els[i];
  
  var attr;
  for (var j = el.attributes.length - 1; j >= 0; j--) {
    attr = el.attributes[j].name;
    
    if (!acceptedAttrsMap.hasOwnProperty(attr)) {
      el.removeAttribute(attr);
    }
  }
  
  if (el.tagName == 'IMG' && el.hasAttribute('src')) {
    el.setAttribute('src', window.urlToAbsolute(el.getAttribute('src')));
  }
}