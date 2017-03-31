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
            PIN: {
                errno: 0,
                msg: "成功",
                data: 'jiumaizheyici'
            },
            GET: {
                errno: 0,
                msg: "成功",
                data: {
                    stat: {
                        name: "状态",
                        value: [
                            {
                                name: "筛选完成",
                                value: 123
                            },
                            {
                                name: "未完成",
                                value: 234
                            }
                        ]
                    },
                    createUser: {
                        name: "创建人",
                        value: "wanganqing"
                    }
                }
            }
        }
    },
    /**
     * 人群列表
     */
    userlist: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                data: {
                    titleName: [
                        {
                            name: "人群ID",
                            value: 'crowdId'
                        }, {
                            name: "创建时间",
                            value: 'dt'
                        }, {
                            name: "人群名称",
                            value: 'crowdName'
                        }, {
                            name: "来源",
                            value: 'crowdSource'
                        }, {
                            name: "创建人",
                            value: 'modelFounder'
                        }, {
                            name: "类型",
                            value: 'dateType'
                        }, {
                            name: "开始执行日期",
                            value: 'startDate'
                        }, {
                            name: "结束执行日期",
                            value: 'endDate'
                        }, {
                            name: "到期日",
                            value: 'dueDate'
                        }, {
                            name: "有效性",
                            value: 'modelValidity'
                        }, {
                            name: "状态",
                            value: 'status'
                        }, {
                            name: "操作",
                            value: 'operate'
                        }],
                    "titleList|50": [
                        {
                            crowdId: '@integer(20, 99)',
                            dt: '2016-08-10 16:00:00',
                            crowdSource: '场景筛选',
                            crowdName: '@pick(["周3433f浮动343464699999933333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333339994633期","周3433f浮动3434的6464稍等6让我认为人我认为任务0000000003d3期","临时433535354646463让我认为人"])',
                            crowFactor: '23232',
                            itemId1: '@integer(20, 99)',
                            brandId: '@integer(20, 99)',
                            modelFounder: 'wangbo8',
                            dateType: '@pick(["周期","临时"])',
                            startDate: "2016-08-18",
                            endDate: "2016-08-18",
                            dueDate: "2016-08-13",
                            modelValidity: '@pick(["有效","无效"])',
                            status: '@pick(["筛选完成","筛选中","未筛选"])'
                        }
                    ]
                }
            },
            RUN: {
                errno: 0,
                msg: "成功",
                "data": true
            },
            SETVALID: {
                errno: 0,
                msg: "成功",
                "data": true
            }
        },
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
                    value: '@integer(20, 99)',
                    text: '242423'
                }, {
                    name: "21~25岁",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "26~30岁",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "31~35岁",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "36~40岁",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "41~45岁",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "46岁以上",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
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
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "1~2年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "2~3年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "3~4年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "4~5年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "5~6年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "6~7年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "7~8年",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "8年以上",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
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
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "女",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
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
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "银牌用户",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "金牌用户",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "钻石用户",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
                }, {
                    name: "其他",
                    value: '@integer(20, 99)',
                    text: '@integer(20, 994554)'
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
                    {
                        name: "华北",
                        value: "26.2343",
                        text: '@integer(20, 994554)'
                    },
                    {
                        name: "华南",
                        value: "23.3443",
                        text: '@integer(20, 994554)'
                    },
                    {
                        name: "东北",
                        value: "22.5034",
                        text: '@integer(20, 994554)'
                    },
                    {
                        name: '华中',
                        value: '10.2343',
                        text: '@integer(20, 994554)'
                    },
                    {
                        name: '华东',
                        value: '8.3443',
                        text: '@integer(20, 994554)'
                    },
                    {
                        name: '西南',
                        value: '5.2334',
                        text: '@integer(20, 994554)'
                    },
                    {
                        name: '西北',
                        value: '4.4534',
                        text: '@integer(20, 994554)'
                    }]
            }
        }
    },

    /**
     * 执行记录
     */
    runlog: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                data: {
                    titleName: [{
                        name: "开始执行时间",
                        value: 'key1'
                    }, {
                        name: "状态",
                        value: 'key2'
                    }, {
                        name: "生成文件名",
                        value: 'key3',
                    }, {
                        name: "推送方式",
                        value: 'key4'
                    }],
                    "titleList|8": [{
                        key1: '2016-08-10 16:00:00',
                        key2: '@pick(["成功","失败"])',
                        key3: '12345_大家电拉新人群_20160913090000.txt',
                        key4: 'JSS',
                    }]
                }
            }
        }
    },
    /**
     * 删除记录
     */
    delete: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                data: true
            }
        }
    },
    /**
     * 用户筛选
     */
    itembrand: {
        API: {
            GET: {
                errno: 0,
                msg: "成功",
                data: {
                    item1: {
                        name: "一级品类",
                        value: [
                            {
                                name: "个护化妆",
                                value: '1316'
                            },
                            {
                                name: "家具用品",
                                value: '2116'
                            },
                            {
                                name: "电子数码",
                                value: '4516'
                            },
                            {
                                name: "电脑办公",
                                value: '7516'
                            }
                        ]
                    },
                    brand: {
                        name: "品牌",
                        value: [
                            {
                                name: "SK II",
                                value: 2367
                            },
                            {
                                name: "自然堂",
                                value: 22367
                            }
                        ]
                    }
                }
            },
            GETVAL: {
                errno: 0,
                msg: "成功",
                data: {name: '维度值', value: 10000}
            },
            POST: {
                errno: 0,
                msg: "成功",
                data: 1
            }
        }
    },
};

export {
    Pubmock as Method,
    mockData as CONF
};
