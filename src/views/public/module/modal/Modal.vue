<template>
    <div role="dialog" :class="['modal jdp-modal',effect,custom]" @click="backClose" @transitionend="transitionend">
        <div :class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document" :style="{width: optionalWidth}">
            <div class="modal-content jdp-modal-content">
                <slot name="modal-header">
                    <div class="modal-header">
                        <button type="button" class="close" @click="close"><span>&times;</span></button>
                        <h4     class="modal-title"><slot name="title">{{title}}</slot></h4>
                    </div>
                </slot>
                <slot name="modal-body"><div class="modal-body"><slot></slot></div></slot>
                <slot name="modal-footer">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="close">{{ cancelText }}</button>
                        <button type="button" class="btn btn-primary" @click="ok">{{ okText }}</button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import {getScrollBarWidth} from '../../utils/utils.js'
export default {
  name: 'Modal',
  props: {
    backdrop: {type: Boolean, default: true},
    callback: {type: Function, default: null},
    cancelText: {type: String, default: 'Close'},
    effect: {type: String, default: null},
    custom:{type: String, default: null},
    large: {type: Boolean, default: false},
    okText: {type: String, default: 'Save changes'},
    small: {type: Boolean, default: false},
    title: {type: String, default: ''},
    value: {type: Boolean, required: true},
    width: {default: null}
  },
  computed: {
    optionalWidth () {
      if (this.width === null) {
        return null
      } else if (Number.isInteger(Number(this.width))) {
        return this.width + 'px'
      }
      return this.width
    }
  },
  watch: {
    value (val) {
      this.transitionstart()
    }
  },
  methods: {
    backClose (e) {
      if (this.backdrop && e.target === this.$el) { this.close() }
    },
    close () {
      this.$emit('cancel')
      this.$emit('input', false)
    },
    ok () {
      if (this.callback instanceof Function) this.callback()
      this.$emit('ok')
    },
    transitionstart () {
      const el = this.$el
      const body = document.body
      const scrollBarWidth = getScrollBarWidth()
      if (this.value) {
        el.querySelector('.modal-content').focus()
        el.style.display = 'block'
        setTimeout(() => el.classList.add('in'), 0)
        body.classList.add('modal-open')
        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px'
        }
      } else {
        el.classList.remove('in')
      }
    },
    transitionend () {
      if (!this.value) {
        this.$el.style.display = 'none'
        const body = document.body
        body.style.paddingRight = null
        body.classList.remove('modal-open')
      }
    }
  }
}
</script>