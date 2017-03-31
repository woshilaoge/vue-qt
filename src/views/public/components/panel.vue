<template>
    <div class="x_panel">
        <div class="x_title">
            <h2>
                 <i v-bind:class="moduleIcon"></i>
                    {{moduleName}}
                    <!-- <small>副标题</small>-->
                <span v-if="moduleToolTip">
                    <v-tooltip :content="moduleToolTip"> <i class="fa fa-question-circle-o"></i></v-tooltip>
                </span>
            </h2>
        </div>
        <div class="x_content">
            <slot></slot>
        </div>
    </div>
</template>
<script>

import vTooltip from './tooltip.vue';

export default {
    props: {
        moduleName: {
            type: String,
            default: ""
        },
        moduleIcon: {
            type: String,
            default: ""
        },
        moduleToolTip: {
            type: String,
            default: ""
        }
    },
     components: {
       vTooltip
    },
}
</script>
