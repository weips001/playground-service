'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VipSchema = new Schema({
    id: String,
    phone: String,
    cardId: String,
    birthday: {
      type: Date,
      default: new Date()
    },
    sex:String
  });
  return mongoose.model('UserAndPhone', VipSchema);
};