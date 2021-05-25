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
    const { cardId, name, phone, cardType, shoppingNum,consumeTime } = data
    const ShoppingRecord = ctx.model.ShoppingRecord({
      id: ctx.helper.generateId(),
      cardId,
      cardType,
      name,
      phone,
      shoppingNum,
      consumeTime
    });
    await ShoppingRecord.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async readFile(filePath) {
    try {
      var sheets = xlsx.parse(filePath);
      let successNum = 0
      let errorNum = 0
      let errInfo = []
      const sheet = sheets[0]
      const name = sheet['name']

      for (let i = 0; i < sheet.data.length; i++) {
        const row = sheet['data'][i]
        const params = {
          cardId: row[1],
          name: row[2],
          consumeTime: row[7],
          shoppingNum: row[8]
        }
        if (i > 0 && row) {
          const data = await this.add(params)
          if (data.code === 0) {
            // console.log(successNum)
            successNum++
          } else {
            errorNum++
            errInfo.push({
              index: i,
              msg: data.msg
            })
            // console.log(data.msg)
          }
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
    const res = await this.readFile(file.filepath)
    return res
  }
}
module.exports = ShoppingRecordService;
