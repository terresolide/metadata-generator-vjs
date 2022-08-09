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
    <view-xml  v-if="xmlDoc" :element="xmlDoc.documentElement"></view-xml>
  </div>
</span>
</template>
<script>
import ViewXml from 'v-xml-tree'
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
    createISO19139 () {
      console.log('create')
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
            lgCode.appendChild(self.createNodeCode('gmd:LanguageCode', 'language', lang === 'fr' ? 'fre' : 'eng', ''))
            locale.appendChild(lgCode)
            var charset = self.xmlDoc.createElement('gmd:characterEncoding')
            charset.appendChild(self.createNodeCode('gmd:MD_CharacterSetCode', 'charset', 'utf8', ''))
            locale.appendChild(charset)
            langs.appendChild(locale)
          })
          this.xmlDoc.documentElement.appendChild(langs)
        }
    
         
       
       // var resp = this.xmlDoc.createElement('gmd:CI_ResponsibleParty')
        contact.appendChild(resp)
//         var org = this.xmlDoc.createElement('gmd:organisationName')
//         resp.appendChild(org)
//         var name = this.createNode('gco:CharacterString', this.metadata.metaContact.fullName)
//         org.appendChild(name)
        this.xmlDoc.documentElement.appendChild(contact)
        // add Date
//       var self = this
//       for (var key in this.metadata) {
//         switch(key) {
//         case 'doi':
//            if (this.metadata.doi) {
// 	           var doi = this.xmlDoc.createElement('identifier')
// 	           doi.setAttribute('indentifierType', 'DOI')
// 	           doi.appendChild(this.xmlDoc.createTextNode(this.metadata.doi))
// 	           this.xmlDoc.documentElement.appendChild(doi)
//            }
//            break
//         case 'creators':
//           this.generateContact('creator', this.metadata.creators)
       
//           break
//         case 'contributors':
//           this.generateContact('contributor', this.metadata.contributors)
       
//           break
//         case 'dates':
//           var root = this.xmlDoc.createElement('dates')
//           var add = false
//           this.metadata.dates.forEach(function (dt) {
//             if (dt.date) {
//               var node = self.createNode('date', dt.date)
//               node.setAttribute('dateType', dt.type)
//               if (dt.information) {
//                 node.setAttribute('dateInformation', dt.information)
//               }
//               root.appendChild(node)
//               add = true
//             }
//           })
//           if (add) {
//             this.xmlDoc.documentElement.appendChild(root)
//           }
//           break
//         case 'geoLocation':
//           var root = this.xmlDoc.createElement('geoLocations')
//           var added = false
//           this.metadata.geoLocation.forEach(function (location) {
//             if (location.name || (location.west && location.east && location.south && location.north)) {
//               var node = self.xmlDoc.createElement('geoLocation')
//               root.appendChild(node)
//               if (location.name) {
//                 var locationPlace = self.createNode('locationPlace',location.name)
//                 node.appendChild(locationPlace)
//                 added = true
//               }
//               if (location.west && location.east && location.south && location.north) {
//                 var geoLocationBox = self.xmlDoc.createElement('geoLocationBox')
//                 node.appendChild(geoLocationBox)
//                 geoLocationBox.appendChild(self.createNode('westBoundLongitude', location.west))
//                 geoLocationBox.appendChild(self.createNode('eastBoundLongitude', location.east))
//                 geoLocationBox.appendChild(self.createNode('southBoundLatitude', location.south))
//                 geoLocationBox.appendChild(self.createNode('northBoundLatitude', location.north))
//                 added = true
//               }
//             }
//           })
//           if (added) {
//             this.xmlDoc.documentElement.appendChild(root)
//           }
//           break
//         case 'title':
//            var titles = this.xmlDoc.createElement('titles')
//            this.xmlDoc.documentElement.appendChild(titles)
//            for (var i in this.metadata.langs) {
//              var lang = this.metadata.langs[i]
//              if (this.metadata.title[lang]) {
// 	             var title = this.xmlDoc.createElement('title')
	            
