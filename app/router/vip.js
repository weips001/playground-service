'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/vip', controller.vip.list);
  router.get('/api/vip/:id', controller.vip.get);
  router.post('/api/vip', controller.vip.add);
  router.put('/api/vip/:id', controller.vip.update);
  router.delete('/api/vip/removeAll', controller.vip.removeAll);
  router.delete('/api/vip/:id', controller.vip.remove);
  router.post('/api/vipImport', controller.vip.uploadFile);
};
