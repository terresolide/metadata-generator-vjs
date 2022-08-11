<template>
<span>
  <div class="header">
    <h3 style="margin-top:0;">Format ISO19139</h3>
    <div>
    Pour plus d'information consultez la documentation 
    sur: 
    <ul style="margin:5px 0 10px 0;">
	     <li>
		     <a href="http://cnig.gouv.fr/wp-content/uploads/2019/05/Guide-de-saisie-des-%C3%A9l%C3%A9ments-de-m%C3%A9tadonn%C3%A9es-INSPIRE-v2.0.pdf" target="_blank">
		     Guide de saisie des métadonnées INSPIRE (CNIG)
		     </a>
	     </li>
	     <li>
         ou <a href="https://github.com/INSPIRE-MIF/technical-guidelines/blob/2022.1/metadata/metadata-iso19139/metadata-iso19139.adoc" target="_blank">
         Technical Guidance for implementation of INSPIRE dataset and service metadata based on ISO/TS 19139:2007
         </a>
       </li>
    </ul>
    </div>
    <div>
      Fiche Générée <input type="button" value="Exporter" @click="exportXML"/>
    </div>
  </div>
  <div class="xml-content">
    <view-xml  v-if="xmlDoc" :element="xmlDoc.documentElement" :deployed="false" :depth="0"></view-xml>
  </div>
