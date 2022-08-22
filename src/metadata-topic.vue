<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
  <div class="element-content">
     <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <span class="label" style="min-width:100px;vertical-align:baseline;">Catégorie</span>
   <select v-model="meta" @change="change">
     <option v-for="name, key in topicCategories" :value="key">{{name}}</option>
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
    topic: {
      type: String,
      default: ''
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.topic
  },
  watch: {
    topic (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      topicCategories: {
        farming: 'Agriculture',
        biota: 'Biote',
        boundaries: 'Frontières, limites',
        climatologyMeteorologyAtmosphere: 'Climatologie/Météorologie/Atmosphère',
        economy: 'Économie',
        elevation: 'Altitude',
        environment: 'Environnement',
        geoscientificInformation: 'Informations géoscientifiques',
        health: 'Santé',
        imageryBaseMapsEarthCover: 'Imagerie/Cartes de base/Occupation des terres',
        intelligenceMilitary: 'Renseignement/Secteur militaire',
        inlandWaters: 'Eaux intérieures',
        location: 'Localisation',
        oceans: 'Océans',
        planningCadastre: 'Planification/Cadastre',
        society: 'Société',
        structure: 'Structure',
        transportation: 'Transport',
        utilitiesCommunication: 'Services d\'utilité publique/Communication'
      },
      meta: ''
    }
  },
  methods: {
    change () {
      this.$emit('change', {id: this.id, topic: this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>