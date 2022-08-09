<template>
 <div>
  
   <div class="header block-button" > 
     <h3 style="margin-top:0;">Formulaire</h3>
     <div class="header-right">
       <div class="iso" >
       <span class="mro" ></span>
       Ne concerne que la norme <b style="color:darkblue;">ISO19139</b>
       </div>
       <div class="datacite">
       <span class="mro" ></span>
       Ne concerne que le format <b style="color:darkred;">Datacite</b>
       </div>
       <div>
        <span class="mro" ></span>
        Concerne les 2 formats de métadonnées
       </div>
    </div>
    <div class="header-left" >
      <div><meta-mro value="M"></meta-mro> Mandatory/obligatoire</div>
      <div><meta-mro value="R"></meta-mro> Recommandé</div>
      <div><meta-mro value="O"></meta-mro> Optionnel</div>
    </div>
	  <div style="clear:both;height:0;">
	  </div>
  </div>
    <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label  @click="deploy($event)"><i class="fa"></i> Langue des metadonnées
       <formater-tooltip description="Pour Datacite, il vaut mieux <b>anglais</b>, pour ForM@Ter privilégiez le <b>français</b>.
        Bref c'est mieux d'utiliser les deux langues"></formater-tooltip>
     
     </label>
     <div class="properties" >
       <div>
	       <span class="label" style="min-width:130px;">Principale</span>
	       <span v-for="lang in ['fr', 'en']" style="margin-right:20px;">
	         <span >{{lang}}</span>
	         <input v-model="meta.mainLang" type="radio":value="lang" @input="mainLangChange"/>
	       </span>
       </div>
       <div>
	       <span class="label" style="min-width:130px;">Autre langue</span>
	       <span v-for="lang in ['fr', 'en']" v-if="lang !== meta.mainLang" style="margin-right:20px;">
	         <span >{{lang}}</span>
	         <input  v-model="meta.langs" :value="lang" type="checkbox" />
	       </span>
       </div>
     </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label  @click="deploy($event)"><i class="fa"></i> Langue des données</label>
     <div class="properties">
       <select v-model="meta.language">
         <option value="en">en</option>
         <option value="fr">fr</option>
       </select>
     </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label  @click="deploy($event)"><i class="fa"></i> Titre
     <formater-tooltip description="Titre lisible par un être humain. 
     Si possible sans acronyme, avec localisation et dates si pertinent....<br>
     Exemple: <em>Collection d'interférogrammes sur le Piton de la Fournaise depuis 2014</em>"></formater-tooltip>
     </label>
     <div class="properties">
       <div v-for="lang in meta.langs">
         <span class="label">{{lang}}</span>
         <input class="large" v-model="meta.title[lang]" type="text" required @change="propertyChange"/>
         <meta-mro value="M"></meta-mro>
       </div>
     </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Type de ressource</label>
     <div class="properties datacite">
       
       <span class="label"></span>
		   <select disabled>
		     <option value="Collection">Collection / series</option>
		   </select>
		   <input class="datacite" style="width:250px;" v-model="meta.resourceType" type="text" required placeholder="Collection of ...." /> 
		   <meta-mro value="M"></meta-mro>
		   <formater-tooltip description="En anglais uniquement.<br>
		   Il faut juste compléter le <em>Collection of ..</em> par le type de données ou produits en question">
		   </formater-tooltip>
	   </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Description
     </label>
     <div class="properties">
       <div v-for="lang in meta.langs">
         <span class="label">{{lang}}</span>
         <textarea class="large" v-model="meta.descriptions.Abstract[lang]" required @change="propertyChange"></textarea>
         <meta-mro value="M"></meta-mro>
       </div>
     </div>
   </div>
    <div class="block-prop" >
    <meta-mro value="M"></meta-mro>
     <label  @click="deploy($event)"><i class="fa"></i> Identifiant
     <formater-tooltip description="Pour <b>Datacite</b>, le DOI est obligatoire.<br>
     Pour l'<b>ISO19139</b>, au moins un identifiant <b>unique</b>, quel qu'il soit, est attendu">
     </formater-tooltip>
     </label>
     <div class="properties">
       <div class="datacite">
         <span class="label" style="display:block;">DOI</span>
         <input type="text" class="large" v-model="meta.doi" required @change="propertyChange($event)"/>
         <meta-mro value="M"></meta-mro>
       </div>
       <div v-for="identifier, id in meta.identifiers">
          <metadata-identifier :id="id" :identifier="identifier" @remove="removeIdentifier" @change="changeIdentifier"></metadata-identifier>
       </div>
       <input type="button" value="Ajouter identifiant" title="ajouter un identifiant" @click="addIdentifier" />
     </div>
   </div>
   <div class="block-prop iso" >
   <meta-mro value="M"></meta-mro>
   <label @click="deploy($event)"><i class="fa"></i> Contact pour les métadonnées
   </label>
   <div class="properties" >

       <metadata-contact :contact="meta.metaContact" :erasable="false" type="meta" 
       @change="changeMetaContact"></metadata-contact>
   </div>
   </div>
    <div class="block-prop" >
    <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Contacts pour les données
     </label>
     <div class="properties" >
       <div >
         <span class="label" style="display:block;max-width:350px;">Editeur des données (publisher)</span>
         <metadata-contact :contact="meta.publisher" :erasable="false" type="publisher"
         @change="changePublisher"></metadata-contact>
       </div>
       <div style="margin-bottom:10px;">
         <span class="label" style="display:block;">Créateur(s)</span>
         <div v-for="creator,id in meta.creators">
            <metadata-contact :id="id" :contact="creator" :erasable="meta.creators.length > 1" 
            type="creator" @change="changeCreator" @remove="removeCreator"></metadata-contact>
         </div>
         <div><input type="button" value="Ajouter créateur" @click="addCreator" /></div>
       </div>
       <div >
         <span class="label" style="display:block;">Contributeur(s)</span>
         <div v-for="contributor,id in meta.contributors">
            <metadata-contact :id="id" :contact="contributor" :erasable="true" 
            type="contributor" @change="changeContributor" @remove="removeContributor"></metadata-contact>
         </div>
         <div><input type="button" value="Ajouter contributeur" @click="addContributor" /></div>
       </div>
     </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Dates
     </label>
     <div class="properties">
        <div>
         <label class="bold">Date de publication</label>
         <input type="date" v-model="meta.publicationDate" required @change="publicationDateChange">
         <meta-mro value="M"></meta-mro>
         <formater-tooltip description="Cette date (année) est utilisée dans les citations <b>Datacite</b>. <br>
         Dans le cas d'un embargo sur les données, mettre la date à laquelle les données seront accessibles.">
         </formater-tooltip>
         <div>
         <label class="bold">Autres dates</label>
         <meta-mro value="O"></meta-mro>
         
         </div>
         <div v-for="date, id in meta.dates">
            <metadata-date :id="id" :date="date" :erasable="true" @change="changeDate"
            @remove="removeDate"></metadata-date>
         </div>
         <div>
         <input type="button" value="Ajouter date" @click="addDate"/>
         </div>
         
       </div>
     </div>
   </div>
    <div class="block-prop iso">
      <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Status
    
     </label>
     <div class="properties">
      <select v-model="meta.status">
       <option v-for="st in status" :value="st">{{st}}</option>
      </select>
       <formater-tooltip :width="350" description="Propriété ISO19139:
       <ul>
         <li><b>completed</b>: production de la ressource finalisée</li>
         <li><b>historicalArchive</b>: ressource archivée et hors ligne</li>
         <li><b>obsolete</b>: ressource obsolète</li>
         <li><b>onGoing</b>: ressource continuellement mise à jour</li>
         <li><b>planned</b>: ressource créée ou mise à jour sur base d'une date fixée</li>
         <li><b>required</b>: ressource qui doit être générée ou mise à jour</li>
         <li><b>underDevelopment</b>: en cours de création</li>
       </ul>"></formater-tooltip>
     </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Etendue spatiale 
     </label>
     <div class="properties">
       <div v-for="bbox, id in meta.geoLocation">
         <metadata-bbox :id="id" :erasable="meta.geoLocation.length > 1" :bbox="bbox" :selected="id === bboxId"
         @remove="removeBbox" @change="changeBbox" @draw="drawBbox"></metadata-bbox>
       </div>
         <input style="margin-left:-14px" type="button" value="Ajouter bbox" @click="addBbox" />
     </div>
   
   </div>
   <div class="block-prop iso">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Etendue temporelle 
     </label>
     <div class="properties">
       <div class="simple">
           <label>Date début</label>
           <input type="date" v-model="meta.temporalExtent.start" required />
           <meta-mro value="M"></meta-mro>
       </div>
       <div class="simple">
           <label>Date fin</label>
           <input type="date" v-model="meta.temporalExtent.end" />
           <meta-mro value="O"></meta-mro>
           <formater-tooltip description="Laissez vide, si les données/produits sont mesurées en continue">
           </formater-tooltip>
       </div>
     </div>
   </div>
   <div class="block-prop iso">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Type de représentation spatiale
       <formater-tooltip description="Propriété ISO10139, pas toujours adaptée aux données mais obligatoire. Dans le cas des relevés
        d'une station, choisissez <em>vector</em>:
        <ul><li><b>vector</b>: Donnée vecteur (point, ligne, polygone)</li>
        <li><b>grid</b>: Donnée raster ou matricielle</li>
        <li><b>textTable</b>: Fichier texte ou table</li>
        <li><b>tin</b>: Réseau de triangles réguliers</li>
        <li><b>stereoModel</b>: Vue tri-dimensionnelle formée par une paire d'images stéréoscopiques</li>
        <li><b>video</b>: enregistrement vidéo</li>
        </ul>"></formater-tooltip>
     </label>
     <div class="properties">
      <select v-model="meta.representationType">
       <option v-for="rp in representationType" :value="rp">{{rp}}</option>
      </select>
     </div>
   </div>
  
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)">
       <i class="fa"></i> 
       Format 
       <formater-tooltip description="Indiquez l'extension des fichiers de données ou son type MIME.<br>
     <b>Exemples</b>: <em>tif, txt, xml, pdf, png</em> ou encore <em>image/tif, application/xml....</em> ">
     </formater-tooltip>
     </label>
   
     
     <div class="properties">
       <metadata-format v-for="format, id in meta.formats" :key="id" :id="id" :format="format" @change="changeFormat"
       @remove="removeFormat"></metadata-format>
       <input type="button" value="Ajouter Format" @click="addFormat" />
      </div>
   </div>
    <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Mots-clés 
     </label>
     <div class="properties">
      <div v-for="keywords, type in meta.subjects" style="margin-bottom:5px;">
        <span  style="display:block;">
             <span class="label" style="min-width:130px;">{{categories[type]}}</span>
            
             <meta-mro v-if="type !== 'other'" value="R"></meta-mro>
             <meta-mro v-else value="O"></meta-mro>
              <formater-tooltip :description="subjects[type]"></formater-tooltip>
         </span>
       
        <metadata-keyword v-for="keyword, id in keywords" :type="type" :key="id" :id="id" :keyword="keyword" 
        :langs="meta.langs" @remove="removeKeyword" @change="changeKeyword"></metadata-keyword>
        <input type="button" value="Ajouter Mot-Clé" @click="addKeyword(type)"/>
      </div>
      </div>
   </div>
   <div class="block-prop iso">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Image d'illustration
     </label>
     <div class="properties">
      </div>
   </div>
   <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Lien
     </label>
     <div class="properties">
      <div v-for="link, id in meta.links">
        <metadata-link :link="link" :id="id" :langs="meta.langs" @change="changeLink" @remove="removeLink"></metadata-link>
      </div>
      <input type="button" value="Ajouter lien" @click="addLink"/>
      </div>
   </div>
   <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Généalogie 
     </label>
     <div class="properties">
         <label class="bold">Méthodes</label>
          <div v-for="lang in meta.langs">
	         <span class="label">{{lang}}</span>
	         <textarea class="medium" v-model="meta.descriptions.Methods[lang]" @change="propertyChange($event)"></textarea>
          <meta-mro value="R"></meta-mro>
          </div>
          <label class="bold">Informations Techniques</label>
          <div v-for="lang in meta.langs">
           <span class="label">{{lang}}</span>
           <textarea class="medium" v-model="meta.descriptions.TechnicalInfo[lang]" @change="propertyChange($event)"></textarea>
           <meta-mro value="O"></meta-mro>
          </div>
    </div>
   </div>
   <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Conditions d'accès et d'utilisation
     <formater-tooltip description="Décochez les conditions d'accès et d'utilisation si vous voulez saisir une license ou vos propres conditions"></formater-tooltip>
     </label>
     <div class="properties">
       <table>
         <thead>
           <th>Conditions</th>
           <th>Aucune</th>
           <th>Inconnue</th>
         </thead>
         <tbody>
           <tr>
             <td>Condition d'accès</td>
             <td>  <input type="checkbox" :checked="meta.condition.access === 'no'" @click="changeCondition('access', 'no')"/> </td>
             <td>  <input type="checkbox" :checked="meta.condition.access === 'unknown'" @click="changeCondition('access', 'unknown')"/> </td>
           </tr>
           <tr>
             <td>Condition d'utilisation</td>
             <td>  <input type="checkbox" :checked="meta.condition.use === 'no'" @click="changeCondition('use', 'no')"/> </td>
             <td>  <input type="checkbox" :checked="meta.condition.use === 'unknown'" @click="changeCondition('use', 'unknown')"/> </td>
           </tr>
         </tbody>
       </table>
        
       <div style="margin-bottom:5px;" v-if="!meta.condition.use"> 
          <span class="label" style="display:block;">License</span>
          <div v-if="meta.rights.license">
            <metadata-license :license="meta.rights.license" @remove="removeLicense" @change="changeLicense" ></metadata-license>
          </div>
          <input v-if="!meta.rights.license" type="button" value="Ajouter CC-BY-NC-4.0" @click="addLicenseCC" />
          <input v-if="!meta.rights.license" type="button" value="Ajouter autre license" @click="addLicense" />
       </div>
       <div v-if="!(meta.condition.access && meta.condition.use)">
          <span class="label" style="display:block;">Autre</span>
          <metadata-right v-for="right, id in meta.rights.others" :key="id" :id="id" :right="right" 
          :langs="meta.langs" :condition="meta.condition" @change="changeRight" @remove="removeRight"></metadata-right>
          <input type="button" value="Ajouter condition" @click="addRight" />
        </div>
     </div>
   </div>
    <div class="block-prop iso">
      <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Résolution spatiale
     </label>
     <div class="properties">
     <metadata-resolution v-for="resolution, id in meta.resolutions" :key="id" :id="id" :resolution="resolution" @change="changeResolution"
       @remove="removeResolution"></metadata-resolution>
       <input type="button" value="Ajouter Résolution" @click="addResolution" />
      </div>
   </div>
    <draw-bbox v-if="bboxId >= 0" :bboxes="meta.geoLocation" :id="bboxId" 
    @close="bboxId = -1" @change="changeBbox" @changeId="changeBboxId"></draw-bbox>
 </div>
