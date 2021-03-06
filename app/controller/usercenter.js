'use strict';

const Controller = require('egg').Controller;

class UsercenterController extends Controller {
  // 登录 手机/用户名 密码
  async index() {
    const { ctx } = this;
    const rule = {
      mobile: { type: 'number', require: true, message: '手机号是必须的' },
      password: { type: 'string', require: true, message: '密码是必须的' },
    };
    const logindata = ctx.request.body;
    logindata.mobile = parseInt(logindata.mobile);
    let res = {};
    try {
      await ctx.validate(rule, logindata);
      res = await ctx.service.usercenter.index(logindata);
    } catch (error) {
      console.log(error);
      res = error;
    }
    ctx.body = res;
  }
  // 登录 手机 手机验证码
  async relogin() {
    //
  }
  // 注册
  async register() {
    const { ctx } = this;
    const rule = {
      mobile: { type: 'number', require: true, message: '手机号是必须的' },
      password: { type: 'string', require: true, message: '密码是必须的' },
    };
    const registerdata = ctx.request.body;
    registerdata.mobile = parseInt(registerdata.mobile);
    let res = {};
    try {
      await ctx.validate(rule, registerdata);
      res = await ctx.service.usercenter.register(registerdata);
    } catch (error) {
      console.log(error);
      res = error;
    }
    ctx.body = res;
  }
  // 修改用户
  async reviseUser() {
    //
  }
  // 删除用户
  async deleteUser() {
    //
  }
}

module.exports = UsercenterController;
