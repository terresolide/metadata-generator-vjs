<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
  <div class="element-content">
   <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
   <div class="element-field">
	   <label>Mot-clé</label>
	   <div v-for="lang in enabledLangs" style="margin-left: 80px;">
	     <span class="label">{{lang}}</span>
	     <input v-model="meta.title[lang]" class="medium" required @change="trim"/>
	   </div>
   </div>
   <div class="element-field" v-if="thesauri[type].length > 0">
    <label>Thésaurus</label>
    <select v-model="meta.thesaurusId" @change="thesaurusChange">
      <option :value="-1"><em>Aucun</em></option>
      <option v-for="thes, index in thesauri[type]" :value="index">{{thes.name}}</option>
    </select>
   </div>
   <div v-if="meta.thesaurusId >= 0" class="element-field">
      <label>Code / UUID</label>
      <input v-model="meta.code" class="medium" required @change="trim" />
       <a :href="thesauri[type][meta.thesaurusId].searchUrl" target="_blank">
        <i class="fa fa-search"></i> Rechercher
       </a>
   </div>
   <div v-if="type === 'other'">
     <label>Type</label>
     <select v-model="meta.type">
        <option value="discipline">Discipline</option>
        <option value="place">Localisation</option>
        <option value="stratum">Couche géologique</option>
        <option value="temporal">Temporel</option>
        <option value="theme">Sujet particulier</option>
     </select>
     <formater-tooltip description="En cas de doute, mettre <em>Sujet particulier</em>"></formater-tooltip>
   </div>
  </div>
</div>
</template>
<script>
import FormaterTooltip from './formater-tooltip.vue'
export default {
  name: 'MetadataKeyword',
  components: {
    FormaterTooltip
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    keyword: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'discipline'
    },
    langs: {
      type: Array,
      default: () => {return ['fr', 'en']}
    }
  },
  created () {
    this.meta = this.keyword
    if (this.keyword.thesaurusId >= 0 && this.thesauri[this.type][this.keyword.thesaurusId]) {
      this.meta.thesaurus = this.thesauri[this.type][this.keyword.thesaurusId]
    } else {
      this.meta.thesaurusId = -1
      this.meta.thesaurus = null
    }
    this.initialize(this.langs)
  },
  watch: {
    keyword (newvalue) {
      this.meta = this.keyword
    },
    langs (newvalue) {
      this.initialize(newvalue)
    }
  },
  data () {
    return {
      meta: {thesaurus: {}, title: {fr: null, en: null}, thesaurusId: -1},
      enabledLangs: ['fr', 'en'],
      thesauri: {
        discipline: [
          {
            id: 'gcmdKeyword',
            name: 'GCMD sciencekeywords', 
            schemeUrl: 'https://gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/sciencekeywords', 
            valueRoot: 'https://gcmd.earthdata.nasa.gov/kms/concept/', 
            searchUrl: 'https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/Earth%20Science?gtm_scheme=Earth%20Science',
            date: '2022-07-27 15:38:36',
            type: 'theme',
            langs: ['en']
          }, {
            id: 'fmtDiscipline',
            name: 'ForM@Ter - Disciplines et thèmes pour la Terre Solide',
            schemeUrl: 'https://service.poleterresolide.fr/voc/science_field',
            valueRoot: 'https://service.poleterresolide.fr/voc/science_field/',
            searchUrl: 'https://service.poleterresolide.fr/voc/science_field',
            gn: 'formater-discipline-gn',
            type: 'discipline',
            date: '2021-06-23 07:02:17',
            langs: ['fr', 'en']
          }],
        platform: [ {
          id: 'gcmdPlatform',
          name: 'GCMD platforms', 
          schemeUrl: 'https://gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/platforms', 
          valueRoot: 'https://gcmd.earthdata.nasa.gov/kms/concept/', 
          searchUrl: 'https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/platforms?gtm_scheme=platforms',
          date: '2022-08-09 14:34:26',
          type: 'theme',
          langs: ['en']
         }, {
           id: 'fmtPlatform',
           name: 'ForM@Ter - Plateformes',
           schemeUrl: 'https://service.poleterresolide.fr/voc/platform',
           valueRoot: 'https://service.poleterresolide.fr/voc/platform/',
           searchUrl: 'https://service.poleterresolide.fr/voc/platform',
           date: '2021-06-24 05:43:04',
           gn: 'formater-platform-gn',
           type: 'theme',
           langs: ['fr', 'en']
         }],
        variable: [ {
            id: 'gcmdKeyword',
            name: 'GCMD sciencekeywords', 
            schemeUrl: 'https://gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/sciencekeywords', 
            valueRoot: 'https://gcmd.earthdata.nasa.gov/kms/concept/', 
            searchUrl: 'https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/Earth%20Science?gtm_scheme=Earth%20Science',
            date: '2022-07-27 15:38:36',
            type: 'theme',
            langs: ['en']
           }, {
             id: 'fmtVariable',
             name: 'ForM@Ter - Variables',
             schemeUrl: 'https://service.poleterresolide.fr/voc/variable',
             valueRoot: 'https://service.poleterresolide.fr/voc/variable/',
             searchUrl: 'https://service.poleterresolide.fr/voc/variable',
             date: '2021-06-23 09:53:17',
             type: 'theme',
             gn: 'formater-variable-gn',
             langs: ['fr', 'en']
           }],
        productType: [],
        featureOfInterest: [],
        other: []
      }
    }
  },
  methods: {
    initialize (langs) {
      if (this.meta.thesaurusId >= 0) {
        this.enabledLangs = langs.filter(value => this.meta.thesaurus.langs.includes(value))
        if (this.enabledLangs.length === 0) {
          this.enabledLangs = this.meta.thesaurus.langs.slice(0, 1)
        }
      } else {
        this.enabledLangs = langs
      }
//       var self = this
//       this.enabledLangs.forEach(function (lg) {
//         self.meta.title[lg] = self.meta.title[lg].trim()
//       })
//       this.meta.code = this.meta.code.trim()
    },
    remove () {
      this.$emit('remove', {type: this.type, id: this.id})
    },
    change () {
//      
      this.$emit('change', {type: this.type, id: this.id, keyword: this.meta})
    },
    thesaurusChange () {
      if (this.meta.thesaurusId >= 0 && this.thesauri[this.type][this.meta.thesaurusId]) {
        this.meta.thesaurus = this.thesauri[this.type][this.meta.thesaurusId]
      } else {
        this.meta.thesaurusId = -1
        this.meta.thesaurus = null
      }
      this.initialize(this.langs)
      this.change()
    },
    trim () {
      this.meta.code = this.meta.code ? this.meta.code.trim() : null
		  var self = this
		  this.enabledLangs.forEach(function (lg) {
		    self.meta.title[lg] = self.meta.title[lg] ? self.meta.title[lg].trim() : null
		  })
    }
  }
}
</script>
<style scoped>
label {
 font-weight: 700;
 min-width: 100px;
}
</style>