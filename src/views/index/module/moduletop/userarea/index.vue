<template>
    <v-panel :moduleName="moduleName" :moduleIcon="moduleIcon" :moduleToolTip="moduleToolTip">
        <div class="row earth">
            <div class="col-md-8 col-sm-8 col-xs-12">
                <v-echart v-bind:options="echartOption" :autoResize="true"></v-echart>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12">
                <v-table :data="tableList"></v-table>
            </div>
        </div>
    </v-panel>
</template>
<script scoped>
import Service from './userarea';

import vPanel from '../../../../public/components/panel.vue';


import vEchart from '../../../../public/components/ECharts.vue';

import vTable from './table.vue';

export default {
    components: {
        vEchart,
        vPanel,
        vTable
    },

    data() {
        return {
            moduleName: '',
            moduleIcon: '',
            moduleToolTip:'',
            tileList: [],
            titleActive: [],
            echartOption: null,
            tableList:[]
        }
    },

    props: {
        params: {
            type: Object
        }
    },

    watch: {
        params: {
            handler: function(val, oldVal) {
                this.serviceGet();
            },
            deep: true
        }
    },

    methods: {
        serviceGet: function() {
            let _vm = this;

            Service.get(_vm.params).then((data) => {
                _vm.moduleName = data.moduleName;
                _vm.moduleIcon = data.moduleIcon;
                _vm.moduleToolTip = data.moduleToolTip;
                _vm.echartOption = data.moduleData;
            });

            Service.getRatio(_vm.params).then((data) => {
                _vm.tableList = data.moduleData;
            });
        }
    }
}
</script>
