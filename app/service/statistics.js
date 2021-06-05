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
    let arr = data.filter(item=>{
      return item._id === '0'
    })
    let arr1 = total.filter(item=>{
      return item._id === '0'
    })
    return {
      restTotal: arr[0].count,
      total: arr1[0].count,
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
    let num1 = 0
    let num2 = 0
    if(vipTodayNum.length > 0) {
      num1 = vipTodayNum[0].count
    }
    if(gameBiTodayNum.length > 0) {
      num2 = gameBiTodayNum[0].count
    }
    return {
      vipTodayNum: num1,
      gameBiTodayNum: num2,
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
    let num1 = 0
    let num2 = 0
    if(vipTodayMoney.length > 0) {
      num1 = vipTodayMoney[0].count
    }
    if(gimeBiTodayMoney.length > 0) {
      num2 = gimeBiTodayMoney[0].count
    }
    return {
      vipTodayMoney: num1,
      gimeBiTodayMoney: num2,
      success: true,
    };
  }
}
module.exports = StatisticsService;
