<template>
    <v-panel :moduleName="moduleName" :moduleIcon="moduleIcon">
       <div class="row">
           <div class="col-md-6 col-sm-12 col-xs-12">
               <v-average-period :params="params"></v-average-period>
           </div>
           <div class="col-md-6 col-sm-12 col-xs-12">
               <v-buy-back :params="params"></v-buy-back>
           </div>
       </div>
    </v-panel>
</template>
<script>
    import vPanel from '../../../public/components/panel.vue';

    import vAveragePeriod from './averageperiod/index.vue';
    import vBuyBack from './buyback/index.vue';

    export default {
        data() {
            return {
//                moduleName: "日期：首次购买~2016年12月",
                moduleIcon: "fa fa-crosshairs",
            }
        },
        computed:{
            moduleName(){
                return '日期: 首次购买 ~ '+ (this.params ? this.params.serachDate:'');
            }
        },
        props: {
            params: {
                type: Object
            }
        },
        components: {
            vPanel,
            vBuyBack,
            vAveragePeriod,
        },
        mounted() {
//            $('.nav-pills, .nav-tabs').tabdrop();
        }
    }
</script>
