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
    const total = await ctx.model.Vip.aggregate([{
      $group: {
        _id: '$cardType',
        count: {
          $sum: '$total'
        }
      }
    }])
    return {
      restTotal: data[0].count,
      total: total[0].count,
      success: true,
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
      vipTodayNum:vipTodayNum[0].count,
      gameBiTodayNum: gameBiTodayNum[0].count,
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
      vipTodayMoney: vipTodayMoney[0].count,
      gimeBiTodayMoney: gimeBiTodayMoney[0].count,
      success: true,
    };
  }
}
module.exports = StatisticsService;
