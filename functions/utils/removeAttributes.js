const removeAttributes = html => html.replace(/<\s*(\w+).*?>/gi, "<$1>");

exports.removeAttributes = removeAttributes;
