<template>
 <div class="metadata-generator">
   <h1>Générateur de métadonnées Datacite et ISO19139 pour les collections ForM@Ter</h1>
   <div  style="float:left;width:calc(50% - 5px);">
   <metadata-form @change="initMetadata"></metadata-form>

  </div>
  <div style="width:calc(50% - 5px);float:left;margin-left:10px;">
  <datacite-generator :metadata="metadata"></datacite-generator>

  </div>
 
</div>
</template>
<script> 

import MetadataForm from './metadata-form.vue'
import DataciteGenerator from './datacite-generator.vue'
;
export default {
  name: 'MetadataGenerator',
  components: {
    MetadataForm,
    DataciteGenerator,
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
      metadata: {}
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
