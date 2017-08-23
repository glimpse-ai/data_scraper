var allElsBorderBox = arguments[0];

window.matchesDefault = function(val, defaultVal) {
  var match = function (val, dv) {
    return window.roundFloats(val) == dv;
  };
  
  switch (typeof(defaultVal)) {
    case 'string':
      return match(val, defaultVal);
      break;
    case 'object':
      if (window.Array.isArray(defaultVal)) {
        for (var i = 0; i < defaultVal.length; i++) {
          if (match(val, defaultVal[i])) {
            return true;
          }
        }
      } else {  // can assume to be a hash and not null
        for (var k in defaultVal) {
          if (match(val, k)) {
            return true;
          }
        }
      }
      break;
  }
  
  return false;
};

function removeRedundancy(el) {
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
      var key =   group.substr(0, colonIndex).trim();
      var v = group.substr(colonIndex + 1).trim();
      
      if (key && v) {
        styleMap[key] = v;
      }
    }
  });
  
  if (allElsBorderBox && styleMap.hasOwnProperty('box-sizing') && el.tagName != 'BODY') {
    delete styleMap['box-sizing'];
  }
  
  if (styleMap.hasOwnProperty('opacity') && styleMap.opacity.toString() == '1') {
    delete styleMap['opacity'];
  }
  
  var parentStyle = el.parentNode.style;
  var val;
  var propsMapInfo;
  var reducedProps = {};
  for (var p in styleMap) {
    val = styleMap[p];
    propsMapInfo = window.propsMap[p];
    
    if (!propsMapInfo) {
      continue;
    }
    
    if (propsMapInfo.overwriteUserAgentSS && propsMapInfo.overwriteUserAgentSS.indexOf(el.tagName) != -1) {
      if (propsMapInfo.canHoldColor) {
        val = window.reduceColor(val);
      }
      
      val = window.roundFloats(val);
      
      reducedProps[p] = val;
      continue;
    }
    
    // if inherited prop is same on parent, it's redundant, so don't add it.
    if (propsMapInfo.inherited && parentStyle[p] == val) {
      continue;
    }

    if (propsMapInfo.ignoreIfDefault && matchesDefault(val, propsMapInfo.default)) {
      var removeProp = true;
      
      if (p == 'border' && el.hasAttribute('border')) {
        removeProp = false;
      }
      
      // if the property has a shorthand prop, which is also defined in the styleMap, keep the prop
      if (removeProp && propsMapInfo.hasOwnProperty('shorthand') && styleMap.hasOwnProperty(propsMapInfo.shorthand)) {
        removeProp = false;
      }
      
      if (removeProp && (p == 'margin' || p == 'padding') && (styleMap[p + '-left'] || styleMap[p + '-right'] || styleMap[p + '-top'] || styleMap[p + '-bottom'])) {
        removeProp = false;
      }

      if (removeProp) {
        continue;
      }
    }
    
    if (propsMapInfo.canHoldColor) {
      val = window.reduceColor(val);
    }
    
    val = window.roundFloats(val);
    
    reducedProps[p] = val;
  }
  
  // if <a> element with only text content
  if (el.tagName == 'A' && el.innerHTML && el.innerText && el.innerHTML.trim() == el.innerText.trim()) {
    // empty contents of element if it has a background-image of any sort
    if (reducedProps.hasOwnProperty('background-image') || (reducedProps.background || '').indexOf('url(') != -1) {
      el.innerHTML = '';
    }
  }
  
  style = '';
  for (var k in reducedProps) {
    style += (k + ':' + reducedProps[k] + ';')
  }
  
  if ((el.tagName == 'UL' || el.tagName == 'OL') && style.indexOf('padding:') == -1 && style.indexOf('padding-left:') == -1) {
    style += 'padding-left:0;'
  }
  
  if (style) {
    el.setAttribute('style', style);
  } else {
    el.removeAttribute('style');
  }
}

var els = document.body.querySelectorAll('*');

for (var i = els.length - 1; i >= 0; i--) {
  removeRedundancy(els[i]);
}

removeRedundancy(document.body);