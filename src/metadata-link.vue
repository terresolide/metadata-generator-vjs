<template>
<div class="block-element">
 <span class="circle">{{id + 1 }}</span>
 <div class="element-content">
   <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
   <div >
     <label>Url</label> 
     <input style="width:425px;" type="url" required v-model="meta.url" @change="change"/>
     <meta-mro value="M"></meta-mro>
   </div>
   <div >
     <label>Fonction</label>
     <select v-model="meta.funct">
       <option v-for="tp in functions" :value="tp">{{tp}}</option>
     </select> 
     <meta-mro value="M"></meta-mro>
   </div>
    <div >
     <label>Protocole</label>
     <select v-model="meta.protocole">
       <option v-for="name, pt in protocoles" :value="pt">{{name}}</option>
     </select> 
     <meta-mro value="M"></meta-mro>
   </div>
   <div>
     <label style="vertical-align:top;">Titre</label>
    
     <div style="display:inline-block;" >
	     <div v-for="lang in langs">
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
  name: 'MetadataLink',
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
  },
  watch: {
    link: {
      handler (newvalue) {
        this.meta = newvalue
      },
      deep: true
    }
  },
  data () {
    return {
      meta: {
        url: null,
        type: 'URL',
        funct: 'information',
        title: {fr: null, en: null},
        description: {fr: null, en: null}
      },
      functions: ['information', 'search', 'download', 'order'],
      protocoles: {
        'WWW:LINK-1.0-http--link': 'Adresse internet (URL)',
        'WWW:DOWNLOAD-1.0-http--download': 'Fichier/Archive à télécharger (http)',
        'WWW:DOWNLOAD-1.0-ftp--download': 'Fichier/Archive à télécharger (ftp)'
      }
    }
  },
  methods: {
    change () {
      console.log(this.meta)
      this.$emit('change', {id: this.id, link: this.meta})
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