var selects = document.body.querySelectorAll('select');

var el, options;
for (var i = 0; i < selects.length; i++) {
  el = selects[i];
  options = el.querySelectorAll('option');
  
  if (options) {
    for (var j = options.length - 1; j > 0; j--) {
      options[j].parentNode.removeChild(options[j]);
    }
  }
}