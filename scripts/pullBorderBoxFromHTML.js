// Note: Tons of copypasta here from inheritProps.js

function inheritProps (el, htmlStyleMap) {
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
  
  var val, defaultVal;
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
    // if prop val == 'inherit' --> pull value from html element (if there)
    else if (val == 'inherit' && htmlStyleMap[p]) {
      val = htmlStyleMap[p];
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

var html = document.getElementsByTagName('html')[0];

if (html) {
  inheritProps(document.body, getComputedStyle(html));
}