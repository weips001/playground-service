'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const StudentSchema = new Schema({
    id: String,
    name: String,
    phone: String,
    gameBi: Number,
    birthday: {
      type: Date,
      default: new Date()
    },
    money: {
      type: Number,
      default: 0
    },
    headImage: String,
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
    desc: String, // 备注
  });
  return mongoose.model('Student', StudentSchema);
};