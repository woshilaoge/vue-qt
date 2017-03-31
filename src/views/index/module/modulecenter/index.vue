<template>
    <v-panel :moduleName="moduleName" :moduleIcon="moduleIcon">
       <div class="row">
           <div class="col-md-6 col-sm-12 col-xs-12">
               <v-cate-relevance :params="params"></v-cate-relevance>
           </div>
           <div class="col-md-6 col-sm-12 col-xs-12">
               <v-repate-rate :params="params"></v-repate-rate>
           </div>
           <div class="col-md-12 col-sm-12 col-xs-12">
               <v-buy-power :params="params"></v-buy-power>
           </div>
       </div>
    </v-panel>
</template>
<script>
    import vPanel from '../../../public/components/panel.vue';

    import vCateRelevance from './caterelevance/index.vue';
    import vRepateRate from './repaterate/index.vue';
    import vBuyPower from './buypower/index.vue';

    export default {
        data() {
            return {
//                moduleName: "日期：2016年1月~2016年12月",
                moduleIcon: "fa fa-crosshairs",
            }
        },
        computed:{
            moduleName(){
                let  text = '' ;
                if(this.params){
                    text += moment(this.params.serachDate).subtract(11,'month').format('YYYY-MM') + " ~ ";
                    text += moment(this.params.serachDate).startOf('month').format('YYYY-MM');
                }
                return '日期: ' + text;
            }
        },
        props: {
            params: {
                type: Object
            }
        },
        components: {
            vPanel,
            vCateRelevance,
            vRepateRate,
            vBuyPower,
        },
        mounted() {
//            $('.nav-pills, .nav-tabs').tabdrop();
        }
    }
</script>
