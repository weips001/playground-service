// const user_1 = require('./user_6')
const user_1 = require('./gamebi_4')
const axios = require('axios')
async function saveVip() {
  const success = []
  const error = []
  const update = []
  for (let i = 0; i < user_1.length; i++) {
    const keyMap = {
      '$oid': '$oid',
      '$numberInt': '$numberInt',
      '$date': '$date'
    }
    const item = user_1[i]

    for (let key in item) {
      const value = item[key]
      if (value == null) {
        continue
      }
      if (typeof value === 'object') {
        let exitKey = ''
        for (let key1 in keyMap) {
          if (value[key1] != undefined) {
            exitKey = key1
            break
          } else {
            exitKey = key1
          }
        }
        item[key] = value[exitKey]
      }
    }
    const url = 'http://127.0.0.1:7006/api/saveGameBi'
    const res = await axios.post(url, {
      ...item
    })
    if (res.data.code === 0) {
      success.push(item.id)
    } else if (res.data.code === 2) {
      update.push(item.id)
    } else {
      error.push(item.id)
    }
    console.log(i + 1 / user_1.length)
  }
  console.log('成功的数据', success.length)
  console.log('失败的数据', error.length)
  console.log('修改的数据', update.length, update)
}
saveVip()
// console.log(ids)
// console.log(data.length)