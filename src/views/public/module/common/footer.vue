<template>
    <footer>{{copyRight}}</footer>
</template>
<script>
import Service from './common';

export default {
    name: "footer",

    data() {
        return {
            copyRight: ""
        }
    },

    created() {
        let _vm = this;

        Service.footer().then((data) => {
            _vm.copyRight = data;
        });
    }
}
</script>
<style>
footer {
    text-align: center;
}
</style>
