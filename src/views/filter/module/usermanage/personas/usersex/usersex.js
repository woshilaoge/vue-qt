import Q from 'q';

import CONF from '../../../../conf';
import  {PIE} from '../../../../../public/utils/echarts-colors';
let Api = CONF.MOCK(true,['usersex']);

/**
 * [图标初始配置]
 */
let echartOpt = {
    color:PIE,
    title: {
        text: "",
    },
    tooltip: {
        trigger: 'item',
        // formatter: function (data) {
        //     return data.seriesName + '<br>' + data.name ;
        // }
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        itemWidth:12,
        itemHeight:12,
        data: []
    },
    series: [{
        type: 'pie',
        selectedMode: 'single',
        center: ['72%', '45%'],
        radius: ['45%', '60%'],
        label: {
            normal: {
                show:false
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: []
    }]
};

export default {
    get: (params = {}) => {
        const M = CONF['usersex'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], params).then((data) => {
                /**
                 * 为了 在 legend 上显示数据信息 ，在此进行数据格式化
                 */
                for(let obj of data){
                    obj.name = obj.name + ' ( '+Number(obj.value).toFixed(2)+'% )';
                    obj.value = obj.text;
                    echartOpt.legend.data.push(obj.name);
                }
                echartOpt.series[0].data = data;
                echartOpt.series[0].name = M['NAME'];

                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleToolTip:M['TOOLTIP'],
                    moduleData: echartOpt
                }
                resolve(rtnData);
            });
        });
    }
}
