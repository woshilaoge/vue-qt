<template>
    <div>
        <table class="table nowrap" cellspacing="0" width="100%" :class="tableContent"></table>
    </div>
</template>
<script>
//
// Pipelining function for DataTables. To be used to the `ajax` option of DataTables
//
$.fn.dataTable.pipeline = function(opts) {
    // Configuration options
    var conf = $.extend({
        pages: 5, // number of pages to cache
        url: '', // script url
        data: null, // function or object with parameters to send to the server
        // matching how `ajax.data` works in DataTables
        method: 'GET' // Ajax HTTP method
    }, opts);

    // Private variables for storing the cache
    var cacheLower = -1;
    var cacheUpper = null;
    var cacheLastRequest = null;
    var cacheLastJson = null;

    return function(request, drawCallback, settings) {
        var ajax = false;
        var requestStart = request.start;
        var drawStart = request.start;
        var requestLength = request.length;
        var requestEnd = requestStart + requestLength;

        if (settings.clearCache) {
            // API requested that the cache be cleared
            ajax = true;
            settings.clearCache = false;
        } else if (cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper) {
            // outside cached data - need to make a request
            ajax = true;
        } else if (JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) ||
            JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) ||
            JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)
        ) {
            // properties changed (ordering, columns, searching)
            ajax = true;
        }

        // Store the request for checking next time around
        cacheLastRequest = $.extend(true, {}, request);

        if (ajax) {
            // Need data from the server
            if (requestStart < cacheLower) {
                requestStart = requestStart - (requestLength * (conf.pages - 1));

                if (requestStart < 0) {
                    requestStart = 0;
                }
            }

            cacheLower = requestStart;
            cacheUpper = requestStart + (requestLength * conf.pages);

            request.start = requestStart;
            request.length = requestLength * conf.pages;

            // Provide the same `data` options as DataTables.
            if ($.isFunction(conf.data)) {
                // As a function it is executed with the data object as an arg
                // for manipulation. If an object is returned, it is used as the
                // data object to submit
                var d = conf.data(request);
                if (d) {
                    $.extend(request, d);
                }
            } else if ($.isPlainObject(conf.data)) {
                // As an object, the data given extends the default
                $.extend(request, conf.data);
            }

            settings.jqXHR = $.ajax({
                "type": conf.method,
                "url": conf.url,
                "data": request,
                "dataType": "json",
                "cache": false,
                "success": function(json) {
                    cacheLastJson = $.extend(true, {}, json);

                    if (cacheLower != drawStart) {
                        json.data.splice(0, drawStart - cacheLower);
                    }
                    if (requestLength >= -1) {
                        json.data.splice(requestLength, json.data.length);
                    }

                    drawCallback(json);
                }
            });
        } else {
            json = $.extend(true, {}, cacheLastJson);
            json.draw = request.draw; // Update the echo for each response
            json.data.splice(0, requestStart - cacheLower);
            json.data.splice(requestLength, json.data.length);

            drawCallback(json);
        }
    }
};

// Register an API method that will empty the pipelined data, forcing an Ajax
// fetch on the next draw (i.e. `table.clearPipeline().draw()`)
$.fn.dataTable.Api.register('clearPipeline()', function() {
    return this.iterator('table', function(settings) {
        settings.clearCache = true;
    });
});

