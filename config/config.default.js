/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // config.cluster = {
  //   listen: {
  //     path: '',
  //     port: 4000,
  //     hostname: '0.0.0.0'
  //   }
  // };

  config.cluster = {
    listen: {
      path: '',
      port: 7006,
    }
  };

  config.multipart = {
    mode: 'file',
    fileExtensions: ['.xls', '.xlsx']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'], // 允许访问接口的白名单
  };

  config.static = {
    prefix: '/',
    dir: process.cwd() + '/public',
  };

  config.rundir = process.cwd() + '/run';

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577165435387_2425';

  // add your middleware config here
  config.middleware = [];

  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/playground',
      // url: 'mongodb://39.99.228.79:27017/playground',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  exports.http = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
    timeout: 10000,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};