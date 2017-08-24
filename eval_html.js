function evaluateFile(action) {
  var data = { filePath: document.location.href.substr(7) };
  
  if (action == 'save') {
    data.html = document.documentElement.innerHTML;
  }
  
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/' + action,
    data: data,
    dataType: 'application/json',
    crossDomain: true
  });
}

$(document).keypress(function (e) {
  console.log(e.which);
  
  var actionMap = {
    '100': 'discard',
    '68': 'discard',
    '107': 'keep',
    '75': 'keep',
    '115': 'save'
  };
  
  var action = actionMap[e.which.toString()];
  
  if (action) {
    evaluateFile(action);
  }
});