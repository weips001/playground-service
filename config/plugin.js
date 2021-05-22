'use strict';

/** @type Egg.EggPlugin */
exports.cors = {
  enable: true,
  package: 'egg-mongoose',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.http = {
  enable: true,
  package: 'egg-axios',
};
