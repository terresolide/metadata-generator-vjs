(self.webpackChunkmetadata_generator_vjs=self.webpackChunkmetadata_generator_vjs||[]).push([[641],{6594:(t,e,a)=>{(e=a(3645)(!1)).push([t.id,"\nspan.label[data-v-aa308a1e] {\n  color:#333;\n  font-weight:700;\n  display:inline-block;\n  vertical-align:top;\n}\nlabel[data-v-aa308a1e] {\n  font-weight:700;\n  font-size:1em;\n  min-width:70px;\n  max-width:70px;\n  vertical-align:baseline;\n}\ndiv.element-content > div[data-v-aa308a1e] {\n  margin-bottom:3px;\n}\n",""]),t.exports=e},2641:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>n});const i={name:"MetadataService",components:{MetaMro:a(4776).Z},props:{id:{type:Number,default:-1},service:{type:Object,default:null},langs:{type:Array,default:function(){return["fr","en"]}}},created:function(){this.meta=this.service},watch:{service:{handler:function(t){this.meta=t},deep:!0}},data:function(){return{meta:{url:null,protocole:"OGC:WMS",title:{fr:null,en:null}},protocoles:["ESRI:REST","GLG:KML-2.0-http-get-map","OGC:CSW","OGC:KML","OGC:GML","OGC:SOS","OGC:WCS","OGC:WCS-1.1.0-http-get-capabilities","OGC:WFS","OGC:WFS-1.0.0-http-get-capabilities","OGC:WFS-G","OGC:WMC","OGC:WMS","OGC:WMS-1.1.1-http-get-capabilities","OGC:WMS-1.3.0-http-get-capabilities","OGC:WMS-1.1.1-http-get-map","OGC:WMS-1.3.0-http-get-map","OGC:WMTS","OGC:SOS-1.0.0-http-get-observation","OGC:SOS-1.0.0-http-post-observation","Opensearch","SensorThingApi","XYZ-Tile-Service"]}},methods:{change:function(){console.log(this.meta),this.$emit("change",{id:this.id,service:this.meta})},remove:function(){this.$emit("remove",this.id)}}};a(9559);const n=(0,a(1900).Z)(i,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"block-element iso"},[e("span",{staticClass:"circle"},[t._v(t._s(t.id+1))]),t._v(" "),e("div",{staticClass:"element-content"},[e("div",{staticClass:"fa fa-close",staticStyle:{position:"absolute",top:"0",right:"3px"},on:{click:t.remove}}),t._v(" "),e("div",[e("label",[t._v("URL")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.meta.url,expression:"meta.url"}],staticStyle:{width:"425px"},attrs:{required:""},domProps:{value:t.meta.url},on:{change:t.change,input:function(e){e.target.composing||t.$set(t.meta,"url",e.target.value)}}}),t._v(" "),e("meta-mro",{attrs:{value:"M"}})],1),t._v(" "),e("div",[e("label",{staticStyle:{"min-width":"92px"}},[t._v("Protocole")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.meta.protocole,expression:"meta.protocole"}],on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.meta,"protocole",e.target.multiple?a:a[0])}}},t._l(t.protocoles,(function(a){return e("option",{domProps:{value:a}},[t._v(t._s(a))])})),0),t._v(" "),e("meta-mro",{attrs:{value:"M"}})],1),t._v(" "),e("div",[e("label",{staticStyle:{"vertical-align":"top"}},[t._v("Titre")]),t._v(" "),e("div",{staticStyle:{display:"inline-block"}},t._l(t.langs,(function(a){return e("div",[e("span",{staticClass:"label"},[t._v(t._s(a))]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.meta.title[a],expression:"meta.title[lang]"}],staticStyle:{width:"400px"},attrs:{type:"text",required:""},domProps:{value:t.meta.title[a]},on:{change:t.change,input:function(e){e.target.composing||t.$set(t.meta.title,a,e.target.value)}}}),t._v(" "),e("meta-mro",{attrs:{value:"M"}})],1)})),0)]),t._v(" "),e("div",[e("label",[t._v("Description")]),t._v(" "),t._l(t.langs,(function(a){return e("div",{staticStyle:{"margin-left":"72px"}},[e("span",{staticClass:"label"},[t._v(t._s(a))]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.meta.description[a],expression:"meta.description[lang]"}],staticStyle:{width:"400px"},attrs:{type:"text"},domProps:{value:t.meta.description[a]},on:{change:t.change,input:function(e){e.target.composing||t.$set(t.meta.description,a,e.target.value)}}}),t._v(" "),e("meta-mro",{attrs:{value:"R"}})],1)}))],2)])])}),[],!1,null,"aa308a1e",null).exports},9559:(t,e,a)=>{var i=a(6594);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals),(0,a(5346).Z)("79e4a575",i,!0,{})}}]);
//# sourceMappingURL=641.metadata-generator-vjs.js.map