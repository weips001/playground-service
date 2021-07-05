'use strict';

const Controller = require('egg').Controller;

class RecoveryController extends Controller {
  async saveVip() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.recovery.add(ctx.request.body);
  }
  async saveShoppingNum() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.recovery.addShoppingNum(ctx.request.body);
  }
  async saveGameBi() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.recovery.saveGameBi(ctx.request.body);
  }
  async saveGameBiRecord() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.recovery.saveGameBiRecord(ctx.request.body);
  }
  async updateVipByJson() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.recovery.updateVipByJson(ctx.request.body);
  }
}

module.exports = RecoveryController;