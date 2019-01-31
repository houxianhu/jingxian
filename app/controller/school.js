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

  /**
   * 创建分校
   */
  async createbranch() {
    const { ctx } = this;
    const rule = {
      branch_name: { type: 'string', required: true },
      address: { type: 'string', required: true },
    };
    const branchForm = ctx.request.body;
    let res = {};
    try {
      await ctx.validate(rule, branchForm);
      res = await ctx.service.school.createbranch(branchForm);
    } catch (error) {
      res = error;
    }
    ctx.body = res;
  }

  /**
   * 获取分校列表
   */
  async getbranchList() {
    const { ctx } = this;
    const rule = {
      id: { type: 'number', required: true },
    };
    const form = ctx.params;
    form.id = parseInt(form.id);
    try {
      await ctx.validate(rule, form);
      ctx.body = await ctx.service.school.getbranchList(form.id);
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 删除该分校
   */
  async deleteBranchSchool() {
    const { ctx } = this;
    ctx.body = await ctx.service.school.deleteBranchSchool(parseInt(ctx.params.id));
  }

  /**
   * 创建课程
   */
  async createproject() {
    const { ctx } = this;
    const rule = {
      branch_id: { type: 'number', required: true },
      name: { type: 'string', required: true },
      total_class_hours: { type: 'number', required: true },
      one_class_time: { type: 'number', required: true },
      price: { type: 'number', required: true },
      remark: { type: 'string', required: false },
    };
    const form = ctx.request.body;
    form.branch_id = parseInt(form.branch_id);
    form.total_class_hours = parseInt(form.total_class_hours);
    form.one_class_time = parseInt(form.one_class_time);
    form.price = parseInt(form.price);
    try {
      await ctx.validate(rule, form);
      ctx.body = await ctx.service.school.createproject(form);
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 获取课程列表
   */
  async getsubjectList() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.school.getsubjectList(ctx.params.id);
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 课程详细信息
   */
  async getsubject() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.school.getsubject(ctx.params.id);
    } catch (error) {
      ctx.body = error;
    }
  }


  /**
   * 删除该课程
   */

  async deleteProject() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.school.deleteProject(parseInt(ctx.params.id));
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 修改课程
   */

  async editorsubject() {
    const { ctx } = this;
    const rule = {
      name: { type: 'string', required: true },
      branch_id: { type: 'number', required: true },
      total_class_hours: { type: 'number', required: true },
      one_class_time: { type: 'number', required: true },
      price: { type: 'number', required: true },
      remark: { type: 'string', required: false },
    };
    const form = ctx.request.body;
    form.branch_id = parseInt(form.branch_id);
    form.total_class_hours = parseInt(form.total_class_hours);
    form.one_class_time = parseInt(form.one_class_time);
    form.price = parseInt(form.price);
    try {
      await ctx.validate(rule, form);
      ctx.body = await ctx.service.school.editorsubject(form, ctx.params.id);
    } catch (error) {
      ctx.body = error;
    }
  }

}

module.exports = SchoolController;
