'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class PayRecordService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.PayRecord.find(filter).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.PayRecord.countDocuments(filter)
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
    const doc = await ctx.model.PayRecord.findOne({
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
    const { cardId, name, phone, cardType, money, total, payTotal, totalRest, payTime, record } = data
    const exist = await this.nameExist(cardId);
    if (exist) {
      return {
        code: 1,
        msg: '卡号已存在',
      };
    }
    const PayRecord = ctx.model.PayRecord({
      id: ctx.helper.generateId(),
      cardId,
      cardType,
      name,
      phone,
      money,
      total,
      totalRest,
      payTotal,
      payTime,
      record
    });
    await PayRecord.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const PayRecord = await ctx.model.PayRecord.findOne({
      id
    }).exec();
    if (!PayRecord) {
      return {
        code: 1,
        msg: 'PayRecord不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      PayRecord.name = data.name;
    }
    if (typeof data.phone !== 'undefined') {
      PayRecord.phone = data.phone;
    }
    if (typeof data.biNumber !== 'undefined') {
      PayRecord.biNumber = data.biNumber;
    }
    if (typeof data.record !== 'undefined') {
      PayRecord.record = data.record;
    }
    PayRecord.updateTime = new Date();
    await PayRecord.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const PayRecord = await ctx.model.PayRecord.findOne({
      id
    }).exec();
    if (!PayRecord) {
      return {
        code: 1,
        msg: '该驾校不存在',
      };
    }
    await PayRecord.remove();
    return {
      success: true,
      msg: '删除成功',
      code: 0,
    };
  }
  async removeAll(id) {
    const ctx = this.ctx;
    const res = await ctx.model.PayRecord.remove().exec();
    if(res.ok === 1) {
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
    const PayRecord = await ctx.model.PayRecord.findOne(filter).lean().exec();
    return !!PayRecord;
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
      sheets.forEach(function (sheet) {
        // 读取每行内容
        const name = sheet['name']
        for (let i = 0; i < sheet.data.length; i++) {
          const row = sheet['data'][i]
          const time = row[1].split('.')[0]
          const params = {
            time,
            cardId: row[2],
            money: row[8],
            total: row[9],
            reset: row[10],
            usedNum: row[11],
            cardType: row[9] > 0 ? '0' : '-1'
          }
          if (i > 0) {
            const current = record.find(item => item.cardId === row[2])
            if (current) {
              current.record.push(params)
            } else {
              record.push({
                cardId: row[2],
                name: row[4],
                record: [params]
              })
            }
          }
        }
      })
      let newList = record.map((item, index) => {
        const sum = item.record.reduce((prev, next) => {
          if (next.reset < 0) {
            return prev
          }
          return prev + next.reset
        }, 0)
        const total = item.record.reduce((prev, next) => {
          if (next.reset < 0) {
            return prev
          }
          return prev + next.total
        }, 0)
        const cardType = item.record.some(item => item.cardType === '-1')
        return {
          ...item,
          total,
          payTotal: item.record.length,
          totalRest: sum,
          cardType: cardType ? '-1' : '0'
        }
      })
      let successNum = 0
      let errorNum = 0
      let errInfo = []
      for (let i = 0; i < newList.length; i++) {
        const data = await this.add(newList[i])
        if (data.code === 0) {
          console.log(successNum)
          successNum++
        } else {
          errorNum++
          errInfo.push({
            index: i,
            msg: data.msg
          })
          console.log(data.msg)
        }
      }
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
module.exports = PayRecordService;
