/**
 * 平台配置文件
 */
import Api from './api';

let DEBUGMOCK = false;

/* @if MOCK */
import _cloneDeep from 'lodash.cloneDeep';
/* @endif */

function MOCK(isMock, MockModule) {
    let Service = Api;
    try {
        let CONF = this ;
        if (CONF.PAGEDEBUG && (CONF.DEBUGMOCK && isMock)) {
            for (let v of MockModule) {
                if (CONF[v].API) {
                    CONF[v].API = Object.assign(CONF[v].API, CONF.mock.CONF[v].API);
                }
            }
            Service = _cloneDeep(Api);
            Object.assign(Service, CONF.mock.Method);
        }
    } catch (e) {
    }
    return Service;
}

/**
 * 系统后端接口
 * @type {string}
 */
const HOST = '//pin-mkt.jd.com';
/* @if MOCK */
/**
 * 系统 是否 MOCK数据 当 gulp dist 时 会自动删除 if MOCK 里代码
 * @type {boolean}
 */
DEBUGMOCK = true;
/* @endif */
export {
    HOST,
    DEBUGMOCK,
    MOCK
};
