/**
 * 引入平台配置
 */
let CONF = {};

/* @if MOCK */
import * as mock from './mock';
CONF.mock = mock;
/* @endif */

const PUBCONF = require('../public/conf');
/*====================================以上为公共代码，不需要修改=======================================*/
/**
 * 页面级别 PAGEDEBUG 开关，
 * 当为false时，子模块DEBUG 不再生效
 * @type {boolean}
 */
CONF.PAGEDEBUG = true;
/**
 * 各模块配置，url、icon、name等
 * @type Object
 */
const MODULECONF = {
    'moduleparams': {
        NAME: '页面参数',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'1、<b>数据刷新时间</b>：每月2号更新上个月的数据，最新只能查询上个月的数据；<br>' +
        '2、<b>数据起始时间</b>：2017年1月；<br>' +
        '3、<b>数据范围</b>：本页面中，根据数据的更新范围对用户标签进行了分组，分组的标题代表此分组下指标的数据范围。<br>' +
        '<b>第一分组</b>：用户年龄、用户购物年龄、用户性别、用户等级分布、用户构成、用户区域分布为在所选月份有购买过所选品类下品牌的用户，分组标题为“日期：所选月份”；<br>' +
        '<b>第二分组</b>：品类关联、复购率、用户购买力分布为包括所选月份在内前12个月中用户的购买情况，分组标题为“日期：所选月份减11个月~所选月份”；<br>' +
        '<b>第三分组</b>：平均购买周期分布、首次回购时长分布为用户首次购买至今的情况，分组标题为“日期：首次购买~所选月份',
        API: {
            PIN:'/analysis/makertPin',
            GET: '/analysis/makert'
        }
    },
    'userage': {
        NAME: '用户年龄',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户年龄段的分布情况',
        API: {
            GET: '/analysis/index?module=1'
        }
    },
    'usercartage': {
        NAME: '用户购物年龄',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户在所选品牌的京东第一单距所选月份的年限分布；购物年龄分段为左闭右开',
        API: {
            GET: '/analysis/index?module=2'
        }
    },
    'usersex': {
        NAME: '用户性别',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户的性别分布情况',
        API: {
            GET: '/analysis/index?module=3'
        }
    },
    'userlevel': {
        NAME: '用户等级分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户京东账号的级别分布情况',
        API: {
            GET: '/analysis/index?module=4'
        }
    },
    'userstructure': {
        NAME: '用户构成',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，新老用户的占比情况；<br>' +
        '<b>站内新用户</b>：在统计期内，该品类下品牌的有效订单用户中，用户是历史上第一次购买这个品牌，但这不是用户在京东第一笔有效订单；<br>' +
        '<b>站外新用户</b>：指在统计期内，该品类下品牌的有效订单用户中，用户是历史上第一次购买这个品牌，且这是用户在京东历史上的第一笔有效订单；<br>' +
        '<b>老用户</b>：指在统计期内，该品类下品牌的有效订单用户中，用户不是历史第一次购买该品牌',
        API: {
            GET: '/analysis/constitute'
        }
    },
    'userarea': {
        NAME: '用户区域分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户<b>常用收货地址</b>的分布情况；<br><b>东北</b>：辽宁，吉林，黑龙江<br><b>华北</b>：北京，天津，河北，山西，内蒙古<br><b>华东</b>：山东，江苏，安徽，浙江，福建，上海<br><b>华南</b>：广东，广西，海南<br><b>华中</b>：湖北，湖南，河南，江西<br><b>西北</b>：宁夏，新疆，青海，陕西，甘肃<br><b>西南</b>：四川，云南，贵州，西藏，重庆',
        API: {
            GET: '/analysis/index?module=5',
            GETRATIO: '/analysis/index?module=6'
        }
    },
    'caterelevance': {
        NAME: '品类关联',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'按照一定的关联规则计算出品类之间的关联度，关联度越高表示这两个品类之间的相关性越高，取关联度最高的TOP10品类',
        API: {
            GET: '/analysis/categoryShip',
        }
    },

    'repaterate': {
        NAME: '复购率',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'近3个月，近6个月，近1年，购买过所选品类下品牌两单及两单以上的用户数占总购买人数的百分比',
        API: {
            GET: '/analysis/index?module=7',
        }
    },

    'averageperiod': {
        NAME: '平均购买周期分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户从第二单到最近一单的平均购买时长，累计到每个时长分段上的用户数占比',
        API: {
            GET: '/analysis/index?module=9',
        }
    },

    'buypower': {
        NAME: '用户购买力分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户在前推12个月中累计购买的总有效订单金额分布情况',
        API: {
            GET: '//analysis/index?module=8',
        }
    },

    'buyback': {
        NAME: '首次回购时长分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，首单和第二单之间间隔时长的用户数占比分布',
        API: {
            GET: '/analysis/index?module=10',
        }
    },
};

export  default  Object.assign(CONF, Object.assign(MODULECONF, PUBCONF));
