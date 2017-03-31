<template>
    <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12" :class="[{waring:!cateSelect}]">
            <!-- 产品分类控件 -->
            <v-product-picker v-on:productPicker='getCategory' :data="productPicker"
                              :productPickerDefault="productPickerDefault"></v-product-picker>
        </div>
        <div class="col-md-9 col-sm-6 col-xs-12">
            <!-- 品牌控件 -->
            <v-market-type-picker v-on:marketPicker='getMarketType' :data="marketPicker"></v-market-type-picker>
            <!-- 日期控件 -->
            <v-market-type-picker v-on:marketPicker='getDatePicker' :data="datePicker"></v-market-type-picker>
            <div class="btn-group form-group">
                <button class="btn btn-default search" @click='search' :disabled="!cateSelect">查询</button>
            </div>
            <div class="btn-group form-group pageTips">
                 <span v-if="moduleToolTip">
                    <v-tooltip :content="moduleToolTip"><i class="fa fa-question-circle-o"></i></v-tooltip>
                 </span>
            </div>
        </div>
    </div>
</template>
<script>
    import vMarketTypePicker from 'public/module/market-picker/index.vue';
    import vProductPicker from 'public/module/product-picker/index.vue';
    import vDateRangePicker from 'public/module/date-picker/index.vue';
    import vTooltip from './../../../public/components/tooltip.vue';

    import Service from './moduleparams';

    let AllParams = {}; //页面公共参数
    /**
     * 处理页面公共参数
     * @param {[type]} vm   [vue实例]
     * @param {[type]} key  [参数键名]
     * @param {[type]} data [参数值]
     */
    function setParams(vm, key, data) {
        AllParams[key] = data;
        if (AllParams.productPicker && AllParams.datePicker && AllParams.marketPicker) {
            vm.searchParams = Object.assign({}, AllParams.productPicker, AllParams.datePicker, AllParams.marketPicker);
            if (!vm.initOk) {
                vm.search();
            }
        }
    }

    export default {
        components: {
            vProductPicker,
            vDateRangePicker,
            vMarketTypePicker,
            vTooltip
        },
        data() {
            return {
                initOk: false,
                datePicker: null,
                productPicker: null,
                marketPicker: null,
                searchParams: {},
                cateSelect:true
            }
        },
        created() {
            this.getServiceData();
        },
        methods: {
            getCategory: function (data) {

                let tp = function (data) {
                    if (data.third.id) {
                        return 3;
                    } else if (data.second.id) {
                        return 2;
                    } else if (data.first.id) {
                        return 1;
                    }else{
                        return false;
                    }
                };
                if(tp(data)){
                    setParams(this, "productPicker", {
                        itemId1: data.first.id,
                        itemId2: data.second.id,
                        itemId3: data.third.id,
                        tp: tp(data)
                    });
                    this.cateSelect = true ;
                }else{
                    this.cateSelect = false ;
                }
            },

            getDatePicker: function (data) {
                setParams(this, "datePicker", {
                    serachDate: data.value
                });
            },

            getMarketType: function (data) {
                setParams(this, "marketPicker", {
                    brandId: data.value
                });
            },
            search() {
                this.initOk = true;
                this.$emit('params', this.searchParams);
            },
            getServiceData() {
                Service.get({}).then((data) => {
                    this.datePicker = data.moduleData.date.value;
                    this.productPicker = data.moduleData.item1.value;
                    this.productPickerDefault = data.moduleData.item1default.name;
//                this.productPickerDefault = '个护化妆';
                    this.marketPicker = data.moduleData.brand.value;
                    this.moduleToolTip = data.moduleToolTip;
                })
            }
        }
    }
</script>