</template>
<script>
const MetadataIdentifier = () => import('./metadata-identifier.vue')
import MetadataContact from './metadata-contact.vue'
import MetadataDate from './metadata-date.vue'
const MetadataFormat = () => import('./metadata-format.vue')
const MetadataBbox = () => import('./metadata-bbox.vue')
const MetadataKeyword = () => import('./metadata-keyword.vue')
const MetadataLicense = () => import('./metadata-license.vue')
const MetadataLink = () => import('./metadata-link.vue')
const MetadataResolution = () => import('./metadata-resolution.vue')
const MetadataRight = () => import('./metadata-right.vue')
import MetaMro from './metadata-mro.vue'
import FormaterTooltip from './formater-tooltip.vue'
const DrawBbox = () => import('./draw-bbox.vue')
import moment from 'moment'
export default {
  name: 'MetadataForm',
  components: {
    MetadataIdentifier,
    MetadataBbox,
    MetadataFormat,
    MetadataKeyword,
    MetadataLicense,
    MetadataLink,
    MetadataResolution,
    MetadataRight,
    MetadataContact,
    MetadataDate,
    FormaterTooltip,
    MetaMro,
    DrawBbox
  },
  props: {
    metadata: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      bboxId: -1,
      categories: {
        discipline: 'Discipline',
        featureOfInterest: 'Objet d\'intérêt',
        variable: 'Variable',
        platform: 'Plateforme',
        productType: 'Type de produit',
        other: 'Autre'
      },
      subjects: {
        discipline: 'Exemples: Géologie, Sismologie, Volcanologie, Tectonique ....',
        featureOfInterest: 'Exemples: Volcan Piton de la Fournaise, Acquifère d\'Ozark, Faille de San Andreas',
        platform: 'Exemples: Station gravimétrique, SENTINEL-1, Réseau GNSS RENAG',
        variable: 'Exemples: Mouvement du sol, Température, Pression, Déformation du sol, Champs magnétique ',
        productType: 'Interférogramme, Modèle Numérique de Surface ...',
        other: null
      },
      meta: null,
      status: ['completed', 'historicalArchive', 'obsolete', 'onGoing', 'planned', 'required', 'underDevelopment'],
      representationType:['vector', 'grid', 'textTable', 'tin', 'stereoModel', 'video' ]
    }
  },
  watch: {
     metadata: {
       handler (newvalue) {
         if (newvalue && newvalue.langs && newvalue.title) {
           this.meta = Object.assign(this.defaultMeta(), newvalue)
         } else {
           this.meta = this.defaultMeta()
         }
         this.change()
       },
       deep: true
     }
  },
  created () {
    this.initialize()
  },
  methods: {
    defaultMeta () {
      return {
        uuid: this.createUuid(),
        langs: ['fr', 'en'],
        doi: null,
        creators:[],
        title: {fr: null, en: null},
        publisher: {fullName: '', email: '', nameType: 'Organizational'},
        publicationDate: null,
        publicationYear: null,
        formats: [],
        descriptions: {
          Abstract: {fr: null, en: null}, 
          Methods: {fr: null, en: null},
          TechnicalInfo: {fr: null, en: null}
        },
        mainLang: 'fr',
        language: 'en',
        resourceType: 'Collection of',
        identifiers: [],
        links: [],
        subjects: {discipline: [], variable: [], platform:[], productType: [], featureOfInterest: [], other: []},
        metaContact: {fullName: 'ForM@Ter', email: 'contact@poleterresolide.fr', role: 'pointOfContact', nameType: 'Organizational'},
        contributors: [],
        dates: [],
        status: 'onGoing',
        geoLocation: [{name: null, west:null, east:null, north:null, south:null}],
        temporalExtent: {start: null, end: null},
        representationType: 'grid',
        condition: {
          access: 'unknown',
          use: 'unknown'
        },
        rights: {license: null, others: []},
        resolutions: []
      }
    },
    initialize () {
	      this.meta = this.defaultMeta()
	      this.addCreator()
	      this.change()
    },
    createUuid(){
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
      });
      return uuid;
    },
    drawBbox (bbox) {
      this.bboxId = bbox.id
    },
    propertyChange (event) {
      // validation
      event.target.value = event.target.value.trim()
      this.change()
    },
    publicationDateChange (event) {
      if (this.meta.publicationDate) {
        var date = moment(this.meta.publicationDate, 'YYYY-MM-DD')
        this.meta.publicationYear = date.format('YYYY')
      } else {
        this.meta.publicationYear = null
      }
      this.change()
    },
    addContributor () {
      this.meta.contributors.push({
        fullName: '',
        type: 'ContactPerson',
        role: 'pointOfContact',
        givenName: null,
        familyName: null,
        nameType: 'Personal',
        identifier: null,
        affiliations: [{name: '', identifier:null}]
      })
    },
    addBbox () {
      this.meta.geoLocation.push({name: null, west:null, east:null, north:null, south:null})
    },
    addCreator () {
      this.meta.creators.push({
        fullName: '',
		    givenName: null,
		    familyName: null,
		    role: 'pointOfContact',
		    nameType: 'Personal',
		    identifier: null,
		    affiliations: [ {name: '', identifier:null}] 
      })
    },
    addDate () {
      this.meta.dates.push({type: 'Updated', date: null, information: null})
    },
    addFormat () {
      this.meta.formats.push('')
    },
    addIdentifier () {
      this.meta.identifiers.push({})
    },
    addLicense () {
      this.meta.rights.license = {name: null, uri: null, identifier: null}
    },
    addLicenseCC () {
      this.meta.rights.license = {
          name: 'Creative Commons Attribution Non Commercial 4.0 International', 
          uri: 'https://creativecommons.org/licenses/by-nc/4.0/legalcode', 
          identifier: 'CC-BY-NC-4.0'}
    },
    addKeyword (type) {
      this.meta.subjects[type].push({title:{fr: null, en: null}, thesaurus: null, thesaurusId: -1, code: null})
    },
    addLink () {
      this.meta.links.push({url: null, relation: 'IsDocumentedBy', type: 'URL', typeiso: 'information', lang: 'en', title: {fr: null, en: null}, description: {fr: null, en: null}})
    },
    addResolution () {
      this.meta.resolutions.push({value: null, unit: 'm'})
    },
    addRight () {
      this.meta.rights.others.push({title:{fr: null, en: null}, url: {fr:null, en:null}})
    },
    change () {
      this.$emit('change', this.meta)
    },
    changeBbox (value) {
      this.meta.geoLocation[value.id] = value.bbox
      this.change()
    },
    changeBboxId (id) {
      this.bboxId = id
    },
    changeCondition (type, value) {
      if (this.meta.condition[type] === value) {
        this.meta.condition[type] = null
      } else {
        this.meta.condition[type] = value
      }
    },
    changeContributor (value) {
      this.meta.contributors[value.id] = value.contact
      this.change()
    },
    changeCreator (value) {
      this.meta.creators[value.id] = value.contact
      this.change()
    },
    changeDate (value) {
      this.meta.dates[value.id] = value.date
      this.change()
    },
    changeFormat (value) {
      console.log('change format', value)
      this.$set(this.meta.formats, value.id, value.format)
     // this.meta.format[value.id] = value.format
      this.change()
    },
    changeIdentifier (obj) {
      this.meta.identifiers[obj.id] = obj.identifier
      this.change()
    },
    changeKeyword (obj) {
      this.meta.subjects[obj.type][obj.id] = obj.keyword
    },
    changeLicense (license)  {
      this.meta.rights.license = license
      this.change()
    },
    changeLink (obj) {
      this.meta.links[obj.id] = obj.link
      this.change()
    },
    changeMetaContact (obj) {
      this.meta.metaContact = obj.contact
      this.change()
    },
    changePublisher (obj) {
      this.meta.publisher = obj.contact
      this.change()
    },
    changeResolution (obj) {
      this.meta.resolutions[obj.id] = obj.resolution
      this.change()
    },
    changeRight (obj) {
      this.meta.rights.others[obj.id] = obj.right
      this.change()
    },
