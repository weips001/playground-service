'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/payRecord', controller.payRecord.list);
  router.get('/api/payRecord/:id', controller.payRecord.get);
  router.post('/api/payRecord', controller.payRecord.add);
  router.put('/api/payRecord/:id', controller.payRecord.update);
  router.delete('/api/payRecord/removeAll', controller.payRecord.removeAll);
  router.delete('/api/payRecord/:id', controller.payRecord.remove);
  router.post('/api/payRecordImport', controller.payRecord.uploadFile);
};
