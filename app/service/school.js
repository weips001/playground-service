'use strict';

const Service = require('egg').Service;
const md5 = require('md5-node');
class schoolService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.School.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.School.countDocuments(filter)
      .lean()
      .exec(),
    ]);
    return {
      list,
      total,
      code: 0
    };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.School.findOne({
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
    const exist = await this.nameExist(data.schoolName, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '驾校名重复',
      };
    }
    const schoolModel = ctx.model.School({
      id: ctx.helper.generateId(),
      schoolName: data.schoolName,
      adminPhone: data.adminPhone,
      adminName: data.adminName,
      desc: data.desc,
      perioOfValidity: data.perioOfValidity
    });

    const newExist = await this.phoneExist(data.adminPhone);
    if (newExist) {
      return {
        code: 1,
        msg: '改账号已存在',
      };
    }
    const token = app.jwt.sign({
      name: data.name
    }, app.config.jwt.secret);
    const UserModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.adminName,
      role: -1,
      schoolId: schoolModel.id,
      callPhone: data.adminPhone,
      desc: data.desc,
      password: md5('123456'),
      createTime: new Date(),
      token,
    });
    await UserModel.save();
    await schoolModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const schoolModel = await ctx.model.School.findOne({
      id
    }).exec();
    if (!schoolModel) {
      return {
        code: 1,
        msg: 'school不存在',
      };
    }
    if (typeof data.adminPhone !== 'undefined') {
      schoolModel.adminPhone = data.adminPhone;
    }
    if (typeof data.desc !== 'undefined') {
      schoolModel.desc = data.desc;
    }
    if (typeof data.adminName !== 'undefined') {
      schoolModel.adminName = data.adminName;
    }
    if (typeof data.perioOfValidity !== 'undefined') {
      schoolModel.perioOfValidity = data.perioOfValidity;
    }
    schoolModel.updateTime = new Date();
    await schoolModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const school = await ctx.model.School.findOne({
      id
    }).exec();
    if (!school) {
      return {
        code: 1,
        msg: '该驾校不存在',
      };
    }
    await school.remove();
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
    const school = await ctx.model.School.findOne(filter).lean().exec();
    return !!school;
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
module.exports = schoolService;
