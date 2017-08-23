window.roundFloats = function (str) {
  return str.replace(/\b(\d+)\.(\d+)/g, function($0) {
    return (Math.round($0 * 10) / 10).toString();
  }).replace(/\b0(px|em|%|rem)/g, function () {
    return '0';
  });
};