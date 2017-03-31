<template>
    <div class="radio-group">
        <v-radio v-for="item in dataList" @radio-check="checked" :name="item.name" :value="item.id"
                    :checked="item.checked"  name="linkFile" type="info">
            {{item.name}}
        </v-radio>
    </div>
</template>
<script>
    import vRadio from './Radio.vue';


    export default {
        components: {
            vRadio
        },
        name: 'RadioGroup',
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
                console.log(val,'---')
                //直接广播本条更新信息
                this.$emit('update', val);
            }
        }
    }
</script>
