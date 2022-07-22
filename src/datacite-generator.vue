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
    <div style="margin-bottom:10px">
      <i class="fa fa-warning"></i> Certaines propriétés du format ne sont pas utilisées (comme subtitle...)
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
	      console.log('META CHANGE')
	      this.createDataCite()
      },
      deep: true
    }
  },
  created () {
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
      console.log('create')
      // var xmlDoc = new Document()null;
      const parser = new DOMParser();
        const xmlDoc = parser.parseFromString('<resource xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://datacite.org/schema/kernel-4" xsi:schemaLocation="http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4/metadata.xsd"></resource>', "text/xml");
        var titles = xmlDoc.createElement('titles')
        xmlDoc.documentElement.appendChild(titles)
        // return xmlDoc.documentElement
      var self = this
      for (var key in this.metadata) {
        switch(key) {
        case 'doi':
           if (this.metadata.doi) {
	           var doi = xmlDoc.createElement('identifier')
	           doi.setAttribute('indentifierType', 'DOI')
	           doi.appendChild(xmlDoc.createTextNode(this.metadata.doi))
	           xmlDoc.documentElement.appendChild(doi)
           }
           break
        case 'creators':
          this.generateContact('creator', this.metadata.creators, xmlDoc)
       
          break
        case 'contributors':
          this.generateContact('contributor', this.metadata.contributors, xmlDoc)
       
          break
        case 'dates':
          var root = xmlDoc.createElement('dates')
          var add = false
          this.metadata.dates.forEach(function (dt) {
            if (dt.date) {
              var node = self.createNode('date', dt.date, xmlDoc)
              node.setAttribute('dateType', dt.type)
              if (dt.information) {
                node.setAttribute('dateInformation', dt.information)
              }
              root.appendChild(node)
              add = true
            }
          })
          if (add) {
            xmlDoc.documentElement.appendChild(root)
          }
          break
        case 'geoLocation':
          var root = xmlDoc.createElement('geoLocations')
          var added = false
          this.metadata.geoLocation.forEach(function (location) {
            if (location.name || (location.west && location.east && location.south && location.north)) {
              var node = xmlDoc.createElement('geoLocation')
              root.appendChild(node)
              if (location.name) {
                var locationPlace = self.createNode('locationPlace',location.name, xmlDoc)
                node.appendChild(locationPlace)
                added = true
              }
              if (location.west && location.east && location.south && location.north) {
                var geoLocationBox = xmlDoc.createElement('geoLocationBox')
                node.appendChild(geoLocationBox)
                geoLocationBox.appendChild(self.createNode('westBoundLongitude', location.west, xmlDoc))
                geoLocationBox.appendChild(self.createNode('eastBoundLongitude', location.east, xmlDoc))
                geoLocationBox.appendChild(self.createNode('southBoundLatitude', location.south, xmlDoc))
                geoLocationBox.appendChild(self.createNode('northBoundLatitude', location.north, xmlDoc))
                added = true
              }
            }
          })
          if (added) {
            xmlDoc.documentElement.appendChild(root)
          }
          break
        case 'title':
           var titles = xmlDoc.createElement('titles')
           xmlDoc.documentElement.appendChild(titles)
           for (var i in this.metadata.langs) {
             var lang = this.metadata.langs[i]
             if (this.metadata.title[lang]) {
	             var title = xmlDoc.createElement('title')
	            
	             title.appendChild(xmlDoc.createTextNode(this.metadata.title[lang]))
	             title.setAttribute('xml:lang', lang === 'fr' ? 'fr-FR':'en-US')
	             if (lang !== this.metadata.mainLang && Object.keys(this.metadata.title).length > 1) 
	                title.setAttribute('titleType', 'TranslatedTitle')
	             titles.appendChild(title)
             }
           }
           break
        case 'publisher':
          xmlDoc.documentElement.appendChild(
              this.createNode('publisher', this.metadata.publisher.fullName, xmlDoc)
          )
          break
        case 'publicationYear': 
          if (this.metadata.publicationYear) {
            xmlDoc.documentElement.appendChild(
                this.createNode('publicationYear', this.metadata.publicationYear, xmlDoc)
            )
          }
          break
        case 'mainLang':
          var lg = xmlDoc.createElement('language')
           lg.appendChild(xmlDoc.createTextNode(this.metadata.mainLang === 'fr' ? 'fr-FR': 'en-US'))
           xmlDoc.documentElement.appendChild(lg)
           break
        case 'resourceType':
          var rt = xmlDoc.createElement('resourceType')
          rt.setAttribute('resourceTypeGeneral', 'Collection')
         // if (this.metadata.resourceType) {
            rt.appendChild(xmlDoc.createTextNode(this.metadata.resourceType))
         // }
          xmlDoc.documentElement.appendChild(rt)
          break
        case 'identifiers':
         // if (this.metadata.identifiers.length > 0) {
          var node = xmlDoc.createElement('alternateIdentifiers')
          var add = false
          this.metadata.identifiers.forEach(function (id) {
            if (id.identifier && id.identifier.trim() && id.type) {
              var identifier = self.createNode('alternateIdentifier', id.identifier.trim(),xmlDoc)
              identifier.setAttribute('alternateIdentifierType', id.type)
              node.appendChild(identifier)
              add = true
            }
          })
          if (add) {
            xmlDoc.documentElement.appendChild(node)
          }
          break
          case 'descriptions':
            var node = xmlDoc.createElement('descriptions')
            var add = false
            for(var key in this.metadata.descriptions) {
              var descriptions = this.metadata.descriptions[key]
	            this.metadata.langs.forEach(function (lang) {
	              if (descriptions[lang]) {
		              var nd = self.createNode('description', descriptions[lang], xmlDoc)
		              nd.setAttribute('xml:lang', lang === 'fr' ? 'fr-FR':'en-US')
		              nd.setAttribute('descriptionType', key)
		              node.appendChild(nd)
		              add = true
	              }
	            })
            }
            if (add) {
              xmlDoc.documentElement.appendChild(node)
            }
          //}
        }
      }
     // var node = this.$el.querySelector('machin')
      this.xmlDoc = xmlDoc
    },
    createNode (name, value, xmlDoc) {
      var full =  xmlDoc.createElement(name)
      full.appendChild(xmlDoc.createTextNode(value))
      return full
    },
    generateContact (type, tab, xmlDoc) {
      if (tab.length > 0 && (type === 'creator' || type === 'contributor')) {
        var root = xmlDoc.createElement(type+'s')
        xmlDoc.documentElement.appendChild(root)
        var self = this
        var add = false
        tab.forEach(function (creator) {
          var contact = xmlDoc.createElement(type)
          if (creator.type) {
            contact.setAttribute('contributorType', creator.type)
          }
          if (!creator.fullName) {
            return
          }
          var full = xmlDoc.createElement(type + 'Name')
          full.appendChild(xmlDoc.createTextNode(creator.fullName))
          contact.appendChild(full)
          root.appendChild(contact)
          
          if (type !== 'publisher' ) {
            full.setAttribute('nameType', creator.nameType)
          }
         
          
          if (creator.givenName) {
            contact.appendChild(self.createNode('givenName', creator.givenName, xmlDoc))
          }
          if (creator.familyName) {
            contact.appendChild(self.createNode('familyName', creator.familyName, xmlDoc))
          }
          if (creator.identifier && creator.identifier.identifier) {
              var node = self.createNode('nameIdentifier', creator.identifier.identifier, xmlDoc)
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
            var node = self.createNode('affiliation', affiliation.name, xmlDoc)
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