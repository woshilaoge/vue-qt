<template>
    <span :title="content">
    <slot></slot>
  </span>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            default: ""
        }
    },
    mounted() {
        let _vm = this;
        $(_vm.$el).tooltip({placement:'bottom',html:true});
    }
};
</script>
