'use strict';

const Controller = require('egg').Controller;

class SchoolController extends Controller {
  async index() {
    const { ctx } = this;
    const rule = {
      school_name: { type: 'string', required: true },
      school_logo: { type: 'string', required: true },
      school_address: { type: 'string', required: true },
    };
    const schoolForm = ctx.request.body;
    let res = {};
    try {
      await ctx.validate(rule, schoolForm);
      res = await ctx.service.school.index(schoolForm);
    } catch (error) {
      console.log(error);
      res = error;
    }
    ctx.body = res;
  }
}

module.exports = SchoolController;
