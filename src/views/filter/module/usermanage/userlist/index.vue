<template>
    <div>
        <v-datatable :options="dataTableOptions"
                     @user-structure="showUserStructure"
                     @run="showRun"
                     @set-valid="showSetValid"
                     @run-log="showRunLog"
                     @delete="showDelete">
        </v-datatable>

        <v-personas :params="paramsPersonas" :show="showModal"></v-personas>
        <v-run-log :params="paramsRunLog" :show="showRunLogModal"></v-run-log>
        <v-delete :params="paramsDelete" :show="showDeleteModal" :deleteText="deleteAlert" @success="deleteSuccess"></v-delete>
        <v-modal :value="showModalSuccess"
                 effect="fade" custom="success-modal">
            <div slot="modal-body" class="modal-body">
                <h4>恭喜您，操作成功！</h4>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button type="button" class="btn btn-primary btn-sub" @click="showModalSuccess = !showModalSuccess">确定</button>
            </div>
        </v-modal>
    </div>
</template>
<script>
    import Service from './userlist';

    import vDatatable from '../../../../public/components/Datatable.vue';
    import vModal from '../../../../public/module/modal/Modal.vue';

    import vPersonas from '../personas/index.vue';

    import vRunLog from '../runlog/index.vue';

    import vDelete from '../delete/index.vue';

    export default {
        components: {
            vDatatable,
            vPersonas,
            vRunLog,
            vDelete,
            vModal
        },
        data() {
            return {
                moduleName: '',
                moduleIcon: '',
                dataTableOptions: null,
                showModal: false,
                showUserLogicModal: false,
                showRunLogModal: false,
                showDeleteModal: false,
                showModalSuccess: false,
                deleteAlert: '',
                paramsRunLog: null,
                paramsDelete: null,
                paramsPersonas: null
            }
        },
        props: {
            params: {
                type: Object
            }
        },
        watch: {
            params: {
                handler: function () {
                    this.serviceGet();
                },
                deep: true
            }
        },
        computed: {
            operateParams(){
                return {}
            }
        },
        methods: {
            serviceGet: function () {
                let _vm = this;
                Service.get(_vm.params).then((data) => {
                    _vm.moduleName = data.moduleName;
                    _vm.moduleIcon = data.moduleIcon;

                    return Q.all([
                        Service.columns(_vm.params),
                        Service.tableList(_vm.params),
                        Service.options(_vm.params),
                    ]);
                }).then((data) => {
                    let _dataTableOptions = {
                        columns: data[0],
                        data: data[1]
                    };
                    _vm.dataTableOptions = Object.assign(data[2],_dataTableOptions);
                });
            },
            showUserStructure(val){
                console.log(`查看人群构成${JSON.stringify(val)}`);
                this.showModal = !this.showModal;
                this.paramsPersonas = val;
            },
            showRunLog(val){
                console.log(`查看执行记录${JSON.stringify(val)}`);
                this.paramsRunLog = val;
                this.showRunLogModal = !this.showRunLogModal
            },
            showDelete(val){
                console.log(`执行删除${JSON.stringify(val)}`);
                this.paramsDelete = val;
                this.deleteAlert = `${val.crowdId + ' ' + val.crowdName}`;
                this.showDeleteModal = !this.showDeleteModal
            },
            showSetValid(val){
                console.log(`设置有效性${JSON.stringify(val)}`);

                /**
                 *  0是无效 1是有效
                 */
                Service.setValid(Object.assign({'modelValidity': 1}, val)).then((data)=> {
                    console.log('------设置有效性--', data);
                    this.showModalSuccess = true;
                    this.serviceGet();
            })
            },
            showRun(val){
                console.log(`执行${JSON.stringify(val)}`);

                Service.run(val).then((data)=> {
                    console.log('------zhiixng--', data);
                    this.showModalSuccess = true;
                    this.serviceGet();
                })
            },
            deleteSuccess(){
                this.showModalSuccess =!this.showModalSuccess;
                this.serviceGet();
            }
        }
    }
</script>
