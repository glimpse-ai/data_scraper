/*
Remove any modals (simple class search)
 */

var modal = document.getElementsByClassName('modal');
var el;
for (var i = modal.length - 1; i >= 0; i--) {
  el = modal[i];
  el.parentNode.removeChild(el);
}

var modals = document.getElementsByClassName('modals');
var e;
for (var j = modals.length - 1; j >= 0; j--) {
  e = modals[j];
  e.parentNode.removeChild(e);
}