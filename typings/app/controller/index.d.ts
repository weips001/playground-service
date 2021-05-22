// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBuyRecord = require('../../../app/controller/buyRecord');
import ExportGameBi = require('../../../app/controller/gameBi');
import ExportInit = require('../../../app/controller/init');
import ExportLogin = require('../../../app/controller/login');
import ExportRole = require('../../../app/controller/role');
import ExportSchool = require('../../../app/controller/school');
import ExportShoppingRecord = require('../../../app/controller/shoppingRecord');
import ExportStudent = require('../../../app/controller/student');
import ExportUser = require('../../../app/controller/user');
import ExportVip = require('../../../app/controller/vip');

declare module 'egg' {
  interface IController {
    buyRecord: ExportBuyRecord;
    gameBi: ExportGameBi;
    init: ExportInit;
    login: ExportLogin;
    role: ExportRole;
    school: ExportSchool;
    shoppingRecord: ExportShoppingRecord;
    student: ExportStudent;
    user: ExportUser;
    vip: ExportVip;
  }
}
