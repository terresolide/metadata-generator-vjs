<template>
<div class="identifier">
 <div v-if="erasable" style="position:absolute;top:2px;right:5px;" class="fa fa-close" @click="remove"></div>
 <div>
   <label>Organisation</label>
   <input type="text" v-model="meta.name" style="width:300px;"/>
   <meta-mro value="M"></meta-mro>
  </div>
 <div class="datacite">
  <label> Identifiant </label>
  
  <formater-tooltip v-if="!meta.identifier" description="Il s'agit de l'identifiant de l'organisation
  auprès d'un registre international comme ROR"></formater-tooltip>
   <meta-mro value="O"></meta-mro>
   <input v-if="!meta.identifier" type="button" value="+" @click="addIdentifier" title="Ajouter identifiant pour l'organisme">
 
  <metadata-identifier v-if="meta.identifier" :identifier="meta.identifier" type="Organizational"
   @change="changeIdentifier" @remove="removeIdentifier">
  </metadata-identifier>
  </div>
</div>
</template>
<script>
 import MetadataIdentifier from './metadata-identifier.vue'
 import FormaterTooltip from './formater-tooltip.vue'
 import MetaMro from './metadata-mro.vue'
 export default {
   name: 'MetadataAffiliation',
   components: {
     MetadataIdentifier,
     FormaterTooltip,
     MetaMro
   },
   props: {
     id: {
       type: Number,
       default: -1
     },
     affiliation: {
       type: Object,
       default: () => { return {name: '', identifier: null}}
     },
     erasable: {
       type: Boolean,
       default: false
     }
   },
   watch: {
     affiliation (newvalue) {
       this.meta = newvalue
     }
   },
   data () {
     return {
       meta: {
         name: '',
         identifier: null
       }
     }
   },
   created () {
     this.meta = this.affiliation
   },
   methods: {
     addIdentifier () {
       console.log('add identifier')
       this.$set(this.meta, 'identifier', {type: 'ROR', identifier: ''})
     },
    
     change () {
       this.$emit('change', {id: this.id, affiliation: this.meta})
     },
     changeIdentifier (value) {
       this.meta.identifier = value.identifier
       this.change()
     },
     remove () {
       this.$emit('remove', this.id)
     },
     removeIdentifier () {
       this.meta.identifier = null
     }
   }
 }
</script>
<style scoped>
label {
  font-size:1em;
  min-width:120px;
  max-width:120px;
}
div.identifier {
  position: relative;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
  min-width:500px;
  background: #F5F5F5;
  margin:8px 5px 8px 0;
}
div.contact div.identifier {
  background: white;
}
</style>