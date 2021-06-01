'use strict';
const md5 = require('md5-node');

const Service = require('egg').Service;
class UserService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.User.find(filter).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.User.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return {
      data: list,
      total,
      success: true,
      code: 0
    };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.User.findOne({
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
    const schoolId = ctx.request.header.schoolid;
    const exist = await this.phoneExist(data.callPhone, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '改账号已存在',
      };
    }
    if (data.role.length > 0) {
      const RoleModel = await ctx.model.Role.find({
        id: {
          $in: data.role
        }
      }).exec()
      data.roleName = RoleModel.map(item => {
        return item.name
      })
    }
    const token = app.jwt.sign({
      name: data.name
    }, app.config.jwt.secret);
    const UserModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.name,
      role: data.role,
      roleName: data.roleName,
      callPhone: data.callPhone,
      desc: data.desc,
      schoolId: schoolId,
      password: md5('123456'),
      createTime: new Date(),
      token,
    });
    await UserModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const UserModel = await ctx.model.User.findOne({
      id
    }).exec();
    if (!UserModel) {
      return {
        code: 1,
        msg: 'User不存在',
      };
    }
    const exist = await this.phoneExist(data.callPhone, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '该号码已存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      UserModel.name = data.name;
    }
    if (typeof data.desc !== 'undefined') {
      UserModel.desc = data.desc;
    }
    if (typeof data.callPhone !== 'undefined') {
      UserModel.callPhone = data.callPhone;
    }
    if (typeof data.imgUrl !== 'undefined') {
      UserModel.imgUrl = data.imgUrl;
    }
    if (typeof data.role !== 'undefined') {
      UserModel.role = data.role;
      if (data.role.length > 0) {
        const RoleModel = await ctx.model.Role.find({
          id: {
            $in: data.role
          }
        }).exec()
        UserModel.roleName = RoleModel.map(item => {
          return item.name
        })
      }
    }
    await UserModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const User = await ctx.model.User.findOne({
      id
    }).exec();
    if (!User) {
      return {
        code: 1,
        msg: '该角色不存在',
      };
    }
    await User.remove();
    return {
      success: true,
      msg: '删除成功',
      code: 0,
    };
  }
  async phoneExist(callPhone, id) {
    const ctx = this.ctx;
    const filter = {
      callPhone,
    };
    if (id) {
      filter.id = {
        $ne: id
      };
    }
    const User = await ctx.model.User.findOne(filter).lean().exec();
    return !!User;
  }
  async getCurrentUser(token, id) {
    const ctx = this.ctx;
    const filter = {
      token,
    };
    const user = await ctx.model.User.findOne(filter).lean().exec();
    if (id) {
      const school = await ctx.model.School.findOne({
        id: id
      }).lean().exec();
      if (school && school.perioOfValidity && new Date() > school.perioOfValidity) {
        user.overdue = true
      }
    }
    const role = user.role;
    const roleList = await ctx.model.Role.find({
      id: {
        $in: role
      }
    });
    const auth = {};
    roleList.forEach(item => {
      item.auth.forEach(item0 => {
        auth[item0] = item0;
      });
    });
    return {
      code: 0,
      data: user,
      auth: Object.keys(auth),
    };
  }
}
module.exports = UserService;
