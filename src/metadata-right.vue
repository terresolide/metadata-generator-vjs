<template>
<div class="block-element">
   <span class="circle" v-if="id > -1">{{id + 1 }}</span>
  <div class="element-content">
     <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <div>
    <label style="font-weight:700;vertical-align:baseline;">Type</label>
      <select v-model="meta.type" @change="updateCondition()">
        <option v-for="tp, id in types" :value="id">{{tp}}</option>
      </select>
    </div>
    <div>
       <span class="label" style="min-width:80px;vertical-align:baseline;">Description</span>
       <div v-for="lg in langs" style="margin-bottom:3px;margin-left:5px;">
          <span class="label">{{lg}}</span>
          <textarea v-model="meta.title[lg]"  class="small" required @input="change"></textarea>
           <meta-mro value="M"></meta-mro>
       </div>
 
     </div>
     <div class="datacite" v-if="id > -1">
       <span class="label" style="min-width:80px;vertical-align:baseline;">Url</span>
        <div v-for="lg in langs" style="margin-bottom:3px;margin-left:5px;">
         <span class="label">{{lg}}</span>
          <input v-model="meta.url[lg]"  style="min-width:500px;" @input="change">
          <meta-mro value="O"></meta-mro>
       </div>
     </div>
  </div>
</div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
import FormaterTooltip from './formater-tooltip.vue'
export default {
  name: 'MetadataRight',
  components: {
    MetaMro,
    FormaterTooltip
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    right: {
      type: Object,
      default: () => {return {name: null, uri: null, identifier: null}}
    },
    langs: {
      type: Array,
      default: () => {return ['fr', 'en']}
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.right
  },
  watch: {
    right (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      types: {access: 'Accès', use: 'Utilisation', both: 'Accès et utilisation'},
      meta: {type: 'access', title:{fr: null, en: null}, url:{fr:null, en: null}}
    }
  },
  methods: {
    change () {
      this.$emit('change', {id: this.id, right:this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    },
    updateCondition () {
      console.log('TYPE CHANGE')
      this.$emit('typeChange', {id: this.id, type: this.meta.type})
    }
  }
}
</script>