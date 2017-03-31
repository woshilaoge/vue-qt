<template>
    <v-page>
        <v-headroom pinClass="right_col" :disabled="disabled">
           <v-module-params @params="paramsInitOk"></v-module-params>
        </v-headroom>
        <!-- 页面主体 -->
        <div class="row module pie">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <v-module-top :params="params"></v-module-top>
            </div>
        </div>
        <div class="row module">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <v-module-center :params="params"></v-module-center>
            </div>
        </div>
        <div class="row module">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <v-module-bottom :params="params"></v-module-bottom>
            </div>
        </div>
    </v-page>
</template>
<script>
import terminal from '../public/utils/terminal';

import vPage from '../public/module/common/page.vue';
import vHeadroom from '../public/components/headroom/index.vue';

import vModuleParams from './module/moduleparams/index.vue'; //日期：首次购买~2016年12月
import vModuleTop from './module/moduletop/index.vue'; //日期：2016年12月
import vModuleCenter from './module/modulecenter/index.vue'; //日期：2016年1月~2016年12月
import vModuleBottom from './module/modulebottom/index.vue'; //日期：首次购买~2016年12月

export default {
    components: {
        vPage, //页面公共模版
        vHeadroom, //工具栏固定模块

        vModuleTop,
        vModuleCenter,
        vModuleBottom,
        vModuleParams

    },
    data() {
        return {
            params: null,
            disabled: false
        }
    },
    created() {
        if (terminal("mobile")) {
            this.disabled = true;
        }
    },
    methods: {
        paramsInitOk(val){
            console.log('------ok----------',JSON.stringify(val));
            this.params = Object.assign({},val);
        }
    }
}
</script>
