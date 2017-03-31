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
        API: {
            GET: '/selection/selectCrowdInit'
        }
    },
    'userlist': {
        NAME: '人群列表',
        ICON: 'fa fa-bars',
        API: {
            GET: '/selection/selectCrowdBag',
            /**
             * 执行
             */
            RUN:'/selection/executeCrowd',
            SETVAILD:'/selection/updateCrowd'
        }
    },
    'userage': {
        NAME: '用户年龄',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户年龄段的分布情况',
        API: {
            GET: '/selection/index?module=1'
        }
    },
    'usercartage': {
        NAME: '用户购物年龄',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户在所选品牌的京东第一单距所选月份的年限分布；购物年龄分段为左闭右开',
        API: {
            GET: '/selection/index?module=2'
        }
    },
    'usersex': {
        NAME: '用户性别',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户的性别分布情况',
        API: {
            GET: '/selection/index?module=3'
        }
    },
    'userlevel': {
        NAME: '用户等级分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户京东账号的级别分布情况',
        API: {
            GET: '/selection/index?module=4'
        }
    },
    'userarea': {
        NAME: '用户区域分布',
        ICON: 'fa fa-line-chart',
        TOOLTIP:'在所选择的条件下，用户<b>常用收货地址</b>的分布情况；<br><b>东北</b>：辽宁，吉林，黑龙江<br><b>华北</b>：北京，天津，河北，山西，内蒙古<br><b>华东</b>：山东，江苏，安徽，浙江，福建，上海<br><b>华南</b>：广东，广西，海南<br><b>华中</b>：湖北，湖南，河南，江西<br><b>西北</b>：宁夏，新疆，青海，陕西，甘肃<br><b>西南</b>：四川，云南，贵州，西藏，重庆',
        API: {
            GET: '/selection/index?module=5'
        }
    },
    'runlog': {
        NAME: '执行记录',
        ICON: 'fa fa-bars',
        API: {
            GET: '/selection/userBagLog'
        }
    },
    'delete': {
        NAME: '删除记录',
        ICON: 'fa fa-bars',
        API: {
            GET: '/selection/deleteCrowd'
        }
    },
    'itembrand': {
        NAME: '用户筛选初始化品牌品类',
        ICON: 'fa fa-bars',
        TOOLTIP:'临时/周期：即临时任务或者周期任务；<br>临时任务在提交后即开始筛选人群，筛选完毕后人群即可使用；<br>周期任务在提交后仅仅保存人群逻辑，在触达任务（例如发送短信）选择人群时，如果选择的是周期任务，那么筛选人群任务的起止日期即触达任务的起止日期，在起止日期内每天会生成一个用户包用于触达任务',
        API: {
            GET: '/selection/basicInfo',
            GETVAL:'/selection/userBagCount',
            POST:'/selection/createUserBag'
        }
    }
};

export  default  Object.assign(CONF, Object.assign(MODULECONF, PUBCONF));
