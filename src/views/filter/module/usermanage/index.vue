<template>
    <div>
        <v-headroom pinClass="right_col" :disabled="disabled">
            <div class="row">
                <v-module-params @params="paramsInitOk" @new="createUser"></v-module-params>
            </div>
        </v-headroom>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <v-user-list :params="params"></v-user-list>
            </div>
        </div>
    </div>
</template>
<script>
    import vHeadroom from '../../../public/components/headroom/index.vue';

    import vUserList from '../../module/usermanage/userlist/index.vue'; //下属分析


    import vModuleParams from './moduleparams/index.vue';


    export default {
        components: {
            vHeadroom, //工具栏固定模块
            vModuleParams,
            vUserList,
        },
        data() {
            return {
                params: {},

                disabled: false
            }
        },
        created() {

        },

        methods: {
            paramsInitOk(val){
                console.log(JSON.stringify(val),'表格参数')
                this.params = Object.assign({},val);
            },
            createUser(){
                this.$emit('newUser');
            }
        }
    }
</script>
