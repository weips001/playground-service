'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/school', controller.school.list);
  router.get('/api/school/:id', controller.school.get);
  router.post('/api/school', controller.school.add);
  router.put('/api/school/:id', controller.school.update);
  router.delete('/api/school/:id', controller.school.remove);
};