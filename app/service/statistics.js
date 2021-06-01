'use strict';
const md5 = require('md5-node');
const dayjs = require('dayjs')

const Service = require('egg').Service;
class StatisticsService extends Service {
  async getNotNum() {
    const ctx = this.ctx;
    const data = await ctx.model.Vip.aggregate([{
      $group: {
        _id: '$cardType',
        count: {
          $sum: '$restTotal'
        }
      }
    }])
    return {
      data,
      success: true,
      msg: '删除成功',
      code: 0,
    };
  }
  async getTodayNum() {
    const ctx = this.ctx;
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const tomorrow = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1)
    const vipTodayNum = await ctx.model.ShoppingRecord.aggregate([
      { $match : { createTime : {$gte:today, $lte:tomorrow} }},
      {
        $group: {
          _id: '',
          count: {
            $sum: '$shoppingNum'
          }
        }
      }
    ]).exec()
    const gameBiTodayNum = await ctx.model.GameBiRecord.aggregate([
      { $match : { createTime : {$gte:today, $lte:tomorrow} }},
      {
        $group: {
          _id: '',
          count: {
            $sum: '$gameBiNum'
          }
        }
      }
    ]).exec()
    return {
      vipTodayNum,
      gameBiTodayNum,
      success: true,
    };
  }
  async getTodayMoney() {
    const ctx = this.ctx;
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const tomorrow = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1)
    const vipTodayMoney = await ctx.model.Vip.aggregate([
      { $match : { createTime : {$gte:today, $lte:tomorrow} }},
      {
        $group: {
          _id: '',
          count: {
            $sum: '$money'
          }
        }
      }
    ]).exec()
    const gimeBiTodayMoney = await ctx.model.GameBi.aggregate([
      { $match : { createTime : {$gte:today, $lte:tomorrow} }},
      {
        $group: {
          _id: '',
          count: {
            $sum: '$money'
          }
        }
      }
    ]).exec()
    return {
      vipTodayMoney,
      gimeBiTodayMoney,
      success: true,
    };
  }
}
module.exports = StatisticsService;
