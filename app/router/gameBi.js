'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/gameBi', controller.gameBi.list);
  router.get('/api/gameBi/:id', controller.gameBi.get);
  router.post('/api/gameBi', controller.gameBi.add);
  router.put('/api/gameBi/:id', controller.gameBi.update);
  router.put('/api/reduceGameBi/:id', controller.gameBi.updateReduce);
  router.delete('/api/gameBi/:id', controller.gameBi.remove);
};
