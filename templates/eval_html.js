function evaluateFile(action) {
  var data = {
    filePath: document.location.href.substr(7)
  };

  var method;

  switch (action) {
    case 'discard':
      method = 'DELETE';
      break;
    case 'save':
      method = 'PUT';
      data.html = document.documentElement.innerHTML;
      break;
    default:
      return;
  }

  $.ajax({
    type: method,
    url: 'http://localhost:3000/html_eval',
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
    '115': 'save'
  };
  
  var action = actionMap[e.which.toString()];
  
  if (action) {
    evaluateFile(action);
  }
});