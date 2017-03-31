import Q from 'q';
import $ from "jquery";
import {HOST} from './conf';

PNotify = PNotify || function (val) {console.log(val)};
PNotify.prototype.options.styling = "bootstrap3";

export  default  {
    get: (url, opt) => {
        return Q.Promise((resolve, reject) => {
            $.ajax({
                    type: 'get',
                    url: HOST + url,
                    data: opt,
                    dataType: 'json'
                })
                .done(function(result) {
                    if (result && result.errno === 0) {
                        resolve(result.data);
                    } else {
                        new PNotify({
                            title: '系统提示',
                            text: result.msg,
                            type: 'error',
                            delay:5000,
                            hide: true
                        });
                        reject({
                            errno: result.errno,
                            msg: result.msg
                        });
                    }
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    new PNotify({
                        title: '系统提示',
                        text: '接口报错',
                        type: 'error',
                        delay:5000,
                        hide: true
                    });
                    reject();
                });
        });
    },
    post: (url, opt) => {
        return Q.Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: HOST + url,
                data: opt,
                dataType: 'JSON',
                success: (result) => {
                    if (result && result.errno === 0) {
                        resolve(result.data);
                    } else {
                        new PNotify({
                            title: '系统提示',
                            text: result.msg,
                            type: 'error',
                            delay:5000,
                            hide: true
                        });
                        reject({
                            errno: result.errno,
                            msg: result.msg
                        });
                    }
                },
                error: (XMLHttpRequest, texterrno, errorThrown) => {
                    new PNotify({
                        title: '系统提示',
                        text: '接口报错',
                        type: 'error',
                        delay:5000,
                        hide: true
                    });
                }
            });
        });
    }
}
