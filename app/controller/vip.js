'use strict';

const Controller = require('egg').Controller;

class VipController extends Controller {
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
    this.ctx.body = await this.ctx.service.vip.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.vip.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.vip.remove(id);
  }
  async removeAll() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.removeAll();
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.vip.update(id, ctx.request.body);
  }
  async uploadFile() {
    console.log('in')
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.uploadFile(ctx.request.files[0]);
  }
  async vipUserUpload() {
    console.log('in')
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.vipUserUpload(ctx.request.files[0]);
  }
}

module.exports = VipController;