</span>
</template>
<script>
import ViewXml from './XmlTree.vue'
import moment from 'moment'
export default {
  name: 'IsoGenerator',
  components: {
    ViewXml
  },
  props: {
    metadata: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      xmlDoc: null,
      codeLists: {
        language: 'http://www.loc.gov/standards/iso639-2/',
        charset: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode',
        scope: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode',
        role: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode',
        dateType: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode',
        progress: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode',
        maintenance: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_MaintenanceFrequencyCode',
        keywordType: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
        spatialRepresentation: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_SpatialRepresentationTypeCode',
        link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode'
      }
    }
  },
  watch: {
    metadata: {
      handler (newvalue) {
	      console.log('META CHANGE')
	      this.createISO19139()
      },
      deep: true
    }
  },
  created () {
    this.createISO19139()
  },
  methods: {
    exportXML () {
        let str = new XMLSerializer().serializeToString(this.xmlDoc)
        let blob = new Blob([str], {type: 'application/xml'})
        // let dataUri = 'data:application/xml,'+ encodeURIComponent(dataStr);
        let date = moment()
        let exportFileDefaultName = 'metadata-iso19139.' + date.format('YYYYMMDD') + '.xml';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href',  window.URL.createObjectURL(blob));
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        linkElement.remove()
    },
    addConstraintsTo (node) {
      var constraints = this.xmlDoc.createElement('gmd:resourceConstraints')
      // this.metadata.condition
      var access = this.metadata.rights.filter(rg => rg.type === 'access')
      if (this.metadata.condition.access || access.length === 0) {
        
      } else {
        
      }
      var access = this.metadata.rights.filter(rg => rg.type === 'access')
      
      // this.metadata.rights
    },
    addExtentTo (node) {
      var extent = this.xmlDoc.createElement('gmd:extent')
      var exExtent = this.xmlDoc.createElement('gmd:EX_Extent')
      extent.appendChild(exExtent)
      var self = this
      this.metadata.geoLocation.forEach(function (geoLocation) {
        
        if (geoLocation.south && geoLocation.north && geoLocation.east && geoLocation.west) {
          console.log(geoLocation)
          exExtent.appendChild(self.createGeolocation(geoLocation))
        }
      })
      node.appendChild(extent)
    },
    createGeolocation (obj) {
      console.log(obj)
      var self = this
      var node = this.xmlDoc.createElement('gmd:geographicElement')
      var exNode = this.xmlDoc.createElement('gmd:EX_GeographicBoundingBox');
      node.appendChild(exNode)
      var tab =  ['west', 'east']
      for(var i in tab) {
        var card = tab[i]
         exNode.appendChild(self.createCard(obj[card], 'gmd:' + card + 'BoundLongitude'))
      }
       ['south', 'north'].forEach(function (card) {
         exNode.appendChild(self.createCard(obj[card], 'gmd:' + card + 'BoundLatitude'))
      })
      return node
    },
    createCard (value, elt) {
      console.log(value)
      var node = this.xmlDoc.createElement(elt)
      node.appendChild(this.createNode('gco:Decimal', value))
      return node
    },
    addKeywordsTo (node) {
      // re order keywords by thesaurus and group
      var thesaurus = {
        gcmdKeyword: [],
        fmtDiscipline: [],
        fmtVariable: [],
        gcmdPlatform: [],
        fmtPlatform: []
      }
      var noThesaurus = {
        discipline: [],
        theme: [],
        stratum: [],
        place: [],
        temporal: []
      }
      var self = this
      for (var key in this.metadata.subjects) {
        for(var id in this.metadata.subjects[key]) {
          if (this.metadata.subjects[key][id].thesaurus && this.metadata.subjects[key][id].code) {
            var complete = true
            this.metadata.subjects[key][id].thesaurus.langs.forEach(function (lang) {
              console.log(lang)
              if (!self.metadata.subjects[key][id].title[lang]) {
                complete = false
              }
            })
            if (complete) {
              thesaurus[this.metadata.subjects[key][id].thesaurus.id].push(this.metadata.subjects[key][id])
            }
          } else if (this.metadata.subjects[key][id].title[this.metadata.mainLang]) {
            noThesaurus[this.metadata.subjects[key][id].type].push(this.metadata.subjects[key][id].title)
          }
        }
      } 
      var self = this
      for (var type in noThesaurus) {
        if (noThesaurus[type].length > 0) {
          var keywords = self.xmlDoc.createElement('gmd:descriptiveKeywords')
          var mdKeywords = self.xmlDoc.createElement('gmd:MD_Keywords')
          keywords.appendChild(mdKeywords)
          noThesaurus[type].forEach(function (subject) {
            mdKeywords.appendChild(self.createIncludeString('gmd:keyword', subject, null, self.metadata.mainLang, self.metadata.langs))
          })
          var ntype = self.xmlDoc.createElement('gmd:type')
          
          ntype.appendChild(self.createNodeCode('gmd:MD_KeywordTypeCode', 'keywordType', type))
          mdKeywords.appendChild(ntype)
          node.appendChild(keywords)
        }
      }
      for (var tid in thesaurus) {
        if (thesaurus[tid].length > 0) {
          var thisThesaurus = thesaurus[tid][0].thesaurus
          var lang = this.metadata.mainLang
          if (thisThesaurus.langs.indexOf(lang) < 0) {
            lang = thisThesaurus.langs[0]
          }
          var keywords = self.xmlDoc.createElement('gmd:descriptiveKeywords')
          var mdKeywords = self.xmlDoc.createElement('gmd:MD_Keywords')
          keywords.appendChild(mdKeywords)
          thesaurus[tid].forEach(function (subject) {
            mdKeywords.appendChild(self.createIncludeString('gmd:keyword', subject.title, thisThesaurus.valueRoot + subject.code , lang, thisThesaurus.langs))
            
          })
          var ntype = self.xmlDoc.createElement('gmd:type')
          
          ntype.appendChild(self.createNodeCode('gmd:MD_KeywordTypeCode', 'keywordType', thisThesaurus.type))
          mdKeywords.appendChild(ntype)
          var thes = this.xmlDoc.createElement('gmd:thesaurusName')
          var ciCitation = this.xmlDoc.createElement('gmd:CI_Citation')
          ciCitation.appendChild(this.createIncludeString('gmd:title', thisThesaurus.name, thisThesaurus.scheme, lang, thisThesaurus.langs))
          ciCitation.appendChild(this.createDate(thisThesaurus.date, 'revision'))
          thes.appendChild(ciCitation)
          mdKeywords.appendChild(thes)
          node.appendChild(keywords)
        }
      }
    },
    createISO19139 () {
      // var xmlDoc = new Document()null;
      var self = this
      const parser = new DOMParser();
      this.xmlDoc = parser.parseFromString('<gmd:MD_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://schemas.opengis.net/csw/2.0.2/profiles/apiso/1.0.0/apiso.xsd"></gmd:MD_Metadata>', "text/xml");
      var identifier = this.xmlDoc.createElement('gmd:fileIdentifier')
      var code = this.createNode('gco:CharacterString', this.metadata.uuid)
      identifier.appendChild(code)
      
      this.xmlDoc.documentElement.appendChild(identifier)
      // metadata language
      var lang = this.xmlDoc.createElement('gmd:language')
      lang.appendChild(this.createNodeCode('gmd:LanguageCode', 'language', this.metadata.mainLang === 'fr' ? 'fre' : 'eng', ''))
      this.xmlDoc.documentElement.appendChild(lang)
      // add encodage
      var charset = this.xmlDoc.createElement('gmd:characterSet')
      charset.appendChild(this.createNodeCode('gmd:MD_CharacterSetCode', 'charset', 'utf8', ''))
      this.xmlDoc.documentElement.appendChild(charset)
      // hierarchyLevel
      var hierarchy = this.xmlDoc.createElement('gmd:hierarchyLevel')
      hierarchy.appendChild(this.createNodeCode('gmd:MD_ScopeCode','scope', 'series','series'))
      this.xmlDoc.documentElement.appendChild(hierarchy)
       // metadata contact
      var contact = this.xmlDoc.createElement('gmd:contact')
      var resp = this.createContact(this.metadata.metaContact)
      contact.appendChild(resp)
      this.xmlDoc.documentElement.appendChild(contact)
      // add date stamp
      var date = this.xmlDoc.createElement('gmd:dateStamp')
      var now = new Date()
      var time = this.createNode('gco:DateTime', moment.utc(now).format())
      date.appendChild(time)
      this.xmlDoc.documentElement.appendChild(date)
      // standard name et varsion
      var std = this.xmlDoc.createElement('gmd:metadataStandardName')
      var code = this.createNode('gco:CharacterString', 'ISO 19115:3/19139')
      std.appendChild(code)
      this.xmlDoc.documentElement.appendChild(std)
      
       var std = this.xmlDoc.createElement('gmd:metadataStandardVersion')
      var code = this.createNode('gco:CharacterString', '1.0')
      std.appendChild(code)
      this.xmlDoc.documentElement.appendChild(std)
      // all metadata language
      if (this.metadata.langs.length > 1) {
        var langs = this.xmlDoc.createElement('gmd:locale')
        this.metadata.langs.forEach(function (lang) {
          var locale = self.xmlDoc.createElement('gmd:PT_Locale')
          locale.setAttribute('id', lang.toUpperCase())
          var lgCode = self.xmlDoc.createElement('gmd:languageCode')
          lgCode.appendChild(self.createNodeCode('gmd:LanguageCode', 'language', lang === 'fr' ? 'fre' : 'eng', null))
          locale.appendChild(lgCode)
          var charset = self.xmlDoc.createElement('gmd:characterEncoding')
          charset.appendChild(self.createNodeCode('gmd:MD_CharacterSetCode', 'charset', 'utf8', null))
          locale.appendChild(charset)
          langs.appendChild(locale)
        })
        this.xmlDoc.documentElement.appendChild(langs)
      }
       // Reference system info
      // var syst = this.xmlDoc.createContextualFragment()
      var syst = this.xmlDoc.createElement('gmd:referenceSystemInfo')
      var ref = this.xmlDoc.createElement('gmd:MD_ReferenceSystem')
      syst.appendChild(ref)
      var refIdentifier = this.xmlDoc.createElement('gmd:referenceSystemIdentifier')
      ref.appendChild(refIdentifier)
      identifier = this.xmlDoc.createElement('gmd:RS_Identifier')
      refIdentifier.appendChild(identifier)
      var code = this.createIncludeString('gmd:code', this.metadata.referentiel.name, this.metadata.referentiel.link, this.metadata.mainLang, this.metadata.langs)
      identifier.appendChild(code)
      this.xmlDoc.documentElement.appendChild(syst)

      this.xmlDoc.documentElement.appendChild(this.createDataIdentification())

    },
    createNode (name, value) {
      var full =  this.xmlDoc.createElement(name)
      full.appendChild(this.xmlDoc.createTextNode(value))
      return full
    },
    createDataIdentification () {
      var self = this
      var node = this.xmlDoc.createElement('gmd:identificationInfo')
      var data = this.xmlDoc.createElement('gmd:MD_DataIdentification')
      node.appendChild(data)
      var citation = this.xmlDoc.createElement('gmd:citation')
      data.appendChild(citation)
      var ciCitation = this.xmlDoc.createElement('gmd:CI_Citation')
      citation.appendChild(ciCitation)
      // title
      if (this.metadata.title[this.metadata.mainLang]) {
        ciCitation.appendChild(this.createIncludeString('gmd:title', this.metadata.title, null, this.metadata.mainLang, this.metadata.langs))
      }
      // dates
      // creation
      var dateCreations = this.metadata.dates.filter(dt => dt.type === 'Created')
      dateCreations.sort(function (a, b) {
        if (a.date > b.date) {
          return -1
        } else {
          return 1
        }
      })
      if (dateCreations[0] && dateCreations[0].date) {
        ciCitation.appendChild(this.createDate(dateCreations[0].date, 'creation'))
      }
      // publication
      if (this.metadata.publicationDate) {
        ciCitation.appendChild(this.createDate(this.metadata.publicationDate, 'publication'))
      }
      // revision
      var dateRevisions = this.metadata.dates.filter(dt => dt.type === 'Updated')
      dateRevisions.sort(function (a, b) {
        if (a.date > b.date) {
          return -1
        } else {
          return 1
        }
      })
      if (dateRevisions[0] && dateRevisions[0].date) {
        ciCitation.appendChild(this.createDate(dateRevisions[0].date, 'revision'))
      }
      // IDENTIFIER
      if (this.metadata.doi) {
        ciCitation.appendChild(this.createIdentifier('https://www.doi.org/' + this.metadata.doi))
      }
      this.metadata.identifiers.forEach(function (identifier) {
        ciCitation.appendChild(self.createIdentifier(identifier.identifier))
      })
      // abstract
      if (this.metadata.descriptions.Abstract[this.metadata.mainLang]) {
        data.appendChild(this.createIncludeString('gmd:abstract', this.metadata.descriptions.Abstract, null, this.metadata.mainLang, this.metadata.langs))
      }
      // status
      var status = this.xmlDoc.createElement('gmd:status')
      status.appendChild(this.createNodeCode('gmd:MD_ProgressCode', 'progress', this.metadata.status))
      data.appendChild(status)
      
      // contact
      if (this.metadata.publisher.fullName) {
        var contact = this.xmlDoc.createElement('gmd:pointOfContact')
        contact.appendChild( this.createContact(this.metadata.publisher))
        data.appendChild(contact)
      }
      this.metadata.creators.forEach(function (creator) {
        if (creator.fullName) {
          var contact = self.xmlDoc.createElement('gmd:pointOfContact')
          contact.appendChild(self.createContact(creator))
          data.appendChild(contact)
        }
      })
       this.metadata.contributors.forEach(function (contributor) {
        if (contributor.fullName) {
          var contact = self.xmlDoc.createElement('gmd:pointOfContact')
          contact.appendChild(self.createContact(contributor))
          data.appendChild(contact)
        }
      })
      // Resource Maintenance
      var rMain = this.xmlDoc.createElement('gmd:resourceMaintenance')
      var mainInfo = this.xmlDoc.createElement('gmd:MD_MaintenanceInformation')
      rMain.appendChild(mainInfo)
      var freq = this.xmlDoc.createElement('gmd:maintenanceAndUpdateFrequency')
      mainInfo.appendChild(freq)
      freq.appendChild(this.createNodeCode('gmd:MD_MaintenanceFrequencyCode', 'maintenance', this.metadata.maintenance))
      data.appendChild(rMain)
      
      // graphic overview
      
      // keywords
     
      this.addKeywordsTo(data)
      
      // constraints
      
      // spatial representation type
      var sp = this.xmlDoc.createElement('gmd:spatialRepresentationType')
      sp.appendChild(this.createNodeCode('gmd:MD_SpatialRepresentationTypeCode', 'spatialRepresentation', this.metadata.representationType))
      data.appendChild(sp)
      // spatial resolution
      this.metadata.resolutions.forEach(function (resolution) {
        if (resolution.value) {
          var sp = self.xmlDoc.createElement('gmd:spatialResolution')
          var md = self.xmlDoc.createElement('gmd:MD_Resolution')
          sp.appendChild(md)
          var dist = self.xmlDoc.createElement('gmd:distance')
          md.appendChild(dist)
          var gco = self.createNode('gco:Distance', resolution.value)
          gco.setAttribute('uom', resolution.unit)
          dist.appendChild(gco)
          data.appendChild(sp)
        }
      })
      // language
      var lang = this.xmlDoc.createElement('gmd:language')
     // var gco = this.createNode('gco:CharacterString', this.metadata.lang === 'fr' ? 'fre' : 'eng')
      lang.appendChild(self.createNodeCode('gmd:LanguageCode', 'language', this.metadata.language === 'fr' ? 'fre' : 'eng', null))
      // lang.appendChild(gco)
      data.appendChild(lang)
      
      // character set
      var charset = this.xmlDoc.createElement('gmd:characterSet')
      charset.appendChild(this.createNodeCode('gmd:MD_CharacterSetCode', 'charset', this.metadata.charset))
      data.appendChild(charset)
      
      // topic category
      var topic = this.xmlDoc.createElement('gmd:topicCategory')
      topic.appendChild(this.createNode('gmd:MD_TopicCategoryCode', 'geoscientificInformation'))
      data.appendChild(topic)
      
      // extent
      this.addExtentTo(data)
      return node
    },
    createNodeCode(tag, list, code, value) {
     /// var charset = this.xmlDoc.createElement('gmd:characterSet')
      if (value) {
        var node = this.createNode(tag, value)
      } else {
        var node = this.xmlDoc.createElement(tag)
      }
      node.setAttribute('codeList',this.codeLists[list])
      node.setAttribute('codeListValue', code)
      return node
    },
    createIdentifier (id) {
      var node = this.xmlDoc.createElement('gmd:identifier')
      var identifier = this.xmlDoc.createElement('gmd:MD_Identifier')
      node.appendChild(identifier)
      identifier.appendChild(this.createIncludeString('gmd:code', id, null, 'en', ['en']))
      return node
    },
    createDate (date, type) {
      var node = this.xmlDoc.createElement('gmd:date')
      var ciDate = this.xmlDoc.createElement('gmd:CI_Date')
      node.appendChild(ciDate)
      var nd = this.xmlDoc.createElement('gmd:date')
      ciDate.appendChild(nd)
      nd.appendChild(this.createNode('gco:Date', date))
      var nd = this.xmlDoc.createElement('gmd:dateType')
      ciDate.appendChild(nd)
      nd.appendChild(this.createNodeCode('gmd:CI_DateTypeCode', 'dateType', type))
      return node
    },
    createContact(oContact) {
      var resp = this.xmlDoc.createElement('gmd:CI_ResponsibleParty')
      if (oContact.nameType === 'Personal') {
        var pers = this.createIncludeString('gmd:individualName', oContact.fullName, oContact.identifier, this.metadata.mainLang, this.metadata.langs)
        resp.appendChild(pers)
        
      }
//       var org = this.xmlDoc.createElement('gmd:organisationName')
//       resp.appendChild(org)
      if (oContact.nameType === 'Organizational' ) {
        var organisation = {
            name: oContact.fullName,
            identifier: oContact.identifier
        }
      } else if (oContact.affiliations.length > 0) {
        var organisation = oContact.affiliations[0]
      }
      if (organisation) {
        var org = this.createIncludeString('gmd:organisationName', organisation.name, organisation.identifier, this.metadata.mainLang, this.metadata.langs)
        resp.appendChild(org)
      }
      if (oContact.email) {
	      var info = this.xmlDoc.createElement('gmd:contactInfo')
	      var ciContact = this.xmlDoc.createElement('gmd:CI_Contact')
	      info.appendChild(ciContact)
	      // telephone
	//       var phone = this.xmlDoc.createElement('gmd:phone')
	//       ciContact.appendChild(phone)
	//       var ciPhone = this.xmlDoc.createElement('gmd:CI_Telephone')
	//       phone.appendChild(ciPhone)
	//       ciPhone.appendChild(this.createNeededString('gmd:voice', null))
	//       ciPhone.appendChild(this.createNeededString('gmd:facsimile', null))
	      //address
	      var address = this.xmlDoc.createElement('gmd:address')
	      ciContact.appendChild(address)
	      
	      var ciAddress = this.xmlDoc.createElement('gmd:CI_Address')
	      address.appendChild(ciAddress)
	//       ciAddress.appendChild(this.createNeededString('gmd:deliveryPoint', null))
	//       ciAddress.appendChild(this.createNeededString('gmd:city', null))
	//       ciAddress.appendChild(this.createNeededString('gmd:administrativeArea', null))
	//       ciAddress.appendChild(this.createNeededString('gmd:postalCode', null))
	//       ciAddress.appendChild(this.createNeededString('gmd:country', null))
	      ciAddress.appendChild(this.createIncludeString('gmd:electronicMailAddress', oContact.email, null, this.metadata.mainLang, this.metadata.langs))
     
        resp.appendChild(info)
      }
      var role = this.xmlDoc.createElement('gmd:role')
      role.appendChild(this.createNodeCode('gmd:CI_RoleCode', 'role', oContact.role, ''))
      resp.appendChild(role)
      return resp
    },
    createNeededString (tag, string) {
      var node = this.xmlDoc.createElement(tag)
      if (!string) {
        node.setAttribute('gco:nilReason', 'missing')
        node.appendChild(this.xmlDoc.createElement('gco:CharacterString'))
      } else {
        node.appendChild(this.createNode('gco:CharacterString', string))
      }
      return node
    },
    createIncludeString (tag, string, link, main, langs) {
      var node = this.xmlDoc.createElement(tag)
      var values = {}
      if (typeof string === 'string' ) {
        values = {fr: string, en: string}
      } else {
        values = string
        for(var lang in string) {
          if (values[lang] === null) {
            values[lang] = ''
          }
        }
      }
      
      if (link) {
        var text = this.createNode('gmx:Anchor', values[main])
        if (typeof link === 'string') {
          text.setAttribute('xlink:href', link)
        } else if (link.identifier){
          switch (link.type) {
          case 'ORCID':
            text.setAttribute('xlink:href', 'https://orcid.org/' + link.identifier)
            break
          case 'ISNI':
            text.setAttribute('xlink:href', 'https://www.isni.org/' + link.identifier)
            break
          case 'ROR':
            text.setAttribute('xlink:href', 'https://ror.org/' + link.identifier)
            break
        
          }
        } else {
          var text = this.createNode('gco:CharacterString', values[main])
        }
      } else {
        var text = this.createNode('gco:CharacterString', values[main])
      }
      node.appendChild(text)
      if (langs.length > 1) {
        node.setAttribute('xsi:type', 'gmd:PT_FreeText_PropertyType')
        var translate = this.xmlDoc.createElement('gmd:PT_FreeText')
        var self = this
        langs.forEach(function (lang) {
          var trans = self.xmlDoc.createElement('gmd:textGroup')
          var locale = self.createNode('gmd:LocalisedCharacterString', values[lang])
          locale.setAttribute('locale', '#' + lang.toUpperCase())
          trans.appendChild(locale)
          translate.appendChild(trans)
          
        })
        node.appendChild(translate)
      }
      return node
    },
    generateSubject (subject) {
      var nodes = []
      var langs = this.metadata.langs
      if (subject.thesaurus) {
        langs = this.metadata.langs.filter(lg => subject.thesaurus.langs.includes(lg))
      }
      var self = this
      langs.forEach(function (lang) {
        if (subject.title[lang]) {
          var node = self.createNode('subject', subject.title[lang])
          node.setAttribute('xml:lang', lang)
          if (subject.thesaurus && subject.code) {
            node.setAttribute('subjectScheme', subject.thesaurus.name)
            node.setAttribute('schemeURI', subject.thesaurus.schemeUrl)
            node.setAttribute('valueURI', subject.thesaurus.valueRoot + subject.code)
            node.setAttribute('classificationCode', subject.code)
          }
          nodes.push(node)
        }
        
      })
      return nodes
    }
  }
}
</script>
<style scoped>
 div.xml-content {
  background:rgb(246, 248, 250);
  border: 1px dotted lightgrey;
  margin: 5px 0;
 }
</style>