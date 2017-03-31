<template>
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <!--人群名称-->
            <div class="btn-group form-group">
                <input class="form-control" placeholder="请输入人群名称" v-model="userId">
            </div>
            <!-- 创建人控件 -->
            <v-market-type-picker v-on:marketPicker='getUserPicker' :data="userPicker"></v-market-type-picker>
            <!-- 状态控件 -->
            <v-market-type-picker v-on:marketPicker='getStatType' :data="statPicker"></v-market-type-picker>
            <div class="btn-group form-group">
                <button class="btn btn-default search" @click='search'>查询</button>
            </div>
            <div style="float: right" class="btn-group form-group">
                <button class="btn btn-default create" @click='createUser'>新建人群</button>
            </div>
        </div>
    </div>
</template>
<script>
    import vMarketTypePicker from '../../../../public/module/market-picker/index.vue';

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
        if (AllParams.userPicker && AllParams.statPicker) {
            vm.searchParams = Object.assign({}, AllParams.userPicker, AllParams.statPicker);
            if (!vm.initOk) {
                vm.search();
            }
        }
    }

    export default {
        components: {
            vMarketTypePicker
        },
        data() {
            return {
                userId: '',
                initOk: false,
                userPicker: null,
                statPicker: null,
                searchParams: {}
            }
        },
        created() {
            this.getServiceData();
        },
        methods: {
            getStatType(data) {
                setParams(this, "statPicker", {
                    status: data.value
                });
            },
            getUserPicker(data) {
                setParams(this, "userPicker", {
                    modelFounder: data.value
                });
            },
            search() {
                this.initOk = true;
                //likeType 为1 为模糊查询 ，其它非模糊查询
                this.searchParams.likeType = '1';
                this.searchParams.crowdName = (this.userId).trim();
                this.$emit('params', this.searchParams);
            },
            getServiceData() {
                Service.get({}).then((data) => {
                    this.statPicker = data.moduleData.stat.value;
                    this.userPicker = [data.moduleData.createUser];
                })
            },
            createUser(){
                this.$emit('new');
                console.log('------新建人群------')
            }
        }
    }
</script>
