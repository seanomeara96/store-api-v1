// broken down to for easier understanding

const concat = (list) => {
  return Array.prototype.concat.bind(list);
};
const promiseConcat = (nextFunction) => {
  return (x) => {
    return nextFunction().then(concat(x));
  };
};
const promiseReduce = (prmise, nextFunction) => {
    return prmise.then(promiseConcat(nextFunction))
};
/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
const serial = (funcs) => {
  return funcs.reduce(promiseReduce, Promise.resolve([]));
};

