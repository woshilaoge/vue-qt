<template>
    <div class="navbar nav_title">
        <a href="/" class="site_title"> <i v-bind:class="logoIcon"></i>
            <span>{{systemName}}</span>
        </a>
    </div>
</template>
<script>
let vm_title = new Vue({
    el: 'title',
    data: {
        systemName: ''
    }
});

import Service from './common';

export default {
    name: "logo",
    data() {
        return {
            systemName: "",
            logoIcon: ""
        }
    },

    created() {
        let _vm = this;

        Service.sysInfo().then((data) => {

            _vm.systemName = data.systemName;
            
            _vm.logoIcon = data.logoIcon;

            vm_title.systemName = data.systemName;
        });
    }
}
</script>
