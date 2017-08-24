/*
Due to CSS property inheritance, remove redundant CSS style props
 */
var has = window.has;
var allElsBorderBox = arguments[0];

var replaceMap = {
  'none,0': 'none',
  'normal,400': '400',
  '0,0 0,0 0 0,0 0 0 0': '0',
  '33.3%': '33.33%',
  '33.4%': '33.33%',
  '16.6%': '16.66%',
  '16.7%': '16.66%',
  '14.3%': '14.28%',
  '9.1%': '9.09%'
};

var blacklistedVals = {
  'translate3d(0, 0, 0)': 1,
  'auto, cover': 1,
  'rgba(0, 0, 0, 0) none 0': 1,
  'scale(1, 1)': 1,
  '13px/16px arial,sans-serif': 1,
  '[object Object]': 1
};

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

    // remove prop if in the blacklisted map
    if (has(blacklistedVals, val)) {
      continue;
    }

    // If calc value, try to strip out just % part of it...if no % part, remove
    if (has(val, 'calc(')) {
      var calcMatches = val.match(/(calc\(.*?\))/);

      if (calcMatches) {
        var calcMatch = calcMatches[0];
        var pctMatch = calcMatch.match(/([0-9]+%)/);

        if (pctMatch) {
          val = pctMatch[0];
        } else {
          continue;
        }
      }
    }

    if (has(val, '+') || has(val, 'gradient')) {
      continue;
    }

    if (propsMapInfo.overwriteUserAgentSS && propsMapInfo.overwriteUserAgentSS.indexOf(el.tagName) != -1) {
      if (propsMapInfo.canHoldColor) {
        val = window.reduceColor(val);
      }
      
      val = window.roundFloats(val);

      if (has(replaceMap, val)) {
        val = replaceMap[val];
      }

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

    if (has(replaceMap, val)) {
      val = replaceMap[val];
    }
    
    reducedProps[p] = val;
  }
  
  // Empty any link tags with only text content that have background images
  if (el.tagName == 'A' && el.innerHTML && el.innerText && el.innerHTML.trim() == el.innerText.trim() &&
    (has(reducedProps, 'background-image') || has(reducedProps.background, 'url('))) {

    el.innerHTML = '';
  }

  // Remove list-style and list-style-type from li's
  if (el.tagName == 'LI') {
    delete reducedProps['list-style-type'];
    delete reducedProps['list-style'];
  }

  if (el.tagName == 'OL' || el.tagName == 'UL') {
    // remove list-style-type
    delete reducedProps['list-style-type'];

    // always
    reducedProps['list-style'] = 'none';

    // If no 'padding' or 'padding-left', add 'padding-left:0'
    if (!has(reducedProps, 'padding') && !has(reducedProps, 'padding-left')) {
      reducedProps['padding-left'] = '0';
    }

  	// If no 'margin', no 'margin-top', and no 'margin-bottom', set 'margin-top' and 'margin-bottom' both to 0
    if (!has(reducedProps, 'margin') && !has(reducedProps, 'margin-top') && !has(reducedProps, 'margin-bottom')) {
      reducedProps['margin-top'] = '0';
      reducedProps['margin-bottom'] = '0';
    }
  } else {
    // not a list element
    delete reducedProps['list-style-type'];
    delete reducedProps['list-style'];
  }

  var bg = reducedProps.background;
  var bgImage = reducedProps['background-image'];

  // If 'background' prop has color specified and 'background-color' is also specified, remove 'background-color' prop
  if ((has(bg, '#') || has(bg, 'rgb')) && has(reducedProps, 'background-color')) {
    delete reducedProps['background-color'];
  }

  // If element doesn't have background image, remove unnecessary background props (position, size, repeat)
  if (!bgImage && (!bg || !has(bg, 'url('))) {
    delete reducedProps['background-position'];
    delete reducedProps['background-size'];
    delete reducedProps['background-repeat'];
  }

  // If background is none, pop it off
  if (bg == 'none') {
    delete reducedProps['background'];
  }

  // If attr is 'text-decoration' and starts with 'none solid'
  if (reducedProps['text-decoration'] && reducedProps['text-decoration'].startsWith('none solid')) {
    delete reducedProps['text-decoration'];
  }

  if (el.tagName != 'INPUT' && el.tagName != 'BUTTON') {
    var border = reducedProps.border;
    var borderColor = reducedProps['border-color'];
    var borderWidth = reducedProps['border-width'];
    var borderStyle = reducedProps['border-style'];

    // remove all border props if any of these are true
    if (border == 'none' || borderColor == 'transparent' || borderWidth == '0' || borderWidth == '0px' || borderStyle == 'none') {
      delete reducedProps.border;
      delete reducedProps['border-color'];
      delete reducedProps['border-width'];
      delete reducedProps['border-style'];
    }

    // remove border if transparent
    if (has(border, 'transparent')) {
      delete reducedProps.border;
    }

    // if border-color the only border prop, remove it
    if (borderColor && !border && !borderStyle && !borderWidth) {
      delete reducedProps['border-color'];
    }

    // if both border and border-color have colors defined, remove border-color
    if (border && borderColor && (has(border, '#') || has(border, 'rgb'))) {
      delete reducedProps['border-color'];
    }
  }

  style = '';
  for (var k in reducedProps) {
    style += (k + ':' + reducedProps[k] + ';')
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