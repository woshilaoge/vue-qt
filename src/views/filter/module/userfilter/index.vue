<template>
    <div class="filter-div">
        <!--路径导航-->
        <ol class="breadcrumb">
            <li><a href="javascript:;" @click="toUserList">人群列表</a> ></li>
            <li>新建人群</li>
        </ol>
        <!--tab结构，以后可扩充其它筛选-->
        <div class="tabs">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="#">场景筛选</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade active in">
                    <div class="row border box-shadow">
                        <div class="col-md-12 col-sm-12 col-xs-12" style="position: relative;padding: 0px;">
                            <div class="row step-row">
                                <div class="">
                                    <div class=" step-left">
                                        <div class="step"><span>1</span>填写基本信息</div>
                                    </div>
                                    <div class=" step-right">
                                        <div class="row">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div class="btn-group form-group">
                                                    人群名称：
                                                </div>
                                                <div class="btn-group form-group">
                                                    <input class="form-control" :class="[{'warning':!userName.trim()}]"
                                                           placeholder="请输入人群名称" v-model="userName">
                                                </div>
                                                <div class="btn-group form-group">
                                                    <v-radio-group :dataList="radioGroup"
                                                                   @update="updateRadio"></v-radio-group>
                                                </div>
                                                <div class="btn-group form-group filterTips">
                                                    <span v-if="moduleToolTip">
                                                        <v-tooltip :content="moduleToolTip"><i class="fa fa-question-circle-o"></i></v-tooltip>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row brand-cate">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <p>一级品类：</p>
                                                <v-checkbox-group :dataList="checkBoxGroupCate"
                                                                  @update="updateCheckBoxCate"></v-checkbox-group>
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12 brand">
                                                <p>品牌：</p>
                                                <v-radio-group :dataList="radioGroupBrand"
                                                               @update="updateRadioBrand"></v-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row step-row " style="background-color: #F0F0F0;">
                                <div class="bread">
                                    <div class="step-left">
                                        <div class="step"><span>2</span>选择人群包</div>
                                    </div>
                                    <div class="step-right border-top">
                                        <div class="row package">
                                            <div class="col-md-6 col-sm-6 col-xs-12">
                                                <div class="user-package">
                                                    品牌维度
                                                    <br><br>
                                                    品牌潜在用户 <i>（有潜在行为但从来没购买过本品牌）</i>
                                                    {{slider.value}}（位）
                                                </div>
                                                <vue-slider
                                                    ref="slider"
                                                    v-bind="slider"
                                                    v-model="slider.value"
                                                    @callback="sliderEnd">
                                                </vue-slider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 btn-cnt">
                            <button type="button" class="btn btn-primary btn-sub" @click="submit">提交</button>
                            <button type="button" class="btn " @click="toUserList">取消</button>
                        </div>
                    </div>
                    <!--提交成功的跳转提示-->
                    <v-modal :value="showModal"
                             effect="fade" custom="success-modal">
                        <div slot="modal-body" class="modal-body">
                            <h4>恭喜您，人群筛选任务提交完成！</h4>
                            <h4>您可以到 <a href="#" @click="toUserListByModal">用户包-人群列表</a> 查看任务进度!</h4>
                            <h5>{{setTime}}秒后自动跳转到用户包列表页面</h5>
                        </div>
                        <div slot="modal-footer" class="modal-footer">
                            <div class="btn-cnt">
                                <button type="button" class="btn btn-primary btn-sub" @click="toUserListByModal">确定</button>
                            </div>
                        </div>
                    </v-modal>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .row {
        margin: 10px 0px;
    }

    .border-top {
        border-top: 1px solid #eeeeee;
    }

    .border {
        border: 1px solid #eeeeee;
    }

    .box-shadow {
        box-shadow: 1px 2px 15px #EBEBEB;
    }

    .vue-slider-tooltip.vue-slider-tooltip-top:before {
        border-style: solid;
    }
