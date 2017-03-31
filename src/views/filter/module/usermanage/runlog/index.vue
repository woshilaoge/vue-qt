<template>
    <v-modal :value="showModal"
             @cancel="closeModal"
             @ok="submitModal"
             :title="title"
             :cancelText="关闭"
             :okText="确定"
             effect="fade" custom="app-info-modal" width="938" large>
        <div slot="modal-body" class="modal-body jdp-modal-body">
            <v-datatable :options="dataTableOptions"></v-datatable>
        </div>
        <div slot="modal-footer" class="modal-footer none"></div>
    </v-modal>
</template>
<script>

    import vModal from '../../../../public/module/modal/Modal.vue';

    import Service from './runlog';

    import vDatatable from '../../../../public/components/Datatable.vue';

    import vPanel from '../../../../public/components/panel.vue';

    let columnDefs = [{
        "targets": 1,
        render: function (data) {
            let res = (data === '成功')? `normal`:`warning`;
            return `<span class="${res}">${data}</span>`;
        }
    }];

    let dataTableOptions = {
        lengthChange: false, //是否允许用户改变表格每页显示的记录数
        paging: false, //是否开启本地分页
        searching: false, //是否允许Datatables开启本地搜索
        info: false, //控制是否显示表格左下角的信息
        ordering: false,
        // scrollX: true,
        responsive: true,
        // fixedColumns: true,
        // fixedHeader: true,
        columns: [{}],
        columnDefs: columnDefs,
        className: "table-striped table-bordered table-hover",
    };

    export default {
        components: {
            vDatatable,
            vPanel,
            vModal
        },

        data() {
            return {
                title: '执行记录',
                moduleName: '',
                moduleIcon: '',
                dataTableOptions: dataTableOptions,
                showModal: false,
                showUserLogicModal: false,
                showRunLogModal: false,
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
                    this.serviceGet();
                },
                deep: true
            },
            show(){
                this.showModal = !this.showModal;
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
                        Service.tableList(_vm.params)
                    ]);
                }).then((data) => {
                    let _dataTableOptions = {
                        columns: data[0],
                        data: data[1]
                    };
                    Object.assign(_vm.dataTableOptions, dataTableOptions, _dataTableOptions);
                });
            },
            closeModal(){
                this.showModal = !this.showModal;
            },
            submitModal(){
                this.showModal = !this.showModal;
            }
        }
    }
</script>
