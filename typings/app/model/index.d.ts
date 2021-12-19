// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBuyRecord = require('../../../app/model/buyRecord');
import ExportGameBi = require('../../../app/model/gameBi');
import ExportGameBiRecord = require('../../../app/model/gameBiRecord');
import ExportRole = require('../../../app/model/role');
import ExportSchool = require('../../../app/model/school');
import ExportShoppingRecord = require('../../../app/model/shoppingRecord');
import ExportStudent = require('../../../app/model/student');
import ExportUser = require('../../../app/model/user');
import ExportVip = require('../../../app/model/vip');

declare module 'egg' {
  interface IModel {
    BuyRecord: ReturnType<typeof ExportBuyRecord>;
    GameBi: ReturnType<typeof ExportGameBi>;
    GameBiRecord: ReturnType<typeof ExportGameBiRecord>;
    Role: ReturnType<typeof ExportRole>;
    School: ReturnType<typeof ExportSchool>;
    ShoppingRecord: ReturnType<typeof ExportShoppingRecord>;
    Student: ReturnType<typeof ExportStudent>;
    User: ReturnType<typeof ExportUser>;
    Vip: ReturnType<typeof ExportVip>;
  }
}
