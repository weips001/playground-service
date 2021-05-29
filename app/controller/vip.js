'use strict';

const Controller = require('egg').Controller;

class VipController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    if (query.cardType) {
      filter['cardType'] = query.cardType
    }
    if (query.cardId) {
      filter['cardId'] = new RegExp(ctx.helper.escapeStringRegExp(query.cardId), 'i');
    }
    if (query.phone) {
      filter['phone'] = new RegExp(ctx.helper.escapeStringRegExp(query.phone), 'i');
      // 处理数据时使用
      // filter['phone'] = query.phone
    }
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    const limit = parseInt(query.pageSize || 10);
    const offset = (parseInt(query.current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.vip.list(filter, limit, offset);
  }
  async bugRecordlist() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    if (query.cardType) {
      filter['cardType'] = query.cardType
    }
    if (query.cardId) {
      filter['cardId'] = new RegExp(ctx.helper.escapeStringRegExp(query.cardId), 'i');
    }
    if (query.phone) {
      filter['phone'] = new RegExp(ctx.helper.escapeStringRegExp(query.phone), 'i');
      // 处理数据时使用
      // filter['phone'] = query.phone
    }
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    const limit = parseInt(query.pageSize || 10);
    const offset = (parseInt(query.current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.vip.bugRecordlist(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.vip.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.vip.remove(id);
  }
  async removeAll() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.removeAll();
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.vip.update(id, ctx.request.body);
  }
  async uploadFile() {
    console.log('in')
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.uploadFile(ctx.request.files[0]);
  }
  async vipUserUpload() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.vipUserUpload(ctx.request.files[0]);
  }
  async syncUserInfo() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.vip.syncUserInfo();
  }
  async filterUsedTotal() {
    const ctx = this.ctx;
    const filter = {
      restTotal: {
        $ne: -1
      }
    }
    const list = await ctx.model.Vip.find(filter).lean().exec()
    console.log(list.length, 100)
    let arr = list.filter(item => {
      return item.total - item.usedTotal != item.restTotal
    })
    ctx.body = {
      code: 0,
      msg: '过滤成功',
      arr
    };
  }
  async changeUsedTotal() {
    const ctx = this.ctx;
    const filter = {
      restTotal: {
        $ne: -1
      }
    }
    const list = await ctx.model.Vip.find(filter).lean().exec()
    console.log(list.length, 100)
    let arr = list.filter(item => {
      return item.total - item.usedTotal != item.restTotal
    })
    for (let i = 0; i < arr.length; i++) {
      const Vip = await ctx.model.Vip.findOne({
        id: arr[i].id
      }).exec()
      console.log(Vip, 1222)
      Vip.usedTotal = Vip.total - Vip.restTotal
      await Vip.save()
    }
    ctx.body = {
      code: 0,
      msg: '过滤成功'
    };
  }
}

module.exports = VipController;