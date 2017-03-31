import Q from 'q';

import CONF from '../../../conf';

import  {BAR} from '../../../../public/utils/echarts-colors';

/* @if MOCK */
// const MockModule = ['caterelevance']; //需要Mock数据的模块名称
/* @endif */
let Api = CONF.MOCK(true, ['caterelevance']);
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
            return data.seriesName + '<br>' + data.name + ' : ' + Number(data.value).toFixed(2) ;
        }
    },
    grid: {
        containLabel: true
    },
    xAxis: [{
        name:'关联度',
        nameTextStyle:{
          color:'#969696'
        },
        type: 'value',
        axisLabel: {
            formatter: "{value}",
            textStyle:{
                color:'#969696'
            }
        },
        axisTick:{
            show:false,
        },
        splitLine:{
            show:true,
            lineStyle:{
                color:'#E7E7E7'
            }
        },
        axisLine:{
            show:false,
            lineStyle:{
                color:'#E7E7E7'
            }
        }
    }],
    yAxis: [{
        axisLabel: {
            textStyle:{
                color:'#969696'
            }
        },
        axisTick:{
            show:false,
        },
        axisLine:{
            show:true,
            lineStyle:{
                color:'#E7E7E7'
            }
        },
        type: 'category',
        boundaryGap: true,
        data: []
    }],
    series: [{
        type: 'bar',
        // barWidth:"25",
        barCategoryGap:'40%',
        data: []
    }]
};

export default {
    get: (params = {}) => {
        const M = CONF['caterelevance'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], params).then((data) => {

                echartOpt.yAxis[0].data = data.map(function (obj) {
                    return obj.name
                });
                echartOpt.series[0].data = data;
                echartOpt.series[0].name = '关联度';

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
