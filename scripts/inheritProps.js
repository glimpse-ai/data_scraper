/*
Inherit CSS props backwards up the DOM tree to avoid 'inherited' or 'initial' values
 */

function findInheritedPropVal (el, prop) {
  var parent = el.parentNode;
  
  if (!parent) {
    return;
  }
  
  var parentPropVal = parent.style[prop];
  
  if (!parentPropVal) {
    return;
  }
  
  if (parentPropVal == 'inherit') {
    return findInheritedPropVal(parent, prop);
  } else {
    return parentPropVal;
  }
}

function inheritProps (el) {
  if (!el.hasAttribute('style')) {
    return;
  }
  
  var style = el.getAttribute('style').trim();
  
  if (!style) {
    el.removeAttribute('style');
    return;
  }
  
  var styleMap = {};
  style.split(';').forEach(function (group) {
    group = group.trim();
    
    if (group) {
      var colonIndex = group.indexOf(':');
      var key = group.substr(0, colonIndex).trim();
      var v = group.substr(colonIndex + 1).trim();
      
      if (key && v) {
        styleMap[key] = v;
      }
    }
  });
  
  var val, defaultVal, inheritedVal;
  var expandedProps = {};
  for (var p in styleMap) {
    val = styleMap[p];

    // if prop val == 'initial' --> resort to prop's default value
    if (val == 'initial') {
      defaultVal = window.propsMap[p].default;

      // if no default value, skip property altogether
      if (!defaultVal || defaultVal == '*') {
        continue;
      }

      val = defaultVal;
    }
    // if prop val == 'inherit' --> find *actual* value that's being inherited
    else if (val == 'inherit') {
      inheritedVal = findInheritedPropVal(el, p);

      if (inheritedVal) {
        val = inheritedVal;
      }
    }

    expandedProps[p] = val;
  }

  style = '';
  for (var k in expandedProps) {
    style += (k + ':' + expandedProps[k] + ';')
  }

  if (style) {
    el.setAttribute('style', style);
  } else {
    el.removeAttribute('style');
  }
}

var els = document.body.querySelectorAll('*');

for (var i = els.length - 1; i >= 0; i--) {
  inheritProps(els[i]);
}