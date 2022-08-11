<template>
 <div class="metadata-generator">
   <h1>Générateur de métadonnées Datacite et ISO19139 pour les collections ForM@Ter</h1>
   <div>
     <div style="margin-bottom:10px;">
	     <div style="margin:5px 0;"><em>En attendant mieux: pour <b>sauvegarder</b> votre saisie, 
	     vous pouvez exporter les métadonnées au format JSON et les ré-importer quand vous le souhaitez.</em>
	     </div>
		   <div>
		       <div style="text-align:right;margin-left:5px;display:inline-block;min-width:350px;">
		       Exporter les métadonnées dans le format JSON
		       </div>
		       <input type="button"  @click="exportJSON" value="Exporter">
		   </div>
		   <div>
		       <div style="text-align:right;margin-left:5px;display:inline-block;min-width:350px;">
		         Importer des métadonnées au format JSON
		       </div>
		       <input type="button" for="upload" value="Importer" @click="$el.querySelector('#upload').click()">
		       <input id="upload" type=file   accept="application/json" style="visibility:hidden" @change="readJSON" name="files[]" size=30>
		   </div>
	   </div>
	   <div style="display:inline-block;width:50%;padding: 0 5px;">
		   <metadata-examples ref="example" @change="changeMetadata"></metadata-examples>
		   
		 </div>
	   <div  style="display:inline-block;width:48%;vertical-align:top;">
	     <div style="margin-bottom:20px;">
	       <h3 style="margin:0;vertical-align:baseline;">
          Remettre les valeurs à zéro 
          <input type="button" value="Initialiser" @click="initDefaultMeta" /> 
         </h3>
	     </div>
	     <div>
		     <h3 style="margin:0;vertical-align:baseline;">Basculer vers le format 
				    <span v-if="generator === 'datacite'">
				       <input type="button" value="ISO 19139" @click="changeGenerator" />
				    </span> 
				    <span v-else>
				        <input type="button" value="Datacite 4.4" @click="changeGenerator" />
				    </span>
		     </h3>
	     </div>
	   </div>
   </div>
   <div  style="float:left;width:calc(50% - 5px);margin-top:10px;">
     <metadata-form ref="form" :metadata="defaultMeta" @change="initMetadata" ></metadata-form>
  </div>
  <div style="width:calc(50% - 5px);float:left;margin-left:10px;margin-top:10Px;">
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
import MetadataExamples from './metadata-examples.vue'
import DataciteGenerator from './datacite-generator.vue'
const IsoGenerator = () => import('./iso-generator.vue')
import moment from 'moment'

export default {
  name: 'MetadataGenerator',
  components: {
    MetadataForm,
    MetadataExamples,
    DataciteGenerator,
    IsoGenerator
  },
//   props: {
//     xsd: {
//       type: String,
//       default: null
//     }
//   },
  data () {
    return {
      metadata: {},
      defaultMeta: null,
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
      this.metadata = value
    },
    initDefaultMeta (value) {
      this.defaultMeta = null
      this.$refs.form.initialize()
      this.$refs.example.reset()
    },
    changeGenerator () {
      if (this.generator === 'datacite') {
        this.generator = 'iso'
      } else {
        this.generator = 'datacite'
      }
    },
    exportJSON () {
      let dataStr = JSON.stringify(this.metadata);
      let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      let date = moment()
      let exportFileDefaultName = 'metadata.' + date.format('YYYYMMDD') + '.json';
      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      linkElement.remove()
	  },
	  changeMetadata (meta) {
	    this.defaultMeta = meta
	   
	  },
    readJSON (evt) {
      let files = evt.target.files; // FileList object

      // use the 1st file from the list
      let f = files[0];
      
      let reader = new FileReader();
      var self = this
      // Closure to capture the file information.
      reader.onload = function(theFile) {
        var meta = JSON.parse(reader.result)
        if (meta) {
          self.defaultMeta = meta
        }
      };

        // Read in the image file as a data URL.
        reader.readAsText(f);
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
