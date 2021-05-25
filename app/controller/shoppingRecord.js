'use strict';

const Controller = require('egg').Controller;

class ShoppingRecordController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    if (query.cardType) {
      filter['cardType'] = query.cardType
    }
    if (query.cardId) {
      filter['cardId'] = new RegExp(ctx.helper.escapeStringRegExp(query.cardId), 'i');
    }
    if (query.phone) {
      filter['phone'] = new RegExp(ctx.helper.escapeStringRegExp(query.phone), 'i');
    }
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    const limit = parseInt(query.pageSize || 10);
    const offset = (parseInt(query.current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.shoppingRecord.list(filter, limit, offset);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.shoppingRecord.add(ctx.request.body);
  }
  async uploadFile() {
    console.log('in')
    const ctx = this.ctx;
    ctx.body = await ctx.service.shoppingRecord.uploadFile(ctx.request.files[0]);
  }
}

module.exports = ShoppingRecordController;
