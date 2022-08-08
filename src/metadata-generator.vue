<template>
 <div class="metadata-generator">
   <h1>Générateur de métadonnées Datacite et ISO19139 pour les collections ForM@Ter</h1>
   <div  style="float:left;width:calc(50% - 5px);">
   <metadata-form @change="initMetadata"></metadata-form>

  </div>
  <div style="width:calc(50% - 5px);float:left;margin-left:10px;">
  <div @click="changeGenerator">
	  Passer au  format 
	  <span v-if="generator === 'datacite'">ISO 19139</span> 
	  <span v-else>Datacite 4.4</span>
  </div>
  <div v-if="generator === 'datacite'">
    <datacite-generator :metadata="metadata"></datacite-generator>
  </div>
  <div v-else >
    <iso-generator :metadata="metadata"></iso-generator>
  </div>
  </div>
 
</div>
</template>
<script> 

import MetadataForm from './metadata-form.vue'
import DataciteGenerator from './datacite-generator.vue'
const IsoGenerator = () => import('./iso-generator.vue')
export default {
  name: 'MetadataGenerator',
  components: {
    MetadataForm,
    DataciteGenerator,
    IsoGenerator
    // ViewXml
  },
  props: {
    xsd: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      xml: null,
      metadata: {},
      generator: 'datacite'
    }
  },
  created () {
   
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    initMetadata (value) {
      console.log('meta change')
      this.metadata = value
    },
    changeGenerator () {
      if (this.generator === 'datacite') {
        this.generator = 'iso'
      } else {
        this.generator = 'datacite'
      }
    }
  }
}
</script>
<style>
div.metadata-generator {
  font-family: Arial;
}
div.metadata-generator div.header {
  border:1px solid grey;
  border-radius:5px;
  padding:10px;
}
div.code {
  white-space: pre;
}

span.xml-tree-tag {
  color: darkblue;
  display:inline-block;
  font-size:12px;
}
span.xml-tree-attr:nth-child(2n+1) {
  color:darkgreen;
}
span.xml-tree-attr:nth-child(2n+3) {
  color:darkred;
}
div.root_elem {
  margin-left: 10px;
}
div.root_elem span {
  font-size:12px;
}
</style>
