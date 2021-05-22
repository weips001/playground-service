'use strict';
const md5 = require('md5-node');

const Service = require('egg').Service;
class RoleService extends Service {
  async init() {
    const ctx = this.ctx;
    const app = this.app;
    const data = {
      name: '李三才',
      role: ["-2"],
      roleName: ['皇帝'],
      callPhone: '15395833823'
    }
    const dataSon = {
      name: '韦鹏帅',
      role: ["-2"],
      roleName: ['太子'],
      callPhone: '13271591339'
    }
    const token = app.jwt.sign({
      name: data.name
    }, app.config.jwt.secret);
    const tokenSon = app.jwt.sign({
      name: dataSon.name
    }, app.config.jwt.secret);
    const UserModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.name,
      role: data.role,
      roleName: data.roleName,
      callPhone: data.callPhone,
      desc: data.desc,
      password: md5('123456'),
      createTime: new Date(),
      token,
    });
    const UserModelSon = ctx.model.User({
      id: ctx.helper.generateId(),
      name: dataSon.name,
      role: dataSon.role,
      roleName: dataSon.roleName,
      callPhone: dataSon.callPhone,
      desc: dataSon.desc,
      password: md5('123456'),
      createTime: new Date(),
      tokenSon,
    });
    await UserModel.save();
    await UserModelSon.save();
    return {
      msg: '初始化成功',
      code: 0
    };
  }
}
module.exports = RoleService;
