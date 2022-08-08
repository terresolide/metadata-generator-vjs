<template>
<div class="block-element">
  <div class="element-content" style="margin-left:0;">
     <div style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <div style="margin-bottom:5px;">Pour rechercher les informations sur une license, rendez-vous sur<br>
	    <a href="https://spdx.org/licenses/" target="_blank">https://spdx.org/licenses/</a>
	    <formater-tooltip :width="300" description="Exemple:
	    <ul>
	       <li><b>Nom</b>: Etalab Open License 2.0</li>
	       <li><b>Url</b>: https://spdx.org/licenses/etalab-2.0.html</li>
	       <li><b>Identifiant</b>: etalab-2.0</li>
	     </ul>" ></formater-tooltip>
    </div>
    <div>
       <span class="label" style="min-width:80px;vertical-align:baseline;">Nom</span>
       <input v-model="meta.name" type="text" class="large" required @input="change"/>
       <meta-mro value="M"></meta-mro>
     </div>
     <div>
       <span class="label" style="min-width:80px;vertical-align:baseline;">Url</span>
       <input v-model="meta.uri" type="text" class="large" @input="change"/>
       <meta-mro value="R"></meta-mro>
     </div>
      <div>
       <span class="label" style="min-width:80px;vertical-align:baseline;">Identifiant</span>
       <input v-model="meta.identifier" type="text" @input="change"/>
       <meta-mro value="R"></meta-mro>
     </div>
  </div>
</div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
import FormaterTooltip from './formater-tooltip.vue'
export default {
  name: 'MetadataLicense',
  components: {
    MetaMro,
    FormaterTooltip
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    license: {
      type: Object,
      default: () => {return {name: null, uri: null, identifier: null}}
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.license
  },
  watch: {
    license (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      meta: {name: null, uri: null, identifier: null}
    }
  },
  methods: {
    change () {
      this.$emit('change', this.meta)
    },
    remove () {
      this.$emit('remove')
    }
  }
}
</script>