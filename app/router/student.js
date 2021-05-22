'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/student', controller.student.list);
  router.get('/api/studentdetail', controller.student.listOne);
  router.get('/api/student/:id', controller.student.get);
  router.post('/api/student', controller.student.add);
  router.put('/api/student/:id', controller.student.update);
  router.delete('/api/student/:id', controller.student.remove);
};