'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
  async index() {
    const { ctx } = this;
    const rule = {
      user_name: { type: 'string', required: true },
      mobile: { type: 'number', required: true },
      password: { type: 'string', required: true },
      branch_id: { type: 'number', required: true },
      course_id: { type: '', required: true },
    };
    const teacherForm = ctx.request.body;
    let res = {};
    try {
      await ctx.validate(rule, teacherForm);
      res = await ctx.service.teacher.index(teacherForm);
    } catch (error) {
      console.log(error);
      res = error;
    }
    ctx.body = res;
  }
}

module.exports = TeacherController;
