'use strict';

const uuidV1 = require('uuid/v1');
const crypto = require('crypto');

function formateHost(host) {
  if (!host) {
    return '';
  }
  host = host.trim();
  if (host.indexOf('http') !== 0) {
    host = 'http://' + host;
  }
  if (host.lastIndexOf('/') !== host.length - 1) {
    host = host + '/';
  }
  return host;
}

exports.REGEXP = {
  username: /^[a-z]{4,}$/,
  mobile: /^1[34578]\d{9}$/,
  mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

exports.sleep = function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

exports.generateId = function generateId() {
  return uuidV1();
};

const OPERATOR_RE = /[|\\{}()[\]^$+*?.]/g;
exports.escapeStringRegExp = function escapeStringRegExp(str = '') {
  return str.replace(OPERATOR_RE, '\\$&');
};

const namePossible = 'abcdefghijklmnopqrstuvwxyzaeiou';
exports.makeName = function makeName(len = 5) {
  let text = '';
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      text += namePossible.charAt(Math.floor(Math.random() * namePossible.length)).toUpperCase();
    } else {
      text += namePossible.charAt(Math.floor(Math.random() * namePossible.length));
    }
  }
  return text;
};

exports.md5 = function md5(str, maxLen = 32) {
  return crypto.createHash('md5').update(str).digest('hex')
    .slice(0, maxLen);
};

exports.getUsername = function getUsername() {
  return this.ctx.user && this.ctx.user.username || '';
};

exports.authFilter = function authFilter(filter) {
  return filter;
  // const ctx = this.ctx;
  // if (ctx.user) {
  //   if (ctx.user.role !== 'admin') {
  //     filter.$or = [{
  //       'members.username': ctx.user.username,
  //     }, {
  //       visibility: 'public',
  //     }];
  //     // filter['members.username'] = ctx.user.username;
  //   }
  //   return filter;
  // }
  // return { id: 'xxx-not-exist' };
};

exports.authCheck = function authCheck() {
  return true;
  // const ctx = this.ctx;
  // if (ctx.user) {
  //   if (ctx.user.role === 'admin') {
  //     return true;
  //   }
  //   if (model) {
  //     if (model.visibility === 'public') {
  //       return true;
  //     }
  //     if (model.members) {
  //       for (const member of model.members) {
  //         if (member.username === ctx.user.username) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  // }
  // return false;
};

exports.masterCheck = function masterCheck() {
  return false;
  // const ctx = this.ctx;
  // if (ctx.user) {
  //   if (ctx.user.role === 'admin') {
  //     return true;
  //   }
  //   if (model && model.members) {
  //     for (const member of model.members) {
  //       if (member.username === ctx.user.username && member.role === 'master') {
  //         return true;
  //       }
  //     }
  //   }
  // }
  // return false;
};

exports.formateHost = formateHost;

exports.getServerHosts = async function getServerHosts(configType) {
  const ctx = this.ctx;
  const doc = await ctx.model.Server.findOne({ configType }).lean().exec();
  if (!doc) {
    return [];
  }
  return doc.hostList.map(item => formateHost(item.host));
};

// exports.isAdmin = function isAdmin() {
//   const ctx = this.ctx;
//   if (ctx.user) {
//     if (ctx.user.role === 'admin') {
//       return true;
//     }
//   }
//   return false;
// };

// exports.parseSwarmAddress = async function(swaimApi) {
//   const ctx = this.ctx;
//   const results = await ctx.curl(swaimApi, {
//     dataType: 'json',
//   });

//   return results.data.map(item => {
//     const Port = item.Ports.filter(p => p.IP && p.PublicPort)[0];
//     return Port.IP + ':' + Port.PublicPort;
//   });
// };


// const Excel = require('exceljs');
 
// exports.excelNew = async function excelNew(headers, name) {
//   let columns = [];
//   let titleRows = headers.length;

//   //处理表头
//   for (let i = 0; i < titleRows; i++) {
//       let row = headers[i];
//       for (let j = 0, rlen = row.length; j < rlen; j++) {
//           let col = row[j];
//           let { k, t, w = 15 } = col;
//           if (!k) continue;
//           col.style = { alignment: { vertical: 'middle', horizontal: 'center' } };
//           col.header = t;
//           col.key = k;
//           col.width = w;
//           columns.push(col);
//       }
//   }

//   let result = {
//       data: {data: [{userName:'韦鹏帅', deptName: '大傻逼'}, {userName:'李三才', deptName: '大帅比'}]}
//   } 

//   let workbook = new Excel.Workbook();
//   let sheet = workbook.addWorksheet('绩效考核统计表', { views: [{ xSplit: 1, ySplit: 1 }] });
//   sheet.columns = columns;
//   sheet.addRows(result.data.data)

//   //处理样式、日期、字典项
//   let that = this;
//   sheet.eachRow(function (row, rowNumber) {
//       //设置行高
//       row.height = 25;

//       row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
//           //设置边框 黑色 细实线
//           // let top = left = bottom = right = { style: 'thin', color: { argb: '000000' } };
//           // cell.border = { top, left, bottom, right };

//           //设置标题部分为粗体
//           if (rowNumber <= titleRows) { cell.font = { bold: true }; return; }

//           //处理数据项里面的日期和字典
//           let { type, dict } = columns[colNumber - 1];
//           if (type && (cell.value || cell.value == 0)) return;//非日期、字典或值为空的直接返回
//           switch (type) {
//               case 'date': cell.value = that.parseDate(cell.value); break;
//               case 'dict': cell.value = that.parseDict(cell.value.toString(), dict); break;
//           }

//       });
//   });

//   this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//   this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
//   this.ctx.body = await workbook.xlsx.writeBuffer();
// }