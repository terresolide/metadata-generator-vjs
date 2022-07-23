<template>
  <div class="block-element bbox">
    <span class="circle">{{id + 1 }}</span>
    <div class="element-content large">
     <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
      <div style="margin-bottom:8px;" >
         <span class="label premium" >Toponyme</span> 
         <input type="text" class="medium" v-model="meta.name" :tabindex="id + 1"/>
         <meta-mro value="O"></meta-mro>
      </div>
      <div >
         <span class="label premium">Bounding Box</span>
         <meta-mro value="M"></meta-mro>
       <!--    <input type="button" value="Dessiner" @click="draw" /> -->
      </div>
	    <span class="label">W</span>
	    <input v-model="meta.west" type="number" min="-180" max="180" step="any" 
	    required @change="change($event)" title="Veuillez saisir un nombre entre -180 et 180"/>
	
	    <span class="label">N</span>
	    <input v-model="meta.north" type="number" min="-90" max="90" step="any" 
	    required @change="change($event)" title="Veuillez saisir un nombre entre -90 et 90"/>
	    
	    <span class="label">E</span>
	    <input v-model="meta.east" type="number" min="-180" max="180" step="any" 
	    required @change="change($event)" title="Veuillez saisir un nombre entre -180 et 180"/>
	    
	     <span class="label">S</span>
	    <input v-model="meta.south" type="number" min="-90" max="90" step="any" 
	    required @change="change($event)" title="Veuillez saisir un nombre entre -90 et 90"/>
	    
    </div>
  </div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
export default {
  name: 'MetadataBbox',
  components: {
    MetaMro
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    erasable: {
      type: Boolean,
      default: false
    },
    hasBbox: {
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
    draw () {
      this.$emit('draw', {id: this.id, bbox: this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    },
    change (event) {
      var nodes = this.$el.querySelectorAll('input[type="number"]')
      var valid = true
      nodes.forEach(function (node) {
        if (!node.checkValidity()) {
          valid = false
         //
        }
        return valid
      })
      if (!valid) {
        return
      }
      if (this.meta.east && this.meta.west && parseFloat(this.meta.east) < parseFloat(this.meta.west)) {
        var aux = this.meta.east
        this.meta.east = this.meta.west
        this.meta.west = aux
      } 
      if (this.meta.south && this.meta.north && parseFloat(this.meta.north) < parseFloat(this.meta.south)) {
        var aux = this.meta.north
        this.meta.north = this.meta.south
        this.meta.south = aux
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
div.bbox span.label.premium {
  display: inline;
  vertical-align:baseline;
  margin-left:0;
}

div.bbox input[type="number"] {
  max-width:100px;
}
div.bbox input[type="number"]:invalid {
  outline: 1px solid red;
}

</style>