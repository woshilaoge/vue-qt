<template>
    <v-panel :moduleName="moduleName" :moduleIcon="moduleIcon" :moduleToolTip="moduleToolTip">
        <div class="row">
            <v-echart v-bind:options="echartOption" :autoResize="true"></v-echart>
        </div>
    </v-panel>
</template>
<script scoped>
import Service from './userlevel';

import vPanel from '../../../../../public/components/panel.vue';

import vEchart from '../../../../../public/components/ECharts.vue';


export default {
    components: {
        vEchart,
        vPanel
    },

    data() {
        return {
            moduleName: '',
            moduleIcon: '',
            moduleToolTip:'',
            tileList: [],
            titleActive: [],
            echartOption: null
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
        }
    }
}
</script>
