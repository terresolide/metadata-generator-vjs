<template>
<div class="contact">
  <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
  <div v-if="type === 'publisher' || type === 'meta'">
    <div >
     <label>Organisation</label>
      <input type="text" v-model="meta.fullName"  style="width:300px;" required />
      <meta-mro value="M"></meta-mro>
      <formater-tooltip v-if="type === 'publisher'" description="Le nom de l'éditeur (publisher) est utilisé pour les 
      citations <b>Datacite</b> qui ont la forme:<br> <em>Creator (PublicationYear): 
      Title. Publisher. (resourceTypeGeneral). Identifier</em>"></formater-tooltip>
    </div>
    <div class="iso">
     <label>Adresse mail</label>
      <input type="email" v-model="meta.email" style="width:300px;" :required="type === 'meta'" /> 
      <meta-mro value="R"></meta-mro>
    </div>
  </div>
  <div v-if="type === 'creator' || type === 'contributor'">
      <div class="datacite" >
        <label>Type</label> 
        <select v-model="meta.nameType" @change="nameTypeChange">
          <option value="Organizational">Organizational</option>
          <option value="Personal">Personal</option>
        </select>
        <meta-mro value="M"></meta-mro>
    </div>
     <div v-if="meta.nameType === 'Personal'">
      <label>Prénom</label> 
      <input type="text" v-model="meta.givenName" @change="changeName"/>
      <meta-mro value="R"></meta-mro>
    </div >
    <div v-if="meta.nameType === 'Personal'">
      <label>Nom famille</label>
      <input type="text" v-model="meta.familyName" @change="changeName"/>
      <meta-mro value="R"></meta-mro>
    </div>
	  <div :class="{datacite: meta.nameType === 'Personal'}">
	      <label>Nom complet</label>
	      <input type="text" v-model="meta.fullName" required style="width:300px;" />
	      <meta-mro value="M"></meta-mro>
	      <formater-tooltip v-if="meta.nameType === 'Personal'" description="Le format doit être:<br>
	      <em>Nom de famille, Prénom</em><br>Exemple: Martin, Charles"></formater-tooltip>
	  </div>
	  <div class="iso">
	    <label>Email</label> 
	    <input type="email" v-model="meta.email" style="width:300px;"/>
	     <meta-mro value="R"></meta-mro>
	  </div>
	  <div v-if="type === 'contributor'" class="datacite">
	    <label>Rôle Datacite</label>
	    <select v-model="meta.type">
	      <option v-for="tp in contributorTypes" :value="tp">{{tp}}</option>
	    </select>
	    <meta-mro value="M"></meta-mro>
	  </div>
	   <div class="iso" v-if="type === 'contributor' || type === 'creator'">
      <label>Rôle ISO19139</label>
      <select v-model="meta.role">
        <option v-for="tp in roles" :value="tp">{{tp}}</option>
      </select>
       <meta-mro value="M"></meta-mro>
    </div>
    <div>
      <label>Affiliation(s)
      <formater-tooltip v-if="meta.nameType === 'Organizational'" description="Dans le cas d'une organisation, comme une équipe de recherche
      l'affiliation est l'institution à laquelle le groupe est rattaché"></formater-tooltip>
      </label>
      <span v-if="meta.nameType === 'Personal'">
       <meta-mro value="M"></meta-mro>
      </span>
      <span v-else class="datacite">
        <meta-mro value="O"></meta-mro>
      </span>
      <span v-for="affiliation, id in meta.affiliations">
        <metadata-affiliation :affiliation=affiliation :id="id" 
        :erasable="meta.affiliations.length > 1 || meta.nameType === 'Organizational'"
        @change="changeAffiliation" @remove="removeAffiliation"></metadata-affiliation>
      </span>
        <input type="button" value="Ajouter affiliation" @click="addAffiliation" />
        
    </div>
	  <div class="datacite">
	    <label>Identifiant</label>
	    <formater-tooltip description="Il s'agit d'identifiant de l'utilisateur auprès de
      registres internationaux comme ORCID"></formater-tooltip>
	    <meta-mro value="O"></meta-mro>
	    
	      <metadata-identifier v-if="meta.identifier" :type="meta.nameType" :identifier="meta.identifier"
	      @change="changeIdentifier"  @remove="removeIdentifier"></metadata-identifier>
	      <input type="button" value="Ajouter Id" @click="addIdentifier" title="Ajouter un identifiant pour le contact"/> 
	    </div>
	    
	    
	  </div>
	  
	</div>
