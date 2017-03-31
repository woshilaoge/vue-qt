import $ from "jquery"

import Q from 'q'

function ajax(url, type, dataType, data) {
    return Q.Promise((resolve, reject) => {
        $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                data: data
            }).done((result) => {
                if (result && result.errno === 0) {
                    resolve(result.data);
                } else {
                    reject({
                        errno: result.errno,
                        msg: result.msg
                    });
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                reject();
            });
    });

}

export default {
    get: function(url, data) {
        let _self = this;
        return Q.Promise((resolve, reject) => {
            ajax(url, 'GET', 'json', data)
                .then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });

    },

    post: function(url, data) {
        let _self = this;
        return Q.Promise((resolve, reject) => {
            ajax(url, 'POST', 'json', data)
                .then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
    },

    put: function(url, data) {
        let _self = this;
        return Q.Promise((resolve, reject) => {
            ajax(url, 'PUT', 'json', data)
                .then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
    },

    delete: function(url, data) {
        return Q.Promise((resolve, reject) => {
            ajax(url, 'DELETE', 'json', data)
                .then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
    },

    jsonp: function(url, data) {
        return Q.Promise((resolve, reject) => {
            ajax(url, 'GET', 'jsonp', data)
                .then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
    }
}
