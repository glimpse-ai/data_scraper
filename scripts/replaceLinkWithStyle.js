/*
Replace <link> tag with <style type="text/css">provided css</style>
 */

var linkEl = arguments[0];
var css = arguments[1];

var styleEl = document.createElement('style');
styleEl.setAttribute('type', 'text/css');
styleEl.innerHTML = css;

if (linkEl.parentNode == document.body) {
  document.body.removeChild(linkEl);
  var head = (document.getElementsByTagName('head') || [])[0];
  
  if (head) {
    head.appendChild(styleEl);
  } else {
    // unverified
    styleEl.setAttribute('data-keep', 'yes');
    document.body.appendChild(styleEl);
  }
} else {
  linkEl.parentNode.replaceChild(styleEl, linkEl);
}