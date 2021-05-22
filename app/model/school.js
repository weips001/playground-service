'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SchoolSchema = new Schema({
    id: String,
    schoolName: String,   // 驾校名称
    desc: String,   // 描述
    creatorId: String,  // 创建人id
    adminPhone: String,  // 超级管理员电话
    adminName: String,   // 超级管理员名字
    creatorName: String,  // 创建人姓名
    perioOfValidity: Date,  //  有效期
    moneyAll: {
      type: Number,
      default: 0
    },
    moneyToday: {
      type: Number,
      default: 0
    },
    createTime: {
      type: Date,
      default: new Date()
    },  // 创建时间
    updateTime: {
      type: Date,
      default: new Date()
    },  // 更新时间
  });
  return mongoose.model('School', SchoolSchema);
};