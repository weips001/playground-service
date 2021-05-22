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
    const app = this.app;
    const exist = await this.nameExist(data.name, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '驾校名重复',
      };
    }
    const gameBiModel = ctx.model.GameBi({
      id: ctx.helper.generateId(),
      name: data.name,
      phone: data.phone,
      biNumber: data.biNumber,
      record: data.record,
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
    if (typeof data.biNumber !== 'undefined') {
      gameBiModel.biNumber = data.biNumber;
    }
    if (typeof data.record !== 'undefined') {
      gameBiModel.record = data.record;
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
