<template>
    <v-modal :value="showModal"
             @cancel="closeModal"
             :title="title"
             cancelText="取消"
             okText="确定"
             effect="fade" custom="delete-modal">
        <div slot="modal-body" class="modal-body">
            <b>确定要删除“ {{deleteText}} ”这条记录吗？</b>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <div class="btn-cnt">
                <button type="button" class="btn btn-primary btn-sub" @click="submitModal">确定</button>
                <button type="button" class="btn " @click="closeModal">取消</button>
            </div>
        </div>
    </v-modal>
</template>
<script>
    import vModal from '../../../../public/module/modal/Modal.vue';

    import Service from './delete';

    export default {
        components: {
            vModal
        },
        data() {
            return {
                moduleName: '',
                moduleIcon: '',
                showModal:false,
                title:'删除'
            }
        },
        props: {
            params:{
                type:Object
            },
            show:{
                type:Boolean
            },
            deleteText:{
                type:String
            }
        },
        watch: {
            show(){
                this.showModal = !this.showModal;
            }
        },
        methods: {
            serviceGet: function () {
                let _vm = this;

                Service.get(_vm.params).then((data) => {
                    console.log(`-删除${data}`)
                    if(data){
                        this.$emit('success');
                    }
                });
            },
            closeModal(){
                this.showModal = !this.showModal;
            },
            submitModal(){
                this.showModal = !this.showModal;
                console.log(`-删除`)
                this.serviceGet();
            },
        }
    }
</script>
