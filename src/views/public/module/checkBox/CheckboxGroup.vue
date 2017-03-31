<template>
    <div class="checkbox-group">
        <v-checkbox v-for="item in dataList" @checked="checked" :name="item.name" :value="item.id" :checkedValue="item.checked">
            {{item.name}}
        </v-checkbox>
    </div>
</template>
<script>
    import vCheckbox from './Checkbox.vue';


    export default {
        components: {
            vCheckbox
        },
        name: 'CheckboxGroup',
        props: {
            dataList: {
                type: Array,
                default: []
            },
            button: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            falseValue: {
                default: false
            },
            name: {
                type: String,
                default: null
            },
            readonly: {
                type: Boolean,
                default: false
            },
            trueValue: {
                default: true
            },
            type: {
                type: String,
                default: null
            },
            value: {
                default: false
            },
            checkedValue: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                checkList: []

            }
        },
        computed: {
        },
        watch: {
            dataList: {
                handler(val){
                    if (val.length) {
                        let list = [];
                        for (let item of this.dataList) {
                            if (item.checked) {
                                list.push(item)
                            }
                        }
                        this.$emit('checkedList', list);
                    }
                },
                deep: true
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            checked(val){
                //直接广播本条更新信息
                this.$emit('update', val);
            }
        }
    }
</script>
