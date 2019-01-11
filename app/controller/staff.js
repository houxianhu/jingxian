'use strict';

const Controller = require('egg').Controller;

class StaffController extends Controller {
  /**
   * params{
   *   user_name: 用户名
   *   mobile: 手机号 --->作为登录账号
   *   password: 密码
   *   role: 用户角色
   *   branch_id: 分校id
   *   entry_time: 入职时间
   * }
   */
  async index() {
    const { ctx } = this;
    const rule = {
      user_name: { type: 'string', required: true },
      role: { type: 'string', required: true },
      mobile: { type: 'number', required: true },
      password: { type: 'string', required: true },
      branch_id: { type: 'string', required: true },
      entry_time: { type: 'string', required: false },
    };
    const staffForm = ctx.request.body;
    staffForm.mobile = parseInt(staffForm.mobile);
    let res = {};
    try {
      await ctx.validate(rule, staffForm);
      res = await ctx.service.staff.index(staffForm);
    } catch (error) {
      console.log(error);
      res = error;
    }
    ctx.body = res;
  }
  /**
   * 获取所有员工列表
   *  @params:{
   *    id: school_id
   *    type: '' || 'staff' || 'teacher'
   *  }
   */

  async getstaffsList() {
    const { ctx } = this;
    const rule = {
      id: { type: 'number', required: true },
      type: { type: 'string', required: false },
    };
    const form = ctx.request.query;
    form.id = parseInt(form.id);
    form.type = form.type || '';
    try {
      await ctx.validate(rule, form);
      ctx.body = await ctx.service.staff.getstaffsList(form);
    } catch (error) {
      ctx.body = error;
    }
  }


  /**
   * 查看员工详细信息
   * @param{
   *   id:  id
   *   role: 'staff' || 'teacher'
   * }
   */

  async staffDetail() {
    const { ctx } = this;
    const rule = {
      id: { type: 'number', required: true },
      role: { type: 'string', required: true },
    };
    const form = ctx.request.query;
    form.id = parseInt(form.id);
    try {
      await ctx.validate(rule, form);
      ctx.body = await ctx.service.staff.staffDetail(form);
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 编辑员工与老师的信息
   * @param{
   *   id: id,
   *   role: 'staff' || 'teacher',
   *   ...
   * }
   */

  async editorStaff() {
    const { ctx } = this;
    const form = ctx.request.body;
    const rule1 = {
      id: { type: 'number', required: true },
      role: { type: 'string', required: true },
      position: { type: 'string', required: true },
      purview: { type: 'string', required: true },
      branch_id: { type: 'number', required: true },
    };
    const rule2 = {
      id: { type: 'number', required: true },
      role: { type: 'string', required: true },
      position: { type: 'string', required: true },
      project: { type: 'string', required: true },
      purview: { type: 'string', required: true },
      branch_id: { type: 'number', required: true },
    };
    form.id = parseInt(form.id);
    form.branch_id = parseInt(form.branch_id);
    try {
      if (form.role === 'staff') {
        await ctx.validate(rule1, form);
      } else {
        await ctx.validate(rule2, form);
      }
      ctx.body = await ctx.service.staff.editorStaff(form);
    } catch (error) {
      ctx.body = error;
    }
  }

  // 删除员工
  async delstaff() {
    const { ctx } = this;
    const rule = {
      id: { type: 'number', required: true },
    };
    const form = ctx.params;
    form.id = parseInt(form.id);
    let res = {};
    try {
      await ctx.validate(rule, form);
      res = await ctx.service.staff.delstaff(form);
    } catch (error) {
      res = error;
    }
    ctx.body = res;
  }
}

module.exports = StaffController;
