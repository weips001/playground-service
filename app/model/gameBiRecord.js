'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameBiRecordSchema = new Schema({
    id: String,
    name: String,   // 姓名
    phone: String,  // 手机号
    gameBiNum: Number,
    consumeTime: {
      type: Date,
      default: new Date()
    },
    createTime: {
      type: Date,
      default: new Date()
    }
  });
  return mongoose.model('GameBiRecord', GameBiRecordSchema);
};