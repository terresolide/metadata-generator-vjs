<template>
<div class="draw-bbox">
   <div style="position:absolute;top:0;right:0px;z-index:100;background:white;" class="fa fa-close" @click="close"></div>
   <div id="map" style="z-index:0;"></div>
</div>
</template>
<script>
import L from 'leaflet'
require('leaflet-draw')
// L.modLat = function( lat ){
//      lat = lat%180;
//      if( lat > 90 ){
//           lat -= 180;
//      }else if( lat < -90 ){
//           lat += 180;
//      }
//      return Math.round(lat * 100000) / 100000;
// }
L.modLng = function( lng ){
     lng = lng%360;
     if( lng > 180 ){
          lng -= 360;
     }else if( lng < -180 ){
          lng += 360;
     }
     return lng;
}
function round (value, decimal) {
   return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal)
}
export default {
  name: 'DrawBbox',
  props: {
    id: {
      type: Number,
      default: null
    },
    bboxes: {
      type: Array,
      default: null
    }
  },
  watch: {
    id (newvalue) {
      this.drawBboxes()
    },
    bboxes: {
      handler () {
        this.drawBboxes()
      },
      deep: true
    }
  },
  created () {
  },
  mounted () {
    this.initialize()
  },
  data () {
    return {
      bbox: null,
      map: null,
      drawControl: null,
      drawLayers: null,
      bboxesLayers: null
    }
  },
  methods: {
    change () {
      var bbox = Object.assign(this.bboxes[this.id], this.bbox)
      this.$emit('change', {id: this.id, bbox: bbox})
    },
    close () {
      this.$emit('close')
    },
    drawBboxes () {
      var _this = this
      var bounds = null
      if (this.bboxesLayers) {
        this.bboxesLayers.clearLayers()
      } else {
        this.bboxesLayers = L.featureGroup()
        this.bboxesLayers.addTo(this.map)
      }
      if (this.drawLayers) {
        this.drawLayers.clearLayers()
      } else {
        this.drawLayers = L.featureGroup()
        this.drawLayers.addTo(this.map)
      }
      this.bboxes.forEach(function (geolocation, index) {
        if ( geolocation.east && geolocation.west && geolocation.north && geolocation.south) {
          var latlngBounds = [
            [geolocation.north, geolocation.east], 
            [geolocation.south, geolocation.west]]
          if (index === _this.id)  {
            var rectangle = L.rectangle(
              latlngBounds,
              {color: 'red', weight: 1})
             .bindPopup('<b>Bbox N°' + (index + 1) + '</b>' + (geolocation.name ? '<br>' + geolocation.name : ''))
             _this.drawLayers.addLayer(rectangle)
            bounds = L.latLngBounds(latlngBounds)
          } else {
            var rectangle = L.rectangle(
              latlngBounds,
              {color: 'blue', weight: 1})
             .bindPopup('<b>Bbox N°' + (index + 1) + '</b>' + (geolocation.name ? '<br>' + geolocation.name : ''))
             _this.bboxesLayers.addLayer(rectangle)
          }
        } 
      })
      if (bounds) {
        this.map.fitBounds(bounds, {padding: [10, 10]})
      } else {
        bounds = this.bboxesLayers.getBounds()
        if (bounds.isValid()) {
          this.map.fitBounds(bounds, {padding: [20, 30]})
        }
      }
    },
    drawValidBbox (bounds) {
      if (!this.drawLayers) {
        return
      }
      if (!bounds) {
        return null
      }
      let bbox = { 
        north: round(bounds.getNorth(), 6),
        south: round(bounds.getSouth(), 6),
        east: round(bounds.getEast(), 6),
        west: round(bounds.getWest(), 6)
      }
      // valid bbox
      if (bbox.east > 180 || bbox.west < -180) {
         var delta = bbox.east - bbox.west
         if ( delta > 360) {
           bbox.east = 180
           bbox.west = -180
         }else {
           bbox.west = L.modLng(bbox.west);
           bbox.west = bbox.west === 180 ? -180 : bbox.west
           bbox.east = Math.min(bbox.west + delta, 180)
         }
      }
      // draw or redraw if bbox change
      var bounds = [[bbox.south, bbox.west], [bbox.north, bbox.east]]
      var rectangle = L.rectangle(bounds, {color: '#ff0000'})
      this.drawLayers.clearLayers()
      this.drawLayers.addLayer(rectangle)
      bounds = this.drawLayers.getBounds()
      return bbox;
    },
    initialize () {
      if (this.map) {
        return;
      }
      var container = this.$el.querySelector('#map');
      this.map = L.map( container).setView([51.505, -0.09], 2);
            
      L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
          maxZoom: 18,
          minZoom:1
        }).addTo( this.map )
      this.drawBboxes()
      this.initDrawControl()
    },
    initDrawControl() {
      if (this.drawControl) {
        return
      }
      this.drawControl = new L.Control.Draw({
        draw: {
          rectangle: {
            shapeOptions: {
              color: '#ff0000'
            }
          },
          circlemarker: false,
          circle: false,
          marker: false,
          polygon: false,
          polyline: false
        },
        edit: {
          featureGroup: this.drawLayers
        }
      })
      this.drawControl.addTo(this.map)
      var self = this
      this.map.on(L.Draw.Event.CREATED, function (e) {
        let layer = e.layer
        let bounds = e.layer.getBounds()
        self.bbox = self.drawValidBbox(bounds)
        self.change()
      })
    
      this.map.on(L.Draw.Event.EDITED, function (e) {
        let bounds
        e.layers.eachLayer(function (layer) {
          bounds = layer.getBounds()
        })
        self.bbox = self.drawValidBbox(bounds)
        self.change()
      })
    
      this.map.on(L.Draw.Event.DELETED , function (e) {
        self.bbox = { 
          north: '',
          south: '',
          east: '',
          west: ''
        }
        self.change()
      })
    }
  }
}
</script>
<style src="leaflet/dist/leaflet.css"></style>
<style src="leaflet-draw/dist/leaflet.draw.css"></style>
<style>
  div[id="map"] {
    position:relative;
    min-height: 500px;
  }
  div[id="map"] a.leaflet-draw-draw-rectangle:before{
    content:"\f04d";
    font-family: "FontAwesome"
  }
  div[id="map"] a.leaflet-draw-edit-edit:before{
    content:"\f040";
    font-family: "FontAwesome"
  }
  div[id="map"] a.leaflet-draw-edit-remove:before{
    content:"\f1f8";
    font-family: "FontAwesome"
  }
</style>
<style scoped>
.draw-bbox {
  position: fixed;
  width: 45%;
  height:500px;
  top: 10%;
  left: 45%;
  background: white;
  border:5px solid grey;
}
</style>