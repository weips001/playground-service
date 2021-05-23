'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VipSchema = new Schema({
    id: String,
    name: String,   // 姓名
    phone: String,  // 手机号
		cardId: String, // 会员卡号
		cardType: String, // 会员卡类型 0-次卡 -1 时间卡
    money: {
      type: Number,
      default: 0
    },
    isYearCard: {
      type: Boolean,
      default: false
    },
    rechargeNum: {
      type: Number,
      default: 0
    },
    nowMoney: {
      type: Number,
      default: 0
    },  // 充值钱数
    nowTotal: Number,  // 本次充值次数
    total: {
      type: Number,
      default: 0
    }, // 充值总次数
    totalRest: {
      type: Number,
      default: 0
    },  // 剩余次数
    payTotal: Number,  // 支付次数
    payTime: Date,  // 支付时间
    remark: String, // 备注
    sex: String,
    birthday: {
      type: Date,
      default: new Date()
    },
    overdate: Date,
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('Vip', VipSchema);
};