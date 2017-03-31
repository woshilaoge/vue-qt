<template>
    <v-page>
        <v-tabs @tabsSelect='tabsSelect' :value="tabActiveNumber">
            <v-tab header="人群管理">
                <v-user-manage @newUser="toNewUser"></v-user-manage>
            </v-tab>
            <v-tab header="用户筛选">
                <v-user-filter @return="toUserManage" :reset="filterReset" @refresh="toRefresh"></v-user-filter>
            </v-tab>
        </v-tabs>
    </v-page>
</template>
<script>

import terminal from '../public/utils/terminal';

import vPage from '../public/module/common/page.vue';

import vTab from '../public/module/tab/Tab.vue';

import vTabs from '../public/module/tab/Tabs.vue';




import vUserManage from './module/usermanage/index.vue';

import vUserFilter from './module/userfilter/index.vue';


export default {
    components: {
        vPage, //页面公共模版

        vTabs,
        vTab,

        vUserManage,
        vUserFilter
    },
    data() {
        return {
            params: {},

            disabled: false,

            tabActiveNumber: 0,
            filterReset:false
        }
    },
    created() {
        if (terminal("mobile")) {
            this.disabled = true;
        }
    },

    methods: {
        tabsSelect(val){
            this.tabActiveNumber = val.index;
                console.log(val.index);
        },
        toNewUser(){
            /**
             * 打开新建人群
             */
            this.filterReset = !this.filterReset ;
            this.tabActiveNumber = 1;
        },
        toUserManage(){
            this.tabActiveNumber = 0;
        },
        toRefresh(){

        }
    }
}
</script>
