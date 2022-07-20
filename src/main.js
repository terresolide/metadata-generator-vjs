require("exports-loader?!./l.min.js")

import Vue from 'vue';
Vue.config.productionTip = false
//import CompositionApi from '@vue/composition-api'
//
//Vue.use(CompositionApi)

import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement)

//import VueResource from 'vue-resource';
//Vue.use(VueResource);

//pour la traduction 
//import VueI18n from 'vue-i18n';
//Vue.use(VueI18n);


import MetadataGenerator from './metadata-generator.vue'
// import CompassRose from './compass-rose.vue'
import 'leaflet/dist/leaflet.css'
ljs.addAliases({
  dep: [
     // font-awesome
     'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 
     // leaflet
    //  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css',
    // 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js'
     
   ]
})
ljs.load('dep', function() {
  Vue.customElement('metadata-generator', MetadataGenerator)
 // Vue.customElement('compass-rose', CompassRose)
})
    	  