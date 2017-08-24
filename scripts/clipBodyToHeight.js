/*
Remove any HTML elements whose tops start below a specified pixel height
 */

function getOffsetTop (el, cumulative) {
  if (!cumulative) {
    cumulative = 0;
  }
  
  if (el.offsetParent == null || el.offsetParent.tagName == 'BODY') {
    return el.offsetTop + cumulative;
  }
  
  return getOffsetTop(el.offsetParent, cumulative + el.offsetTop);
}


function insideYConstraint (el) {
  return getOffsetTop(el) + el.offsetHeight <= CLIP_HEIGHT;
}

function keepElement (el) {
  var nestedChildren = el.querySelectorAll("*");
  
  if (insideYConstraint(el)) {
    return true;
  } else {
    for (var i = 0; i < nestedChildren.length; i++){
      if (insideYConstraint(nestedChildren[i])){
        return true;
      }
    }
  }
  
  return false;
}

const CLIP_HEIGHT = parseInt(arguments[0]);

var els = document.body.querySelectorAll('*');

for (var i = 0; i < els.length; i++) {
  var el = els[i];
  
  if (!el || getOffsetTop(el) > CLIP_HEIGHT) {
    continue;
  }
  
  if (keepElement(el)) {
    el.setAttribute('data-keep', 'yes');
  }
}

var elsToRemove = document.body.querySelectorAll("*:not([data-keep='yes'])");

for (var k = elsToRemove.length - 1; k >= 0; k--) {
  elsToRemove[k].parentNode.removeChild(elsToRemove[k]);
}