//     exportJSON () {
//         let dataStr = JSON.stringify(this.meta);
//         let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//         let date = moment()
//         let exportFileDefaultName = 'metadata.' + date.format('YYYYMMDD') + '.json';

//         let linkElement = document.createElement('a');
//         linkElement.setAttribute('href', dataUri);
//         linkElement.setAttribute('download', exportFileDefaultName);
//         linkElement.click();
//         linkElement.remove()
//     },
    deploy (event) {
      var node = event.target
      while (node.tagName.toLowerCase() !== 'label') {
        node = node.parentNode
      }
      if (node.classList.contains('deployed')) {
        node.classList.remove('deployed')
      } else {
        node.classList.add('deployed')
      }
    },
    mainLangChange () {
//       console.log(e)
//       this.meta.mainLang = e.target.value === 'fr' ? 'en' : 'fr'
      var index = this.meta.langs.indexOf(this.meta.mainLang)
      console.log(index)
      if (index === 1) {
        this.meta.langs.pop()
        this.meta.langs.unshift(this.meta.mainLang)
      } else if (index < 0) {
        this.meta.langs.unshift(this.meta.mainLang)
      }
      console.log(this.meta.mainLang)
      console.log(this.meta.langs)
    },
//     readJSON (evt) {
//       let files = evt.target.files; // FileList object

