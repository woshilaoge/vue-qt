import Pubmock from '../public/utils/mock';
/**
 * 首页各模块mock数据
 */
let mockData = {

    /**
     * 参数模块
     */
    moduleparams: {
        API: {
            PIN:{
                errno: 0,
                msg: "成功",
                data: 'jiumaizheyici'
            },
            GET:{
                errno: 0,
                msg: "成功",
                data: {
                    item1default: {
                        name: "个护化妆",
                        value: "1316"
                    },
                    item1: {
                        name: "品类",
                        value: {
                            86: {
                                1316: "个护化妆"
                            },
                            1316: {
                                1381: "面部护肤"
                            },
                            1381: {
                                1390: "爽肤水",
                                1391: "乳液面霜",
                                1396: "套装",
                                13546: "精华",
                                13547: "眼霜"
                            }
                        }
                    },
                    brand: {
                        name: "品牌",
                        value: [
                            {
                                name: "SK II",
                                value: 2367
                            }
                        ]
                    },
                    date: {
                        name: "日期",
                        value: [
                            {
                                name: "2017-02",
                                value: "2017-02"
                            },
                            {
                                name: "2017-01",
                                value: "2017-01"
                            },
                            {
                                name: "2016-12",
                                value: "2016-12"
                            },
                            {
                                name: "2016-11",
                                value: "2016-11"
                            },
                            {
                                name: "2016-10",
                                value: "2016-10"
                            },
                            {
                                name: "2016-09",
                                value: "2016-09"
                            },
                            {
                                name: "2016-08",
                                value: "2016-08"
                            },
                            {
                                name: "2016-07",
                                value: "2016-07"
                            },
                            {
                                name: "2016-06",
                                value: "2016-06"
                            },
                            {
                                name: "2016-05",
                                value: "2016-05"
                            },
                            {
                                name: "2016-04",
                                value: "2016-04"
                            },
                            {
                                name: "2016-03",
                                value: "2016-03"
                            }
                        ]
                    }
                }
            }
        }
    },
    /**
     * 用户年龄
     */
    userage: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [{
                    name: "16~20岁",
                    value: '@integer(20, 99)'
                }, {
                    name: "21~25岁",
                    value: '@integer(20, 99)'
                }, {
                    name: "26~30岁",
                    value: '@integer(20, 99)'
                }, {
                    name: "31~35岁",
                    value: '@integer(20, 99)'
                }, {
                    name: "36~40岁",
                    value: '@integer(20, 99)'
                }, {
                    name: "41~45岁",
                    value: '@integer(20, 99)'
                }, {
                    name: "46岁以上",
                    value: '@integer(20, 99)'
                }]
            }
        }
    },
    /**
     * 用户购物年龄
     */
    usercartage: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [{
                    name: "0~1年",
                    value: '@integer(20, 99)'
                }, {
                    name: "1~2年",
                    value: '@integer(20, 99)'
                }, {
                    name: "2~3年",
                    value: '@integer(20, 99)'
                }, {
                    name: "3~4年",
                    value: '@integer(20, 99)'
                }, {
                    name: "4~5年",
                    value: '@integer(20, 99)'
                }, {
                    name: "5~6年",
                    value: '@integer(20, 99)'
                }, {
                    name: "6~7年",
                    value: '@integer(20, 99)'
                }, {
                    name: "7~8年",
                    value: '@integer(20, 99)'
                }, {
                    name: "8年以上",
                    value: '@integer(20, 99)'
                }]
            }
        }
    },
    /**
     * 用户性别
     */
    usersex: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [{
                    name: "男",
                    value: '@integer(20, 99)'
                }, {
                    name: "女",
                    value: '@integer(20, 99)'
                }]
            }
        }
    },
    /**
     * 用户等级分布
     */
    userlevel: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [{
                    name: "铜牌用户",
                    value: '@integer(20, 99)'
                }, {
                    name: "银牌用户",
                    value: '@integer(20, 99)'
                }, {
                    name: "金牌用户",
                    value: '@integer(20, 99)'
                }, {
                    name: "钻石用户",
                    value: '@integer(20, 99)'
                }, {
                    name: "其他",
                    value: '@integer(20, 99)'
                }]
            }
        }
    },

    /**
     * 用户等级分布
     */
    userstructure: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [{
                    name: "站内新用户",
                    value: '@integer(20, 99)'
                }, {
                    name: "站外新用户",
                    value: '@integer(20, 99)'
                }, {
                    name: "老用户",
                    value: '@integer(20, 99)'
                }]
            }
        }
    },
    /**
     * 用户区域分布
     */
    userarea: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "北京", "value": "99" },
                    { "name": "内蒙古", "value": "59" },
                    { "name": "天津", "value": "23" },
                    { name: '山东', value: '0' },
                    { name: '新疆', value: '@integer(20, 99)' },
                    { name: '江苏', value: '@integer(20, 99)' },
                    { name: '浙江', value: '@integer(20, 99)' },
                    { name: '江西', value: '@integer(20, 99)' },
                    { name: '湖北', value: '@integer(20, 99)' },
                    { name: '广西', value: '@integer(20, 99)' },
                    { name: '甘肃', value: '@integer(20, 99)' },
                    { name: '山西', value: '@integer(20, 99)' },
                    { name: '陕西', value: '@integer(20, 99)' },
                    { name: '吉林', value: '@integer(20, 99)' },
                    { name: '福建', value: '@integer(20, 99)' },
                    { name: '贵州', value: '@integer(20, 99)' },
                    { name: '广东', value: '@integer(20, 99)' },
                ]

            },
            GETRATIO: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "华北", "value": "26.2343" },
                    { "name": "华南", "value": "23.3443" },
                    { "name": "东北", "value": "22.5034" },
                    { name: '华中', value: '10.2343' },
                    { name: '华东', value: '8.3443' },
                    { name: '西南', value: '5.2334' },
                    { name: '西北', value: '4.4534' },
                ]
            }
        }
    },
    /**
     * 品类关联
     */
    caterelevance: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "手机", "value": '@integer(20, 9999)' },
                    { "name": "家用电器", "value": '@integer(20, 9999)' },
                    { "name": "个护化妆", "value": '@integer(20, 9999)' },
                    { name: '服饰内衣', value: '@integer(20, 9999)' },
                    { name: '食品', value: '@integer(20, 9999)' },
                    { name: '酒水', value: '@integer(20, 9999)' },
                    { name: '玩具', value: '@integer(20, 9999)' },
                ]
            }
        }
    },
    /**
     * 复购率
     */
    repaterate: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "三个月", "value": '@integer(20, 99)' },
                    { "name": "六个月", "value": '@integer(20, 99)' },
                    { "name": "一年", "value": '@integer(20, 99)' },
                ]

            }
        }
    },
    /**
     * 用户购买力分布
     */
    buypower: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "500", "value": '@integer(20, 99)' },
                    { "name": "1000", "value": '@integer(20, 99)' },
                    { "name": "1500", "value": '@integer(20, 99)' },
                    { "name": "2000", "value": '@integer(20, 99)' },
                    { "name": "2500", "value": '@integer(20, 99)' },
                    { "name": "3000", "value": '@integer(20, 99)' },
                    { "name": "3500", "value": '@integer(20, 99)' },
                    { "name": "4000", "value": '@integer(20, 99)' },
                    { "name": "4500", "value": '@integer(20, 99)' },
                    { "name": "5000", "value": '@integer(20, 99)' },
                    { "name": "5500", "value": '@integer(20, 99)' },
                    { "name": "6000", "value": '@integer(20, 99)' },
                    { "name": "6500", "value": '@integer(20, 99)' },
                    { "name": "7000", "value": '@integer(20, 99)' },
                    { "name": "7500", "value": '@integer(20, 99)' },
                    { "name": "8000", "value": '@integer(20, 99)' },
                    { "name": "8500", "value": '@integer(20, 99)' },
                    { "name": "9000", "value": '@integer(20, 99)' },
                    { "name": "9500", "value": '@integer(20, 99)' },
                    { "name": "10000", "value": '@integer(20, 99)' },
                    { "name": "10000以上", "value": '@integer(20, 99)' },
                ]
            }
        }
    },
    /**
     * 平均购买周期分布
     */
    averageperiod: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "1个月", "value": '@integer(20, 99)' },
                    { "name": "2个月", "value": '@integer(20, 99)' },
                    { "name": "3个月", "value": '@integer(20, 99)' },
                    { "name": "4个月", "value": '@integer(20, 99)' },
                    { "name": "5个月", "value": '@integer(20, 99)' },
                    { "name": "6个月", "value": '@integer(20, 99)' },
                    { "name": "7个月", "value": '@integer(20, 99)' },
                    { "name": "8个月", "value": '@integer(20, 99)' },
                    { "name": "9个月", "value": '@integer(20, 99)' },
                    { "name": "10个月", "value": '@integer(20, 99)' },
                    { "name": "11个月", "value": '@integer(20, 99)' },
                    { "name": "12个月", "value": '@integer(20, 99)' },
                    { "name": "1.5年", "value": '@integer(20, 99)' },
                    { "name": "2年", "value": '@integer(20, 99)' },
                    { "name": "2.5年", "value": '@integer(20, 99)' },
                    { "name": "3年", "value": '@integer(20, 99)' },
                    { "name": "4年", "value": '@integer(20, 99)' },
                    { "name": "5年", "value": '@integer(20, 99)' },
                    { "name": "5年以上", "value": '@integer(20, 99)' },
                ]
            }
        }
    },
    /**
     * 首次回购时长分布
     */
    buyback: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                "data": [
                    { "name": "1个月", "value": '@integer(20, 99)' },
                    { "name": "2个月", "value": '@integer(20, 99)' },
                    { "name": "3个月", "value": '@integer(20, 99)' },
                    { "name": "4个月", "value": '@integer(20, 99)' },
                    { "name": "5个月", "value": '@integer(20, 99)' },
                    { "name": "6个月", "value": '@integer(20, 99)' },
                    { "name": "7个月", "value": '@integer(20, 99)' },
                    { "name": "8个月", "value": '@integer(20, 99)' },
                    { "name": "9个月", "value": '@integer(20, 99)' },
                    { "name": "10个月", "value": '@integer(20, 99)' },
                    { "name": "11个月", "value": '@integer(20, 99)' },
                    { "name": "12个月", "value": '@integer(20, 99)' },
                    { "name": "1.5年", "value": '@integer(20, 99)' },
                    { "name": "2年", "value": '@integer(20, 99)' },
                    { "name": "2.5年", "value": '@integer(20, 99)' },
                    { "name": "3年", "value": '@integer(20, 99)' },
                    { "name": "4年", "value": '@integer(20, 99)' },
                    { "name": "5年", "value": '@integer(20, 99)' },
                    { "name": "5年以上", "value": '@integer(20, 99)' },
                ]
            }
        }
    },
};

export {
    Pubmock as Method,
    mockData as CONF
};
