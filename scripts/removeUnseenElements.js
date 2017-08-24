/*
Remove invisible elements
 */

var has = window.has;

var els = document.body.querySelectorAll('*');
var el;
var remove;

var allowedNoContents = {
  'img': 1,
  'i': 1,
  'input': 1,
  'br': 1,
  'hr': 1,
  'wbr': 1,
  'progress': 1,
  'meter': 1,
  'output': 1,
  'keygen': 1,
  'option': 1,
  'menuitem': 1,
  'col': 1,
  'data': 1
};

function hasNoContents(el) {
  return el.innerHTML.replace('/( |\n)/g') === '';
}

for (var i = 0; i < els.length; i++) {
  el = els[i];
  remove = false;

  // remove any els with props very clearly making an element invisible
  if (el.style.display == 'none' || el.style.visibility == 'hidden' || el.style.opacity == '0') {
    remove = true;
  }

  // If el:
  // a. has no contents and that's not allowed
  // b. has no background-image
  // c. has no image in background
  // d. has no color in background
  // e. has no background-color
  var bg = el.style.background;
  var bgImage = el.style.backgroundImage;
  var bgColor = el.style.backgroundColor;

  if (!remove && hasNoContents(el) && !has(allowedNoContents, el.tagName.toLowerCase()) && !bgImage &&
    (!bg || !has(bg, 'url(')) &&
    (!bg || !has(bg, '#') || !has(bg, 'rgb')) &&
    (!bgColor || bgColor === 'transparent' || bgColor.replace(/ /g, '') === 'rgba(0,0,0,0)')) {

    remove = true;
  }

  if (remove) {
    el.parentNode.removeChild(el);
  }
}