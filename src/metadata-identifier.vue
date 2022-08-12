<template>
<div class="identifier">
  <div class="iso" v-if="type === 'article' && id === 0" style="position:absolute;top:2px;right:5px;"><meta-mro value="M"></meta-mro></div>
 <div  v-else style="position:absolute;top:2px;right:5px;" class="fa fa-close" @click="remove"></div>

 <div style="margin-bottom:2px;" >
   <label>Autorité</label>
   <span v-if="['Personal', 'Organizational'].indexOf(type) >= 0">
      <select v-model="meta.type">
       <option v-for="tp in types" :value="tp">{{tp}}</option>
     </select>
     <em v-if="url[meta.type]">
     (<a :href="url[meta.type]" target="_blank">{{url[meta.type]}}</a>)
     </em>
     <meta-mro value="M"></meta-mro>
   </span>
   <span v-else class="datacite">
	   <input v-model="meta.type" list="types" type="text" required placeholder="local identification, URN, URL ou ..."
	   class="medium" />
	   <datalist id="types">
	     <option v-for="tp in types" :value="tp">{{tp}}</option>
	   </datalist>
	   <meta-mro value="M"></meta-mro>
   </span>
   
  </div>
 <div>
  <label> Identifiant </label>
  <input type="text" v-model="meta.identifier" required class="medium" @change="change" >
   <meta-mro value="M"></meta-mro>
  </div>
</div>
</template>
<script>
 import MetaMro from './metadata-mro.vue'
 export default {
   name: 'MetadataIdentifier',
   components: {
     MetaMro
   },
   props: {
     id: {
       type: Number,
       default: -1
     },
     identifier: {
       type: Object,
       default: () => {}
     },
     type: {
       type: String,
       default: 'article'
     },
     erasable: {
       type: Boolean,
       default: true
     }
   },
   watch: {
     type (newvalue) {
       this.initialize(newvalue)
     },
     identifier (newvalue) {
       this.meta = newvalue
     }
   },
   data () {
     return {
       meta: {
         type: null,
         identifier: null
       },
       types: ['URI', 'URN', 'URL'],
       url: {
         ROR: 'https://ror.org/',
         ORCID: 'https://orcid.org/',
         ISNI: 'https://isni.org/'
       }
     }
   },
   created () {
     this.meta = this.identifier
     this.initialize(this.type)
   },
   methods: {
     change () {
       this.$emit('change', {id: this.id, identifier: this.meta})
     },
     initialize (type) {
       switch (type) {
       case 'Personal': 
         this.types = ['ISNI', 'ORCID']
         this.meta.type = 'ORCID'
         break
       case 'Organizational':
         this.types = ['ISNI', 'ORCID', 'ROR']
         this.meta.type = 'ROR'
         break
       case 'article':
         this.types = [null, 'URI', 'URN']
         break
       }
     },
     remove () {
       this.$emit('remove', this.id)
     }
   }
 }
</script>
<style scoped>
label {
  font-size:1em;
  font-weight:700;
  min-width:110px;
  max-width:110px;
}
div.identifier {
  position: relative;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
  background: #F5F5F5;
  margin:8px 5px 8px 0;
}
div.contact div.identifier {
  background: white;
}
</style>