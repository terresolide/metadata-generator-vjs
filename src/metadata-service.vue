<template>
<div class="block-element iso">
 <span class="circle">{{id + 1 }}</span>
 <div class="element-content">
   <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
   <div >
     <label>URL</label> 
     <input style="width:425px;"  required v-model="meta.url" @change="change"/>
     <meta-mro value="M"></meta-mro>
   </div>
   <div >
     <label style="min-width: 92px;">Protocole</label>
     <select v-model="meta.protocole">
       <option v-for="pt in protocoles" :value="pt">{{pt}}</option>
     </select> 
     <meta-mro value="M"></meta-mro>
   </div>

   <div>
     <label style="vertical-align:top;">Titre</label>
    
     <div style="display:inline-block;" >
	     <div v-for="lang in langs">
		      <span class="label">{{lang}}</span>
		      <input type="text" required style="width:400px;" v-model="meta.title[lang]" @change="change"/>
		      <meta-mro value="M"></meta-mro>
	      </div>
      </div>
   </div>
    <div >
     <label>Description</label>
     <div v-for="lang in langs" style="margin-left:72px;">
        <span class="label">{{lang}}</span>
        <input type="text" style="width:400px;" v-model="meta.description[lang]" @change="change"/>
        <meta-mro value="O"></meta-mro>
      </div>
   </div>
 </div>
</div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
export default {
  name: 'MetadataService',
  components: {
    MetaMro
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    service: {
      type: Object,
      default: null
    },
    langs: {
      type: Array,
      default: () => {return ['fr', 'en']}
    }
  },
  created () {
    this.meta = this.service
  },
  watch: {
    service: {
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
        protocole: 'OGC:WMS',
        title: {fr: null, en: null}
      },
      protocoles: ['ESRI:REST', 'GLG:KML-2.0-http-get-map', 'OGC:CSW', 'OGC:KML', 'OGC:GML', 'OGC:SOS',
         'OGC:WCS', 'OGC:WCS-1.1.0-http-get-capabilities', 'OGC:WFS', 'OGC:WFS-1.0.0-http-get-capabilities',
         'OGC:WFS-G', 'OGC:WMC', 'OGC:WMS', 'OGC:WMS-1.1.1-http-get-capabilities', 'OGC:WMS-1.3.0-http-get-capabilities',
         'OGC:WMS-1.1.1-http-get-map', 'OGC:WMS-1.3.0-http-get-map', 'OGC:WMTS', 'OGC:SOS-1.0.0-http-get-observation', 
         'OGC:SOS-1.0.0-http-post-observation', 'Opensearch', 'SensorThingApi','XYZ-Tile-Service']
    }
  },
  methods: {
    change () {
      console.log(this.meta)
      this.$emit('change', {id: this.id, service: this.meta})
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