'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class RecoveryService extends Service {
  async add(data = {}) {
    const ctx = this.ctx;
    const vip = await ctx.model.Vip.findOne({
      id: data.id,
      restTotal: data.restTotal,
      createTime: data.createTime,
      updateTime: data.updateTime
    }).exec();
    if (!vip) {
      const {
        id,
        name,
        phone,
        restTotal,
        cardId,
        cardType,
        money,
        sex,
        isYearCard,
        remark,
        birthday,
        total,
        createTime,
        updateTime,
        overdate,
        usedTotal
      } = data
      const Vip = ctx.model.Vip({
        id,
        cardId,
        cardType,
        name,
        phone,
        money,
        restTotal,
        total,
        remark,
        birthday,
        sex,
        isYearCard,
        createTime,
        updateTime,
        overdate,
        usedTotal
      });
      await Vip.save();
      return {
        success: true,
        msg: '添加成功',
        code: 0
      };
    } else {
      return {
        success: false,
        msg: '已存在',
        code: 1
      };
    }

  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const Vip = await ctx.model.Vip.findOne({
      id
    }).exec();
    if (!Vip) {
      return {
        code: 1,
        msg: 'Vip不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      Vip.name = data.name;
    }
    if (typeof data.sex !== 'undefined') {
      Vip.sex = data.sex;
    }
    if (typeof data.remark !== 'undefined') {
      Vip.remark = data.remark;
    }
    if (typeof data.phone !== 'undefined') {
      Vip.phone = data.phone;
    }
    if (typeof data.deleteNum !== 'undefined') {
      let num = Number(Vip.restTotal) - Number(data.deleteNum);
      if (num < 0 && !Vip.isYearCard) {
        return {
          success: false,
          msg: '次数已不够用了，请充值',
          code: 1
        }
      }
      Vip.restTotal = Number(Vip.restTotal) - Number(data.deleteNum);
      Vip.usedTotal = Number(Vip.usedTotal) + Number(data.deleteNum);
      if (Vip.isYearCard) {
        Vip.restTotal = -1
      }
      // 添加一跳扣次记录
      await this.ctx.service.shoppingRecord.add({
        id: ctx.helper.generateId(),
        cardId: Vip.cardId,
        name: Vip.name,
        phone: Vip.phone,
        cardType: Vip.cardType,
        consumeTime: data.createTime,
        shoppingNum: data.deleteNum
      })
    }
    Vip.updateTime = new Date();
    await Vip.save();
    // if(Vip.restTotal === 0) {
    //   await Vip.remove();
    // }
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
}
module.exports = RecoveryService;