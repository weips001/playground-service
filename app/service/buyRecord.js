'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class BuyRecordService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.BuyRecord.find(filter).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.BuyRecord.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return {
      data: list,
      total,
      code: 0
    };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const app = this.app;
    const { cardId, name, phone, cardType, buyMoney} = data
    const BuyRecord = ctx.model.BuyRecord({
      id: ctx.helper.generateId(),
      cardId,
      cardType,
      name,
      phone,
      buyMoney
    });
    await BuyRecord.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
}
module.exports = BuyRecordService;
