'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546420480604_2470';
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'jingxian',
    },
    app: true,
    agent: false,
  };
  config.security = {
    csrf: {
      enable: true,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  exports.validate = {
    // convert: false,
    // validateRoot: false,
  };
  config.redis = {
    // your redis configurations
  };
  exports.jwt = {
    secret: 'houxianhu0416',
  };
  // add your config here
  config.middleware = [];

  return config;
};

