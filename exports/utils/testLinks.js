// broken down to for easier understanding
console.time("Execution Time");
const { default: axios } = require("axios");

let links = [
  "https://www.beautyfeatures.ie/brands/Burts-Bees.html",
  "https://www.beautyfeatures.ie/brands/Carin.html",
  "https://www.beautyfeatures.ie/eleven-australia/",
  "https://www.beautyfeatures.ie/brands/Dermalogica.html",
];

function testLink(link) {
  return new Promise((resolve) => {
    console.log(`requesting ${link}`);
    axios
      .get(link)
      .then(() => {
        console.clear();
        console.log(200);
        resolve(200);
      })
      .catch(() => {
        resolve(400);
      });
  });
}

links = links.map((link) => () => testLink(link));

function promiseSeries(links) {
  return new Promise((resolve) => {
    let responses = [];
    let promiseReducer = (acc, cur, i) =>
      acc.then(cur).then((res) => {
        responses.push(res);
        if (i === links.length - 1) {
          resolve(responses);
        }
      });
    links.reduce(promiseReducer, Promise.resolve());
  });
}
promiseSeries(links).then((responses) => {
  console.log("responses", responses);
  console.log("hello world");
  console.timeEnd("Execution Time");
});
