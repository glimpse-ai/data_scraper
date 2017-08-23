var els = arguments[0];

for (var i = els.length - 1; i >= 0; i--) {
  els[i].parentNode.removeChild(els[i]);
}