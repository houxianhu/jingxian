'use strict';

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.session = true;

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
