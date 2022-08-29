<template>
<div class="block-element">
  <span class="circle" v-if="id > -1">{{id + 1 }}</span>
  <div class="element-content">
     <div v-if="erasable" style="position:absolute;top:0;right:3px;" class="fa fa-close" @click="remove"></div>
    <div v-show="!isInspire">
    <label style="font-weight:700;vertical-align:baseline;">Type de condition</label>
      <select v-model="meta.type" @change="updateCondition()" :disabled="fixed">
        <option v-for="tp, id in types" :value="id">{{tp}}</option>
      </select>
    </div>
     <div v-show="!isInspire">
    <label style="font-weight:700;vertical-align:baseline;">Restriction</label>
      <select v-model="meta.code"  :disabled="fixed" >
        <option v-for="tp, id in codes" :value="id" >{{tp}}</option>
      </select>
    </div>
    <div v-if="isInspire" style="margin-bottom:15px;" >
       <label class="bold">Motif de la restriction</label>
       <div style="text-decoration:underline;">Aspect potentiellement mis en danger par la diffusion de la donnée:</div>
       <div v-for="law, id in inspires" style="margin-bottom:5px;">
        <input type="radio" v-model="meta.inspire" :value="id" @change="inspireChange" style="vertical-align:top;"/> 
        <div style="display:inline-block;max-width:calc(100% - 30px);font-size:0.9rem;">{{law.help}}</div>
       </div>
    </div>
    <div v-if="isInspire">
      <span class="label" style="min-width:150px;vertical-align:baseline;">Code INPIRE</span>
      <div style="margin-left:30px;">
         <input v-model="meta.inspire" disabled />
      </div>
    </div>
    <div>
       <span class="label" style="min-width:80px;vertical-align:baseline;">Description</span>
       <div v-for="lg in langs" style="margin-bottom:3px;margin-left:5px;">
          <span class="label">{{lg}}</span>
          <textarea v-model="meta.title[lg]"  class="small" required @input="change"></textarea>
           <meta-mro value="M"></meta-mro>
       </div>
 
     </div>
     <div v-show="!isInspire" class="datacite" v-if="id > -1">
       <span class="label" style="min-width:80px;vertical-align:baseline;">Url</span>
        <div v-for="lg in langs" style="margin-bottom:3px;margin-left:5px;">
         <span class="label">{{lg}}</span>
          <input v-model="meta.url[lg]"  style="min-width:500px;" @input="change">
          <meta-mro value="O"></meta-mro>
       </div>
     </div>
  </div>
