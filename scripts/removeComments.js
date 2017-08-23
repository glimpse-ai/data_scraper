var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_COMMENT);
var node;

while (node = iterator.nextNode()) {
  if (node.nodeType == Node.COMMENT_NODE) {
    node.parentNode.removeChild(node);
  }
}