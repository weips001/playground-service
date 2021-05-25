const xlsx = require('node-xlsx')
const axios = require('axios')
const fs = require('fs')
const moment = require('moment')

async function transData() {
  let success = 0
  let error = 0
  let excelData = []
  var sheets = xlsx.parse('./single.xlsx');
  // vip?current=1&pageSize=20&phone=
  const sheet = sheets[0]
  for (let i = 0; i < sheet.data.length; i++) {
    const row = sheet['data'][i]
    const phone = row[0]
    const name = row[1]
    const cardId = row[2]
    let item = [phone, name, cardId]
    if (i > 0 && row) {
      const res = await axios.get(`http://127.0.0.1:7006/api/vip?current=1&pageSize=20000&phone=${phone}`)
      const { data, code } = res.data
      if (code === 0) {
        const sum = data.reduce((prev, next) => {
          if(next.cardType === '1') {
            item[4] = '有年卡'
            item[5] = moment(next.overdate).format('YYYY-MM-DD')
            return prev
          }
          return prev + next.restTotal
        }, 0)
        item[3] = sum
        success++
      } else {
        error++
        item[3] = '错误'
      }
      excelData.push(item)
    }
    const rate = ((success + error) / sheet.data.length).toFixed(2) * 100
    console.log(rate + '%')
  }
  console.log('成功条数', success)
  console.log('失败条数', error)
  console.log('数据是否准确', excelData.length === success)
  excelData.unshift(['手机号', '姓名', '卡号', '剩余总次数', '是否有年卡', '年卡有效期'])
  var buffer1 = xlsx.build([{name: "sheet1", data: excelData}]);

  fs.writeFileSync('./diff.xls', buffer1, {'flag':'w'})
}

transData()

