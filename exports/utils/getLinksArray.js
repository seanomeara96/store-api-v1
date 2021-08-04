/**
 * returns the urls enclosed in quotes as an array
 * @param {string} content
 * @returns array of urls
 */
const getLinksArray = (content) =>
  content
    .match(
      /"(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"/gi
    )
    .map((url) => url.slice(1, -1)) || [];

exports.getLinksArray = getLinksArray;
