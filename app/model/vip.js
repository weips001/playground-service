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
    restTotal: {
      type: Number,
      default: 0
    }, // 充值总次数
    usedTotal: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
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