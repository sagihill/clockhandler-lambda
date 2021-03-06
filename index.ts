const https = require("https");

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, callback) => {
  const options = {
    method: "get",
    hostname: "yfapi.net",
    path: "https://yfapi.net/v7/finance/options/" + event.symbol,
    headers: {
      "x-api-key": "L5KARBpGqm6aQPrXPfwgl6E5Ild5pRBh8dG7cb6a",
    },
  };

  const req = https.request(options, (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      console.log("Successfully processed HTTPS response");
      // If we know it's JSON, parse it
      if (res.headers["content-type"] === "application/json") {
        body = JSON.parse(body);
      }
      const price = body.optionChain.result[0].quote.bid;
      callback(null, body.optionChain.result[0].quote.bid);
    });
  });
  req.on("error", callback);
  req.end();
};
