'use strict';

const Service = require('egg').Service;
const xlsx = require('node-xlsx')
const md5 = require('md5-node');
class VipService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    filter = {
      ...filter,
      restTotal: {
        $ne: 0
      }
    }
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
  async bugRecordlist(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    filter = {
      ...filter
    }
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
    const { name, phone, restTotal, cardId, cardType, money, sex, remark, birthday, total, createTime, overdate, usedTotal } = data
    // const exist = await this.nameExist(cardId);
    // if (exist) {
    //   return {
    //     code: 1,
    //     msg: '卡号已存在',
    //   };
    // }
    let isYearCard = restTotal === -1
    const Vip = ctx.model.Vip({
      id: ctx.helper.generateId(),
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
      overdate,
      usedTotal
    });
    await Vip.save();
    // await this.ctx.service.buyRecord.add({
    //   id: ctx.helper.generateId(),
    //   cardId: Vip.cardId,
    //   name: Vip.name,
    //   phone: Vip.phone,
    //   cardType: Vip.cardType,
    //   buyMoney: data.nowMoney
    // })
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
      let num =  Number(Vip.restTotal) - Number(data.deleteNum);
      if (num < 0 && !Vip.isYearCard) {
        return {
          success: false,
          msg: '次数已不够用了，请充值',
          code: 1
        }
      }
      Vip.restTotal = Number(Vip.restTotal) - Number(data.deleteNum);
      if(Vip.isYearCard) {
        Vip.restTotal = -1
      }
      // 添加一跳扣次记录
      await this.ctx.service.shoppingRecord.add({
        id: ctx.helper.generateId(),
        cardId: Vip.cardId,
        name: Vip.name,
        phone: Vip.phone,
        cardType: Vip.cardType,
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
    try {
      var sheets = xlsx.parse(filePath);
      let successNum = 0
      let errorNum = 0
      let errInfo = []
      const sheet = sheets[0]
      const name = sheet['name']

      for (let i = 0; i < sheet.data.length; i++) {
        const row = sheet['data'][i]
        const overdate = row[13] ? new Date(row[13]) : ''
        const params = {
          createTime: row[1],
          cardId: row[2],
          name: row[4],
          money: Number(row[8]),
          total: Number(row[9]),
          restTotal: Number(row[10]),
          usedTotal: Number(row[11]),
          overdate,
          remark: row[15],
          cardType: Number(row[10]) == -1 ? '1' : '0',
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
  async vipUserUpload(file) {
    const res = await this.readVipUserUpload(file.filepath)
    return res
  }
  async readVipUserUpload(filePath) {
    const ctx = this.ctx;
    const app = this.app;
    try {
      var sheets = xlsx.parse(filePath);
      const sheet = sheets[0]
      const name = sheet['name']
      for (let i = 0; i < sheet.data.length; i++) {
        const row = sheet['data'][i]
        const params = {
          cardId: row[0],
          sex: row[3] === '男' ? '0' : '1',
          phone: row[4],
          birthday: row[7]
        }
        let Vip = await ctx.model.Vip.find({
          cardId: params.cardId
        }).exec();
        console.log(Vip, 2744444)
        if(Array.isArray(Vip) && Vip.length > 0) {
          for(let k=0; k<Vip.length; k++) {
            Vip[k].phone = params.phone
            Vip[k].sex = params.sex
            Vip[k].birthday = params.birthday
            await Vip[k].save()
          }
        }
      }
      return {
        code: 0,
        msg: '导入成功'
      }
    } catch (e) {
      console.log('err', e)
    }
  }
}
module.exports = VipService;
