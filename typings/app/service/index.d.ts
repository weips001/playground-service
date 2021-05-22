// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportGameBi = require('../../../app/service/gameBi');
import ExportInit = require('../../../app/service/init');
import ExportPayRecord = require('../../../app/service/payRecord');
import ExportRole = require('../../../app/service/role');
import ExportSchool = require('../../../app/service/school');
import ExportStudent = require('../../../app/service/student');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    gameBi: AutoInstanceType<typeof ExportGameBi>;
    init: AutoInstanceType<typeof ExportInit>;
    payRecord: AutoInstanceType<typeof ExportPayRecord>;
    role: AutoInstanceType<typeof ExportRole>;
    school: AutoInstanceType<typeof ExportSchool>;
    student: AutoInstanceType<typeof ExportStudent>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
