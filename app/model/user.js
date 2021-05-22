'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: String,
    schoolId: String,
    name: String,
    desc: String,
    callPhone: String,
    password: String,
    imgUrl: String,
    token: String,
    overdue: {
      type: Boolean,
      default: false
    },
    role: [String],
    roleName: [String],
    creator: String,
    creatorName: String,
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('User', UserSchema);
};