</div>
</template>
<script>
 import MetadataIdentifier from './metadata-identifier.vue'
 import MetadataAffiliation from './metadata-affiliation.vue'
 import FormaterTooltip from './formater-tooltip.vue'
 import MetaMro from './metadata-mro.vue'
 export default {
   name: 'MetadataContact',
   components: {
     MetadataIdentifier,
     MetadataAffiliation,
     FormaterTooltip,
     MetaMro
   },
   props: {
//      key: {
//        type: Number,
//        default: 0
//      },
     id: {
       type: Number,
       default: -1
     },
     erasable: {
       type: Boolean,
       default: false
     },
     type: {
       type: String,
       default: 'publisher'
     },
     contact: {
       type: Object,
       default: () => {}
     }
   },
   data () {
     return {
       roles: ['resourceProvider','custodian','owner','user',
         'originator','pointOfContact',
         'principalInvestigator','processor',
         'publisher','author'],
       contributorTypes: ['ContactPerson','DataCollector','DataCurator',
         'DataManager','Distributor','Editor','HostingInstitution',
         'Producer','ProjectLeader','ProjectManager','ProjectMember',
         'RegistrationAgency','RegistrationAuthority','RelatedPerson',
         'Researcher','ResearchGroup','RightsHolder','Sponsor','Supervisor',
         'WorkPackageLeader','Other'],
       meta: {
       }
     }
   },
   watch: {
     contact (newvalue) {
       this.meta = this.contact
     }
   },
   created () {
     this.meta = this.contact
//      switch (this.type) {
// 	     case 'publisher':
// 	       this.meta = {
// 	           organizationName: null,
// 	           email: null
// 	       }
// 	       break
// 	     case 'creator':
// 	       this.meta = {
// 	         creatorName: this.contact.creatorName,
// 	         givenName: this.contact.givenName,
// 	         familyName: this.cont,
// 	         nameType: 'Personal',
// 	         identifiers: []
// 	       }
// 	       break
//      }
   },
   methods: {
     addAffiliation () {
       this.meta.affiliations.push({})
       this.change()
     },
     addIdentifier () {
       this.$set(this.meta, 'identifier', {type:'', identifier:null})
       this.meta.identifiers.push({})
     },
     changeAffiliation (obj) {
       this.meta.affiliations[obj.id] = obj.affiliation
       this.change()
     },
     changeIdentifier (obj) {
       this.$set(this.meta, 'identifier', obj.identifier)
       
       this.change()
     },
     nameTypeChange () {
       if (this.meta.nameType === 'Organizational') {
         this.meta.affiliations = []
       } else {
         this.addAffiliation()
       }
     },
     remove () {
       this.$emit('remove', this.id)
     },
     removeAffiliation (id) {
       this.meta.affiliations.splice(id, 1)
       this.change()
     },
     removeIdentifier (id) {
       this.meta.identifier = null
       this.change()
     },
     change () {
       this.$emit('change', {id: this.id, contact: this.meta})
     },
     changeName () {
       this.meta.fullName = this.meta.familyName ? (this.meta.familyName + ', ') : '' 
       this.meta.fullName += this.meta.givenName ? this.meta.givenName : ''
       this.change()
     }
   }
 }
</script>
<style scoped>
div.contact {
  position: relative;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
  min-width:500px;
  background: #F5F5F5;
  margin:8px 5px 8px 0;
}
label,
span.label {
  color:#333;
  font-weight:700;

  display:inline-block;
  vertical-align:top;
}
label {
  font-size:1em;
  min-width:120px;
  max-width:120px;
}

</style>