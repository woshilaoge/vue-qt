import Q from 'q';

import CONF from '../../conf';

let M = {};

/* @if MOCK */
M.MockModule = ['moduleparams']; //需要Mock数据的模块名称
M.MOCK = true;
/* @endif */

let Api = CONF.MOCK(true,['moduleparams']);

export default {
    get: (params = {}) => {
        const M = CONF['moduleparams'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['PIN'], {}).then((data) => {
                console.log(data,'----+++')
                Api.get(M['API']['GET'], {"pin" : data}).then((data) => {
                    let rtnData = {
                        moduleName: M['NAME'],
                        moduleIcon: M['ICON'],
                        moduleToolTip:M['TOOLTIP'],
                        moduleData: data
                    }
                    resolve(rtnData);
                });
            });
        });
    }
}
