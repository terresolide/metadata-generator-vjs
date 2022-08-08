<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
  <div class="element-content">
     <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <span class="label" style="min-width:100px;vertical-align:baseline;">Format</span>
   <input v-model="meta" type="text" required @input="change"/>
  </div>
</div>
</template>
<script>
export default {
  name: 'MetadataFormat',
  props: {
    id: {
      type: Number,
      default: -1
    },
    format: {
      type: String,
      default: ''
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.format
  },
  watch: {
    format (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      meta: ''
    }
  },
  methods: {
    change () {
      this.$emit('change', {id: this.id, format: this.meta.trim()})
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>