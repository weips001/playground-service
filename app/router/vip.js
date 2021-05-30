'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/vip', controller.vip.list);
  router.get('/api/vipBuyRecord', controller.vip.bugRecordlist);
  router.get('/api/vip/:id', controller.vip.get);
  router.post('/api/vip', controller.vip.add);
  router.put('/api/vip/:id', controller.vip.update);
  router.delete('/api/vip/removeAll', controller.vip.removeAll);
  router.delete('/api/vip/:id', controller.vip.remove);
  router.post('/api/vipUpload', controller.vip.uploadFile);
  router.post('/api/vipUserUpload', controller.vip.vipUserUpload);
  // 通过手机号查询用户信息
  router.get('/api/getUserByPhone', controller.vip.getUserByPhone);
  // 同步用户手机号
  router.get('/api/syncUserInfo', controller.vip.syncUserInfo);
  //  查询usedTotal
  router.get('/api/filterUsedTotal', controller.vip.filterUsedTotal)
  // 修改usedTotal
  router.get('/api/changeUsedTotal', controller.vip.changeUsedTotal)
};