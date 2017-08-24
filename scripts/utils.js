/*
Assign extra utility methods to window
 */

window.has = function(a, b) {
  if (!a) {
    return false;
  }

  if (typeof a === 'string' || a.constructor == Array) {
    return a.indexOf(b) != -1;
  }

  if (a.constructor == Object) {
    return a.hasOwnProperty(b);
  }

  return false;
};