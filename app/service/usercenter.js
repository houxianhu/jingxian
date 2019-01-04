'use strict';

const Service = require('egg').Service;

class UsercenterService extends Service {
  // 登录
  async index(logindate) {
    const res = {};
    const loginSql = 'SELECT user_name, mobile,role, school_name, branch_school, id FROM user WHERE mobile = ? AND password = ?';
    try {
      const loginres = await this.app.mysql.query(loginSql, [ logindate.mobile, logindate.password ]);
      console.log(loginres);
      if (loginres.length > 0) {
        const token = this.app.jwt.sign({ id: loginres[0].id, user_name: loginres[0].user_name }, this.app.config.jwt.secret, { expiresIn: 60 * 60 });
        this.ctx.cookies.set('token', token, { maxAge: 60 * 1000 * 60 * 5, httpOnly: false, overwrite: true, signed: false });
        res.data = {
          user: loginres[0],
          Token: token,
        };
        res.code = 1;
      } else {
        res.code = -1;
        res.message = '手机号或者密码错误';
      }
    } catch (error) {
      console.log(error);
    }
    return res;
  }
  async register(registerdata) {
    const res = {};
    const findResult = 'SELECT * FROM user WHERE mobile = ?';
    const insertResult = 'INSERT INTO user (mobile, password) VALUE (?,?)';
    const queryResult = await this.app.mysql.query(findResult, [ registerdata.mobile ]);
    if (queryResult.length > 0) {
      res.code = -1;
      res.message = '注册名已经存在';
    } else {
      const addResult = await this.app.mysql.query(insertResult, [ registerdata.mobile, registerdata.password ]);
      if (addResult) {
        res.code = 1;
        res.message = '注册成功';
        res.data = '';
      }
    }
    return res;
  }
}

module.exports = UsercenterService;