// 	             title.appendChild(this.xmlDoc.createTextNode(this.metadata.title[lang]))
// 	             title.setAttribute('xml:lang', lang)
// 	             if (lang !== this.metadata.mainLang && Object.keys(this.metadata.title).length > 1) 
// 	                title.setAttribute('titleType', 'TranslatedTitle')
// 	             titles.appendChild(title)
//              }
//            }
//            break
//         case 'publisher':
//           this.xmlDoc.documentElement.appendChild(
//               this.createNode('publisher', this.metadata.publisher.fullName)
//           )
//           break
//         case 'publicationYear': 
//           if (this.metadata.publicationYear) {
//             this.xmlDoc.documentElement.appendChild(
//                 this.createNode('publicationYear', this.metadata.publicationYear)
//             )
//           }
//           break
// //         case 'mainLang':
// //           var lg = xmlDoc.createElement('language')
// //            lg.appendChild(xmlDoc.createTextNode(this.metadata.mainLang))
// //            xmlDoc.documentElement.appendChild(lg)
// //            break
//         case 'language':
//           if (this.metadata.language) {
// // 	          var lg = this.xmlDoc.createElement('gmd:language)
// // 	          lg.appendChild(this.createNode(this.metadata.language))
// // 	          this.xmlDoc.documentElement.appendChild(lg)
//           }
//           break
       
