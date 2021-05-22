'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameBiSchema = new Schema({
    id: String,
    name: String,  // 角色名称
    phone: String,  // 权限列表
		biNumber: Number,
		record: [],
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('GameBi', GameBiSchema);
};