<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
	<div class="element-content">
	 <div v-if="erasable" style="position:absolute;top:2px;right:5px;" class="fa fa-close" @click="remove"></div>
	  <div>
	       <span class="label" style="min-width:80px;" title="Rechercher"><i class="fa fa-search"></i>  </span>
	          <select v-model="referentielCode" @change="referentielChange">
	        <option value="">-- Autre --</option>
	        <option v-for="epsg in epsgList" :value="epsg.id">{{epsg.id + ' - ' + epsg.name +  (epsg.comment ? ' - ' + epsg.comment : '')}}</option>
	      </select>
	      <formater-tooltip description="Ce champs n'est utilisé que pour la recherche"></formater-tooltip>
	     </div>
	      <div>
	        <span class="label" style="min-width:80px;">Nom</span>
	         <input v-model="meta.name" type="text"  required @change="change"/>
	         <meta-mro value="M"></meta-mro>
	      </div>
	      <div>
	         <span class="label" style="min-width:80px;">Url</span>
	         <input v-model="meta.link" class="medium" type="url" @change="change"/>
	         <meta-mro value="R"></meta-mro>
	  </div>
</div>
</div>
</template>
<script>
 import FormaterTooltip from './formater-tooltip.vue'
 import MetaMro from './metadata-mro.vue'
 export default {
   name: 'MetadataReferentiel',
   components: {
     FormaterTooltip,
     MetaMro
   },
   props: {
     id: {
       type: Number,
       default: -1
     },
     referentiel: {
       type: Object,
       default: () => { return {name: null, link: null}}
     },
     erasable: {
       type: Boolean,
       default: false
     }
   },
   watch: {
     referentiel (newvalue) {
       this.meta = newvalue
     }
   },
   data () {
     return {
       referentielCode: null,
       meta: {
         name: '',
         link: null
       },
       epsgList:  [
         { id: "2154", name: "RGF93 v1 / Lambert-93", comment: "France"},
         { id: "27571", name: "NTF (Paris) / Lambert zone I", comment: "Nord France"} ,
         { id: "27572", name: "NTF (Paris) / Lambert zone II", comment: "Centre France"},
         { id: "27573", name: "NTF (Paris) / Lambert zone III", comment: "Sud France"},
         { id: "3035", name: "ETRS89-extended / LAEA Europe", comment:null},
         { id: "4171", name: "RGF93 v1", comment:"Geodetic"},
         { id: "9777", name: "RGF93 v2", comment:"Geodetic"},
         { id: "9069", name: "ETRF2014", comment: "Geodetic"},
         { id: "4326", name: "WGS 84", comment: "2D"},
         { id: "4979", name: "WGS 84", comment: "3D"},
         { id: "7789", name: "ITRF2014", comment: null}
       ]
     }
   },
   created () {
     this.meta = this.referentiel
   },
   methods: {
     change () {
       this.$emit('change', {id: this.id, referentiel: this.meta})
     },
     remove () {
       this.$emit('remove', this.id)
     },
     referentielChange () {
       if (this.referentielCode) {
         var find = this.epsgList.find(epsg => epsg.id === this.referentielCode)
         if (find) {
           this.meta = {
               name: find.name,
               link: 'http://www.opengis.net/def/crs/EPSG/0/' + this.referentielCode
           }
           this.change()
         }
       }
     }
   }
 }
</script>
<style scoped>
label {
  font-size:1em;
  font-weight: 700;
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