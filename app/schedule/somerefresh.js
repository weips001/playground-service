'use strict';

const Subscription = require('egg').Subscription;

const week = 604800000;
const threeDay = 259200000;

class ClearData extends Subscription {
  static get schedule() {
    return {
      type: 'worker',
      immediate: true,
      // cron: '0 * * * * *', // 设置日期时间
      // interval: '1s'//设置间隔时间
      // disable: true,
      // env: [ 'prod' ],
    };
  }

  async subscribe() {
    console.log(234)
    
  }
}

module.exports = ClearData;
