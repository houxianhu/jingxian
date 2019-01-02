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
  // add your config here
  config.middleware = [];

  return config;
};

