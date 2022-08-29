<template>
  <div>
    <h3>Charger un exemple</h3>
    <ul>
      <li v-for="example, id in examples" >
          <input type="checkbox" :checked="selected === id" @click="load(id)"/> {{example.name}}
      </li>
    </ul>
  </div>
</template>
<script>
const examples = 
  [ { name: 'GRACE Collection', import: () => import('./assets/exemples/exemple1.js')},
    {name: 'MNT Bathymétrique Nouvelle Calédonie', import: () => import('./assets/exemples/exemple2.js')}]

export default {
  name: 'MetadataExample',
  data () {
    return {
      examples: examples,
      selected: null
    }
  },
  methods: {
    reset () {
      this.selected = null
    },
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
<style scoped>
ul {
  list-style-type: none;
  margin: 3px 0;
  padding-left: 20px;
}
h3 {
  margin: 0;
}
</style>