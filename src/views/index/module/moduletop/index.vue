<template>
    <v-panel :moduleName="moduleName" :moduleIcon="moduleIcon">
       <div class="row">
           <div class="col-md-4 col-sm-12 col-xs-12">
               <v-user-age :params="params"></v-user-age>
           </div>
           <div class="col-md-4 col-sm-12 col-xs-12">
               <v-user-cart-age :params="params"></v-user-cart-age>
           </div>
           <div class="col-md-4 col-sm-12 col-xs-12">
               <v-user-sex :params="params"></v-user-sex>
           </div>
           <div class="col-md-4 col-sm-12 col-xs-12">
               <v-user-level :params="params"></v-user-level>
           </div>
           <div class="col-md-4 col-sm-12 col-xs-12">
               <v-user-structure :params="params"></v-user-structure>
           </div>
           <div class="col-md-12 col-sm-12 col-xs-12">
               <v-user-area :params="params"></v-user-area>
           </div>
       </div>
    </v-panel>
</template>
<script>
    import vPanel from '../../../public/components/panel.vue';

    import vUserAge from './userage/index.vue';
    import vUserCartAge from './usercartage/index.vue';
    import vUserSex from './usersex/index.vue';
    import vUserLevel from './userlevel/index.vue';
    import vUserStructure from './userstructure/index.vue';
    import vUserArea from './userarea/index.vue';

    export default {
        data() {
            return {
//                moduleName: "日期：2016年12月",
                moduleIcon: "fa fa-crosshairs",
            }
        },
        props: {
            params: {
                type: Object
            }
        },
        computed:{
            moduleName(){
                return '日期: '+ (this.params ? this.params.serachDate:'');
            }
        },
        components: {
            vPanel,
            vUserAge,
            vUserCartAge,
            vUserSex,
            vUserLevel,
            vUserStructure,
            vUserArea
        },
        mounted() {
//            $('.nav-pills, .nav-tabs').tabdrop();
        }
    }
</script>
