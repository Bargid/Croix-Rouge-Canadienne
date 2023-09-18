import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// CSS imports

import './assets/CSS/root.css'
import './assets/CSS/nav.css'
import './assets/CSS/global.css'
import './assets/CSS/footer.css'

createApp(App).use(router).mount('#app')
