'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PayRecordSchema = new Schema({
    id: String,
    name: String,   // 姓名
    phone: String,  // 手机号
		cardId: String, // 会员卡号
		cardType: String, // 会员卡类型 0-次卡 -1 时间卡
    money: Number,  // 充值钱数
    total: Number,  // 充值次数
    totalRest: Number,  // 剩余次数
    payTotal: Number,  // 支付次数
    payTime: Date,  // 支付时间
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
  return mongoose.model('PayRecord', PayRecordSchema);
};