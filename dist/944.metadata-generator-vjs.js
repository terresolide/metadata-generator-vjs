"use strict";(self.webpackChunkmetadata_generator_vjs=self.webpackChunkmetadata_generator_vjs||[]).push([[944],{4944:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var i=a(2798),n=a(2367);const s={name:"MetadataLicense",components:{MetaMro:i.A,FormaterTooltip:n.A},props:{id:{type:Number,default:-1},license:{type:Object,default:function(){return{name:null,uri:null,identifier:null}}},erasable:{type:Boolean,default:!0}},created:function(){this.meta=this.license},watch:{license:function(e){this.meta=e}},data:function(){return{meta:{name:null,uri:null,identifier:null}}},methods:{change:function(){this.$emit("change",this.meta)},remove:function(){this.$emit("remove")}}},l=(0,a(4486).A)(s,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"block-element"},[t("div",{staticClass:"element-content",staticStyle:{"margin-left":"0"}},[t("div",{staticClass:"fa fa-close",staticStyle:{position:"absolute",top:"0",right:"3px"},on:{click:e.remove}}),e._v(" "),t("div",{staticStyle:{"margin-bottom":"5px"}},[e._v("Pour rechercher les informations sur une license, rendez-vous sur"),t("br"),e._v(" "),t("a",{attrs:{href:"https://spdx.org/licenses/",target:"_blank"}},[e._v("https://spdx.org/licenses/")]),e._v(" "),t("formater-tooltip",{attrs:{width:300,description:"Exemple:\n\t    <ul>\n\t       <li><b>Nom</b>: Etalab Open License 2.0</li>\n\t       <li><b>Url</b>: https://spdx.org/licenses/etalab-2.0.html</li>\n\t       <li><b>Identifiant</b>: etalab-2.0</li>\n\t     </ul>"}})],1),e._v(" "),t("div",[t("span",{staticClass:"label",staticStyle:{"min-width":"80px","vertical-align":"baseline"}},[e._v("Nom")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.name,expression:"meta.name"}],staticClass:"large",attrs:{type:"text",required:""},domProps:{value:e.meta.name},on:{input:[function(t){t.target.composing||e.$set(e.meta,"name",t.target.value)},e.change]}}),e._v(" "),t("meta-mro",{attrs:{value:"M"}})],1),e._v(" "),t("div",[t("span",{staticClass:"label",staticStyle:{"min-width":"80px","vertical-align":"baseline"}},[e._v("Url")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.uri,expression:"meta.uri"}],staticClass:"large",attrs:{type:"text"},domProps:{value:e.meta.uri},on:{input:[function(t){t.target.composing||e.$set(e.meta,"uri",t.target.value)},e.change]}}),e._v(" "),t("meta-mro",{attrs:{value:"R"}})],1),e._v(" "),t("div",[t("span",{staticClass:"label",staticStyle:{"min-width":"80px","vertical-align":"baseline"}},[e._v("Identifiant")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.meta.identifier,expression:"meta.identifier"}],attrs:{type:"text"},domProps:{value:e.meta.identifier},on:{input:[function(t){t.target.composing||e.$set(e.meta,"identifier",t.target.value)},e.change]}}),e._v(" "),t("meta-mro",{attrs:{value:"R"}})],1)])])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=944.metadata-generator-vjs.js.map