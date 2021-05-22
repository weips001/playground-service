'use strict';

const Service = require('egg').Service;
class RoleService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.Role.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.Role.countDocuments(filter)
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
    const doc = await ctx.model.Role.findOne({
      id
    }).lean().exec();
    return {
      code: 0,
      data: doc
    };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const schoolId = ctx.request.header.schoolid;
    const exist = await this.nameExist(data.name, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '角色名重复',
      };
    }
    const RoleModel = ctx.model.Role({
      id: ctx.helper.generateId(),
      name: data.name,
      auth: data.auth,
      desc: data.desc,
      schoolId
    });
    await RoleModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const RoleModel = await ctx.model.Role.findOne({
      id
    }).exec();
    if (!RoleModel) {
      return {
        code: 1,
        msg: 'Role不存在',
      };
    }
    // const exist = await this.nameExist(data.name, data._id);
    // if (exist) {
    //   return {
    //     code: 1,
    //     msg: '角色名重复',
    //   };
    // }
    if (typeof data.name !== 'undefined') {
      RoleModel.name = data.name;
    }
    if (typeof data.desc !== 'undefined') {
      RoleModel.desc = data.desc;
    }
    if (typeof data.desc !== 'undefined') {
      RoleModel.auth = data.auth;
    }
    RoleModel.updateTime = new Date();
    await RoleModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const Role = await ctx.model.Role.findOne({
      id
    }).exec();
    if (!Role) {
      return {
        code: 1,
        msg: '该角色不存在',
      };
    }
    await Role.remove();
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
    const Role = await ctx.model.Role.findOne(filter).lean().exec();
    return !!Role;
  }
}
module.exports = RoleService;
