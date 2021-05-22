'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const schoolId = ctx.request.header.schoolid;
    const filter = {
      schoolId
    };
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    if (query.callPhone) {
      filter['callPhone'] = new RegExp(ctx.helper.escapeStringRegExp(query.callPhone), 'i');
    }
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.user.list(filter, limit, offset, query.all);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.update(id, ctx.request.body);
  }
  async getCurrentUser() {
    const ctx = this.ctx;
    const token = ctx.request.header.authorization.substr(7, 1000);
    const id = ctx.request.header.schoolid;
    ctx.body = await ctx.service.user.getCurrentUser(token, id);
  }
}

module.exports = UserController;
