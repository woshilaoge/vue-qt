import Q from 'q';

import CONF from '../../../conf';

let M = {};

/* @if MOCK */
M.MockModule = ['runlog']; //需要Mock数据的模块名称
M.MOCK = true;
/* @endif */

let Api = CONF.MOCK(true,['runlog']);

let serviceData;

export default {
    get: (param) => {
        const M = CONF['runlog'];

        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], param).then((data) => {
                serviceData = data;

                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                }
                resolve(rtnData);
            });
        });
    },
    columns: () => {
        return Q.Promise((resolve, reject) => {
            let columnData = [];
            for (let v of serviceData.titleName) {
                let column = {};
                column.title = v.name;
                column.data = v.value;
                columnData.push(column);
            }
            resolve(columnData);
        });
    },
    tableList: () => {
        return Q.Promise((resolve, reject) => {
            resolve(serviceData.titleList);
        });
    }
}