let el = "table";
export default {
    name: 'dataTable',
    props: {
        options: {
            type: Object,
            default () {
                return {};
            },
            require: true
        }
    },
    data() {
        return {
            hello: 'Welcome  To Use DataTables !',
            tableSelected: [],
            optionsCopy: {}
        }
    },
    //计算属性
    computed: {
        //子组件用到父组件的数组对象，此时，子组件改变此对象，父组件也会响应改变,这里复制富组件传递的值以备用
        // let copyOptions = $.extend(true, {}, this.options);
        copyOptions(){
            return $.extend(true, {}, this.options);
        },
        //给当前表格添加自定义样式名称 因为表格默认id都为相同，故此class 也可用作区分表格
        tableContent(){
            return this.options?(this.options.className ? this.options.className : 'table-content'):'table-content';
        }
    },
    //监控数值或对象的变化
    watch: {
        // 如果 tableData 发生改变，这个函数就会运行 ,deep 表示深度监控tableData对象
        'options': {
            handler(newValue) {
                if(newValue){
                    this.renderTable();
                }
            },
            deep: true
        },
        'tableSelected': {
            handler(newValue) {
                console.log(newValue);
            },
            deep: true
        },
    },
    //el 被新创建的 vm.$el 替换
    mounted() {
//        this.renderTable();
        //定义一个自定义监听事件， emit 当前表格选择的行信息
        this.$on('get-selected', function (data, parent) {
            this.getSelected(data, parent);
        });
        this.$on('set-selected', function (data, parent, isALl) {
            this.setSelected(data, parent, isALl);
        });
        this.$on('init-table', function (data) {
            this.initTable(data);
        })
    },
    //实例访问 methods 里的方法
    methods: {
        renderTable(handler) {
            // const el = '#default';
            let _self = this;
            //dataTbales 默认配置
            let dtOptions = {
                /**
                 * 是否开启loading ,当前端分页时，在等待接口请求的时间可以选择开启
                 **/
                "loading": false,
                "trCheck": {
                    open: false,
                    find: ['tbody input'],
                    name: 'trCheckBox',
                    selectedClass: 'tr-focus',
                    /**
                     * 当开启 propsync 后，在表格内的每一次选择（checkbox/radio）都会$emit 到父组件内
                     */
                    emit: ['table-selected'],//$emit(str,{}) 的事件名称str
                    propsync: false,
                    bindClass: 'td input',

                    selector: "",
                    method: "",
                    input:true
                },
                clickDisabled:"click-disabled",
                initTable: true, //配合serviceSide 使用 当servicSide 为true 时 才生效
                handlerInit: handler || false,
                //是否开启请求时，请求loading... 在请求数据时会自动显示和隐藏
                "processing": true,
                //是否开启后端分页模式 引当入dataTables.bootstrap.x.js时 ，默认为开启状态，如果不需要后端分页，此处应配置为false
                "serverSide": false,
                // "searching": true,
                //排序
                "ordering": true,
                //默认每页显示的记录数
                "iDisplayLength": 10,
                //自定义页大小
                "lengthMenu": [
                    [10, 25, 50],
                    [10, 25, 50]
                ],
                /**
                 * 自己封装的 $.fn.dataTable.pipeline方法
                 * @pages:设置请求的页数,比如设置页面默认显示10条，pages 为10 ，每次请求100条数据
                 * @url:请求数据的接口
                 * @data: 请求接口带上的数据
                 * @dataType: 请求的形式
                 * @method: get or post 当dataType=jsonp 时 强制为get
                 *
                 * eg:
                 * "ajax": $.fn.dataTable.pipeline({
                     *      "pages": "20",
                     *      "url": "//flow-data.jd.com/backend/getModelData.json?",
                     *      "data": {},
                     *      "dataType": "jsonp"
                     *  }),
                 **/
                /**
                 * title 渲染为thead 的 td 显示
                 * data 为当前列在返回数据中对应的属性
                 * 列：返回数据（一行）[{id:1,name:"test"}] ,表示当前列取值为数组对象里的name 对应的值
                 * "aoColumns": [],
                 *
                 * "aaSorting": [
                 *  [1, "desc"]
                 * ],
                 *
                 * 设置第2个元素为默认排序
                 * "columnDefs": [{
                     *     "orderable": false, // 禁用排序
                     *     "targets": [0, 2]
                     * }],
                 **/
                "oLanguage": {
                    "sEmptyTable": "没有找到符合条件的数据",
                    "sInfoEmpty": "没有找到符合条件的数据",
                },
                //在创建新对象的时候，销毁已存在的
                "destroy": true
            };
            //合并前端传过来的配置
            $.extend(true, dtOptions, this.copyOptions,this.optionsCopy);
            //判断是否添加后端分页
            if (dtOptions.serverSide) {
                dtOptions.ajax = $.fn.dataTable.pipeline(this.copyOptions.pipeline);
            } else {
                //如果表格对象已经创建，则不必须重复创建dataTable对象
                if ($(".dataTables_processing", this.$el).length && dtOptions.loading) {
                    $(".dataTables_processing", this.$el).show();
                    return;
                }
            }
            //创建dataTable对象
            $(this.$el).html('<table  class="table table-striped table-bordered nowrap" cellspacing="0" width="100%"></table>');

            if (!dtOptions.serverSide || dtOptions.initTable || dtOptions.handlerInit) {
                $(el, this.$el).DataTable(dtOptions);
            } else {
                dtOptions.serverSide = false;
                dtOptions.ajax = '';
                dtOptions.data = [];
                this.optionsCopy = this.copyOptions;
                $(el, this.$el).DataTable(dtOptions);
                return;
            }

            //创建表格后是否开启 loding...
            if (dtOptions.loading === true) {
                $(".dataTables_processing", this.$el).show();
            }
            ;

            /**
             * 创建表格后是否 配置对列有全选操作 trCheckbox
             *
             * 首先 aoColumns  属性 配置
             *  title: <input type='checkbox' name='trCheckBox' data-select='input[name=**]' />
             *  name对应的dom 绑定 click 事件 data-select 存放自定义checkbox
             */
            if (dtOptions.trCheck.open === true) {
                $(this.$el).off("click","thead input[name='" + dtOptions.trCheck.name + "']");
                $(this.$el).on('click', "thead input[name='" + dtOptions.trCheck.name + "']", function () {
                    for (let k = 0; k < dtOptions.trCheck.find.length; k++) {
                        _self.setSelected(dtOptions.trCheck.find[k], null, $(this).prop('checked'), dtOptions.trCheck.selectedClass);
                        if (dtOptions.trCheck.propsync === true) {
                            _self.getSelected(dtOptions.trCheck.find[k] + ":checked");
                        }
                    }
                });
            }
            ;
            /**
             * 当开启 propsync 后，在表格内的每一次选择（checkbox/radio）都会$emit 到富组件内
             *
             * 当在表格内 选中或者取消某一行时，需要实时同步当前选择的数据结果到父组件，这时需要设置为true。
             */
            if (dtOptions.trCheck.propsync === true) {
                for (let k = 0; k < dtOptions.trCheck.find.length; k++) {
                    $(this.$el).off("click",dtOptions.trCheck.find[k]);
                    $(this.$el).on('click', dtOptions.trCheck.find[k], function () {
                        if (dtOptions.trCheck.emit[k] !== 'table-selected') {
                            _self.$emit(dtOptions.trCheck.emit[k], $(this).data('json'));
                        } else {
                            _self.getSelected(dtOptions.trCheck.find[k] + ":checked");
                        }
                    })
                }
            }
            ;
            /**
             * 和method 配合使用，执行自定义函数
             */

            if (dtOptions.trCheck.selector) {
                $(this.$el).off("click",dtOptions.trCheck.selector);
                $(this.$el).on('click', dtOptions.trCheck.selector, function () {
                    try {
                        dtOptions.trCheck.method($(this),$);
                    } catch (e) {
                        console.error('trCheck.method 不是Function!');
                    }
                })
            }
            if(dtOptions.trCheck.input){
                //表格内的选择组件绑定改变当前行的事件
                $(this.$el).off("click",dtOptions.trCheck.bindClass);
                $(this.$el).on('click', dtOptions.trCheck.bindClass, function () {
                    $(this).closest('tbody').find('tr').each(function () {
                        if ($(dtOptions.trCheck.bindClass, this).prop('checked')) {
                            $(this).addClass(dtOptions.trCheck.selectedClass);
                        } else {
                            $(this).removeClass(dtOptions.trCheck.selectedClass);
                        }
                    })
                });
            }
            if(dtOptions.clickDisabled){
                //表格内的选择组件绑定改变当前行的事件
                $(this.$el).off("click",dtOptions.clickDisabled);
                $(this.$el).on('click', dtOptions.clickDisabled, function () {
                    $(this).addClass('disabled');
                });
            }
        },
        getSelected(filter, parent){
            //根据配置找到的结果
            let finded = [];
            $(el, this.$el).find(filter).each(function (idx, jq) {
                finded.push($(jq).data('json') ? $(jq).data('json') : jq);
            });
            if (parent) {
                parent.$emit('table-selected', finded);
            } else {
                this.$emit('table-selected', finded);
            }
        },
        setSelected(filter, parent, isAll, selectedClass){
            $(el, this.$el).find(filter).prop('checked', isAll);
            $(el, this.$el).find('tbody tr').each(function () {
                if ($(this).find(filter).prop('checked')) {
                    $(this).addClass(selectedClass);
                } else {
                    $(this).removeClass(selectedClass);
                }
            })
        },
        initTable(param){
            param = param || {};
            $.extend(this.optionsCopy.pipeline.data, param);
            this.renderTable(true);
        }
    }
}
</script>
