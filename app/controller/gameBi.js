'use strict';

const Controller = require('egg').Controller;

class GameBiController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {
      total: {
        '$ne': 0
      }
    };
    if (query.phone) {
      filter['phone'] = new RegExp(ctx.helper.escapeStringRegExp(query.phone), 'i');
    }
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    const limit = parseInt(query.pageSize || 10);
    const offset = (parseInt(query.current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.gameBi.list(filter, limit, offset);
  }
  async payList() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    if (query.phone) {
      filter['phone'] = new RegExp(ctx.helper.escapeStringRegExp(query.phone), 'i');
    }
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    const limit = parseInt(query.pageSize || 10);
    const offset = (parseInt(query.current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.gameBi.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.gameBi.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.gameBi.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.gameBi.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.gameBi.update(id, ctx.request.body);
  }
  async updateReduce() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.gameBi.updateReduce(id, ctx.request.body);
  }
  async uploadFile() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.gameBi.uploadFile(ctx.request.files[0]);
  }
}

module.exports = GameBiController;
