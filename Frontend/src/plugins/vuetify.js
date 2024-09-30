import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VNumberInput } from 'vuetify/lib/labs/components.mjs'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import {
  mdiArrowLeft,
  mdiFilterOutline,
  mdiHome,
  mdiMagnify,
  mdiRefresh,
  mdiTrashCan
} from '@mdi/js'

const vuetify = createVuetify({
  components: { ...components, VNumberInput },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      home: mdiHome,
      back: mdiArrowLeft,
      delete: mdiTrashCan,
      refresh: mdiRefresh,
      search: mdiMagnify,
      filter: mdiFilterOutline
    },
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'light'
  }
})

export default vuetify
