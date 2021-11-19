const handler = require("./dist/index").handler;

const cb = (res) => {
  console.log(res);
};

console.log(handler({ symbol: "AAPL" }, null, cb));
