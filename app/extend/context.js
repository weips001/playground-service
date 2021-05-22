'use strict';

exports.curl = function curl(url, opts) {
  return this.httpclient.curl(url.replace(/(?<!:)\/\//g, '/'), opts);
};

exports.curl2 = function curl2(hosts, pathname, opts) {
  const host = hosts[Math.floor(Math.random() * hosts.length)];
  return this.httpclient.curl(`${host}${pathname}`.replace(/(?<!:)\/\//g, '/'), opts);
};
