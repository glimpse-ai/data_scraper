/*
Assign color utility methods to window
 */

window.numToHex = function(num) {
  return ("0"+Number(num).toString(16)).substr(-2);
};

window.rgbToHex = function($1, $2, $3) {
  var a = window.numToHex($1);
  var b = window.numToHex($2);
  var c = window.numToHex($3);
  
  if (a[0] == a[1] && a == b && b == c) {
    return '#' + a + a[0];
  }
  
  return "#" + a + b + c;
};

window.parseRGBAToHex = function(str) {
  return str.replace(/\brgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(.*?)\s*\)/g, function($0, $1, $2, $3, $4) {
    if ($4 == '0') {
      return 'transparent';
    }
    
    return window.rgbToHex($1, $2, $3);
  });
};

window.parseRGBToHex = function(str) {
  if (str.indexOf('rgba(') != -1) {
    return window.parseRGBAToHex(str);
  }
  
  return str.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function($0, $1, $2, $3) {
    return window.rgbToHex($1, $2, $3);
  });
};

window.reduceColor = function(val) {
  var hasRGB = val.match(/(rgb\(|rgba\()/);
  
  if (hasRGB) {
    return window.parseRGBToHex(val);
  } else {
    return val;
  }
};