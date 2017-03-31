// coerce convert som types of data into another type
export const coerce = {
    // Convert a string to booleam. Otherwise, return the value without modification, so if is not boolean, Vue throw a warning.
    boolean: val => (typeof val === 'string' ? val === '' || val === 'true' ? true : (val === 'false' || val === 'null' || val === 'undefined' ? false : val) : val),
    // Attempt to convert a string value to a Number. Otherwise, return 0.
    number: (val, alt = null) => (typeof val === 'number' ? val : val === undefined || val === null || isNaN(Number(val)) ? alt : Number(val)),
    // Attempt to convert to string any value, except for null or undefined.
    string: val => (val === undefined || val === null ? '' : val + ''),
    // Pattern accept RegExp, function, or string (converted to RegExp). Otherwise return null.
    pattern: val => (val instanceof Function || val instanceof RegExp ? val : typeof val === 'string' ? new RegExp(val) : null)
}

export function getJSON (url) {
    var request = new window.XMLHttpRequest()
    var data = {}
    // p (-simulated- promise)
    var p = {
        then (fn1, fn2) { return p.done(fn1).fail(fn2) },
        catch (fn) { return p.fail(fn) },
        always (fn) { return p.done(fn).fail(fn) }
    };
    ['done', 'fail'].forEach(name => {
        data[name] = []
        p[name] = (fn) => {
            if (fn instanceof Function) data[name].push(fn)
            return p
        }
    })
    p.done(JSON.parse)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            let e = {status: request.status}
            if (request.status === 200) {
                try {
                    var response = request.responseText
                    for (var i in data.done) {
                        var value = data.done[i](response)
                        if (value !== undefined) { response = value }
                    }
                } catch (err) {
                    data.fail.forEach(fail => fail(err))
                }
            } else {
                data.fail.forEach(fail => fail(e))
            }
        }
    }
    request.open('GET', url)
    request.setRequestHeader('Accept', 'application/json')
    request.send()
    return p
}

export function getScrollBarWidth () {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        return 0
    }
    let inner = document.createElement('p')
    inner.style.width = '100%'
    inner.style.height = '200px'

    let outer = document.createElement('div')
    outer.style.position = 'absolute'
    outer.style.top = '0px'
    outer.style.left = '0px'
    outer.style.visibility = 'hidden'
    outer.style.width = '200px'
    outer.style.height = '150px'
    outer.style.overflow = 'hidden'
    outer.appendChild(inner)

    document.body.appendChild(outer)
    let w1 = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let w2 = inner.offsetWidth
    if (w1 === w2) w2 = outer.clientWidth

    document.body.removeChild(outer)

    return (w1 - w2)
}

// return all the translations or the default language (english)
export function translations (lang = 'en') {
    let text = {
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        limit: 'Limit reached ({{limit}} items max).',
        loading: 'Loading...',
        minLength: 'Min. Length',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        notSelected: 'Nothing Selected',
        required: 'Required',
        search: 'Search'
    }
    return window.VueStrapLang ? window.VueStrapLang(lang) : text
}

// delayer: set a function that execute after a delay
// @params (function, delay_prop or value, default_value)
export function delayer (fn, varTimer, ifNaN = 100) {
    function toInt (el) { return /^[0-9]+$/.test(el) ? Number(el) || 1 : null }
    var timerId
    return function (...args) {
        if (timerId) clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn.apply(this, args)
        }, toInt(varTimer) || toInt(this[varTimer]) || ifNaN)
    }
}

// Fix a vue instance Lifecycle to vue 1/2 (just the basic elements, is not a real parser, so this work only if your code is compatible with both)
// (Waiting for testing)
export function VueFixer (vue) {
    var vue2 = !window.Vue || !window.Vue.partial
    var mixin = {
        computed: {
            vue2 () { return !this.$dispatch }
        }
    }
    if (!vue2) {
        //translate vue2 attributes to vue1
        if (vue.beforeCreate) {
            mixin.create = vue.beforeCreate
            delete vue.beforeCreate
        }
        if (vue.beforeMount) {
            vue.beforeCompile = vue.beforeMount
            delete vue.beforeMount
        }
        if (vue.mounted) {
            vue.ready = vue.mounted
            delete vue.mounted
        }
    } else {
        //translate vue1 attributes to vue2
        if (vue.beforeCompile) {
            vue.beforeMount = vue.beforeCompile
            delete vue.beforeCompile
        }
        if (vue.compiled) {
            mixin.compiled = vue.compiled
            delete vue.compiled
        }
        if (vue.ready) {
            vue.mounted = vue.ready
            delete vue.ready
        }
    }
    if (!vue.mixins) { vue.mixins = [] }
    vue.mixins.unshift(mixin)
    return vue
};
/**
 * 合并数组、12/19 xiaoxian
 * @param target
 * @param arr
 * @returns {*}
 */
export function mergeArray(target, arr) {
    target.length = 0;
    if(arr.length !== 0){
        for (let obj of arr) {
            if (!JSON.stringify(target).includes(JSON.stringify(obj))) {
                target.push(obj);
            }
        }
    }
    return target;
};
export function mergeArrayX(target, arr) {
    if(arr.length !== 0){
        for (let obj of arr) {
            if (!JSON.stringify(target).includes(JSON.stringify(obj))) {
                target.push(obj);
            }
        }
    }
    return target;
};
/**
 * 合并选中的用户到白名单列表，只增不删
 * @param target
 * @param arr
 * @returns {*}
 */
export function mergeToWhiteUser(target, arr) {
    // console.log(arr)
    if(arr.length !== 0){
        for (let obj of arr) {
            if (!JSON.stringify(target).includes(JSON.stringify(obj))) {
                target.push(obj);
                // console.log(target);;
            }
        }
    }
    return target;
};
/**
 * 删除数组制定列、12/19 xiaoxian
 * @param arr
 * @param key
 * @param val
 * @returns {*}
 */
export function deleteByKey(arr,key,val) {
    for (let i=0;i<arr.length;i++){
        if(arr[i][key] === val){
            arr.splice(i,1);
            return arr;
        }
    }
}
/**
 * 定义公共的时间戳处理函数
 * 
 * @export
 * @param {any} time
*/
export function formatDate(time) {
    return moment(time).format("YYYY-MM-DD hh:mm")
}

/**
 * 定义获取浏览器参数的方法
 * 
 * @export
 * @param {any} time
*/
export function getUrlParam (name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); 
    return null;
};

/**
 * 定义输入框的值是否为空函数
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
export function isCheckNull(value){
    if(value === '' || value === undefined || value === null){
        return true;
    }
    return false;
}
/**
 * 定义去除字符前后空格
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
export function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 定义输入的链接是否是合法的链接
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function regHttp(url){
    // let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/;
    return reg.test(trim(url));
}

// watch DOM change
export const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;