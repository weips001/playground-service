'use strict';

const Controller = require('egg').Controller;

class PayRecordController extends Controller {
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
    this.ctx.body = await this.ctx.service.payRecord.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.payRecord.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.payRecord.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.payRecord.remove(id);
  }
  async removeAll() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.payRecord.removeAll();
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.payRecord.update(id, ctx.request.body);
  }
  async uploadFile() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.payRecord.uploadFile(ctx.request.files[0]);
  }
}

module.exports = PayRecordController;
