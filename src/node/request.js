/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : request.js
* Created at  : 2022-03-15
* Updated at  : 2022-03-29
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const is   = require("@jeefo/utils/is");
const http = require("http");

module.exports = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    if (is.object(options.body)) {
      options.body = JSON.stringify(options.body);

      options.headers = {...options.headers,
        "Content-Type"   : "application/json",
        "Content-Length" : Buffer.byteLength(options.body),
      };
    }

    const req = http.request(url, options, res => {
      let data = '';
      res.setEncoding("utf8");
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data || null));
    });

    req.on("error", reject);
    if (options.body) req.write(options.body);

    req.end();
  });
};