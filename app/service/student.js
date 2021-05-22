'use strict';

const Service = require('egg').Service;
const md5 = require('md5-node');
class studentService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.Student.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.Student.countDocuments(filter)
      .lean()
      .exec(),
    ]);
    return {
      list,
      total,
      code: 0
    };
  }
	async listOne(filter) {
    const ctx = this.ctx;
    const data = await ctx.model.Student.findOne(filter).lean().exec()
    return {
      data,
      code: 0
    };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.Student.findOne({
      id
    }).lean().exec();
		doc.money = 0
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
    const studentModel = ctx.model.Student({
      id: ctx.helper.generateId(),
      name: data.name,
      phone: data.phone,
      gameBi: data.gameBi,
			birthday: data.birthday,
			money: data.money,
			headImage: data.headImage,
      desc: data.desc,
    });

    const newExist = await this.phoneExist(data.phone);
    if (newExist) {
      return {
        code: 1,
        msg: '改账号已存在',
      };
    }
    await studentModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const studentModel = await ctx.model.Student.findOne({
      id
    }).exec();
    if (!studentModel) {
      return {
        code: 1,
        msg: 'student不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      studentModel.name = data.name;
    }
    if (typeof data.phone !== 'undefined') {
      studentModel.phone = data.phone;
    }
    if (typeof data.gameBi !== 'undefined') {
      studentModel.gameBi = data.gameBi;
    }
    if (typeof data.birthday !== 'undefined') {
      studentModel.birthday = data.birthday;
    }
		if (typeof data.money !== 'undefined') {
      studentModel.money = data.money + studentModel.money;
    }
    studentModel.updateTime = new Date();
    await studentModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const student = await ctx.model.Student.findOne({
      id
    }).exec();
    if (!student) {
      return {
        code: 1,
        msg: '该驾校不存在',
      };
    }
    await student.remove();
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
    const student = await ctx.model.Student.findOne(filter).lean().exec();
    return !!student;
  }
  async phoneExist(callPhone) {
    const ctx = this.ctx;
    const filter = {
      callPhone,
    };
    const User = await ctx.model.User.findOne(filter).lean().exec();
    return !!User;
  }
}
module.exports = studentService;
