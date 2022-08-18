(self.webpackChunkmetadata_generator_vjs=self.webpackChunkmetadata_generator_vjs||[]).push([[559],{2879:(e,t,a)=>{(t=a(3645)(!1)).push([e.id,"\nlabel[data-v-3e86750e] {\n font-weight: 700;\n min-width: 100px;\n}\n",""]),e.exports=t},7559:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});const s={name:"MetadataKeyword",components:{FormaterTooltip:a(9987).Z},props:{id:{type:Number,default:-1},keyword:{type:Object,default:function(){}},type:{type:String,default:"discipline"},langs:{type:Array,default:function(){return["fr","en"]}}},created:function(){this.meta=this.keyword,this.keyword.thesaurusId>=0&&this.thesauri[this.type][this.keyword.thesaurusId]?this.meta.thesaurus=this.thesauri[this.type][this.keyword.thesaurusId]:(this.meta.thesaurusId=-1,this.meta.thesaurus=null),this.initialize(this.langs)},watch:{keyword:function(e){this.meta=this.keyword},langs:function(e){this.initialize(e)}},data:function(){return{meta:{thesaurus:{},title:{fr:null,en:null},thesaurusId:-1},enabledLangs:["fr","en"],thesauri:{discipline:[{id:"gcmdKeyword",name:"GCMD sciencekeywords",schemeUrl:"https://gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/sciencekeywords",valueRoot:"https://gcmd.earthdata.nasa.gov/kms/concept/",searchUrl:"https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/Earth%20Science?gtm_scheme=Earth%20Science",date:"2022-07-27 15:38:36",type:"theme",langs:["en"]},{id:"fmtDiscipline",name:"ForM@Ter - Disciplines et thèmes pour la Terre Solide",schemeUrl:"https://service.poleterresolide.fr/voc/science_field",valueRoot:"https://service.poleterresolide.fr/voc/science_field/",searchUrl:"https://service.poleterresolide.fr/voc/science_field",gn:"formater-discipline-gn",type:"discipline",date:"2021-06-23 07:02:17",langs:["fr","en"]}],platform:[{id:"gcmdPlatform",name:"GCMD platforms",schemeUrl:"https://gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/platforms",valueRoot:"https://gcmd.earthdata.nasa.gov/kms/concept/",searchUrl:"https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/platforms?gtm_scheme=platforms",date:"2022-08-09 14:34:26",type:"theme",langs:["en"]},{id:"fmtPlatform",name:"ForM@Ter - Plateformes",schemeUrl:"https://service.poleterresolide.fr/voc/platform",valueRoot:"https://service.poleterresolide.fr/voc/platform/",searchUrl:"https://service.poleterresolide.fr/voc/platform",date:"2021-06-24 05:43:04",gn:"formater-platform-gn",type:"theme",langs:["fr","en"]}],variable:[{id:"gcmdKeyword",name:"GCMD sciencekeywords",schemeUrl:"https://gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/sciencekeywords",valueRoot:"https://gcmd.earthdata.nasa.gov/kms/concept/",searchUrl:"https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/Earth%20Science?gtm_scheme=Earth%20Science",date:"2022-07-27 15:38:36",type:"theme",langs:["en"]},{id:"fmtVariable",name:"ForM@Ter - Variables",schemeUrl:"https://service.poleterresolide.fr/voc/variable",valueRoot:"https://service.poleterresolide.fr/voc/variable/",searchUrl:"https://service.poleterresolide.fr/voc/variable",date:"2021-06-23 09:53:17",type:"theme",gn:"formater-variable-gn",langs:["fr","en"]}],productType:[],featureOfInterest:[],other:[]}}},methods:{initialize:function(e){var t=this;this.meta.thesaurusId>=0?(this.enabledLangs=e.filter((function(e){return t.meta.thesaurus.langs.includes(e)})),0===this.enabledLangs.length&&(this.enabledLangs=this.meta.thesaurus.langs.slice(0,1))):this.enabledLangs=e},remove:function(){this.$emit("remove",{type:this.type,id:this.id})},change:function(){this.$emit("change",{type:this.type,id:this.id,keyword:this.meta})},thesaurusChange:function(){this.meta.thesaurusId>=0&&this.thesauri[this.type][this.meta.thesaurusId]?this.meta.thesaurus=this.thesauri[this.type][this.meta.thesaurusId]:(this.meta.thesaurusId=-1,this.meta.thesaurus=null),this.initialize(this.langs),this.change()},trim:function(){this.meta.code=this.meta.code?this.meta.code.trim():null;var e=this;this.enabledLangs.forEach((function(t){e.meta.title[t]=e.meta.title[t]?e.meta.title[t].trim():null}))}}};a(1811);const r=(0,a(1900).Z)(s,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"block-element"},[t("span",{staticClass:"circle"},[e._v(e._s(e.id+1))]),e._v(" "),t("div",{staticClass:"element-content"},[t("div",{staticClass:"fa fa-close",staticStyle:{position:"absolute",top:"0",right:"3px"},on:{click:e.remove}}),e._v(" "),t("div",{staticClass:"element-field"},[t("label",[e._v("Mot-clé")]),e._v(" "),e._l(e.enabledLangs,(function(a){return t("div",{staticStyle:{"margin-left":"80px"}},[t("span",{staticClass:"label"},[e._v(e._s(a))]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.title[a],expression:"meta.title[lang]"}],staticClass:"medium",attrs:{required:""},domProps:{value:e.meta.title[a]},on:{change:e.trim,input:function(t){t.target.composing||e.$set(e.meta.title,a,t.target.value)}}})])}))],2),e._v(" "),e.thesauri[e.type].length>0?t("div",{staticClass:"element-field"},[t("label",[e._v("Thésaurus")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.thesaurusId,expression:"meta.thesaurusId"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.meta,"thesaurusId",t.target.multiple?a:a[0])},e.thesaurusChange]}},[t("option",{domProps:{value:-1}},[t("em",[e._v("Aucun")])]),e._v(" "),e._l(e.thesauri[e.type],(function(a,s){return t("option",{domProps:{value:s}},[e._v(e._s(a.name))])}))],2)]):e._e(),e._v(" "),e.meta.thesaurusId>=0?t("div",{staticClass:"element-field"},[t("label",[e._v("Code / UUID")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.code,expression:"meta.code"}],staticClass:"medium",attrs:{required:""},domProps:{value:e.meta.code},on:{change:e.trim,input:function(t){t.target.composing||e.$set(e.meta,"code",t.target.value)}}}),e._v(" "),t("a",{attrs:{href:e.thesauri[e.type][e.meta.thesaurusId].searchUrl,target:"_blank"}},[t("i",{staticClass:"fa fa-search"}),e._v(" Rechercher\n       ")])]):e._e(),e._v(" "),"other"===e.type?t("div",[t("label",[e._v("Type")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.meta.type,expression:"meta.type"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.meta,"type",t.target.multiple?a:a[0])}}},[t("option",{attrs:{value:"discipline"}},[e._v("Discipline")]),e._v(" "),t("option",{attrs:{value:"place"}},[e._v("Localisation")]),e._v(" "),t("option",{attrs:{value:"stratum"}},[e._v("Couche géologique")]),e._v(" "),t("option",{attrs:{value:"temporal"}},[e._v("Temporel")]),e._v(" "),t("option",{attrs:{value:"theme"}},[e._v("Sujet particulier")])]),e._v(" "),t("formater-tooltip",{attrs:{description:"En cas de doute, mettre <em>Sujet particulier</em>"}})],1):e._e()])])}),[],!1,null,"3e86750e",null).exports},1811:(e,t,a)=>{var s=a(2879);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),(0,a(5346).Z)("2a14081e",s,!0,{})}}]);
//# sourceMappingURL=559.metadata-generator-vjs.js.map