'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class VipService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.Vip.find(filter).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.Vip.countDocuments(filter)
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
    const doc = await ctx.model.Vip.findOne({
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
    const { cardId, name, phone, sex, cardType, remark, birthday, money, total, payTotal, totalRest, payTime, record, createTime } = data
    const exist = await this.nameExist(cardId);
    if (exist) {
      return {
        code: 1,
        msg: '卡号已存在',
      };
    }
    const Vip = ctx.model.Vip({
      id: ctx.helper.generateId(),
      cardId,
      cardType,
      name,
      phone,
      money,
      total,
      remark,
      birthday,
      sex,
      totalRest,
      payTotal,
      payTime,
      record,
      createTime
    });
    await Vip.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
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
    if (typeof data.remark !== 'undefined') {
      Vip.remark = data.remark;
    }
    if (typeof data.cardType !== 'undefined') {
      Vip.cardType = data.cardType;
    }
    if (typeof data.phone !== 'undefined') {
      Vip.phone = data.phone;
    }
    if (typeof data.overdate !== 'undefined') {
      Vip.overdate = data.overdate;
    }
    if (typeof data.nowMoney !== 'undefined') {
      Vip.nowMoney = data.nowMoney;
      Vip.money = Number(Vip.money) + Number(data.nowMoney);
      await this.ctx.service.buyRecord.add({
        cardId: Vip.cardId,
        name: Vip.name,
        phone: Vip.phone,
        cardType: Vip.cardType,
        buyMoney: data.nowMoney
      })
    }
    if (typeof data.nowTotal !== 'undefined') {
      Vip.totalRest = Number(Vip.totalRest) + Number(data.nowTotal);
      Vip.total = Number(Vip.total) + Number(data.nowTotal);
      // 添加一条充值记录
    }
    if (typeof data.deleteNum !== 'undefined') {
      Vip.totalRest = Number(Vip.totalRest) - Number(data.deleteNum);
      if (Vip.totalRest === 0) {
        return {
          success: false,
          msg: '没有可扣的次数了',
          code: 1
        }
      }
      // 添加一跳扣次记录
      await this.ctx.service.shoppingRecord.add({
        cardId: Vip.cardId,
        name: Vip.name,
        phone: Vip.phone,
        cardType: Vip.cardType,
        shoppingNum: data.deleteNum
      })
    }
    Vip.updateTime = new Date();
    await Vip.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const Vip = await ctx.model.Vip.findOne({
      id
    }).exec();
    if (!Vip) {
      return {
        code: 1,
        msg: '该驾校不存在',
      };
    }
    await Vip.remove();
    return {
      success: true,
      msg: '删除成功',
      code: 0,
    };
  }
  async removeAll(id) {
    const ctx = this.ctx;
    const res = await ctx.model.Vip.remove().exec();
    if (res.ok === 1) {
      return {
        success: true,
        msg: '删除成功',
        code: 0,
      };
    } else {
      return {
        msg: '删除失败',
        code: 1
      }
    }
  }
  async nameExist(cardId) {
    const ctx = this.ctx;
    const filter = {
      cardId,
    };
    const Vip = await ctx.model.Vip.findOne(filter).lean().exec();
    return !!Vip;
  }
  async phoneExist(phone) {
    const ctx = this.ctx;
    const filter = {
      phone,
    };
    const User = await ctx.model.User.findOne(filter).lean().exec();
    return !!User;
  }
  async readFile(filePath) {
    console.log(filePath)
    try {
      var sheets = xlsx.parse(filePath);
      console.log(sheets.name)
      let record = []
      let successNum = 0
      let errorNum = 0
      let errInfo = []
      sheets.forEach(async (sheet) => {
        // 读取每行内容
        const name = sheet['name']
        for (let i = 0; i < sheet.data.length; i++) {
          const row = sheet['data'][i]
          console.log(row)
          const params = {
            cardId: row[0],
            cardType: Number(row[1]) === 1 ? '0' : '1',
            name: row[2],
            sex: row[3] === '男' ? '0' : '1',
            phone: row[4],
            createTime: row[5],
            birthday: row[7]
          }
          if (i > 0 && row[i]) {
            const data = await this.add(params)
            console.log(i, data)
            // if (data.code === 0) {
            //   console.log(successNum)
            //   successNum++
            // } else {
            //   errorNum++
            //   errInfo.push({
            //     index: i,
            //     msg: data.msg
            //   })
            //   console.log(data.msg)
            // }
            
          }
        }
      })
      if (errorNum > 0) {
        return {
          code: 1,
          data: {
            successNum,
            errorNum,
            errInfo
          }
        }
      }
      return {
        code: 0,
        data: {
          successNum,
          errorNum
        }
      }
    } catch (e) {
      console.log('err', e)
    }
  }
  async uploadFile(file) {
    console.log('-----', file)
    const res = await this.readFile(file.filepath)
    console.log('res', res)
    return res
  }
}
module.exports = VipService;
