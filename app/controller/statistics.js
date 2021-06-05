'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
  async getNotNum() {
    const ctx = this.ctx;
    this.ctx.body = await this.ctx.service.statistics.getNotNum();
  }
  async getTodayMoney() {
    const ctx = this.ctx;
    this.ctx.body = await this.ctx.service.statistics.getTodayMoney();
  }
  async getTodayNum() {
    const ctx = this.ctx;
    this.ctx.body = await this.ctx.service.statistics.getTodayNum();
  }
  async getMonthMoney() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {
      month: query.month
    }
    if(query.num) {
      filter['num'] = Number(query.num)
    }
    this.ctx.body = await this.ctx.service.statistics.getMonthMoney(filter);
  }
}

module.exports = StatisticsController;