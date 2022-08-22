<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
  <div class="element-content">
     <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <span class="label" style="min-width:100px;vertical-align:baseline;">Type</span>
   <select v-model="meta" @change="change">
     <option v-for="name, key in representationTypes" :value="key">{{name}}</option>
    </select>
  </div>
</div>
</template>
<script>
export default {
  name: 'MetadataTopic',
  props: {
    id: {
      type: Number,
      default: -1
    },
    representation: {
      type: String,
      default: ''
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.representation
  },
  watch: {
    representation (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      representationTypes:{
        vector: 'Donnée vecteur (point, ligne, polygone)', 
        grid: 'Donnée raster ou matricielle',
        textTable: 'Fichier texte ou table',
        tin: 'Réseau de triangle irrégulier (Triangulated Irregular Network)', 
        stereoModel: 'Modèle stéréoscopique', 
        video: 'Enregistrement vidéo',
      },
      meta: ''
    }
  },
  methods: {
    change () {
      this.$emit('change', {id: this.id, representation: this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>