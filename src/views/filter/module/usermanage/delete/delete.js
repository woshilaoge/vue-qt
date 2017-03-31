import Q from 'q';

import CONF from '../../../conf';

let M = {};

/* @if MOCK */
M.MockModule = ['delete']; //需要Mock数据的模块名称
M.MOCK = true;
/* @endif */

let Api = CONF.MOCK(true, ['delete']);


export default {
    get: (param) => {
        const M = CONF['delete'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], param).then((data) => {
                resolve(data);
            });
        });
    }
}
