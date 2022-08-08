<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
  <div class="element-content">
     <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <span class="label" style="min-width:100px;vertical-align:baseline;">Résolution</span>
   <input v-model="meta.value" type="number" required @input="change"/>
    <select v-model="meta.unit" @change="change">
      <option value="cm">cm</option>
      <option value="m">m</option>
      <option value="km">km</option>
    </select>
  </div>
</div>
</template>
<script>
export default {
  name: 'MetadataResolution',
  props: {
    id: {
      type: Number,
      default: -1
    },
    resolution: {
      type: Object,
      default: () => {return {value: null, unit: 'm'}}
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.resolution
  },
  watch: {
    resolution (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      meta: {value: null, unit: 'm'}
    }
  },
  methods: {
    change () {
      this.$emit('change', {id: this.id, resolution: this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>