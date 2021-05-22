'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BuyRecordSchema = new Schema({
    id: String,
    name: String,   // 姓名
    phone: String,  // 手机号
		cardId: String, // 会员卡号
		cardType: String, // 会员卡类型 0-次卡 -1 时间卡
    buyMoney: Number,
    createTime: {
      type: Date,
      default: new Date()
    }
  });
  return mongoose.model('BuyRecord', BuyRecordSchema);
};