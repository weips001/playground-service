'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.post('/api/login', controller.login.login);
  router.post('/api/register', controller.login.register);
  router.get('/api/init', controller.init.init);

  require('./role')(app);
  require('./user')(app);
  require('./school')(app)
  require('./student')(app)
  require('./gameBi')(app)
  require('./payRecord')(app)
};
