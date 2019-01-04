'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const checktoken = app.middleware.checktoken();
  router.get('/', app.jwt, controller.home.index);
  // 登录
  router.post('/login', controller.usercenter.index);
  router.post('/register', controller.usercenter.register);

  /*
   *  学校模块
   *  1.创建学校
  */
  router.post('/createschool', app.jwt, controller.school.index);
};
