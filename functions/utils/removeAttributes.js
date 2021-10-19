const removeAttributes = (html) => {
  return html.replace(/<\s*(\w+).*?>/gi, "<$1>");
};

exports.removeAttributes = removeAttributes;