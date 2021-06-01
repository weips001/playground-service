'use strict';

const Controller = require('egg').Controller;
const dayjs = require('dayjs')

class GameBiRecordController extends Controller {
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
    if(query.createTime) {
      filter['createTime'] = {
        $gte: query.createTime,
        $lt: dayjs(query.createTime).add(1, 'day').format('YYYY-MM-DD')
      }
    }
    const limit = parseInt(query.pageSize || 10);
    const offset = (parseInt(query.current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.gameBiRecord.list(filter, limit, offset);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.gameBiRecord.add(ctx.request.body);
  }
}

module.exports = GameBiRecordController;
