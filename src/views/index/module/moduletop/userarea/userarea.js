import Q from 'q';

import CONF from '../../../conf';

/* @if MOCK */
// const MockModule = ['userarea']; //需要Mock数据的模块名称
/* @endif */
let Api = CONF.MOCK(true,['userarea']);
/**
 * [图标初始配置]
 */
let echartOpt = {
    tooltip: {
        trigger: 'item',
        formatter: function (data) {
            return data.seriesName + '<br>' + data.name +" : " +(data.value?Number(data.value).toFixed(2)+' %':(data.value == 0?'0 %':'-'));
        }
    },
    visualMap: {
        //type: 'piecewise',
        type: 'continuous',
        min: 0,
        itemSymbol: "rect",
        text: ['高', '低'],
        color: ['#6664EC', '#F1F1FD'],
        realtime: false,
        orient: 'horizontal',
        calculable: false,
        padding: [0, 20],
        splitNumber: 4,
        itemWidth: 14,
        itemHeight: 120,
        max:100,
        formatter:function (data) {
            return data +'%';
        }
    },
    toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {
                readOnly: false
            },
            restore: {},
            saveAsImage: {}
        }
    },
    series: [{
        name: "",
        type: 'map',
        left: '20%',
        mapType: 'china',
        roam: false,
        itemStyle:{
            normal: {
                borderWidth:1,
                borderColor:'#F9F9FE'
            },
            emphasis:{
                areaColor:'#86C899'
            }
        },
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        data: []
    }]
};


export default {
    get: (params = {}) => {
        const M = CONF['userarea'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GET'], params).then((data) => {

                let max = 1;

                for(let obj of data){
                    if(obj.value > max){
                        max = obj.value;
                    }
                }

                //定义图表需要的数据格式
                echartOpt.series[0].data = data;
                echartOpt.series[0].name = M['NAME'];
                echartOpt.visualMap.max = max;


                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleToolTip:M['TOOLTIP'],
                    moduleData: echartOpt
                }

                resolve(rtnData);
            });
        });
    },
    getRatio: (params = {}) => {
        const M = CONF['userarea'];
        return Q.Promise((resolve, reject) => {
            Api.get(M['API']['GETRATIO'], params).then((data) => {

                //数据格式化
               for(let o of data){
                   o.value = Number(o.value).toFixed(2)+'%';
               }
                let rtnData = {
                    moduleName: M['NAME'],
                    moduleIcon: M['ICON'],
                    moduleData: data
                }
                resolve(rtnData);
            });
        });
    }
}
