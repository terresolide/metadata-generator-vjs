"use strict";(self.webpackChunkmetadata_generator_vjs=self.webpackChunkmetadata_generator_vjs||[]).push([[898],{5898:(t,e,a)=>{a.r(e),a.d(e,{default:()=>l});const i={name:"MetadataGraphic",components:{MetaMro:a(4776).Z},props:{id:{type:Number,default:-1},image:{type:Object,default:function(){return{url:null,title:{fr:null,en:null}}}},langs:{type:Array,default:function(){return["fr","en"]}},erasable:{type:Boolean,default:!0}},created:function(){this.meta=this.image},watch:{image:function(t){this.meta=t}},data:function(){return{meta:{url:null,title:{fr:null,en:null}}}},methods:{trim:function(){this.meta.url&&(this.meta.url=this.meta.url.trim());var t=this;this.langs.forEach((function(e){t.meta.title[e]=t.meta.title[e]?t.meta.title[e].trim():null})),this.change()},change:function(){this.$emit("change",{id:this.id,image:this.meta})},remove:function(){this.$emit("remove",this.id)}}},l=(0,a(1900).Z)(i,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"block-element"},[e("span",{staticClass:"circle"},[t._v(t._s(t.id+1))]),t._v(" "),e("div",{staticClass:"element-content"},[t.erasable?e("div",{staticClass:"fa fa-close",staticStyle:{position:"absolute",top:"0",right:"3px"},on:{click:t.remove}}):t._e(),t._v(" "),e("div",[e("label",{staticClass:"bold"},[t._v("Url / Nom de fichier")]),t._v(" "),e("div",{staticStyle:{"margin-left":"55px"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.meta.url,expression:"meta.url"}],staticClass:"large",attrs:{type:"text",required:""},domProps:{value:t.meta.url},on:{input:[function(e){e.target.composing||t.$set(t.meta,"url",e.target.value)},t.trim]}}),t._v(" "),e("meta-mro",{attrs:{value:"M"}})],1)]),t._v(" "),e("div",[e("label",{staticClass:"bold"},[t._v("Description")]),t._v(" "),t._l(t.langs,(function(a){return e("div",{staticStyle:{"margin-left":"30px"}},[e("span",{staticClass:"label"},[t._v(t._s(a))]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.meta.title[a],expression:"meta.title[lang]"}],staticClass:"large",domProps:{value:t.meta.title[a]},on:{change:t.trim,input:function(e){e.target.composing||t.$set(t.meta.title,a,e.target.value)}}}),t._v(" "),e("meta-mro",{attrs:{value:"R"}})],1)}))],2)])])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=898.metadata-generator-vjs.js.map