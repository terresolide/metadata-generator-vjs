<template>
<span>
  <div class="header">
    <h3 style="margin-top:0;">Format Datacite 4.4</h3>
    <div>
    Pour plus d'information consultez la documentation 
    sur: 
    <ul style="margin:5px 0 10px 0;">
	     <li>
		     <a href="https://schema.datacite.org/meta/kernel-4.4/" target="_blank">
		     https://schema.datacite.org/meta/kernel-4.4/
		     </a>
	     </li>
	     <li>
         ou <a href="https://schema.datacite.org/meta/kernel-4.4/doc/DataCite-MetadataKernel_v4.4.pdf" target="_blank">
         https://schema.datacite.org/meta/kernel-4.4/doc/DataCite-MetadataKernel_v4.4.pdf
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
import ViewXml from './XmlTree.vue'
import moment from 'moment'
export default {
  name: 'DataciteGenerator',
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
      xmlDoc: null
    }
  },
  watch: {
    metadata: {
      handler (newvalue) {
	      this.createDataCite()
      },
      deep: true
    }
  },
  created () {
    this.createDataCite()
  },
  methods: {
    exportXML () {
        let str = new XMLSerializer().serializeToString(this.xmlDoc)
        let blob = new Blob([str], {type: 'application/xml'})
        // let dataUri = 'data:application/xml,'+ encodeURIComponent(dataStr);
        let date = moment()
        let exportFileDefaultName = 'datacite.' + date.format('YYYYMMDD') + '.xml';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href',  window.URL.createObjectURL(blob));
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        linkElement.remove()
    },
    createDataCite () {
      // var xmlDoc = new Document()null;
      const parser = new DOMParser();
        this.xmlDoc = parser.parseFromString('<resource xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://datacite.org/schema/kernel-4" xsi:schemaLocation="http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4/metadata.xsd"></resource>', "text/xml");
//         var titles = this.xmlDoc.createElement('titles')
//         this.xmlDoc.documentElement.appendChild(titles)
        // return xmlDoc.documentElement
      var self = this
      for (var key in this.metadata) {
        switch(key) {
        case 'doi':
           if (this.metadata.doi) {
             var doi = this.xmlDoc.createElement('identifier')
             doi.setAttribute('indentifierType', 'DOI')
             doi.appendChild(this.xmlDoc.createTextNode(this.metadata.doi))
             this.xmlDoc.documentElement.appendChild(doi)
           }
           break
        case 'creators':
          this.generateContact('creator', this.metadata.creators)
       
          break
        case 'contributors':
          var contributors = this.metadata.contributors.filter(c => c.fullName)
          contributors.push(this.metadata.metaContact)
          this.generateContact('contributor', contributors)
       
          break
        case 'dates':
          var root = this.xmlDoc.createElement('dates')
          var add = false
          this.metadata.dates.forEach(function (dt) {
            if (dt.date) {
              var node = self.createNode('date', dt.date)
              node.setAttribute('dateType', dt.type)
              if (dt.information) {
                node.setAttribute('dateInformation', dt.information)
              }
              root.appendChild(node)
              add = true
            }
          })
          if (add) {
            this.xmlDoc.documentElement.appendChild(root)
          }
          break
        case 'geoLocation':
          var root = this.xmlDoc.createElement('geoLocations')
          var added = false
          this.metadata.geoLocation.forEach(function (location) {
            if (location.name || (location.west && location.east && location.south && location.north)) {
              var node = self.xmlDoc.createElement('geoLocation')
              root.appendChild(node)
              if (location.name) {
                var locationPlace = self.createNode('locationPlace',location.name)
                node.appendChild(locationPlace)
                added = true
              }
              if (location.west && location.east && location.south && location.north) {
                var geoLocationBox = self.xmlDoc.createElement('geoLocationBox')
                node.appendChild(geoLocationBox)
                geoLocationBox.appendChild(self.createNode('westBoundLongitude', location.west))
                geoLocationBox.appendChild(self.createNode('eastBoundLongitude', location.east))
                geoLocationBox.appendChild(self.createNode('southBoundLatitude', location.south))
                geoLocationBox.appendChild(self.createNode('northBoundLatitude', location.north))
                added = true
              }
            }
          })
          if (added) {
            this.xmlDoc.documentElement.appendChild(root)
          }
          break
        case 'title':
           var titles = this.xmlDoc.createElement('titles')
           this.xmlDoc.documentElement.appendChild(titles)
           for (var i in this.metadata.langs) {
             var lang = this.metadata.langs[i]
             if (this.metadata.title[lang]) {
               var title = this.xmlDoc.createElement('title')
              
               title.appendChild(this.xmlDoc.createTextNode(this.metadata.title[lang]))
               title.setAttribute('xml:lang', lang)
               if (lang !== this.metadata.mainLang && Object.keys(this.metadata.title).length > 1) 
                  title.setAttribute('titleType', 'TranslatedTitle')
               titles.appendChild(title)
             }
           }
           break
        case 'publisher':
          this.xmlDoc.documentElement.appendChild(
              this.createNode('publisher', this.metadata.publisher.fullName)
          )
          break
        case 'publicationYear': 
          if (this.metadata.publicationYear) {
            this.xmlDoc.documentElement.appendChild(
                this.createNode('publicationYear', this.metadata.publicationYear)
            )
          }
          break
//         case 'mainLang':
//           var lg = xmlDoc.createElement('language')
//            lg.appendChild(xmlDoc.createTextNode(this.metadata.mainLang))
//            xmlDoc.documentElement.appendChild(lg)
//            break
        case 'language':
          if (this.metadata.language) {
            var lg = this.xmlDoc.createElement('language')
            lg.appendChild(this.xmlDoc.createTextNode(this.metadata.language))
            this.xmlDoc.documentElement.appendChild(lg)
          }
          break
        case 'resourceType':
          var rt = this.xmlDoc.createElement('resourceType')
          rt.setAttribute('resourceTypeGeneral', 'Collection')
         // if (this.metadata.resourceType) {
            rt.appendChild(this.xmlDoc.createTextNode(this.metadata.resourceType))
         // }
          this.xmlDoc.documentElement.appendChild(rt)
          break
        case 'subjects':
          var count = 0
          var subjects = this.xmlDoc.createElement('subjects')
          for (var type in this.metadata.subjects) {
            for (var index in this.metadata.subjects[type]) {
              var subjectList = this.generateSubject(this.metadata.subjects[type][index])
              subjectList.forEach(function (node) {
                subjects.appendChild(node)
                count++
              })
            }
          }
          if (this.metadata.inspire) {
            var subjectList = this.generateSubject(this.metadata.inspire)
            subjectList.forEach(function (node) {
              subjects.appendChild(node)
              count++
            })
          }
          if (count > 0) {
            this.xmlDoc.documentElement.appendChild(subjects)
          }
          break;
        case 'identifiers':
         // if (this.metadata.identifiers.length > 0) {
          var node = this.xmlDoc.createElement('alternateIdentifiers')
          var add = false
          this.metadata.identifiers.forEach(function (id) {
            if (id.identifier && id.identifier.trim() && id.type) {
              var identifier = self.createNode('alternateIdentifier', id.identifier.trim())
              identifier.setAttribute('alternateIdentifierType', id.type)
              node.appendChild(identifier)
              add = true
            }
          })
          if (add) {
            this.xmlDoc.documentElement.appendChild(node)
          }
          break
          case 'related':
            var rootId = this.xmlDoc.createElement('relatedIdentifiers')
            var rootItem = this.xmlDoc.createElement('relatedItems')
            var addId = false
            var addItem = false
            this.metadata.related.forEach(function (link) {
              console.log(link)
              if (link && link.url) {
                if (link.title[link.lang] && link.type === 'URL') {
                  var item = self.xmlDoc.createElement('relatedItem')
                  item.setAttribute('relationType', link.relation)
                  var nLink = self.createNode('relatedItemIdentifier', link.url.trim())
                  nLink.setAttribute('relatedItemIdentifierType', link.type)
                  item.appendChild(nLink)
                  var titles = self.xmlDoc.createElement('titles')
                  var title = self.createNode('title', link.title[link.lang])
                  title.setAttribute('xml:lang', link.lang)
                  titles.appendChild(title)
                  // add translated title
                  self.metadata.langs.forEach(function(lg) {
                    if (link.title[lg] && lg !== link.lang) {
                      title = self.createNode('title', link.title[lg])
                      title.setAttribute('xml:lang', lg)
                      title.setAttribute('titleType', 'TranslatedTitle')
                      titles.appendChild(title)
                    }
                  })
                  
                  item.appendChild(titles)
                  rootItem.appendChild(item)
                  addItem = true
                } else if (link.type === 'DOI'){
	                var nLink = self.createNode('relatedIdentifier', link.url.trim())
	                nLink.setAttribute('relatedIdentifierType', link.type)
	                nLink.setAttribute('relationType', link.relation)
	                rootId.appendChild(nLink)
	                addId = true
                }
              }
            })
            if (addId) {
              this.xmlDoc.documentElement.appendChild(rootId)
            }
            if (addItem) {
              this.xmlDoc.documentElement.appendChild(rootItem)
            }
            break
          case 'formats':
            var node = this.xmlDoc.createElement('formats')
            var add = false
            var self = this
            this.metadata.formats.forEach(function (format) {
              if (format && format.length > 0) {
                var nd = self.createNode('format', format)
                node.appendChild(nd)
                add = true
              }
            })
            if (add) {
              this.xmlDoc.documentElement.appendChild(node)
            }
            break
          case 'descriptions':
            var node = this.xmlDoc.createElement('descriptions')
            var add = false
            for(var key in this.metadata.descriptions) {
              var descriptions = this.metadata.descriptions[key]
              this.metadata.langs.forEach(function (lang) {
                if (descriptions[lang]) {
                  var nd = self.createNode('description', descriptions[lang])
                  nd.setAttribute('xml:lang', lang)
                  nd.setAttribute('descriptionType', key)
                  node.appendChild(nd)
                  add = true
                }
              })
            }
            if (add) {
              this.xmlDoc.documentElement.appendChild(node)
            }
            break
          case 'rights':
            var node = this.xmlDoc.createElement('rightsList')
            var add = false
            if (!this.metadata.condition.use && this.metadata.rights.license && this.metadata.rights.license.name) {
              var license = this.createNode('rights', this.metadata.rights.license.name)
              if (this.metadata.rights.license.identifier) {
                license.setAttribute('rightsIdentifier', this.metadata.rights.license.identifier)
              }
              if (this.metadata.rights.license.uri) {
                license.setAttribute('rightsURI', this.metadata.rights.license.uri)
              }
              node.appendChild(license)
              add = true
            }
            if (this.metadata.rights.others.length > 0) {
              var self = this
              this.metadata.rights.others.forEach(function (rg) {
                console.log(rg.type)
                if (!self.metadata.condition[rg.type]) {
	                self.metadata.langs.forEach(function (lg) {
	                  if (rg.title[lg]) {
	                    var nd = self.createNode('rights', rg.title[lg])
	                    nd.setAttribute('xml:lang', lg)
	                    if (rg.url[lg]) {
	                      nd.setAttribute('rigthsURI', rg.url[lg])
	                    }
	                    node.appendChild(nd)
	                    add = true
	                  }
	                })
                }
              })
            }
            if (add) {
              this.xmlDoc.documentElement.appendChild(node)
            }
          //}
        }
      
      }
     // var node = this.$el.querySelector('machin')
     // this.xmlDoc = xmlDoc
    },
    createNode (name, value) {
      var full =  this.xmlDoc.createElement(name)
      full.appendChild(this.xmlDoc.createTextNode(value))
      return full
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
          if (subject.thesaurus && (subject.code || subject.uri)) {
            node.setAttribute('subjectScheme', subject.thesaurus.name)
            node.setAttribute('schemeURI', subject.thesaurus.schemeUrl)
            if (subject.code) {
              node.setAttribute('valueURI', subject.thesaurus.valueRoot + subject.code)
              node.setAttribute('classificationCode', subject.code)
            } else {
              node.setAttribute('valueURI', subject.uri)
            }
            
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