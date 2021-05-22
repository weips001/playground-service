'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
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
    if (query.studentName) {
      filter['studentName'] = new RegExp(ctx.helper.escapeStringRegExp(query.studentName), 'i');
    }
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.student.list(filter, limit, offset);
  }
  async listOne() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    if (query.name) {
      filter['name'] = query.name;
    }
    if (query.phone) {
      filter['phone'] = query.phone;
    }
    this.ctx.body = await this.ctx.service.student.listOne(filter);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.student.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.student.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.student.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.student.update(id, ctx.request.body);
  }
}

module.exports = StudentController;
