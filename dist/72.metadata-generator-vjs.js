(self.webpackChunkmetadata_generator_vjs=self.webpackChunkmetadata_generator_vjs||[]).push([[72],{9158:(e,t,a)=>{(t=a(3645)(!1)).push([e.id,"\nspan.label[data-v-7c0d5314] {\n  color:#333;\n  font-weight:700;\n  display:inline-block;\n  vertical-align:top;\n}\nlabel[data-v-7c0d5314] {\n  font-weight:700;\n  font-size:1em;\n  min-width:70px;\n  max-width:70px;\n  vertical-align:baseline;\n}\ndiv.element-content > div[data-v-7c0d5314] {\n  margin-bottom:3px;\n}\n",""]),e.exports=t},2072:(e,t,a)=>{"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.r(t),a.d(t,{default:()=>l});const i={name:"MetadataRelated",components:{MetaMro:a(4776).Z},props:{id:{type:Number,default:-1},link:{type:Object,default:null},langs:{type:Array,default:function(){return["fr","en"]}}},created:function(){this.meta=this.link,this.changeLang(),console.log(this.languages)},watch:{link:{handler:function(e){this.meta=e},deep:!0},langs:function(e){this.changeLang()}},data:function(){return{meta:{relation:"IsDocumentedBy",url:null,type:"url",typeiso:"information",lang:"en",title:{fr:null,en:null},description:{fr:null,en:null}},languages:["en","fr"],relations:["IsCitedBy","Cites","IsSupplementTo","IsSupplementedBy","IsContinuedBy","Continues","IsDescribedBy","Describes","HasMetadata","IsMetadataFor","HasVersion","IsVersionOf","IsNewVersionOf","IsPreviousVersionOf","IsPartOf","HasPart","IsPublishedIn","IsReferencedBy","References","IsDocumentedBy","Documents","IsCompiledBy","Compiles","IsVariantFormOf","IsOriginalFormOf","IsIdenticalTo","IsReviewedBy","Reviews","IsDerivedFrom","IsSourceOf","IsRequiredBy","Requires","IsObsoletedBy","obsoletes"]}},methods:{change:function(){console.log(this.meta),this.$emit("change",{id:this.id,link:this.meta})},changeLang:function(){var e;this.languages=function(e){if(Array.isArray(e))return n(e)}(e=this.langs)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),console.log(this.languages),this.languages.indexOf(this.meta.lang)<0&&this.languages.unshift(this.meta.lang)},remove:function(){this.$emit("remove",this.id)}}};a(4980);const l=(0,a(1900).Z)(i,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"block-element"},[t("span",{staticClass:"circle"},[e._v(e._s(e.id+1))]),e._v(" "),t("div",{staticClass:"element-content"},[t("div",{staticClass:"fa fa-close",staticStyle:{position:"absolute",top:"0",right:"3px"},on:{click:e.remove}}),e._v(" "),t("div",[t("label",[e._v("Type")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.type,expression:"meta.type"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.meta,"type",t.target.multiple?a:a[0])}}},[t("option",{attrs:{value:"DOI"}},[e._v("DOI")]),e._v(" "),t("option",{attrs:{value:"URL"}},[e._v("URL")])])]),e._v(" "),t("div",[t("label",[e._v(e._s("DOI"===e.meta.type?"DOI":"URL"))]),e._v(" "),"checkbox"==("DOI"===e.meta.type?"text":"url")?t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.url,expression:"meta.url"}],staticStyle:{width:"425px"},attrs:{required:"",type:"checkbox"},domProps:{checked:Array.isArray(e.meta.url)?e._i(e.meta.url,null)>-1:e.meta.url},on:{change:[function(t){var a=e.meta.url,n=t.target,i=!!n.checked;if(Array.isArray(a)){var l=e._i(a,null);n.checked?l<0&&e.$set(e.meta,"url",a.concat([null])):l>-1&&e.$set(e.meta,"url",a.slice(0,l).concat(a.slice(l+1)))}else e.$set(e.meta,"url",i)},e.change]}}):"radio"==("DOI"===e.meta.type?"text":"url")?t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.url,expression:"meta.url"}],staticStyle:{width:"425px"},attrs:{required:"",type:"radio"},domProps:{checked:e._q(e.meta.url,null)},on:{change:[function(t){return e.$set(e.meta,"url",null)},e.change]}}):t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.url,expression:"meta.url"}],staticStyle:{width:"425px"},attrs:{required:"",type:"DOI"===e.meta.type?"text":"url"},domProps:{value:e.meta.url},on:{change:e.change,input:function(t){t.target.composing||e.$set(e.meta,"url",t.target.value)}}}),e._v(" "),t("meta-mro",{attrs:{value:"M"}})],1),e._v(" "),t("div",{staticClass:"datacite"},[t("label",[e._v("Relation")]),e._v("\n   La collection \n   "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.relation,expression:"meta.relation"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.meta,"relation",t.target.multiple?a:a[0])}}},[t("option",{attrs:{value:""}},[e._v("---")]),e._v(" "),e._l(e.relations,(function(a){return t("option",{domProps:{value:a}},[e._v(e._s(a))])}))],2),e._v(" ce lien\n   "),t("meta-mro",{attrs:{value:"M"}})],1),e._v(" "),t("div",[t("label",{staticStyle:{width:"auto","max-width":"none"}},[e._v("Langue principale du lien")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.link.lang,expression:"link.lang"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.link,"lang",t.target.multiple?a:a[0])},e.changeLang]}},[t("option",{attrs:{value:"fr"}},[e._v("fr")]),e._v(" "),t("option",{attrs:{value:"en"}},[e._v("en")])])]),e._v(" "),t("div",[t("label",{staticStyle:{"vertical-align":"top"}},[e._v("Titre")]),e._v(" "),t("div",{staticStyle:{display:"inline-block"}},e._l(e.languages,(function(a){return t("div",[t("span",{staticClass:"label"},[e._v(e._s(a))]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.title[a],expression:"meta.title[lang]"}],staticStyle:{width:"400px"},attrs:{type:"text",required:""},domProps:{value:e.meta.title[a]},on:{change:e.change,input:function(t){t.target.composing||e.$set(e.meta.title,a,t.target.value)}}}),e._v(" "),t("span",{staticClass:"iso"},[t("meta-mro",{attrs:{value:"M"}})],1),e._v(" "),t("span",{staticClass:"datacite"},[t("meta-mro",{attrs:{value:"O"}})],1)])})),0)]),e._v(" "),t("div",{staticClass:"iso"},[t("label",[e._v("Description")]),e._v(" "),e._l(e.langs,(function(a){return t("div",{staticStyle:{"margin-left":"72px"}},[t("span",{staticClass:"label"},[e._v(e._s(a))]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.description[a],expression:"meta.description[lang]"}],staticStyle:{width:"400px"},attrs:{type:"text"},domProps:{value:e.meta.description[a]},on:{change:e.change,input:function(t){t.target.composing||e.$set(e.meta.description,a,t.target.value)}}}),e._v(" "),t("meta-mro",{attrs:{value:"R"}})],1)}))],2)])])}),[],!1,null,"7c0d5314",null).exports},4980:(e,t,a)=>{var n=a(9158);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),(0,a(5346).Z)("2700c6bc",n,!0,{})}}]);
//# sourceMappingURL=72.metadata-generator-vjs.js.map