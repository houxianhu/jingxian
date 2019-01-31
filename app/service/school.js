'use strict';

const Service = require('egg').Service;

class SchoolService extends Service {

  /**
   *  创建学校,则该用户role为schoolmaster
   */

  async index(schoolForm) {
    const res = {};
    const get_user = await this.ctx.service.checktoken.index();
    const selectSql = `SELECT * FROM school_list WHERE creater_id=${get_user.id}`;
    const get_user_name = await this.app.mysql.select('user', {
      columns: [ 'user_name' ],
      where: {
        id: get_user.id,
      },
    });
    const selectRes = await this.app.mysql.query(selectSql);
    if (selectRes.length === 0) {
      const schoolSql = 'INSERT INTO school_list (school_name, school_logo, school_address,creater,creater_id,create_time) VALUE (?,?,?,?,?,NOW())';
      const userSql = `UPDATE user SET school_name=?, school_id=?, role='schoolmaster' WHERE id = ${get_user.id}`;
      const queryResult = await this.app.mysql.query(schoolSql, [ schoolForm.school_name, schoolForm.school_logo, schoolForm.school_address, get_user_name[0].user_name || '', user_id ]);
      if (queryResult) {
        res.code = 1;
        res.message = '创建成功';
        await this.app.mysql.query(userSql, [ schoolForm.school_name, queryResult.insertId ]);
      } else {
        res.code = -1;
        res.message = '创建失败';
      }
    } else {
      res.code = 0;
      res.message = '您已经创建过学校';
    }
    return res;
  }
  async getschool() {
    const get_user = await this.ctx.service.checktoken.index();
    const selectSql = `SELECT id, school_name FROM school_list WHERE creater_id=${get_user.id}`;
    const res = await this.app.mysql.query(selectSql);
    return res[0];
  }
  /**
   * 创建分校
   *
   */

  async createbranch(branchForm) {
    const res = {};
    const selectsql = 'SELECT * FROM branch_school WHERE branch_name=?';
    const selectres = await this.app.mysql.query(selectsql, [ branchForm.branch_name ]);
    const get_school = await this.ctx.service.school.getschool();
    if (selectres.length === 0) {
      const addres = await this.app.mysql.insert('branch_school', {
        branch_name: branchForm.branch_name,
        address: branchForm.address,
        parent_school_id: get_school.id,
        parent_school: get_school.school_name,
        create_time: this.app.mysql.literals.now,
      });
      if (addres) {
        res.code = 1;
        res.message = '创建成功';
      } else {
        res.code = -1;
        res.message = '创建失败';
      }
    } else {
      res.code = 0;
      res.message = '您已创建过校了';
    }
    return res;
  }

  /**
   * 删除该分校
   * @param {id} id
   */

  async deleteBranchSchool(branch_id) {
    const res = {};
    const result = await this.app.mysql.delete('branch_school', {
      where: { id: branch_id },
    });
    if (result.affectedRows === 1) {
      res.code = 1;
      res.message = '删除成功';
    }
    return res;
  }


  /**
   * 获取分校列表
   */

  async getbranchList(id) {
    const res = {};
    const result = await this.app.mysql.select('branch_school', { where: { parent_school_id: id } });
    if (result) {
      res.code = 1;
      res.data = result;
      res.message = 'success';
    }
    return res;
  }

  /**
   * 创建课程
   */

  async createproject(form) {
    const res = {};
    const ishave = await this.app.mysql.select('subject', { where: { branch_id: form.branch_id, name: form.name } });
    if (ishave.length > 0) {
      res.code = 0;
      res.message = '该校已经创建了该课程';
    } else {
      const result = await this.app.mysql.insert('subject', {
        name: form.name,
        branch_id: form.branch_id,
        total_class_hours: form.total_class_hours,
        one_class_time: form.one_class_time,
        price: form.price,
        remark: form.remark,
      });
      if (result.affectedRows === 1) {
        res.code = 1;
        res.message = '创建课程成功';
      } else {
        res.code = -1;
        res.message = '创建课程失败';
      }
    }
    return res;
  }

  /**
   * 获取课程List
   */

  async getsubjectList(id) {
    const res = {};
    res.data = await this.app.mysql.select('subject', {
      where: { branch_id: id },
    });
    if (res.data.length > 0) {
      res.code = 1;
      res.message = 'success';
    } else {
      res.code = 0;
      res.message = '暂无课程';
    }
    return res;
  }

  /**
   * 获取课程详细信息
   */

  async getsubject(subject_id) {
    const result = await this.app.mysql.select('subject', {
      where: { id: subject_id },
    });
    const res = {};
    if (result.length > 0) {
      res.code = 1;
      res.data = result[0];
      res.message = 'success';
    } else {
      res.code = -1;
      res.message = '暂无信息';
    }
    return res;
  }

  /**
   * 删除该课程
   *
   */

  async deleteProject(project_id) {
    const res = {};
    const result = await this.app.mysql.delete('subject', { id: project_id });
    if (result.affectedRows === 1) {
      res.code = 1;
      res.message = '删除成功';
    }
    return res;
  }
  /**
   * 修改课程信息
   */

  async editorsubject(form, subject_id) {
    const res = {};
    /* 首先查询课程是否存在 */
    const ishave = await this.app.mysql.select('subject', {
      where: { name: form.name, branch_id: form.branch_id },
    });
    if (ishave.length > 0) {
      res.code = 0;
      res.message = '该课程已经存在';
    } else {
      const result = await this.app.mysql.update('subject', {
        name: form.name,
        branch_id: form.branch_id,
        total_class_hours: form.total_class_hours,
        one_class_time: form.one_class_time,
        price: form.price,
        remark: form.remark,
      }, { where: { id: subject_id } });
      if (result.affectedRows === 1) {
        res.code = 1;
        res.message = '修改成功';
      } else {
        res.code = 0;
        res.message = '修改失败';
      }
    }
    return res;
  }
}

module.exports = SchoolService;
