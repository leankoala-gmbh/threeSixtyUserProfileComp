import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import './assets/colors.css'

import { defineCustomElement } from 'vue'
import userProfile from './components/feature/TSXUserProfile/TSXUserProfile.ce.vue'

const userProfileComponent = defineCustomElement(userProfile)
customElements.define('tsx-user-profile', userProfileComponent)

const app = createApp(App)

app.mount('#app')

