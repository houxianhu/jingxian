'use strict';

const Service = require('egg').Service;

class TeacherService extends Service {
  async index(teacherForm) {
    const res = {};
    const ishave = await this.app.mysql.select('user', {
      where: {
        mobile: teacherForm.mobile,
      },
    });
    if (ishave.length > 0) {
      res.code = 0;
      res.message = '该老师已经存在';
    } else {
      const select_branch_name = await this.app.mysql.select('branch_school', {
        columns: [ 'branch_name', 'parent_school_id', 'parent_school' ],
        where: { id: teacherForm.branch_id },
      });
      if (select_branch_name.length === 0) {
        res.code = 2;
        res.message = '分校不存在';
      } else {
        const addstaff = await this.app.mysql.insert('user', {
          user_name: teacherForm.user_name,
          mobile: teacherForm.mobile,
          password: teacherForm.password,
          branch_school: select_branch_name[0].branch_name,
          branch_id: teacherForm.branch_id,
          school_name: select_branch_name[0].parent_school,
          school_id: select_branch_name[0].parent_school_id,
          role: 'staff',
          create_time: this.app.mysql.literals.now,
        });
        if (addstaff.affectedRows === 1) {
          res.code = 1;
          res.message = '创建成功';
        } else {
          res.code = -1;
          res.message = '创建失败';
        }
      }
    }
    return res;
  }
}

module.exports = TeacherService;
