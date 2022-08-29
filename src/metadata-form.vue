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
      <div><meta-mro value="C"></meta-mro> Conditionnel</div>
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
       <div><label class="bold line">Encodage</label>
            <select disabled><option>utf8</option></select>
       </div>
     </div>
   </div>
   <div class="block-prop">
     <meta-mro value="M"></meta-mro>
     <label  @click="deploy($event)"><i class="fa"></i> Langue et encodage des données</label>
     <div class="properties">
       <div style="display:inline-block;margin-right:20px;">
         <label class="bold line">Langue</label>
	       <select v-model="meta.language">
	         <option value="en">en</option>
	         <option value="fr">fr</option>
	       </select>
	       <meta-mro value="M"></meta-mro>
       </div>
         <div style="display:inline-block;" class="iso">
         <label class="bold line">Encodage</label>
         <select v-model="meta.charset">
           <option v-for="charset in charsets" :value="charset">{{charset}}</option>
         </select>
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
    <div class="iso" style="float:right;margin: -3px 3px 0 0;"><meta-mro value="M"></meta-mro></div>
     <label  @click="deploy($event)"><i class="fa"></i> Identifiant de la collection
     <formater-tooltip description="Pour <b>Datacite</b>, il est optionnel.<br>
     Pour l'<b>ISO19139</b>, au moins un identifiant <b>unique</b>, autre que le DOI,  quel qu'il soit, est attendu">
     </formater-tooltip>
     </label>
     <div class="properties">
       <div v-for="identifier, id in meta.identifiers">
          <metadata-identifier :id="id" :identifier="identifier"
          :erasable="meta.identifiers.length > 1" @remove="removeIdentifier" @change="changeIdentifier"></metadata-identifier>
       </div>
       <input type="button" value="Ajouter identifiant" title="ajouter un identifiant" @click="addIdentifier" />
     </div>
   </div>
    <div class="block-prop" >
    <div class="datacite" style="float:right;margin: -3px 3px 0 0;"><meta-mro value="M"></meta-mro></div>
     <label  @click="deploy($event)"><i class="fa"></i> DOI, localisateur
     <formater-tooltip description="Pour <b>Datacite</b>, le DOI est obligatoire.<br>
     Pour l'<b>ISO19139</b>, il est interprété comme le lien vers la ressource.<br>
     (<em>si votre collection n'a pas de DOI, vous devez renseigner au moins un lien ou un service
     vers la ressource.</em>)">
     </formater-tooltip>
     </label>
     <div class="properties">
       <div >
         <span class="label" style="display:block;">DOI</span>
         <input type="text" class="large" v-model="meta.doi" required @change="propertyChange($event)"/>
         <span class="datacite"><meta-mro value="M"></meta-mro></span>
         <span class="iso"><meta-mro value="O"></meta-mro></span>
       </div>
      </div>
   </div>
   <div class="block-prop" >
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
     <formater-tooltip  :width="400" description="<b>Datacite</b> distinguent 3 types de contacts: 
     l'éditeur, les créateurs et les contributeurs<br>
     <b>ISO19139</b>: différencie les contacts avec leur rôle, si un contact a plusieurs rôles, saisir autant de fois que nécessaire
     le contact"></formater-tooltip>
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
     <meta-mro value="C"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Lien vers la ressource
     <formater-tooltip :width="450" description="Il s'agit de lien permettant d'accéder à la ressource: lien de téléchargement, interface de recherche,
      page d'information pour accéder à la ressource ...<br><br>
      Vous devez renseigner au moins un des éléments suivants: 
     <ul><li>le DOI</li>
     <li>ou un lien vers la ressource</li>
     <li>ou un service associé à la ressource</li>
     </ul>
     <br>"></formater-tooltip>
     
     
     </label>
     <div class="properties">
      <div v-for="link, id in meta.links">
        <metadata-link :link="link" :id="id" :langs="meta.langs" @change="changeLink" @remove="removeLink"></metadata-link>
      </div>
      <input type="button" value="Ajouter lien" @click="addLink"/> 
      <div style="font-size:0.8rem;">(<em>Autre que page du DOI</em>)</div>
      </div>
   </div>
    <div class="block-prop iso">
     <meta-mro value="C"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Service
     <formater-tooltip :width="450" description="Il s'agit de services associés comme WMS, WFS, SOS.... La liste n'est pas très explicite, y compris pour ForM@Ter et 
     le protocole n'est pas toujours bien entré par les responsables!
     Pour le moment, nous sommes en capacité d'utiliser les services pour les protocoles:
     <ul>
       <li>WFS</li>
       <li>WMS: OGC:WMS, OGC:WMS-1.1.1-http-get-capabilities ...</li>
       <li>WMTS</li>
       <li>XYZ-Tile-Service</li>
       <li>OpenSearch</li>
     </ul>"></formater-tooltip>
     
     
     </label>
     <div class="properties">
      <div v-for="service, id in meta.services">
        <metadata-service :service="service" :id="id" :langs="meta.langs" @change="changeService" @remove="removeService"></metadata-service>
      </div>
      <input type="button" value="Ajouter service" @click="addService"/>
      </div>
   </div>
    <div class="block-prop iso">
      <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Status de la collection
    
     </label>
     <div class="properties">
      <select v-model="meta.status">
       <option v-for="st, id in status" :value="id">{{st}}</option>
      </select>
     </div>
   </div>
     <div class="block-prop iso">
      <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Fréquence de maintenance des données
    
     </label>
     <div class="properties">
      <select v-model="meta.maintenance">
       <option v-for="st, id in maintenance" :value="id">{{st}}</option>
      </select>
     </div>
   </div>
   <div class="block-prop iso">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Type de représentation spatiale
       <formater-tooltip description="Propriété ISO10139, pas toujours adaptée aux données mais obligatoire.<br>
       Dans le cas des relevés d'une station, choisissez <em>vector</em>"></formater-tooltip>
     </label>
     <div class="properties">
       <metadata-representation v-for="rep, id in meta.representations" :key="id" :id="id" :representation="rep" :erasable="id > 0"
       @change="changeRepresentation" @remove="removeRepresentation"></metadata-representation>
       <input type="button" value="Ajouter représentation" @click="addRepresentation" />
     </div>
   </div>
   <div class="block-prop iso">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Référentiel des coordonnées
       <formater-tooltip :width="450" description="Il s'agit du référentiel utilisé pour les produits/données accessibles à l'utilisateur.
       <br>Si non pertinent: laissez le WGS 84 (2D) utilisé pour les métadonnées.<br>
       Une liste de référentiels est proposée, si le référentiel utilisé ne s'y trouve pas, vous devez saisir au moins son nom.<br>
       Vous pouvez saisir plusieurs référentiels."></formater-tooltip>
     </label>
     <div class="properties">
       <metadata-referentiel v-for="ref, id in meta.referentiels" :key="id" :id="id" :referentiel="ref"
       :erasable="id > 0" @change="changeReferentiel" @remove="removeReferentiel"></metadata-referentiel>
       <input type="button" value="Ajouter référentiel" @click="addReferentiel" />
     </div>
   </div>

    <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Mot-clé 
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
   <div class="block-prop">
     <meta-mro value="C"></meta-mro>
     <label @click="deploy($event)">
       <i class="fa"></i> 
       Theme INSPIRE
       <formater-tooltip :width="450" description="Catégorisation INSPIRE des données spatiales, sous forme de mot-clé du thésaurus <b>GEMET</b><br>
       <b> Obligatoire</b> selon les directives INSPIRE.<br>
       N'est pas adaptée à tous les produits!<br>
       Si aucune catégorie ne correspond à vos produits, laissez vide">
     </formater-tooltip>
     </label>
     <div class="properties">
       <select v-model="inspire" @change="updateInspire">
         <option value="">----</option>
         <option v-for="theme, id in themes" :value="id">{{theme.title.fr}}</option>
       </select>
       
      </div>
   </div>
    <div class="block-prop iso">
     <meta-mro value="M"></meta-mro>
     <label @click="deploy($event)">
       <i class="fa"></i> 
       Catégorie thématique
       <formater-tooltip description="Catégorisation thématique ISO19139 haut niveau">
     </formater-tooltip>
     </label>
     <div class="properties">
       <metadata-topic v-for="value, id in meta.categories" :topic="value" :id="id" :key="id"
       :erasable="id > 0" @change="changeTopic" @remove="removeTopic"></metadata-topic>
        <input type="button" value="Ajouter catégorie" @click="addTopic('')"/>
      
      </div>
   </div>
   <div class="block-prop iso">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Image d'illustration
     </label>
     <div class="properties">
       <metadata-image v-for="img, id in meta.images" :key="id" :id="id" :image="img" :langs="meta.langs"
       @change="changeImage" @remove="removeImage"></metadata-image>
       <input type="button" value="Ajouter image" @click="addImage" /> 
      </div>
   </div>

   <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Généalogie 
     </label>
     <div class="properties">
         <label class="bold">Niveau</label>
         <div style="margin-left:22px;">
	         <select v-model="meta.methodScope">
	           <option value="dataset">Jeux de données</option>
	           <option value="series">Série de jeux de données</option>
	         </select>
            <span class="iso"><meta-mro value="M"></meta-mro></span>
         </div>
         <label class="bold">Méthodes</label>
          <div v-for="lang in meta.langs">
	         <span class="label">{{lang}}</span>
	         <textarea class="medium" v-model="meta.descriptions.Methods[lang]" @change="propertyChange($event)"></textarea>
          <meta-mro value="R"></meta-mro>
          </div>
  <!--        <label class="bold">Informations Techniques</label>
          <div v-for="lang in meta.langs">
           <span class="label">{{lang}}</span>
           <textarea class="medium" v-model="meta.descriptions.TechnicalInfo[lang]" @change="propertyChange($event)"></textarea>
           <meta-mro value="O"></meta-mro>
          </div>  --> 
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
             <td>Restrictions d'accès</td>
             <td>  <input type="checkbox" disabled :checked="meta.condition.access === 'no'" @click="changeCondition('access', 'no')"/> </td>
             <td>   </td>
           </tr>
           <tr>
             <td>Conditions d'accès et utilisation</td>
             <td>  <input type="checkbox" :disabled="useCondition" :checked="meta.condition.use === 'no'" @click="changeCondition('use', 'no')"/> </td>
             <td>  <input type="checkbox" :disabled="useCondition" :checked="meta.condition.use === 'unknown'" @click="changeCondition('use', 'unknown')"/> </td>
           </tr>
         </tbody>
       </table>
        <div style="margin-bottom:5px;" > 
          <span class="label" style="display:block;max-width:350px;">Restriction d'accès public INSPIRE
          <formater-tooltip description="S'il y a une restriction d'accès public...<br>
          Choisir parmi les restrictions d'accès public
           définies par les directives INSPIRE"></formater-tooltip>
           <span class="iso"><meta-mro value="C"></meta-mro></span>
          </span>
          <div v-if="meta.rights.inspire" style="width:100%;margin-left:-15px;">
            <metadata-right :right="meta.rights.inspire" :is-inspire="true" :fixed="true" @remove="removeInspireRight" @change="changeInspireRight" ></metadata-right>
          </div>
          <input v-if="!meta.rights.inspire" type="button" value="Ajouter restriction" @click="addInspireRight" />
       </div>
       <div style="margin-bottom:5px;" > 
          <span class="label" style="display:block;">License</span>
          <div v-if="meta.rights.license">
            <metadata-license :license="meta.rights.license" @remove="removeLicense" @change="changeLicense" ></metadata-license>
          </div>
          <input v-if="!meta.rights.license" type="button" value="Ajouter CC-BY-NC-4.0" @click="addLicenseCC" />
          <input v-if="!meta.rights.license" type="button" value="Ajouter autre license" @click="addLicense" />
       </div>
       <div>
           <span class="label iso" style="display:block;min-width:200px;">
             Comment citer
             <meta-mro value="R"></meta-mro>
             <input type="button" :value="meta.rights.howToCite ? 'Mettre à jour' : 'Ajouter citation'" @click="addHowToCite"/>
           </span>
           <div v-if="meta.rights.howToCite" class="iso"  style="width:100%;margin-left:-15px;" >
           <metadata-right :id="-1" :right="meta.rights.howToCite" :fixed="true" :langs="meta.langs"  
           @remove="removeHowToCite" @change="changeHowToCite" ></metadata-right>
           </div>
           
       </div>
       <div >
          <span class="label" style="display:block;">Autre</span>
           <metadata-right v-for="right, id in meta.rights.others" :key="id" :id="id" :right="right" :fixed="false"
          :langs="meta.langs"  @change="changeRight" @remove="removeRight" @typeChange="changeRightType"></metadata-right>
          <input type="button" value="Ajouter condition" @click="addRight" />
        </div>
     </div>
   </div>
      <div class="block-prop">
     <meta-mro value="R"></meta-mro>
     <label @click="deploy($event)">
       <i class="fa"></i> 
       Format des ressources
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
    <div class="block-prop">
     <meta-mro value="O"></meta-mro>
     <label @click="deploy($event)"><i class="fa"></i> Lien vers d'autres ressources
     <formater-tooltip :width="450" description="Il"></formater-tooltip>
     
     
     </label>
     <div class="properties">
      <div v-for="link, id in meta.related">
        <metadata-related :link="link" :id="id" :langs="meta.langs" @change="changeRelated" @remove="removeRelated"></metadata-related>
      </div>
      <input type="button" value="Ajouter lien" @click="addRelated"/> 
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
const MetadataRelated = () => import('./metadata-related.vue')
const MetadataService = () => import('./metadata-service.vue')
const MetadataResolution = () => import('./metadata-resolution.vue')
const MetadataRight = () => import('./metadata-right.vue')
const MetadataTopic = () => import('./metadata-topic.vue')
const MetadataImage = () => import('./metadata-image.vue')
const gemet = () => import('./assets/thesaurus/gemet.1.0.js')
import MetaMro from './metadata-mro.vue'
import MetadataRepresentation from './metadata-representation.vue'
import MetadataReferentiel from './metadata-referentiel.vue'
import FormaterTooltip from './formater-tooltip.vue'
const DrawBbox = () => import('./draw-bbox.vue')
import moment from 'moment'
export default {
  name: 'MetadataForm',
  components: {
    MetadataIdentifier,
    MetadataBbox,
    MetadataFormat,
    MetadataImage,
    MetadataKeyword,
    MetadataLicense,
    MetadataLink,
    MetadataRelated,
    MetadataRepresentation,
    MetadataReferentiel,
    MetadataResolution,
    MetadataRight,
    MetadataTopic,
    MetadataService,
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
  computed: {
    citation () {
      var creators = []
      this.meta.creators.forEach(function (creator) {
        if (creator.fullName) {
          creators.push(creator.fullName)
        }
      })
      var citation = creators.length > 0 ? creators.join('; ') : 'Créateur'
      var year = this.meta.publicationDate ? this.meta.publicationDate.substr(0,4) : 'Année publication'
      citation += ' (' + year + '): ' 
      var title = this.meta.title[this.meta.mainLang] ? this.meta.title[this.meta.mainLang] : 'Titre'
      citation += title + '. '
      citation += this.meta.publisher.fullName ? this.meta.publisher.fullName : 'Editeur'
      citation += '. (Collection), '
      citation += this.meta.doi ?  'https://doi.org/' + this.meta.doi : 'url doi'
      return citation
    }
  },
  data () {
    return {
      accessCondition: false,
      useCondition: false,
      bboxId: -1,
      categories: {
        discipline: 'Discipline',
        featureOfInterest: 'Objet d\'intérêt',
        variable: 'Variable',
        platform: 'Plateforme',
        productType: 'Type de produit',
        other: 'Autre'
      },
      inspire: '',
      themes: null,
      gemet: null,
      subjects: {
        discipline: 'Exemples: Géologie, Sismologie, Volcanologie, Tectonique ....',
        featureOfInterest: 'Exemples: Volcan, Aquifère, Faille, Manteau ...',
        platform: 'Exemples: Station gravimétrique, SENTINEL-1, Réseau GNSS RENAG',
        variable: 'Exemples: Mouvement du sol, Température, Pression, Déformation du sol, Champs magnétique ',
        productType: 'Interférogramme, Modèle Numérique de Surface ...',
        other: null
      },
      meta: null,
      status: {
        completed: 'Production de la ressource finalisée',
        historicalArchive: 'Ressource archivée et hors ligne',
        obsolete: 'Ressource obsolète',
        onGoing: 'Ressource continuellement mise à jour',
        planned: 'Ressource créée ou mise à jour sur base d\'une date fixée',
        required: 'Ressource qui doit être générée ou mise à jour',
        underDevelopment: 'En cours de création'
      },
      maintenance: {
        continual: 'mise à jour en continue',
        daily: 'journalière',
        weekly: 'hebdomadaire',
        fortnightly: 'bi-mensuelle',
        monthly: 'mensuelle',
        quaterly: 'trimestrielle',
        biannualy: 'bi-annuelle',
        asNeeded: 'lorsque nécessaire',
        irregular: 'irrégulière',
        notPlanned: 'non-planifiée',
        unknown: 'inconnue'
      },
      charsets: ['utf7', 'utf8', 'utf16', 'usAscii', 'ucs2', 'ucs4', '8859part1', '8859part2', '8859part3', '8859part4', '8859part5',
        '8859part6', '8859part7', '8859part8', '8859part9', '8859part10', '8859part11', '8859part12', '8859part13', '8859part14',
        '8859part15', '8859part16', 'jis', 'shiftJIS', 'eucJP', 'ebcdic', 'eucKR', 'big5', 'GB2312']
    }
  },
  watch: {
     metadata: {
       handler (newvalue) {
         if (newvalue && newvalue.langs && newvalue.title) {
           this.meta = Object.assign(this.defaultMeta(), newvalue)
           this.initInspire()
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
        changement: 0,
        uuid: this.createUuid(),
        langs: ['fr', 'en'],
        doi: null,
        creators:[],
        title: {fr: null, en: null},
        publisher: {fullName: '', email: '', nameType: 'Organizational', 'role': 'publisher'},
        publicationDate: null,
        publicationYear: null,
        formats: [],
        descriptions: {
          Abstract: {fr: null, en: null}, 
          Methods: {fr: null, en: null}
        },
        inspire: null,
        methodScope: 'dataset',
        mainLang: 'fr',
        language: 'en',
        charset: 'utf8',
        resourceType: 'Collection of',
        identifiers: [{type:null, identifier: null}],
        links: [],
        related: [],
        services: [],
        subjects: {discipline: [], variable: [], platform:[], productType: [], featureOfInterest: [], other: []},
        categories: [],
        representations: ['grid'],
        metaContact: {fullName: 'ForM@Ter', email: 'contact@poleterresolide.fr', role: 'pointOfContact', type: 'DataCurator', affiliations:[], nameType: 'Organizational'},
        contributors: [],
        dates: [],
        status: 'onGoing',
        geoLocation: [{name: null, west:null, east:null, north:null, south:null}],
        temporalExtent: {start: null, end: null},
        maintenance: 'asNeeded',
        referentiels: [{name: 'WGS 84', link: 'http://www.opengis.net/def/crs/EPSG/0/4326'}],
        images: [],
        condition: {
          access: 'no',
          use: 'unknown'
        },
        rights: {license: null, howToCite: null, inspire: null, others: []},
        resolutions: []
      }
    },
    initialize () {
	      this.meta = this.defaultMeta()
	      this.addCreator()
	      this.addTopic('geoscientificInformation')
	      var self = this
	      gemet()
        .then(json => {
            self.themes = json.default.data
            self.gemet = json.default.thesaurus
        })
        this.accessCondition = false
        this.useCondition = false
      //  this.referentielCode = null
        this.inspire = ''
        this.bboxId = -1
	      this.change()
    },
    initInspire () {
      if (!this.meta.inspire) {
        this.inspire = ''
      }  else {
        var index = this.themes.findIndex(th => th.uri === this.meta.inspire.uri) 
        this.inspire = index >=0 ? index : ''
      }
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
    doiChange (event) {
      event.target.value = event.target.value.trim()
      if (event.target.value) {
        
      }
      this.change()
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
    addHowToCite () {
      this.meta.condition.use = null
      this.meta.rights.howToCite = {
          type: 'use',
          code: 'otherRestrictions',
          title: {
            fr: 'Comment citer la collection: "' + this.citation + '"',
            en: 'How to cite: "' + this.citation + '"'
          },
          url: {fr: null, en: null}
      }
      this.updateCondition()
    },
    addIdentifier () {
      this.meta.identifiers.push({})
    },
    addImage () {
      this.meta.images.push({url: null, title: {fr: null, en: null}})
    },
    addInspireRight () {
      this.meta.condition.use = null
      this.meta.rights.inspire = {
          type: 'access',
          code: 'otherRestrictions',
          title: {
            fr: '',
            en: ''
          },
          inspire: 'INSPIRE_Directive_Article13_1e',
          url: {fr: null, en: null}
      }
      this.updateCondition()
    },
    addLicense () {
      this.meta.rights.license = {name: null, uri: null, identifier: null, code: 'license', type: 'use'}
      this.updateCondition()
    },
    addLicenseCC () {
      this.meta.condition.use = null
      this.meta.rights.license = {
          name: 'Creative Commons Attribution Non Commercial 4.0 International', 
          uri: 'https://creativecommons.org/licenses/by-nc/4.0/legalcode',
          code: 'license',
          type: 'use',
          identifier: 'CC-BY-NC-4.0'}
      this.updateCondition()
    },
    addKeyword (type) {
      this.meta.subjects[type].push({title:{fr: null, en: null}, type: this.keywordType(type), thesaurus: null, thesaurusId: -1, code: null})
    },
    addLink () {
      this.meta.links.push({url: null, type: 'URL', funct: 'information', protocole: 'WWW:LINK-1.0-http--link', title: {fr: null, en: null}, description: {fr: null, en: null}})
    },
    addReferentiel () {
      this.meta.referentiels.push({name: null, link: null})
    },
    addRelated () {
      this.meta.related.push({url: null, type: 'URL', lang: 'en', funct: 'information', relation: 'IsDocumentedBy', protocole: 'WWW:LINK-1.0-http--related', title: {fr: null, en: null}, description: {fr: null, en: null}})
    },
    addRepresentation () {
      this.meta.representations.push('')
    },
    addResolution () {
      this.meta.resolutions.push({value: null, unit: 'm'})
    },
    addRight () {
      this.meta.rights.others.push({type: 'use', code: 'otherRestrictions', title:{fr: null, en: null}, url: {fr:null, en:null}})
      this.updateCondition()
    },
    addService () {
      this.meta.services.push({url: null, protocole: 'OGC:WMS', title: {fr: null, en: null}, description: {fr: null, en: null}})
    },
    addTopic (value) {
      this.meta.categories.push(value)
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
    changeHowToCite (obj) {
      this.meta.rights.howToCite = obj.right
    },
    changeImage (obj) {
      this.meta.images[obj.id] = obj.image
      this.change()
    },
    changeInspireRight (obj) {
      this.meta.rights.inspire = obj.right
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
    changeReferentiel (obj) {
      var exists = []
      this.meta.referentiels.forEach(function (value, key) {
        if (key !== obj.id) {
          exists.push(value)
        }
      })
      var find = exists.find(ref => ref.link === obj.referentiel.link && ref.name === obj.referentiel.name)
      if (find) {
        this.removeReferentiel(obj.id)
      } else {
        this.meta.referentiels[obj.id] = obj.referentiel
        this.meta.changement = this.meta.changement + 1
        this.change()
      }
    },
    changeRelated (obj) {
      this.meta.related[obj.id] = obj.link
      this.change()
    },
    changeRepresentation (obj) {
      // remove duplicate
      var exists = []
      this.meta.representations.forEach(function (value, key) {
        if (key !== obj.id) {
          exists.push(value)
        }
      })
      if (exists.indexOf(obj.topic) >= 0) {
        this.removeRepresentation(obj.id)
      } else {
        this.meta.representations[obj.id] = obj.representation
        this.meta.changement = this.meta.changement + 1
        this.change()
      }
    },
    changeResolution (obj) {
      this.meta.resolutions[obj.id] = obj.resolution
      this.change()
    },
    changeRight (obj) {
      this.meta.rights.others[obj.id] = obj.right
      this.updateCondition()
      this.change()
    },
    changeRightType (obj) {
      console.log('changeRight')
      this.meta.rights.others[obj.id].type = obj.type
      this.updateCondition()
      this.change()
    },
    changeService(obj) {
      this.meta.services[obj.id] = obj.service
      this.change()
    },
    changeTopic (obj) {
      // remove duplicate
      var exists = []
      this.meta.categories.forEach(function (value, key) {
        if (key !== obj.id) {
          exists.push(value)
        }
      })
      if (exists.indexOf(obj.topic) >= 0) {
        this.removeTopic(obj.id)
      } else {
        this.meta.categories[obj.id] = obj.topic
        this.meta.changement = this.meta.changement + 1
        this.change()
      }
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
    keywordType (group) {
      switch (group) {
	      case 'discipline':
	        return 'discipline'
	      case 'featureOfInterest':
	        return 'place'
	//       case 'variable':
	//       case 'platform':
	//       case 'productType':
	     default:
	        return 'theme'
      }
    },
    mainLangChange () {
//       console.log(e)
//       this.meta.mainLang = e.target.value === 'fr' ? 'en' : 'fr'
      var index = this.meta.langs.indexOf(this.meta.mainLang)
      if (index === 1) {
        this.meta.langs.pop()
        this.meta.langs.unshift(this.meta.mainLang)
      } else if (index < 0) {
        this.meta.langs.unshift(this.meta.mainLang)
      }
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
      this.meta.formats.splice(id, 1)
      this.change()
    },
    removeIdentifier (id) {
      this.meta.identifiers.splice(id, 1)
      this.change()
    },
    removeHowToCite (id) {
      this.meta.rights.howToCite = null
      this.updateCondition()
      this.change()
    },
    removeImage (id) {
      this.meta.images.splice(id, 1)
      this.change()
    },
    removeInspireRight(id) {
      this.meta.rights.inspire = null
      this.updateCondition()
      this.change()
    },
    removeKeyword (obj) {
      this.meta.subjects[obj.type].splice(obj.id, 1)
      this.change()
    },
    removeLicense () {
      this.meta.rights.license = null
      this.updateCondition()
      this.change()
    },
    removeLink (id) {
      this.meta.links.splice(id, 1)
      this.change()
      
    },
    removeReferentiel (id) {
      this.meta.referentiels.splice(id, 1)
      this.change()
    },
    removeRelated (id) {
      this.meta.related.splice(id, 1)
      this.change()
      
    },
    removeRepresentation (id) {
      this.meta.representations.splice(id, 1)
      this.change()
    },
    removeResolution (id) {
      this.meta.resolutions.splice(id, 1)
      this.change()
    },
    removeRight (id) {
      this.meta.rights.others.splice(id, 1)
      this.updateCondition()
      this.change()
    },
    removeService (id) {
      this.meta.services.splice(id, 1)
      this.change()
      
    },
    removeTopic (id) {
      this.meta.categories.splice(id, 1)
      this.change()
    },
    updateCondition () {
      var used = this.meta.rights.others.filter(rg => rg.type === 'use' || rg.type === 'both')
      if (this.meta.rights.license) {
        used.push({})
      }
      if (this.meta.rights.howToCite) {
        used.push({})
      }
      
      console.log(used.length)
      if (used.length > 0) {
        this.useCondition = true
        this.meta.condition.use = null
      } else {
        this.useCondition = false
        if (!this.meta.condition.use) {
          this.meta.condition.use = 'unknown'
        }
      }
      var access = this.meta.rights.others.filter(rg => rg.type === 'access' || rg.type === 'both')
      if (this.meta.rights.inspire) {
        access.push({})
      }
      if (access.length > 0) {
        this.accessCondition = true
        this.meta.condition.access = null
      } else  {
        this.accessCondition = false
        if (!this.meta.condition.access) {
          this.meta.condition.access = 'no'
        }
      }
    },
    updateInspire () {
      if (this.inspire !== '') {
        this.meta.inspire =  this.themes[this.inspire]
        this.meta.inspire.thesaurus = this.gemet
      } else {
        this.meta.inspire = null
      }
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
  max-width:100%;
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
label.line {
  vertical-align: baseline;
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