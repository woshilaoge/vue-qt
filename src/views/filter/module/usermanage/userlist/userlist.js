import Q from 'q';

import CONF from '../../../conf';

let Api = CONF.MOCK(true, ['userlist']);


let serviceData = {};
const M = CONF['userlist'];

/**
 * 操作、responsive 的配置项
 * @type {[*]}
 */
let columnDefs = [{
    "targets": 11,
    render: function (data, type, row) {

        //人群包有效时，设置有效灰显,人群包无效时，设置有效可点，点击后状态变成有效
        let validClass = '', deleteClass = '', runClass = '',userClass = '',logClass = '';
        // if ('有效' === row.modelValidity) {
        //     validClass = 'hide';
        //     if(('筛选中' === row.status) || ('未筛选' === row.status)){
        //         userClass = 'hide';
        //     }
        //     if(('筛选中' === row.status) || ('临时' === row.dateType)){
        //         logClass = 'hide';
        //     }
        // }else if('临时' === row.dateType){
        //     logClass = 'hide';
        // }
        // if ('筛选中' === row.status) {
        //     deleteClass = 'hide';
        // }
        // if ('周期' === row.dateType) {
        //     runClass = 'hide';
        //     logClass = 'hide';
        // }else if(('无效' === row.modelValidity)||('筛选中' === row.status)){
        //     runClass = 'hide';
        // }
        if(('有效' === row.modelValidity) && ('未筛选' === row.status) && ('周期' === row.dateType)){
            userClass = 'hide';
            logClass = 'hide';
            validClass = 'hide';
            runClass = 'hide';
        }else if(('有效' === row.modelValidity) && ('筛选中' === row.status) && ('周期' === row.dateType)){
            userClass = 'hide';
            logClass = 'hide';
            validClass = 'hide';
            runClass = 'hide';
            deleteClass = 'hide';
        }else if(('有效' === row.modelValidity) && ('筛选完成' === row.status) && ('周期' === row.dateType)){
            validClass = 'hide';
            runClass = 'hide';
        }else if(('无效' === row.modelValidity) && ('周期' === row.dateType)){
            runClass = 'hide';
        }else if(('有效' === row.modelValidity) && ('未筛选' === row.status) && ('临时' === row.dateType)){
            userClass = 'hide';
            logClass = 'hide';
            validClass = 'hide';
        }else if(('有效' === row.modelValidity) && ('筛选中' === row.status) && ('临时' === row.dateType)){
            userClass = 'hide';
            validClass = 'hide';
            runClass = 'hide';
            deleteClass = 'hide';
        }else if(('有效' === row.modelValidity) && ('筛选完成' === row.status) && ('临时' === row.dateType)){
            validClass = 'hide';
        }else if(('无效' === row.modelValidity) && ('临时' === row.dateType)){
            logClass = 'hide';
        }

        let res = `<button class="user-structure ${userClass}" data-json='${JSON.stringify({crowdId: row.crowdId})}' title="人群构成">人群构成</button>
                       <button class="run-log ${logClass}" data-json='${JSON.stringify({crowdId: row.crowdId})}' title="执行记录">执行记录</button>
                       <button class="delete ${deleteClass}" data-json='${JSON.stringify({crowdId: row.crowdId, crowdName: row.crowdName})}' title="删除">删除</button>
                       <button class="set-valid ${validClass}" data-json='${JSON.stringify({crowdId: row.crowdId})}' title="设置有效">设置有效</button>
                       <button class="run ${runClass}" data-json='${JSON.stringify({
            crowdId: row.crowdId,
            crowFactor: row.crowFactor,
            itemId1: row.itemId1,
            brandId: row.brandId,
            dateType: row.dateType,
            startDate: row.startDate
        })}' title="执行任务">执行任务</button>`;
        return res;
    }
}, {
    "targets": 9,
    render: function (data, type, row) {
        let res = (data === '有效') ? `normal` : `warning`;
        return `<span class="${res}">${data}</span>`;
    }
}, {
    "targets": 2,
    render: function (data) {
        if (data && (data.replace(/[^\x00-\xff]/g, "01").length > 20)) {
            let temp = [];
            for (let i = 0; i < data.replace(/[^\x00-\xff]/g, "01").length;) {
                if (i >= 20) {
                    break;
                }
                if (data.charAt(i).replace(/[^\x00-\xff]/g, "01").length > 1) {
                    i = i + 2;
                }else{
                    i = i + 1;
                }
                temp.push(data.charAt(i))
            }
            return `<span title="${data}">${temp.join('')} ...</span>`;
        }
        return `<span>${data}</span>`;
    }
}, {responsivePriority: 10001, targets: 3}, {responsivePriority: 10002, targets: 8}, {
    responsivePriority: 1,
    targets: -1
}];
//'中国23'.replace(/[^\x00-\xff]/g,"01").length;
let dataTableOptions = {
    lengthChange: false, //是否允许用户改变表格每页显示的记录数
    paging: false, //是否开启本地分页
    searching: false, //是否允许Datatables开启本地搜索
    ordering: false,
    info: false, //控制是否显示表格左下角的信息
    // scrollX: true,
    responsive: true,
    // fixedColumns: true,
    fixedHeader: true,
    columns: [{}],
    className: "table-striped table-bordered table-hover",
    columnDefs: columnDefs,

    "trCheck": {
        open: true,
        find: ['button.user-structure', 'button.run-log', 'button.delete', 'button.set-valid', 'button.run'],
        emit: ['user-structure', 'run-log', 'delete', 'set-valid', 'run'],//$emit(str,{}) 的事件名称str
        propsync: true,
    }
};

export default {
    get: (param) => {
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], param).then((data) => {
                serviceData = data;
                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                }
                resolve(rtnData);
            });
        });
    },
    columns: () => {
        return Q.Promise((resolve, reject) => {
            let columnData = [];
            for (let v of serviceData.titleName) {
                let column = {};
                column.title = v.name;
                column.data = v.value;
                columnData.push(column);
            }
            resolve(columnData);
        });
    },
    tableList: () => {
        return Q.Promise((resolve, reject) => {
            resolve(serviceData.titleList);
        });
    },
    options: () => {
        return Q.Promise((resolve, reject) => {
            resolve(dataTableOptions);
        });
    },
    run: (param) => {
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['RUN'], param).then((data) => {
                resolve(data);
            });
        });
    },
    setValid: (param) => {
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['SETVAILD'], param).then((data) => {
                resolve(data);
            });
        });

    }
}
