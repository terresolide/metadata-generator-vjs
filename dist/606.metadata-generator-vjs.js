"use strict";(self.webpackChunkmetadata_generator_vjs=self.webpackChunkmetadata_generator_vjs||[]).push([[606],{9606:(t,e,a)=>{a.r(e),a.d(e,{default:()=>i});const n={name:"MetadataResolution",props:{id:{type:Number,default:-1},resolution:{type:Object,default:function(){return{value:null,unit:"m"}}},erasable:{type:Boolean,default:!0}},created:function(){this.meta=this.resolution},watch:{resolution:function(t){this.meta=t}},data:function(){return{meta:{value:null,unit:"m"}}},methods:{change:function(){this.$emit("change",{id:this.id,resolution:this.meta})},remove:function(){this.$emit("remove",this.id)}}},i=(0,a(4486).A)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"block-element"},[e("span",{staticClass:"circle"},[t._v(t._s(t.id+1))]),t._v(" "),e("div",{staticClass:"element-content"},[e("div",{staticClass:"fa fa-close",staticStyle:{position:"absolute",top:"0",right:"3px"},on:{click:t.remove}}),t._v(" "),e("span",{staticClass:"label",staticStyle:{"min-width":"100px","vertical-align":"baseline"}},[t._v("Résolution")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.meta.value,expression:"meta.value"}],attrs:{type:"number",required:""},domProps:{value:t.meta.value},on:{input:[function(e){e.target.composing||t.$set(t.meta,"value",e.target.value)},t.change]}}),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.meta.unit,expression:"meta.unit"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.meta,"unit",e.target.multiple?a:a[0])},t.change]}},[e("option",{attrs:{value:"cm"}},[t._v("cm")]),t._v(" "),e("option",{attrs:{value:"m"}},[t._v("m")]),t._v(" "),e("option",{attrs:{value:"km"}},[t._v("km")])])])])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=606.metadata-generator-vjs.js.map