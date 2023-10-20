import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// CSS imports

import './assets/CSS/root.css'
import './assets/CSS/nav.css'
import './assets/CSS/global.css'
import './assets/CSS/footer.css'
import './assets/CSS/calendar.css'
import './assets/CSS/selectfilters.css'
import './assets/CSS/courses.css'
import './assets/CSS/horizontalFilters.css'
import './assets/CSS/dateAndPrice.css'
import './assets/CSS/topbanner.css'
import './assets/CSS/mainBanner.css'
import './assets/CSS/cardButton.css'
import './assets/CSS/populartag.css'
import './assets/CSS/quickfilters.css'

// Font Awesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarDays, faUserSecret, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faCalendarDays, faCheck)

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.component('VueDatePicker', VueDatePicker)
.mount('#app')
