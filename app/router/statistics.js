'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/getNotNum', controller.statistics.getNotNum);
  router.get('/api/getTodayMoney', controller.statistics.getTodayMoney);
  router.get('/api/getTodayNum', controller.statistics.getTodayNum);
};