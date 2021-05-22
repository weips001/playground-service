'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class ShoppingRecordService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.ShoppingRecord.find(filter).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.ShoppingRecord.countDocuments(filter)
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
    const { cardId, name, phone, cardType, shoppingNum } = data
    const ShoppingRecord = ctx.model.ShoppingRecord({
      id: ctx.helper.generateId(),
      cardId,
      cardType,
      name,
      phone,
      shoppingNum
    });
    await ShoppingRecord.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
}
module.exports = ShoppingRecordService;
