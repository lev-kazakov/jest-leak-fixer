const https = require('https');

const originalHttpsRequest = https.request

https.request = (options, cb) => {
  return originalHttpsRequest.call(https, options, cb);
};
