// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGameBi = require('../../../app/model/gameBi');
import ExportPayRecord = require('../../../app/model/payRecord');
import ExportRole = require('../../../app/model/role');
import ExportSchool = require('../../../app/model/school');
import ExportStudent = require('../../../app/model/student');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    GameBi: ReturnType<typeof ExportGameBi>;
    PayRecord: ReturnType<typeof ExportPayRecord>;
    Role: ReturnType<typeof ExportRole>;
    School: ReturnType<typeof ExportSchool>;
    Student: ReturnType<typeof ExportStudent>;
    User: ReturnType<typeof ExportUser>;
  }
}
