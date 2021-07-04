'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/saveVip', controller.recovery.saveVip);
};
