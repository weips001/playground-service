'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/role', controller.role.list);
  router.get('/api/role/:id', controller.role.get);
  router.post('/api/role', controller.role.add);
  router.put('/api/role/:id', controller.role.update);
  router.delete('/api/role/:id', controller.role.remove);
};
