'use strict';

const Service = require('egg').Service;
const md5 = require('md5-node');
class gameBiService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.GameBi.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.GameBi.countDocuments(filter)
      .lean()
      .exec(),
    ]);
    return {
      data: list,
      total,
      code: 0
    };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.GameBi.findOne({
      id
    }).lean().exec();
    return {
      code: 0,
      data: doc
    };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const gameBiModel = ctx.model.GameBi({
      id: ctx.helper.generateId(),
      name: data.name,
      phone: data.phone,
      total: data.total,
      restTotal: data.total,
      money: data.money,
      overdate: data.overdate,
      remark: data.remark
    });
    await gameBiModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const gameBiModel = await ctx.model.GameBi.findOne({
      id
    }).exec();
    if (!gameBiModel) {
      return {
        code: 1,
        msg: 'gameBi不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      gameBiModel.name = data.name;
    }
    if (typeof data.phone !== 'undefined') {
      gameBiModel.phone = data.phone;
    }
    if (typeof data.remark !== 'undefined') {
      gameBiModel.remark = data.remark;
    }
    gameBiModel.updateTime = new Date();
    await gameBiModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async updateReduce(id, data = {}) {
    const ctx = this.ctx;
    const gameBiModel = await ctx.model.GameBi.findOne({
      id
    }).exec();
    if (!gameBiModel) {
      return {
        code: 1,
        msg: 'gameBi不存在',
      };
    }
    if (typeof data.deleteNum !== 'undefined') {
      let num = Number(gameBiModel.restTotal) - Number(data.deleteNum);
      if (num < 0) {
        return {
          success: false,
          msg: '游戏币不够用了，请充值',
          code: 1
        }
      }
      gameBiModel.restTotal = Number(gameBiModel.restTotal) - Number(data.deleteNum);
      // 添加一跳扣次记录
      await this.ctx.service.gameBiRecord.add({
        id: ctx.helper.generateId(),
        name: gameBiModel.name,
        phone: gameBiModel.phone,
        gameBiNum: data.deleteNum,
        consumeTime: data.consumeTime
      })
    }
    gameBiModel.updateTime = new Date();
    await gameBiModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const gameBi = await ctx.model.GameBi.findOne({
      id
    }).exec();
    if (!gameBi) {
      return {
        code: 1,
        msg: '该驾校不存在',
      };
    }
    await gameBi.remove();
    return {
      success: true,
      msg: '删除成功',
      code: 0,
    };
  }
  async nameExist(name, id) {
    const ctx = this.ctx;
    const filter = {
      name,
    };
    if (id) {
      filter.id = {
        $ne: id
      };
    }
    const gameBi = await ctx.model.GameBi.findOne(filter).lean().exec();
    return !!gameBi;
  }
  async phoneExist(phone) {
    const ctx = this.ctx;
    const filter = {
      phone,
    };
    const User = await ctx.model.User.findOne(filter).lean().exec();
    return !!User;
  }
}
module.exports = gameBiService;