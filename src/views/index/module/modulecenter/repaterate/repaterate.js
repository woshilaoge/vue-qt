import Q from 'q';

import CONF from '../../../conf';

import  {BAR} from '../../../../public/utils/echarts-colors';

/* @if MOCK */
// const MockModule = ['repaterate']; //需要Mock数据的模块名称
/* @endif */
let Api = CONF.MOCK(true, ['repaterate']);

/**
 * [图标初始配置]
 */
let echartOpt = {
    color: BAR,
    legend: {
        show: false,
        textStyle: {
            fontSize: "14"
        },
        selectedMode: "multiple", //single/multiple
        data: []
    },
    tooltip: {
        trigger: 'item',
        formatter: function (data) {
            return data.seriesName + '<br>' + data.name + ' : ' + Number(data.value).toFixed(2) + '%'
        }
    },
    grid: {
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisTick: {
            show: false,
        },
        axisLabel: {
            textStyle: {
                color: '#969696'
            }
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#E7E7E7'
            }
        },
        data: []
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: '#E7E7E7'
            }
        },
        axisLabel: {
            formatter: "{value} %",
            textStyle: {
                color: '#969696'
            }
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#E7E7E7'
            }
        },
    }],
    series: [{
        type: 'bar',
        barCategoryGap: '60%',
        data: []
    }]
};
export default {
    get: (params = {}) => {
        const M = CONF['repaterate'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], params).then((data) => {

                echartOpt.xAxis[0].data = data.map(function (obj) {
                    return obj.name
                });
                echartOpt.series[0].data = data;
                echartOpt.series[0].name = M['NAME'];

                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleToolTip: M['TOOLTIP'],
                    moduleData: echartOpt
                }

                resolve(rtnData);
            });
        });
    }
}
