// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBuyRecord = require('../../../app/controller/buyRecord');
import ExportGameBi = require('../../../app/controller/gameBi');
import ExportGameBiRecord = require('../../../app/controller/gameBiRecord');
import ExportInit = require('../../../app/controller/init');
import ExportLogin = require('../../../app/controller/login');
import ExportRecovery = require('../../../app/controller/recovery');
import ExportRole = require('../../../app/controller/role');
import ExportSchool = require('../../../app/controller/school');
import ExportShoppingRecord = require('../../../app/controller/shoppingRecord');
import ExportStatistics = require('../../../app/controller/statistics');
import ExportStudent = require('../../../app/controller/student');
import ExportUser = require('../../../app/controller/user');
import ExportVip = require('../../../app/controller/vip');

declare module 'egg' {
  interface IController {
    buyRecord: ExportBuyRecord;
    gameBi: ExportGameBi;
    gameBiRecord: ExportGameBiRecord;
    init: ExportInit;
    login: ExportLogin;
    recovery: ExportRecovery;
    role: ExportRole;
    school: ExportSchool;
    shoppingRecord: ExportShoppingRecord;
    statistics: ExportStatistics;
    student: ExportStudent;
    user: ExportUser;
    vip: ExportVip;
  }
}
