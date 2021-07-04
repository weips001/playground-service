'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/saveVip', controller.recovery.saveVip);
  router.post('/api/saveShoppingNum', controller.recovery.saveShoppingNum);
  router.post('/api/saveGameBi', controller.recovery.saveGameBi);
  router.post('/api/saveGameBiRecord', controller.recovery.saveGameBiRecord);
};
