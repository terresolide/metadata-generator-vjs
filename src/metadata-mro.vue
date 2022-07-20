<template>
  <span class="mro" @click="prevent($event)" :title="title">{{value}}</span>
</template>
<script>
 export default {
   name: 'MetadataMro',
   props: {
     value: {
       type: String,
       default: 'M'
     }
   },
   computed: {
     title () {
       switch(this.value) {
	       case 'M':
	         return 'Obligatoire'
	       case 'R':
	         return 'Recommandé'
	       case 'O':
	         return 'Optionnel'
       }
     }
   },
   methods: {
     prevent (e) {
       e.preventDefault()
       e.stopPropagation()
     }
   }
 }
</script>
<style>
 span.mro {
   padding: 2px;
   color: white;
   display:inline-block;
   text-align:center;
   min-width:20px;
   background: #333;
   font-weight:700;
   vertical-align:top;
 }
 div.block-prop > span.mro {
    float:right;
   margin:-3px 3px 0 0;
 }
 
 .datacite span.mro {
   background: darkred;
 }
 .iso span.mro {
   background: darkblue;
 }
</style>