//       // use the 1st file from the list
//       let f = files[0];
      
//       let reader = new FileReader();
//       var self = this
//       // Closure to capture the file information.
//       reader.onload = function(theFile) {
//         var meta = JSON.parse(reader.result)
//         if (meta.langs && meta.title) {
//           self.meta = Object.assign(self.meta, meta)
//           self.change()
//         }
//       };

//         // Read in the image file as a data URL.
//         reader.readAsText(f);
//     },
    removeBbox (id) {
      this.meta.geoLocation.splice(id, 1)
      this.change()
    },
    removeContributor (id) {
      this.meta.contributors.splice(id, 1)
      this.change()
    },
    removeCreator (id) {
      this.meta.creators.splice(id, 1)
      this.change()
    },
    removeDate (id) {
      this.meta.dates.splice(id, 1)
      this.change()
    },
    removeFormat (id) {
      console.log(id)
      console.log(this.meta.formats)
      this.meta.formats.splice(id, 1)
      console.log(this.meta.formats)
      this.change()
    },
    removeIdentifier (id) {
      this.meta.identifiers.splice(id, 1)
      this.change()
    },
    removeKeyword (obj) {
      this.meta.subjects[obj.type].splice(obj.id, 1)
      this.change()
    },
    removeLicense () {
      this.meta.rights.license = null
      this.change()
    },
    removeLink (id) {
      this.meta.links.splice(id, 1)
      this.change()
      
    },
    removeResolution (id) {
      this.meta.resolutions.splice(id, 1)
      this.change()
    },
    removeRight (id) {
      this.meta.rights.others.splice(id, 1)
      this.change()
    }
  }
}
</script>
<style scoped>
 table {
   border: 1px solid black;
   margin-bottom: 10px;
 }
 table th,
 table td {
   padding: 0 8px;
 }
 table td {
   text-align:center;
 }
 table th:first-child,
 table tr td:first-child {
   text-align: left;
 }
