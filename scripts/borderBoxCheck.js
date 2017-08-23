var allElsBorderBox = true;

var els = document.body.querySelectorAll('*');

for (var i = 0; i < els.length; i++) {
  if (els[i].style['box-sizing'] != 'border-box') {
    allElsBorderBox = false;
    break;
  }
}

return allElsBorderBox;