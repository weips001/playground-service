'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5-node');


class HomeController extends Controller {
  async login() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    const filter = {
      callPhone: data.callPhone,
      password: md5(data.password)
    }
    const UserModel = await ctx.model.User.findOne(filter).exec();
    if (UserModel) {
      if (UserModel.schoolId) {
        const school = await ctx.model.School.findOne({ id: UserModel.schoolId }).exec();
        if (school && school.perioOfValidity && new Date() > school.perioOfValidity) {
          if (UserModel.role.includes(-2)) {
            UserModel.overdue = false
          } else {
            UserModel.overdue = true
          }
        }
      }
      const token = app.jwt.sign({
        name: data.name
      }, app.config.jwt.secret, {
        expiresIn: '60m',
      });
      UserModel.token = token;
      const schoolId = UserModel.schoolId
      await UserModel.save();
      ctx.body = {
        code: 0,
        token,
        schoolId,
        overdue: UserModel.overdue,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: '用户名或密码错误',
    };
    return;
  }
  async register() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    if (!data.callPhone) {
      ctx.body = {
        code: 1,
        msg: '请输入手机号',
      };
      return;
    }
    if (!data.name) {
      ctx.body = {
        code: 1,
        msg: '请输入姓名',
      };
      return;
    }
    const exist = await this.phoneExist(data.callPhone);
    if (exist) {
      this.ctx.body = {
        code: 1,
        msg: '用户已存在',
      };
      return;
    }
    if (!data.password) {
      ctx.body = {
        code: 1,
        msg: '请输入密码',
      };
      return;
    }
    const token = app.jwt.sign({
      name: data.name
    }, app.config.jwt.secret, {
      expiresIn: 60 * 60,
    });

    const userModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.name,
      password: md5(data.password),
      callPhone: data.callPhone,
      token,
    });
    await userModel.save();
    ctx.body = {
      code: 0,
      token,
      msg: '注册成功',
    };
    return;
  }
  async phoneExist(callPhone, password) {
    const ctx = this.ctx;
    const filter = {
      callPhone,
    };
    if (password) {
      filter.password = password;
    }
    const user = await ctx.model.User.findOne(filter).lean().exec();
    if (user) {
      return {
        isUser: !!user
      };
    }

  }
}

module.exports = HomeController;