</style>
<style>
div.header-left {
   float:left;
   margin: 0px 0 10px 0px;
   min-width:220px;
   width:220px;
}
div.header-right {
   float:right;
   margin: 0px 0 10px 0px;
   width:calc(100% - 225px);
}
div.block-element,
div.element-field {
  margin-bottom:5px;
}
div.element-content {
  position:relative;
  display:inline-block;
  border: 1px solid grey;
 border-radius: 5px;
 background: #F5F5F5;
 padding: 5px 4px;
 margin-left:16px;
 min-width: calc(100% - 15px);
}
div.element-content.large {
  margin-left:0;
}
span.no-circle,
span.circle {
  display:inline-block;
  min-width:20px;
  text-align:center;
  margin-left: -40px;
  vertical-align:top;
}
span.circle {
  border: 1px solid black;
  border-radius: 10px; 
}

.header-left > div,
.header-right > div {
  margin-bottom:2px;
}
.header-right span.mro {
  vertical-align:middle;
  height:19px;
}
label.bold {
  font-weight:700;
}
div.block-prop {
  margin: 2px 0 0 2px;
  padding: 5px 0;
  border: 1px dotted lightgrey;
}
div.block-prop:nth-child(2n) {
  
  background: #EEE;
}
div.properties {
 display:block;
 margin-left:50px;
 margin-top:5px;
 max-width:600px;
}
div.simple {
  margin-bottom:2px;
}
div.simple label {
  min-width: 130px;
  max-width:130px;
  font-weight:700;
}
div.block-prop > label.fa:before {
  padding-right:5px;
  min-width:25px;
  display:inline-block;
}

