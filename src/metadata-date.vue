<template>
<div class="date">
 <div style="position:absolute;top:2px;right:5px;" class="fa fa-close" @click="remove"></div>
 
  <div>
  <label>Type</label>
  <select v-model="meta.type">
    <option v-for="tp in types" :value="tp" required>{{tp}}</option>
  </select>
  <span :class="{datacite: ['Created', 'Updated'].indexOf(meta.type) < 0}">
       <meta-mro value="M"></meta-mro>
  </span>
  <formater-tooltip description="Pour <b>ISO19139</b>, les valeurs possibles se limitent à 'Created' et 'Updated'
  et une unique date pour ces valeurs est possible"></formater-tooltip>
  </div>
  <div>
    <label>Date</label>
      <input type="date" v-model="meta.date" required @change="change" />
     <span :class="{datacite: ['Created', 'Updated'].indexOf(meta.type) < 0}">
       <meta-mro value="M"></meta-mro>
     </span>
  </div>
  <div v-if="['Updated', 'Issued', 'Other'].indexOf(meta.type) >= 0 ">
    <label>Information</label>
    <input type="text" v-model="meta.information" />
    <span class="datacite">
       <meta-mro value="O"></meta-mro>
     </span>
     <formater-tooltip description="Information supplémentaire sur la maj ou correction en question 
     par exemple:<br><em>Add orbit 789">
     </formater-tooltip>
  </div>
</div>
</template>
<script>
import FormaterTooltip from './formater-tooltip.vue'
import MetaMro from './metadata-mro.vue'
export default {
  name: 'MetadataDate',
  components: {
    FormaterTooltip,
    MetaMro
  },
  props: {
    id: {
      type:Number,
      default: -1
    },
    erasable: {
      type: Boolean,
      value: false
    },
    date: {
      type: Object,
      default: () => {return {type: 'Publication', date: null, information: null}}
    }
  },
  watch: {
    date (newvalue) {
      this.meta = newvalue
    }
  },
  created () {
     this.meta = this.date
  },
  data () {
    return {
      meta: null,
      types: ['Created', 'Updated', 'Accepted', 'Available', 'Copyrighted','Collected', 'Issued', 'Valid', 'Withdraw', 'Other']
    }
  },
  methods: {
    change () {
      this.$emit('change', {id: this.id, date: this.meta})
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
  min-width:120px;
  max-width:120px;
}
div.date {
  position: relative;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
  background: #F5F5F5;
  margin:8px 5px 8px 0;
}
</style>