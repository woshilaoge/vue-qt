<template>
    <div v-show="show1" v-bind:class="{
      'alert':		true,
      'alert-success':(type == 'success'),
      'alert-warning':(type == 'warning'),
      'alert-info':	(type == 'info'),
      'alert-danger':	(type == 'danger'),
      'top': 			(placement === 'top'),
      'top-right': 	(placement === 'top-right')
    }" transition="fade" v-bind:style="{width:width}" role="alert">
        <button v-show="dismissable" type="button" class="close" @click="change">
            <span>&times;</span>
        </button>
        <slot></slot>
    </div>
</template>
<script>
// import coerce from './utils/utils.js'
export default {
    data() {
            return {
                show1: this.show
            }
        },
        props: {
            type: {
                type: String
            },
            dismissable: {
                type: Boolean,
                // coerce: coerce.boolean,
                default: false
            },
            show: {
                type: Boolean,
                // coerce: coerce.boolean,
                default: true,
                twoWay: true
            },
            duration: {
                type: Number,
                // coerce: coerce.number,
                default: 0
            },
            width: {
                type: String
            },
            placement: {
                type: String
            }
        },
        methods: {
            change() {
                this.show1 = false
            }
        },
        watch: {
            show(val) {
                this.show1 = val;
                if (this._timeout) clearTimeout(this._timeout)
                if (val && Boolean(this.duration)) {
                    this._timeout = setTimeout(() => {
                        this.show1 = false
                    }, this.duration)
                }
            },
            show1(val) {
                this.$emit("alertStatusChange", val);
            }
        }
}
</script>
<style scoped lang="scss">
.fade-transition {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave {
    height: 0;
    opacity: 0;
}

.alert.top {
    position: fixed;
    top: 30px;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1050;
}

.alert.top-right {
    position: fixed;
    top: 30px;
    right: 50px;
    z-index: 1050;
}
</style>
