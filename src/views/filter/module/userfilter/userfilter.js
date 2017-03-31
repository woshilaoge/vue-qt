import Q from 'q';

import CONF from '../../conf';

let Api = CONF.MOCK(true, ['itembrand']);


export default {
    get: (param) => {
        const M = CONF['itembrand'];

        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], param).then((data) => {

                let rData = {};
                rData.item = data.item1.value.map(function (obj, idx) {
                    return {
                        name: obj.name,
                        id: obj.value,
                        checked: idx ? false : true
                    }
                });

                rData.brand = data.brand.value.map(function (obj, idx) {
                    return {
                        name: obj.name,
                        id: obj.value,
                        checked: idx ? false : true
                    }
                });
                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleToolTip:M['TOOLTIP'],
                    moduleData: rData
                }
                resolve(rtnData);
            });
        });
    },
    getVal: (param) => {
        const M = CONF['itembrand'];

        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GETVAL'], param).then((data) => {
                data.value = data.value || 0;
                resolve(data.value);
            });
        });
    },
    post: (param) => {
        const M = CONF['itembrand'];

        return Q.Promise((resolve, reject) => {
            Api.post(M['API']['POST'], param).then((data) => {
                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleData: data
                }
                resolve(rtnData);
            });
        });
    },
}
