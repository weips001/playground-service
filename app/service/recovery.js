'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
const dataList = require('../../public/267.json')
class RecoveryService extends Service {
  async add(data = {}) {
    const ctx = this.ctx;
    const vip = await ctx.model.Vip.findOne({
      id: data.id,
      // restTotal: data.restTotal,
      // createTime: data.createTime,
      // updateTime: data.updateTime
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
      console.log('新增成功', Vip.id)
      return {
        success: true,
        msg: '添加成功',
        code: 0
      };
    }
    const oldTime = new Date(vip.updateTime)
    const newTime = new Date(data.updateTime)
    if (oldTime < newTime) {
      vip.updateTime = data.updateTime
      vip.restTotal = data.restTotal
      vip.usedTotal = data.usedTotal
      vip.remark = data.usedTotal
      await vip.save()
      console.log('编辑成功', vip.id)
      return {
        success: true,
        msg: '编辑成功',
        code: 2
      }
    }
    return {
      success: false,
      msg: '已存在',
      code: 1
    };
  }

  async addShoppingNum(data) {
    const ctx = this.ctx;
    const app = this.app;
    const { id, cardId, name, phone, cardType, shoppingNum, consumeTime, createTime } = data
    const shoppingRecord = await ctx.model.ShoppingRecord.findOne({
      id: data.id,
    }).exec();
    if (!shoppingRecord) {
      const ShoppingRecord = ctx.model.ShoppingRecord({
        id,
        cardId,
        cardType,
        name,
        phone,
        shoppingNum,
        consumeTime,
        createTime
      });
      await ShoppingRecord.save();
      console.log('新增成功', ShoppingRecord.id)
      return {
        success: true,
        msg: '添加成功',
        code: 0
      };
    }
    const oldTime = new Date(shoppingRecord.consumeTime)
    const newTime = new Date(data.consumeTime)
    if (oldTime < newTime) {
      shoppingRecord.consumeTime = data.consumeTime
      shoppingRecord.shoppingNum = data.shoppingNum
      await shoppingRecord.save()
      console.log('编辑成功', shoppingRecord.id)
      return {
        success: true,
        msg: '编辑成功',
        code: 2
      }
    }
    return {
      success: false,
      msg: '已存在',
      code: 1
    };
  }

  async saveGameBi(data) {
    const ctx = this.ctx;
    const gameBi = await ctx.model.GameBi.findOne({
      id: data.id,
    }).exec();
    if (!gameBi) {
      const gameBiModel = ctx.model.GameBi({
        id: data.id,
        name: data.name,
        phone: data.phone,
        total: data.total,
        restTotal: data.total,
        money: data.money,
        overdate: data.overdate,
        remark: data.remark,
        createTime: data.createTime,
        updateTime: data.updateTime
      });
      await gameBiModel.save();
      return {
        success: true,
        msg: '添加成功',
        code: 0
      };
    }
    const oldTime = new Date(gameBi.updateTime)
    const newTime = new Date(data.updateTime)
    if (oldTime < newTime) {
      gameBi.updateTime = data.updateTime
      gameBi.restTotal = data.restTotal
      gameBi.remark = data.remark
      await gameBi.save()
      console.log('编辑成功', gameBi.id)
      return {
        success: true,
        msg: '编辑成功',
        code: 2
      }
    }
    return {
      success: false,
      msg: '已存在',
      code: 1
    };
  }

  async saveGameBiRecord(data) {
    const ctx = this.ctx;
    const { id, name, phone, gameBiNum, consumeTime, createTime } = data
    const gameBiRecord = await ctx.model.GameBiRecord.findOne({
      id: data.id,
    }).exec();
    if (!gameBiRecord) {
      const GameBiRecord = ctx.model.GameBiRecord({
        id,
        name,
        phone,
        gameBiNum,
        consumeTime,
        createTime
      });
      await GameBiRecord.save();
      console.log('新增成功', data.id)
      return {
        success: true,
        msg: '添加成功',
        code: 0
      };
    }
    const oldTime = new Date(gameBiRecord.consumeTime)
    const newTime = new Date(data.consumeTime)
    if (oldTime < newTime) {
      gameBiRecord.consumeTime = data.consumeTime
      gameBiRecord.gameBiNum = data.gameBiNum
      await gameBiRecord.save()
      console.log('编辑成功', gameBiRecord.id)
      return {
        success: true,
        msg: '编辑成功',
        code: 2
      }
    }
    return {
      success: false,
      msg: '已存在',
      code: 1
    };
  }

  async updateVipByJson() {
    const ctx = this.ctx
    let successNum = 0
    let rejectNum = 0
    let rejectArr = []
    for(let i = 0; i< dataList.data.length; i++) {
      const item  = dataList.data[i]
      let Vip = await ctx.model.Vip.findOne({
        cardId: item.cardId
      })
      let num = Number(Vip.restTotal) - Number(item.shoppingNum);
      if (num < 0 && !Vip.isYearCard) {
        rejectNum++
        rejectArr.push(item.cardId)
        console.log(i)
        continue
        // return {
        //   success: false,
        //   msg: '次数已不够用了，请充值',
        //   code: 1
        // }
      }
      Vip.restTotal = Number(Vip.restTotal) - Number(item.deleteNum);
      Vip.usedTotal = Number(Vip.usedTotal) + Number(item.deleteNum);
      if (Vip.isYearCard) {
        Vip.restTotal = -1
      }
      Vip.updateTime = item.consumeTime;
      // await Vip.save();
      successNum++
    }
    console.log(successNum, rejectNum, rejectArr)
    return {
      successNum, rejectNum, rejectArr
    }
  }
}
module.exports = RecoveryService;