</style>
<script>
    import Service from './userfilter';
    import vueSlider from '../../../public/components/vue2-slider.vue';
    import vTooltip from './../../../public/components/tooltip.vue';
    import vModal from '../../../public/module/modal/Modal.vue';
    import vCheckbox from '../../../public/module/checkBox/Checkbox.vue';
    import vCheckboxGroup from '../../../public/module/checkBox/CheckboxGroup.vue';
    import vRadio from '../../../public/module/radio/Radio.vue';
    import vRadioGroup from '../../../public/module/radio/RadioGroup.vue';
    export default {
        components: {
            vueSlider,
            vCheckbox,
            vCheckboxGroup,
            vRadio,
            vRadioGroup,
            vModal,
            vTooltip
        },
        props: {
            reset: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                setTime: 5,
                showModal: false,
                userPackCheckBox: true,
                disabled: false,
                slider: {
                    width: '100%',
                    height: 2,
                    value: 0,
                    dotSize: 20,
                    min: 0,
                    max: 0,
                    interval: 100,
                    disabled: false,
                    show: true,
                    speed: 0.3,
                    reverse: false,
                    lazy: true,
                    tooltip: 'always',
                    tooltipDir: 'bottom'
                    //piecewise: false
                },
                checkBoxGroupCate: [],
                radioGroupBrand: [],
                /**
                 * 后端约定此 字典字段
                 */
                radioGroup: [
                    {
                        name: "临时",
                        id: "临时",
//                        id: "1",
                        checked: true
                    }, {
                        name: "周期",
                        id: "周期",
//                        id: "0",
                        checked: false
                    }],
                userName: '',
                warningMsg: false
            }
        },
        watch: {
            reset(){
                this.getItemBrand();
            },
            paramsVal(val){
                /**
                 * 先重置为 0 ，然后发送请求获得新值
                 */
                this.setIndex();
                if (val) {
                    this.getItemBrandVal(val);
                }
            }
        },
        computed: {
            radioChecked(){
                return this.radioCheckFun(this.radioGroup);
            },
            checkBoxCheckedCate(){
                return this.checkBoxCheckFun(this.checkBoxGroupCate);
            },
            radioCheckedBrand(){
                return  this.radioCheckFun(this.radioGroupBrand);
            },
            paramsVal(){
                let temp = null;
                if (this.checkBoxCheckedCate.length && this.radioCheckedBrand) {
                    temp = {
                        itemId1: this.checkBoxCheckedCate.join(','),
                        brandId: this.radioCheckedBrand
                    }
                }
                return temp;
            },
            //页面提交参数
            params(){
                return {
                    crowdSource: '0',//场景筛选 暂时写死
                    crowdName: this.userName,
                    dateType: this.radioChecked,
                    itemId1: this.checkBoxCheckedCate.join(','),
                    brandId: this.radioCheckedBrand,
                    crowFactor: this.slider.value
                }
            },
            warning(){
                return (!this.userName.trim())&&(this.params.crowFactor)&&(this.params.brandId)&&(this.params.itemId1);
            }
        },
        methods: {
            radioCheckFun(val){
                for (let item of val) {
                    if (item.checked) {
                        return item.id
                    }
                }
                return null;
            },
            checkBoxCheckFun(val){
                let list = [];
                for (let item of val) {
                    if (item.checked) {
                        list.push(item.id);
                    }
                }
                return list;
            },
            submit(){
                console.log(`提交参数-${JSON.stringify(this.params)}`)
                if (!this.warning) {
                    Service.post(this.params).then((data) => {
                        this.showModal = true;
                        this.showSetTime();
                    });
                }
            },
            sliderEnd(val){
                this.slider.value = val;
            },
            updateRadioBrand(val){
                for (let item of this.radioGroupBrand) {
                    if (val.id === item.id) {
                        item.checked = val.checked;
                    } else {
                        item.checked = false;
                    }
                }
            },
            updateCheckBoxCate(val){
                for (let item of this.checkBoxGroupCate) {
                    if (val.id === item.id) {
                        item.checked = val.checked;
                    }
                }
            },
            updateRadio(val){
                for (let item of this.radioGroup) {
                    if (val.id === item.id) {
                        item.checked = val.checked;
                    } else {
                        item.checked = false;
                    }
                }
            },
            toUserList(){
                this.$emit('return');
            },
            getItemBrand(){
                this.setIndex();
                Service.get({}).then((data) => {
                    this.radioGroupBrand = data.moduleData.brand;
                    this.checkBoxGroupCate = data.moduleData.item;
                    this.moduleToolTip = data.moduleToolTip
                });
            },
            getItemBrandVal(){
                Service.getVal(this.paramsVal).then((data) => {
                    this.slider.max = data;
                    this.slider.disabled = false;
                });
            },
            setIndex() {
                this.userName = '';
                this.slider.max = 0;
                this.slider.disabled = true;
                this.$refs['slider'].setIndex(0);
            },
            /**
             * 倒计时5秒跳转到 人群列表
             */
            showSetTime(){
                let _vm = this;
                window.pageInterval = setInterval(function () {
                    if (_vm.setTime === 0) {
                        _vm.showModal = false;
                        _vm.toUserListByModal();
                        _vm.setTime = 5;
                        clearInterval(window.pageInterval);
                    } else {
                        _vm.setTime = _vm.setTime - 1;
                    }
                }, 1000)
            },
            toUserListByModal(){
                this.showModal = false;
                this.toUserList();
                window.location.reload();
            }
        }
    }
</script>
