import { createApp } from 'vue'
import App from './App.vue'
import './assets/colors.css'
import './assets/index.css'

import { defineCustomElement } from 'vue'
import userProfile from './components/feature/TSXUserProfile/TSXUserProfile.ce.vue'

const userProfileComponent = defineCustomElement(userProfile)
customElements.define('tsx-user-profile', userProfileComponent)

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { worker } = (await import(/* @vite-ignore */ './mocks/browser.js'))
  worker?.start()
}


createApp(App).mount('#app')

