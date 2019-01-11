'use strict';

const Service = require('egg').Service;

class StaffService extends Service {
  async index(staffForm) {
    const res = {};
    const ishave = await this.app.mysql.select('user', {
      where: {
        mobile: staffForm.mobile,
      },
    });
    if (ishave.length > 0) {
      res.code = 0;
      res.message = '该员工已经存在';
    } else {
      const select_branch_name = await this.app.mysql.select('branch_school', {
        columns: [ 'branch_name', 'parent_school_id', 'parent_school' ],
        where: { id: staffForm.branch_id },
      });
      if (select_branch_name.length === 0) {
        res.code = 2;
        res.message = '分校不存在';
      } else {
        const addstaff = await this.app.mysql.insert('user', {
          user_name: staffForm.user_name,
          mobile: staffForm.mobile,
          password: staffForm.password,
          branch_school: select_branch_name[0].branch_name,
          branch_id: staffForm.branch_id,
          school_name: select_branch_name[0].parent_school,
          school_id: select_branch_name[0].parent_school_id,
          role: staffForm.role,
          entry_time: staffForm.entry_time || null,
          create_time: this.app.mysql.literals.now,
        });
        if (addstaff.affectedRows === 1) {
          const user = await this.app.mysql.select('user', {
            columns: [ 'id' ],
            where: {
              mobile: staffForm.mobile,
            },
          });
          if (staffForm.role === 'staff') {
            await this.app.mysql.insert('staff', {
              user_id: user[0].id,
              staff_name: staffForm.user_name,
              branch_id: staffForm.branch_id,
            });
          } else if (staffForm.role === 'teacher') {
            await this.app.mysql.insert('teacher', {
              user_id: user[0].id,
              user_name: staffForm.user_name,
              branch_id: staffForm.branch_id,
              type: '1',
            });
          }
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

  /**
   * 获取所有的员工列表
   */

  async getstaffsList(Form) {
    const res = {};
    const rolearr = Form.type === '' ? [ 'staff', 'teacher' ] : Form.type === 'staff' ? [ 'staff' ] : [ 'teacher' ];
    const result = await this.app.mysql.select('user', {
      where: { school_id: Form.id, role: rolearr },
      columns: [ 'user_name', 'mobile', 'branch_school', 'entry_time', 'role' ],
    });
    if (result) {
      res.code = 1;
      res.data = result;
      res.message = 'success';
    }
    return res;
  }

  /**
   * 查看员工详细信息
   * @param{
   *   id: user_id
   *   role: 'staff' || 'teacher'
   * }
   */

  async staffDetail(form) {
    const res = {};
    if (form.role === 'staff') {
      res.data = await this.app.mysql.select('staff', { where: { user_id: form.id } });
    } else {
      res.data = await this.app.mysql.select('teacher', { where: { user_id: form.id } });
    }
    if (res.data.length > 0) {
      res.code = 1;
      res.message = 'success';
    } else {
      res.code = -1;
      res.message = '该员工不存在';
    }
    return res;
  }

  /**
   * 修改员工信息
   */

  async editorStaff(form) {
    const res = {};
    if (form.role === 'staff') {
      res.data = await this.app.mysql.update('staff', {
        position: form.position,
        purview: form.purview,
        branch_id: form.branch_id,
      }, { where: { user_id: form.id } });
    } else {
      res.data = await this.app.mysql.update('teacher', {
        position: form.position,
        purview: form.purview,
        branch_id: form.branch_id,
        project: form.project,
      }, { where: { user_id: form.id } });
    }
    const result = await this.app.mysql.update('user', { branch_id: form.branch_id }, { where: { id: form.id } });
    if (res.data.affectedRows === 1 && result.affectedRows === 1) {
      res.code = 1;
      res.data = [];
      res.message = '更新成功';
    } else {
      res.code = -1;
      res.message = 'failed';
    }
    return res;
  }


  /**
   * 删除员工
   */

  async delstaff(form) {
    await this.app.mysql.delete('user', { id: form.id });
    return {
      code: 1,
      message: '删除成功',
    };
  }
}

module.exports = StaffService;
