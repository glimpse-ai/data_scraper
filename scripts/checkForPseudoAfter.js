function hasPseudoAfterClear (el) {
  var s = getComputedStyle(el, ':after');

  return s.clear == 'both' &&
    s.display != 'none' &&
    s.content != null &&
    (s.content.replace(' ', '') == '""' || s.content.replace(' ', '') == "''");
}

var els = document.body.querySelectorAll('*:not(script)');

for (var i = 0; i < els.length; i++) {
  if (hasPseudoAfterClear(els[i])) {
    els[i].className = (els[i].className + ' clear-both-after').trim();
  }
}