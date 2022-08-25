<template>
<div class="block-element">
 <span class="circle">{{id + 1 }}</span>
 <div class="element-content">
   <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
   <div >
     <label>Type</label>
     <select v-model="meta.type">
       <option value="DOI">DOI</option>
       <option value="URL">URL</option>
     </select>
   </div>
   <div >
     <label>{{meta.type === 'DOI' ? 'DOI' : 'URL'}}</label> 
     <input style="width:425px;" :type="meta.type === 'DOI' ? 'text' : 'url'" required v-model="meta.url" @change="change"/>
     <meta-mro value="M"></meta-mro>
   </div>
   <div class="datacite">
     <label>Relation</label>
   La collection 
   <select v-model="meta.relation">
     <option value="">---</option>
     <option v-for="relation in relations" :value="relation">{{relation}}</option>
   </select> ce lien
   <meta-mro value="M"></meta-mro>
   </div>
   <div>
     <label style="width:auto;max-width:none;">Langue principale du lien</label>
     <select v-model="link.lang" @change="changeLang">
       <option value="fr">fr</option>
       <option value="en">en</option>
     </select>
   </div>
   <div>
     <label style="vertical-align:top;">Titre</label>
    
     <div style="display:inline-block;" >
       <div v-for="lang in languages">
          <span class="label">{{lang}}</span>
          <input type="text" required style="width:400px;" v-model="meta.title[lang]" @change="change"/>
          <span class="iso"><meta-mro value="M"></meta-mro></span>
        </div>
      </div>
   </div>
   <div class="iso">
     <label>Description</label>
     <div v-for="lang in langs" style="margin-left:72px;">
        <span class="label">{{lang}}</span>
        <input type="text" style="width:400px;" v-model="meta.description[lang]" @change="change"/>
        <meta-mro value="R"></meta-mro>
      </div>
   </div>
   
 </div>
</div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
export default {
  name: 'MetadataRelated',
  components: {
    MetaMro
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    link: {
      type: Object,
      default: null
    },
    langs: {
      type: Array,
      default: () => {return ['fr', 'en']}
    }
  },
  created () {
    this.meta = this.link
    this.changeLang()
  },
  watch: {
    link: {
      handler (newvalue) {
        this.meta = newvalue
      },
      deep: true
    },
    langs (newvalue) {
      this.changeLang()
    }
  },
  data () {
    return {
      meta: {
        relation: 'IsDocumentedBy',
        url: null,
        type: 'url',
        typeiso: 'information',
        lang: 'en',
        title: {fr: null, en: null},
        description: {fr: null, en: null}
      },
      languages: ['en', 'fr'],
      relations:['IsCitedBy','Cites', 'IsSupplementTo','IsSupplementedBy', 'IsContinuedBy', 'Continues', 'IsDescribedBy',
           'Describes', 'HasMetadata', 'IsMetadataFor','HasVersion',  'IsVersionOf', 'IsNewVersionOf', 'IsPreviousVersionOf',
           'IsPartOf', 'HasPart', 'IsPublishedIn', 'IsReferencedBy', 'References', 'IsDocumentedBy', 'Documents', 'IsCompiledBy',
           'Compiles', 'IsVariantFormOf', 'IsOriginalFormOf', 'IsIdenticalTo', 'IsReviewedBy', 'Reviews', 'IsDerivedFrom',
           'IsSourceOf', 'IsRequiredBy', 'Requires', 'IsObsoletedBy', 'obsoletes']
    }
  },
  methods: {
    change () {
      console.log(this.meta)
      this.$emit('change', {id: this.id, link: this.meta})
    },
    changeLang () {
      this.languages = [...this.langs]
      if (this.languages.indexOf(this.meta.lang) < 0) {
        this.languages.unshift(this.meta.lang)
      }
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>
<style scoped>
span.label {
  color:#333;
  font-weight:700;
  display:inline-block;
  vertical-align:top;
}
label {
  font-weight:700;
  font-size:1em;
  min-width:70px;
  max-width:70px;
  vertical-align:baseline;
}
div.element-content > div {
  margin-bottom:3px;
}
</style>