'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/vip', controller.vip.list);
  router.get('/api/vipBuyRecord', controller.vip.bugRecordlist);
  router.get('/api/vip/:id', controller.vip.get);
  router.post('/api/vip', controller.vip.add);
  router.put('/api/vip/:id', controller.vip.update);
  router.delete('/api/vip/removeAll', controller.vip.removeAll);
  router.delete('/api/vip/:id', controller.vip.remove);
  router.post('/api/vipUpload', controller.vip.uploadFile);
  router.post('/api/vipUserUpload', controller.vip.vipUserUpload);
  // 同步用户手机号
  router.get('/api/syncUserInfo', controller.vip.syncUserInfo);
};
