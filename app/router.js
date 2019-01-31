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

  /**
   *  学校模块
   *   创建学校
   *   创建分校
   *   创建员工与老师
  */
  router.post('/school/createschool', app.jwt, controller.school.index);
  router.post('/school/createbranch', app.jwt, controller.school.createbranch);
  router.get('/getbranchList/:id', app.jwt, controller.school.getbranchList);
  router.delete('/deletebranch/:id', app.jwt, controller.school.deleteBranchSchool);

  // 创建员工与老师
  router.post('/staff/create', app.jwt, controller.staff.index);
  router.get('/staff/getList', app.jwt, controller.staff.getstaffsList);
  router.get('/staff/detail', app.jwt, controller.staff.staffDetail);
  router.put('/staff/editor', app.jwt, controller.staff.editorStaff);
  router.delete('/delete/user/:id', app.jwt, controller.staff.delstaff);

  router.post('/subject/add', app.jwt, controller.school.createproject);
  router.get('/subject/getsubjectList/:id', app.jwt, controller.school.getsubjectList);
  router.get('/subject/getsubject/:id', app.jwt, controller.school.getsubject);
  router.put('/subject/editorsubject/:id', app.jwt, controller.school.editorsubject);
  router.delete('/subject/detele/:id', app.jwt, controller.school.deleteProject);
};
