<template>
  <div class="bbox">
    <span class="label">W</span>
    <input v-model="meta.west" type="number" min="-180" max="180" step="any"
    required @change="change($event)" title="Un nombre entre -180 et 180"/>

    <span class="label">N</span>
    <input v-model="meta.north" type="number" min="-90" max="90" step="any"
    required @change="change($event)"/>
    
    <span class="label">E</span>
    <input v-model="meta.east" type="number" min="-180" max="180" step="any"
    required @change="change($event)"/>
    
     <span class="label">S</span>
    <input v-model="meta.south" type="number" min="-90" max="90" step="any"
    required @change="change($event)"/>
    
  </div>
</template>
<script>
export default {
  name: 'MetadataBbox',
  props: {
    id: {
      type: Number,
      default: -1
    },
    erasable: {
      type: Boolean,
      default: false
    },
    bbox: {
      type: Object,
      default: () => {return {west: null, east: null, north: null, south: null}}
    }
  },
  watch: {
    bbox (newvalue) {
      this.meta = newvalue
    }
  },
  created () {
    this.meta = this.bbox
  },
  data () {
    return {
      meta: {}
    }
  },
  methods: {
    remove () {
      this.$emit('remove', this.id)
    },
    change (event) {
      var nodes = this.$el.querySelectorAll('input[type="number"]')
      var valid = true
      nodes.forEach(function (node) {
        if (!node.checkValidity()) {
          valid = false
          node.reportValidity()
        }
        return valid
      })
      if (!valid) {
        return
      }
      this.$emit('change', {id: this.id, bbox: this.meta})
    }
  }
}
</script>
<style scoped>
div.bbox span.label {
  min-width: 5px;
  margin-left: 10px;
}
div.bbox input[type="number"] {
  max-width:100px;
}
div.bbox input[type="number"]:invalid {
  outline: 1px solid red;
}
</style>