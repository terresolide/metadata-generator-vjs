<template>
 <div style="margin: 10px 5px;width:50%;display:inline-block;">
     <div>Charger un exemple:
       <ul>
         <li v-for="example, id in examples" >
             <input type="checkbox" :checked="selected === id" @click="load(id)"/> {{example.name}}
         </li>
       </ul>
     </div>
</div>
</template>
<script>
const examples = 
  [ { name: 'EXemple test', import: () => import('./assets/exemples/exemple1.js')}]

export default {
  name: 'MetadataExample',
  data () {
    return {
      examples: examples,
      selected: null
    }
  },
  methods: {
    load(id) {
      if (this.selected === id) {
        this.selected = null
        this.$emit('change', null)
        return
      }
      this.selected = id
      var self = this
      if (examples[id].json) {
        this.$emit('change', examples[id].json)
      } else {
	      examples[id].import()
	      .then(json => {
	          self.examples[id].json = json.default
	          self.$emit('change', json.default)
	      })
      }
    }
  }
}
</script>