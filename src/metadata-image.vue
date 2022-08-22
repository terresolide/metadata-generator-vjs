<template>
<div class="block-element">
  <span class="circle">{{id + 1 }}</span>
  <div class="element-content">
     <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
   <div> 
      <label class="bold">Url / Nom de fichier</label>
      <div style="margin-left:55px;">
		    <input type="text" v-model="meta.url" class="large" required @input="trim" />
		    <meta-mro value="M"></meta-mro>
	    </div>
   </div>
   <div>
     <label class="bold">Description</label>
     <div v-for="lang in langs" style="margin-left: 30px;">
       <span class="label">{{lang}}</span>
       <input v-model="meta.title[lang]" class="large"  @change="trim"/>
        <meta-mro value="R"></meta-mro>
     </div>
   </div>
  </div>
</div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
export default {
  name: 'MetadataGraphic',
  components: {
    MetaMro
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    image: {
      type: Object,
      default: () => {return {url: null, title: {fr: null, en: null}}}
    },
    langs: {
      type: Array,
      default: () => ['fr', 'en']
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.image
  },
  watch: {
    image (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      meta: {url: null, title: {fr: null, en: null}}
    }
  },
  methods: {
    trim () {
      if (this.meta.url) {
        this.meta.url = this.meta.url.trim()
      }
      var self = this
      this.langs.forEach(function (lg) {
        self.meta.title[lg] = self.meta.title[lg] ? self.meta.title[lg].trim() : null
      })
      this.change()
    },
    change () {
      this.$emit('change', {id: this.id, image: this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>