//         case 'subjects':
//           var count = 0
//           var subjects = this.xmlDoc.createElement('subjects')
//           for (var type in this.metadata.subjects) {
//             for (var index in this.metadata.subjects[type]) {
//               var subjectList = this.generateSubject(this.metadata.subjects[type][index])
//               subjectList.forEach(function (node) {
//                 subjects.appendChild(node)
//                 count++
//               })
//             }
//           }
//           if (count > 0) {
//             this.xmlDoc.documentElement.appendChild(subjects)
//           }
//           break;
//         case 'identifiers':
//          // if (this.metadata.identifiers.length > 0) {
//           var node = this.xmlDoc.createElement('alternateIdentifiers')
//           var add = false
//           this.metadata.identifiers.forEach(function (id) {
//             if (id.identifier && id.identifier.trim() && id.type) {
//               var identifier = self.createNode('alternateIdentifier', id.identifier.trim())
//               identifier.setAttribute('alternateIdentifierType', id.type)
//               node.appendChild(identifier)
//               add = true
//             }
//           })
//           if (add) {
//             this.xmlDoc.documentElement.appendChild(node)
//           }
//           break
//           case 'links':
//             var root = this.xmlDoc.createElement('relatedIdentifiers')
//             var add = false
//             this.metadata.links.forEach(function (link) {
// 	            if (link && link.url) {
// 	              var nLink = self.createNode('relatedIdentifier', link.url.trim())
// 	              nLink.setAttribute('relatedIdentifierType', link.type)
// 	              nLink.setAttribute('relationType', link.relation)
// 	              root.appendChild(nLink)
// 	              add = true
// 	            }
//             })
//             if (add) {
//               this.xmlDoc.documentElement.appendChild(root)
//             }
//             break
//           case 'formats':
//             var node = this.xmlDoc.createElement('formats')
//             var add = false
//             var self = this
//             this.metadata.formats.forEach(function (format) {
//               if (format && format.length > 0) {
//                 var nd = self.createNode('format', format)
//                 node.appendChild(nd)
//                 add = true
//               }
//             })
//             if (add) {
//               this.xmlDoc.documentElement.appendChild(node)
//             }
//             break
//           case 'descriptions':
//             var node = this.xmlDoc.createElement('descriptions')
//             var add = false
//             for(var key in this.metadata.descriptions) {
//               var descriptions = this.metadata.descriptions[key]
// 	            this.metadata.langs.forEach(function (lang) {
// 	              if (descriptions[lang]) {
// 		              var nd = self.createNode('description', descriptions[lang])
// 		              nd.setAttribute('xml:lang', lang)
// 		              nd.setAttribute('descriptionType', key)
// 		              node.appendChild(nd)
// 		              add = true
// 	              }
// 	            })
//             }
//             if (add) {
//               this.xmlDoc.documentElement.appendChild(node)
//             }
//             break
//           case 'rights':
//             var node = this.xmlDoc.createElement('rightsList')
//             var add = false
//             if (this.metadata.rights.license && this.metadata.rights.license.name) {
//               var license = this.createNode('rights', this.metadata.rights.license.name)
//               if (this.metadata.rights.license.identifier) {
//                 license.setAttribute('rightsIdentifier', this.metadata.rights.license.identifier)
//               }
//               if (this.metadata.rights.license.uri) {
//                 license.setAttribute('rightsURI', this.metadata.rights.license.uri)
//               }
//               node.appendChild(license)
//               add = true
//             }
//             if (this.metadata.rights.others.length > 0) {
//               var self = this
//               this.metadata.rights.others.forEach(function (rg) {
//                 self.metadata.langs.forEach(function (lg) {
//                   if (rg.title[lg]) {
//                     var nd = self.createNode('rights', rg.title[lg])
//                     nd.setAttribute('xml:lang', lg)
//                     if (rg.url[lg]) {
//                       nd.setAttribute('rigthsURI', rg.url[lg])
//                     }
//                     node.appendChild(nd)
//                     add = true
//                   }
//                 })
//               })
//             }
//             if (add) {
//               this.xmlDoc.documentElement.appendChild(node)
//             }
//           //}
//        }
      
 //     }
     // var node = this.$el.querySelector('machin')
     // this.xmlDoc = xmlDoc
    },
    createNode (name, value) {
      var full =  this.xmlDoc.createElement(name)
      full.appendChild(this.xmlDoc.createTextNode(value))
      return full
    },
    createNodeCode(tag, list, code, value) {
     /// var charset = this.xmlDoc.createElement('gmd:characterSet')
      var node = this.createNode(tag, value)
      node.setAttribute('codeList',this.codeLists[list])
      node.setAttribute('codeListValue', code)
      return node
    },
    createContact(oContact) {
      var resp = this.xmlDoc.createElement('gmd:CI_ResponsibleParty')
      if (oContact.nameType === 'Personal') {
        var pers = this.xmlDoc.createElement('gmd:individualName')
        
      }
      var org = this.xmlDoc.createElement('gmd:organisationName')
      resp.appendChild(org)
      if (oContact.nameType === 'Organizational' && oContact.identifier && oContact.identifier.identifier) {
        var name = this.createNode('gmx:Anchor', oContact.fullName)
          switch (oContact.identifier.type) {
              case 'ORCID':
                name.setAttribute('xlink:href', 'https://orcid.org/' + oContact.identifier.identifier)
                break
              case 'ISNI':
                name.setAttribute('xlink:href', 'https://www.isni.org/' + oContact.identifier.identifier)
                break
              case 'ROR':
                name.setAttribute('xlink:href', 'https://ror.org/' + oContact.identifier.identifier)
                break
            
              }
      } else {
        var name = this.createNode('gco:CharacterString', this.metadata.metaContact.fullName)
      }
      org.appendChild(name)
      return resp
    },
    generateContact (type, tab) {
      if (tab.length > 0 && (type === 'creator' || type === 'contributor')) {
        var root = this.xmlDoc.createElement(type+'s')
        this.xmlDoc.documentElement.appendChild(root)
        var self = this
        var add = false
        tab.forEach(function (creator) {
          var contact = self.xmlDoc.createElement(type)
          if (creator.type) {
            contact.setAttribute('contributorType', creator.type)
          }
          if (!creator.fullName) {
            return
          }
          var full = self.xmlDoc.createElement(type + 'Name')
          full.appendChild(self.xmlDoc.createTextNode(creator.fullName))
          contact.appendChild(full)
          root.appendChild(contact)
          
          if (type !== 'publisher' ) {
            full.setAttribute('nameType', creator.nameType)
          }
         
          
          if (creator.givenName) {
            contact.appendChild(self.createNode('givenName', creator.givenName))
          }
          if (creator.familyName) {
            contact.appendChild(self.createNode('familyName', creator.familyName))
          }
          if (creator.identifier && creator.identifier.identifier) {
              var node = self.createNode('nameIdentifier', creator.identifier.identifier)
              node.setAttribute('nameIdentifierScheme', creator.identifier.type)
              switch (creator.identifier.type) {
              case 'ORCID':
                node.setAttribute('schemeURI', 'https://orcid.org/')
                break
              case 'ISNI':
                node.setAttribute('shemeURI', 'https://www.isni.org/')
                break
              case 'ROR':
                node.setAttribute('shemeURI', 'https://ror.org/')
                break
              case 'GRID':
                node.setAttribute('shemeURI', 'https://www.grid.ac/')
                break
              }
              contact.appendChild(node)
          }
          creator.affiliations.forEach(function (affiliation) {
            if (!affiliation.name) {
              return
            }
            var node = self.createNode('affiliation', affiliation.name)
            if (affiliation.identifier && affiliation.identifier.identifier) {
              node.setAttribute('affiliationIdentifierScheme', affiliation.identifier.type)
              switch (affiliation.identifier.type) {
              case 'ORCID':
                node.setAttribute('affiliationIdentifier', 'https://orcid.org/' + affiliation.identifier.identifier)
                break
              case 'ISNI':
                node.setAttribute('affiliationIdentifier', 'https://www.isni.org/' + affiliation.identifier.identifier)
                break
              case 'ROR':
                node.setAttribute('affiliationIdentifier', 'https://ror.org/' + affiliation.identifier.identifier)
                break
              case 'GRID':
                node.setAttribute('affiliationIdentifier', affiliation.identifier.identifier)
                break
              }
            }
            contact.appendChild(node)
          })
        })
      }
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