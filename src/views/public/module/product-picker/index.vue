<template>
    <div class="form-group">
        <div style="position: relative;">
            <input class="form-control picker-input" readonly type="text">
        </div>
    </div>
</template>
<script>
    import $ from "jquery";

    // const produData = {
    //     86: {
    //         110000: '电脑、办公'
    //     },
    //     110000: {
    //         110100: '办公设备',
    //         110101: '文具耗材'
    //     },
    //     110100: {
    //         110102: '扫描仪',
    //         110103: '打印机'
    //     },
    //     110101: {
    //         1101011: '计算器',
    //         1101012: '笔类',
    //         1101013: '文件管理',
    //         1101014: '纸类'
    //     }
    // };

    export default {
        props: {
            data: {
                type: Object
            },
            productPickerDefault:{
                type: String
            }
        },
        data() {
            return {
                _tempCategoryId:''
//                produData: {
//                    86: {
//                        110000: '电脑、办公'
//                    },
//                    110000: {
//                        110100: '办公设备',
//                        110101: '文具耗材'
//                    },
//                    110100: {
//                        110102: '扫描仪',
//                        110103: '打印机'
//                    },
//                    110101: {
//                        1101011: '计算器',
//                        1101012: '笔类',
//                        1101013: '文件管理',
//                        1101014: '纸类'
//                    }
//                }
            }
        },
        created() {
//            let _vm = this;
//
//            //初始选中的数据
//            _vm.$emit("productPicker", {
//                first: {
//                    id: "",
//                    name: ""
//                },
//                second: {
//                    id: "",
//                    name: ""
//                },
//                third: {
//                    id: "",
//                    name: ""
//                }
//            });
        },
        mounted() {
        },
        watch: {
            data: {
                handler: function (val, oldVal) {
                    this.init();
                },
                deep: true
            }
        },
        methods: {
            init(){
                let _vm = this;

                let $productPicker = $(_vm.$el).find(".picker-input");

                $productPicker.productpicker({
                    "simple": true,
                    "responsive": true,
                    "placeholder": "请选择品类",
                    "ChineseDistricts": _vm.data,
                    province: _vm.productPickerDefault,
//                    city: '',
//                    district: ''
                });

                _vm.emit($productPicker);

                $(document).on('click', '#js-productpicker-reset', function () {
                    $productPicker.data('productpicker').reset();

                    //重置插件选中的数据
                    _vm.$emit("productPicker", {
                        first: {
                            id: "",
                            name: ""
                        },
                        second: {
                            id: "",
                            name: ""
                        },
                        third: {
                            id: "",
                            name: ""
                        }
                    });

                }).on('click', '#js-productpicker-ok', function (event) {

                    _vm.emit($productPicker);

                    $productPicker.data('productpicker').close();

                }).on('click','dl>dd>a',function (event) {
                    if(_vm._tempCategoryId !== $productPicker.data('productpicker').getCode()){
                        _vm.emit($productPicker);
                    }
                });
            },
            emit($productPicker){

                let categoryName = $productPicker.data('productpicker').getVal().split('/');

                this._tempCategoryId = $productPicker.data('productpicker').getCode();

                let categoryId = this._tempCategoryId.split('/');

                this.$emit("productPicker", {
                    first: {
                        id: categoryId[0] || "",
                        name: categoryName[0] || ""
                    },
                    second: {
                        id: categoryId[1] || "",
                        name: categoryName[1] || ""
                    },
                    third: {
                        id: categoryId[2] || "",
                        name: categoryName[2] || ""
                    }
                });
            }
        }
    }
</script>
