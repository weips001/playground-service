// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBuyRecord = require('../../../app/service/buyRecord');
import ExportGameBi = require('../../../app/service/gameBi');
import ExportGameBiRecord = require('../../../app/service/gameBiRecord');
import ExportInit = require('../../../app/service/init');
import ExportRecovery = require('../../../app/service/recovery');
import ExportRole = require('../../../app/service/role');
import ExportSchool = require('../../../app/service/school');
import ExportShoppingRecord = require('../../../app/service/shoppingRecord');
import ExportStatistics = require('../../../app/service/statistics');
import ExportStudent = require('../../../app/service/student');
import ExportUser = require('../../../app/service/user');
import ExportVip = require('../../../app/service/vip');

declare module 'egg' {
  interface IService {
    buyRecord: AutoInstanceType<typeof ExportBuyRecord>;
    gameBi: AutoInstanceType<typeof ExportGameBi>;
    gameBiRecord: AutoInstanceType<typeof ExportGameBiRecord>;
    init: AutoInstanceType<typeof ExportInit>;
    recovery: AutoInstanceType<typeof ExportRecovery>;
    role: AutoInstanceType<typeof ExportRole>;
    school: AutoInstanceType<typeof ExportSchool>;
    shoppingRecord: AutoInstanceType<typeof ExportShoppingRecord>;
    statistics: AutoInstanceType<typeof ExportStatistics>;
    student: AutoInstanceType<typeof ExportStudent>;
    user: AutoInstanceType<typeof ExportUser>;
    vip: AutoInstanceType<typeof ExportVip>;
  }
}
