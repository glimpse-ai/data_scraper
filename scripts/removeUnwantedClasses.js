/*
Remove classes that aren't in accepted class map
 */

var acceptedClassesMap = arguments[0];

var els = document.body.querySelectorAll('*');

var el, classes, newClasses;
for (var i = 0; i < els.length; i++) {
  el = els[i];
  
  if (el.hasAttribute('class')) {
    classes = el.getAttribute('class').split(' ');
    newClasses = [];
    
    var c;
    for (var j = 0; j < classes.length; j++) {
      c = classes[j];
      
      if (acceptedClassesMap.hasOwnProperty(c)) {
        newClasses.push(c);
      }
    }
    
    if (newClasses.length > 0) {
      el.setAttribute('class', newClasses.join(' '));
    } else {
      el.removeAttribute('class');
    }
  }
}