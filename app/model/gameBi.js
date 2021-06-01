'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameBiSchema = new Schema({
    id: String,
    name: String, // 角色名称
    phone: String, // 权限列表
    restTotal: Number,
    total: Number,
    money: Number,
    overdate: String, // 有效期
    remark: String,
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date
    },
  });
  return mongoose.model('GameBi', GameBiSchema);
};