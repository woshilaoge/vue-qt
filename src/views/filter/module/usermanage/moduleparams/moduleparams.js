import Q from 'q';

import CONF from '../../../conf';

let M = {};

/* @if MOCK */
M.MockModule = ['moduleparams']; //需要Mock数据的模块名称
M.MOCK = true;
/* @endif */
let Api = CONF.MOCK(true, ['moduleparams']);

export default {
    get: (params = {}) => {
        const M = CONF['moduleparams'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], params).then((data) => {
                data.createUser.name =  data.createUser.value;
                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleData: data
                }
                resolve(rtnData);
            });
        });
    }
}