label.fa-chevron-right + div.properties {
  display:none;
}
label + div.properties {
  display:none;
}
label.deployed + div.properties {
  display: block;
}

.fa-close {
  padding:3px;
  border: 1px dotted transparent;
  cursor: pointer;
}
.fa-close:hover {
  border-color: grey;
}

label,
span.label {
  color:#333;

  display:inline-block;
  vertical-align:top;
}
div.block-prop > label {
  font-weight:700;
  display:block;
  font-size:1.2rem;
  cursor:pointer;
}
div.block-prop > label > i.fa::before {
  content: "\f054";
  display:inline-block;
  width: 25px;
}
div.block-prop > label.deployed > i.fa::before {
  content: "\f078";
}
span.label {
  font-weight:700;
  min-width:20px;
  max-width:20px;
}
div.properties {
  display:block;
}
input:invalid,
textarea:invalid {
  outline: 1px solid red;
}
input[type="text"],
input[type="email"] {
  height:20px;
  line-height:20px;
  min-height:20px;
}
input[type=text].datacite {
  background: #ffccb;
}
input.medium {
  min-width:300px;
}
input.large {
  min-width: 450px;
}
input[type="button"] {
 cursor:pointer;
}
select {
   height:25px;
  line-height:25px;
  min-height:25px;
}
textarea.small {
  min-width: 500px;
  height: 30px;
}
textarea.medium {
  min-width: 500px;
  height: 50px;
}
textarea.large {
  min-width: 500px;
  height: 100px;
}
</style>