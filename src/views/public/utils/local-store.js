import store from 'store';

let storeWithExpiration = {
    set: function(key, val, exp = 0) {
        store.set(key, {
            val: val,
            exp: exp,
            time: new Date().getDay()
        })
    },
    get: function(key) {
        let info = store.get(key);

        if (!info) {
            return "";
        }

        if (new Date().getDay() - info.time > info.exp) {
            return "";
        }
        return info.val
    },
    store: store
};

export default storeWithExpiration;
