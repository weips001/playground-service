'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/getNotNum', controller.statistics.getNotNum);
  router.get('/api/getTodayMoney', controller.statistics.getTodayMoney);
  router.post('/api/getTodayNum', controller.statistics.getTodayNum);
};