'use strict';

const Controller = require('egg').Controller;

class SchoolController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    if (query.adminName) {
      filter['adminName'] = new RegExp(ctx.helper.escapeStringRegExp(query.adminName), 'i');
    }
    if (query.adminPhone) {
      filter['adminPhone'] = new RegExp(ctx.helper.escapeStringRegExp(query.adminPhone), 'i');
    }
    if (query.schoolName) {
      filter['schoolName'] = new RegExp(ctx.helper.escapeStringRegExp(query.schoolName), 'i');
    }
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.school.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.school.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.school.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.school.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.school.update(id, ctx.request.body);
  }
}

module.exports = SchoolController;
