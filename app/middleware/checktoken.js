'use strict';

module.exports = () => {
  const jwt = require('jsonwebtoken');
  return async function(ctx, next) {
    if (ctx.request.header['Authorization']) {
      const token = ctx.request.header['Authorization'].split(' ')[1];
      console.log(token);
    }
  };
};
