'use strict';

const Controller = require('egg').Controller;

class RecoveryController extends Controller {
  async saveVip() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.recovery.add(ctx.request.body);
  }
}

module.exports = RecoveryController;