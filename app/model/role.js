'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleSchema = new Schema({
    id: String,
    name: String,  // 角色名称
    auth: [String],  // 权限列表
    schoolId: String,  // 驾校id
    desc: String,  // 描述
    creator: String,  // 创建人
    creatorName: String,  // 创建人名称
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('Role', RoleSchema);
};