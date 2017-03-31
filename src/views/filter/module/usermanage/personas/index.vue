<template>
    <v-modal :value="showModal"
             @cancel="closeModal"
             @ok="submitModal"
             :title="title"
             :cancelText="关闭"
             :okText="确定"
             effect="fade"
             custom="app-info-modal"
             width="938" large>
        <div slot="modal-body" class="modal-body personas">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <v-user-age :params="params"></v-user-age>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <v-user-cart-age :params="params"></v-user-cart-age>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <v-user-sex :params="params"></v-user-sex>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <v-user-level :params="params"></v-user-level>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <v-user-area :params="params"></v-user-area>
                </div>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer none"></div>
    </v-modal>
</template>
<style>
    .modal.jdp-modal.fade{
        display: block !important;
        height: 0px;
        overflow: hidden;
    }
    .modal.jdp-modal.fade.in{
        height: auto;
    }
    .modal.jdp-modal .echarts{
        height:250px;
    }
</style>
<script>
    import vModal from '../../../../public/module/modal/Modal.vue';

    import vUserAge from './userage/index.vue';
    import vUserCartAge from './usercartage/index.vue';
    import vUserSex from './usersex/index.vue';
    import vUserLevel from './userlevel/index.vue';
    import vUserArea from './userarea/index.vue';

    export default {
        components: {
            vModal,
            vUserAge,
            vUserCartAge,
            vUserSex,
            vUserLevel,
            vUserArea,
        },
        data() {
            return {
                showModal: false,
                title: "用户包画像",
//                params:null
            }
        },
        props: {
            params: {
                type: Object
            },
            show: {
                type: Boolean
            }
        },
        watch: {
            params: {
                handler: function (val, oldVal) {
//                    this.serviceGet();
                },
                deep: true
            },
            show(){
                this.showModal = !this.showModal;
            }
        },
        methods: {
            closeModal(){
                this.showModal = !this.showModal;
            },
            submitModal(){
                this.showModal = !this.showModal;
            }

        }
    }
</script>
