import Handler from './handler';

import Q from 'q';

export default {
    get: (data, param = {}) => {
        let rtnData = Handler.gen(data);
        return Q.Promise((resolve, reject) => {
            resolve(rtnData.data);
        });
    },

    post: function(url, data) {
        let rtnData = Handler.gen(data);
        return Q.Promise((resolve, reject) => {
            resolve(rtnData.data);
        })
    },

    put: function(url, data) {
        let rtnData = Handler.gen(data);
        return Q.Promise((resolve, reject) => {
            resolve(rtnData.data);
        })
    },

    delete: function(url, data) {
        let rtnData = Handler.gen(data);
        return Q.Promise((resolve, reject) => {
            resolve(rtnData.data);
        })
    },

    jsonp: function(url, data) {
        let rtnData = Handler.gen(data);
        return Q.Promise((resolve, reject) => {
            resolve(rtnData.data);
        })
    }
}
