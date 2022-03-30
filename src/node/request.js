/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : request.js
* Created at  : 2022-03-15
* Updated at  : 2022-03-31
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

const is    = require("@jeefo/utils/is");
const zlib  = require("zlib");
const http  = require("http");
const https = require("https");

const parse_content_type = value => {
  if (!value) return;

  const parts  = value.split(';').map(s => s.toLowerCase().trim());
  const type   = parts.shift();
  const params = Object.create(null);

  let charset;
  for (const option of parts) {
    const option_parts = option.split('=');
    const key   = option_parts.shift();
    const value = option_parts.join('=');
    if (key === "charset") {
      charset = value;
    } else {
      params[key] = value;
    }
  }

  return {type, charset, params};
};

const parse_json = ({buffer, charset, status, headers, resolve, reject}) => {
  try {
    const body = JSON.parse(buffer.toString(charset));
    resolve({status, headers, body});
  } catch (e) {
    reject(e);
  }
};

module.exports = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    if (is.object(options.body)) {
      options.body = JSON.stringify(options.body);

      options.headers = {...options.headers,
        "Content-Type"   : "application/json",
        "Content-Length" : Buffer.byteLength(options.body),
      };
    }

    const protocol = url.startsWith("https:") ? https : http;
    const req = protocol.request(url, options, res => {
      const {statusCode: status, headers} = res;

      switch (headers["content-encoding"]) {
        case "br":
          const br = zlib.createBrotliDecompress();
          br.on("error", reject);
          res.pipe(br);
          res = br;
          break;
        case "gzip":
        case "deflate":
          const gzip = zlib.createUnzip();
          gzip.on("error", reject);
          res.pipe(gzip);
          res = gzip;
          break;
      }

      let body = [];
      res.on("data", chunk => body.push(chunk));
      res.on("end", () => {
        if (body.length) {
          const ct = parse_content_type(headers["content-type"]);
          body = Buffer.concat(body);
          if (ct) {
            if (ct.type === "application/json") {
              return parse_json({
                buffer  : body,
                charset : ct.charset,
                status, headers, resolve, reject
              });
            } else if (ct.charset || ct.type.startsWith("text/")) {
              body = body.toString(ct.charset);
            }
          }
        } else {
          body = null;
        }
        resolve({status, headers, body});
      });
    });

    req.on("error", reject);
    if (options.body) req.write(options.body);

    req.end();
  });
};