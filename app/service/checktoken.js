'use strict';

const Service = require('egg').Service;

class ChecktokenService extends Service {
  async index() {
    const token = this.ctx.request.header['authorization'].split(' ')[1];
    const user = await this.app.jwt.verify(token, this.app.config.jwt.secret);
    return user;
  }
}

module.exports = ChecktokenService;
