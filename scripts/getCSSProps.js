/*
Assign CSS props to each element as style attribute
 */

var els = arguments[0];
var el;
var elsWithStyle = [];

for (var i = 0; i < els.length; i++) {
  el = els[i];

  var props = CSSUtilities.getCSSProps(el);

  var style = '';
  for (var k in props) {
    style += (k + ':' + props[k] + ';');
  }

  if (style) {
    elsWithStyle.push([el, style]);
  }
}

if (elsWithStyle.length > 0) {
  for (var j = 0; j < elsWithStyle.length; j++) {
    elsWithStyle[j][0].setAttribute('style', elsWithStyle[j][1]);
  }
}