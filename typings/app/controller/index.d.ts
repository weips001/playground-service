// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGameBi = require('../../../app/controller/gameBi');
import ExportInit = require('../../../app/controller/init');
import ExportLogin = require('../../../app/controller/login');
import ExportPayRecord = require('../../../app/controller/payRecord');
import ExportRole = require('../../../app/controller/role');
import ExportSchool = require('../../../app/controller/school');
import ExportStudent = require('../../../app/controller/student');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    gameBi: ExportGameBi;
    init: ExportInit;
    login: ExportLogin;
    payRecord: ExportPayRecord;
    role: ExportRole;
    school: ExportSchool;
    student: ExportStudent;
    user: ExportUser;
  }
}
