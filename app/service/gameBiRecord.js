'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class GameBiRecordService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.GameBiRecord.find(filter).sort({createTime: -1}).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.GameBiRecord.countDocuments(filter)
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
    const { name, phone, gameBiNum,consumeTime } = data
    const GameBiRecord = ctx.model.GameBiRecord({
      id: ctx.helper.generateId(),
      name,
      phone,
      gameBiNum,
      consumeTime
    });
    const res = await GameBiRecord.save();
    console.log('res', res)
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
}
module.exports = GameBiRecordService;