</div>
</template>
<script>
import MetaMro from './metadata-mro.vue'
import FormaterTooltip from './formater-tooltip.vue'
export default {
  name: 'MetadataRight',
  components: {
    MetaMro,
    FormaterTooltip
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    right: {
      type: Object,
      default: () => {return {name: null, uri: null, identifier: null}}
    },
    fixed: {
      type: Boolean,
      value: false
    },
    isInspire: {
      type: Boolean,
      value: false
    },
    langs: {
      type: Array,
      default: () => {return ['fr', 'en']}
    },
    erasable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.meta = this.right
    if (this.isInspire) {
      this.inspireChange()
    }
  },
  watch: {
    right (newvalue) {
      this.meta = newvalue
    }
  },
  data () {
    return {
      types: {access: 'Accès', use: 'Utilisation', both: 'Accès et utilisation'},
      codes: {
        copyright: 'Droit d\'auteur / Droit moral (copyright)',
        patent: 'Brevet',
        patentPending: 'Brevet en instance',
        trademark: 'Marque de commerce',
    //    license: 'Licence',
        intellectualPropertyRights: 'Droit de propriété intelectuelle',
        restricted: 'Restreint',
        otherRestrictions: 'Autres restrictions'
      },
      meta: {type: 'access', title:{fr: null, en: null}, url:{fr:null, en: null}},
      inspires: {
//         noLimitations: {
//           title: {fr: 'Pas de restriction d’accès public', en: 'no limitations to public access'},
//           help: 'Aucun des articles de la loi ne peut être invoqué pour justifier d’une restriction d’accès public'
//         },
        INSPIRE_Directive_Article13_1a: {
          title: {
            fr: 'L124-4-I-1 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.a)',
            en: 'public access limited according to Article 13(1)(a) of the INSPIRE Directive'
          },
          help: 'La confidentialité des travaux des autorités publiques, lorsque cette confidentialité est prévue par la loi'
        },
        INSPIRE_Directive_Article13_1b: {
          title: {
            fr: 'L124-5-II-1 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.b)',
            en: 'public access limited according to Article 13(1)(b) of the INSPIRE Directive'
          },
          help: 'Les relations internationales, la sécurité publique ou la défense nationale.'
        },
        INSPIRE_Directive_Article13_1c: {
          title: {
            fr: 'L124-5-II-2 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.c)',
            en: 'public access limited according to Article 13(1)(c) of the INSPIRE Directive'
          },
          help: 'La bonne marche de la justice, la possibilité pour toute personne d’être jugée équitablement ou la capacité d’une autorité publique d’effectuer une enquête d’ordre pénal ou disciplinaire.'
        },
        INSPIRE_Directive_Article13_1d: {
          title: {
            fr: 'L124-4-I-1 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.d)',
            en: 'public access limited according to Article 13(1)(d) of the INSPIRE Directive'
          },
          help: 'La confidentialité des informations commerciales ou industrielles, lorsque cette confidentialité est prévue par la législation nationale ou communautaire afin de protéger un intérêt économique légitime, notamment l’intérêt public lié à la préservation de la confidentialité des statistiques et du secret fiscal.'
        },
        INSPIRE_Directive_Article13_1e: {
          title: {
            fr: 'L124-5-II-3 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.e)',
            en: 'public access limited according to Article 13(1)(e) of the INSPIRE Directive'
          },
          help: 'Les droits de propriété intellectuelle'
        },
        INSPIRE_Directive_Article13_1f: {
          title: {
            fr: 'L124-4-I-1 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.f)',
            en: 'public access limited according to Article 13(1)(f) of the INSPIRE Directive'   
          },
          help: 'La confidentialité des données à caractère personnel et/ou des fichiers concernant une personne physique lorsque cette personne n’a pas consenti à la divulgation de ces informations au public, lorsque la confidentialité de ce type d’information est prévue par la législation nationale ou communautaire.'
        },
        INSPIRE_Directive_Article13_1g: {
          title: {
            fr: 'L124-4-I-3 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.g)',
            en: 'public access limited according to Article 13(1)(g) of the INSPIRE Directive'
          },
          help: 'Les intérêts ou la protection de toute personne qui a fourni les informations demandées sur une base volontaire sans y être contrainte par la loi ou sans que la loi puisse l’y contraindre, à moins que cette personne n’ait consenti à la divulgation de ces données.'
        },
        INSPIRE_Directive_Article13_1h: {
          title: {
            fr: 'L124-4-I-2 du code de l’environnement (Directive 2007/2/CE (INSPIRE), Article 13.1.h)',
            en: 'public access limited according to Article 13(1)(h) of the INSPIRE Directive'
          },
          help: 'La protection de l’environnement auquel ces informations ont trait, comme par exemple la localisation d’espèces rares'
        }
      }
    }
  },
  methods: {
    inspireChange () {
      this.meta.title = this.inspires[this.meta.inspire].title
      this.change()
    },
    change () {
      this.$emit('change', {id: this.id, right:this.meta})
    },
    remove () {
      this.$emit('remove', this.id)
    },
    updateCondition () {
      console.log('TYPE CHANGE')
      this.$emit('typeChange', {id: this.id, type: this.meta.type})
    }
  }
}
</script>