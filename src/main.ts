import { defineCustomElement } from 'vue'
import ExampleWrapper from './components/feature/ExampleWrapper/ExampleWrapper.ce.vue'
import ExampleTrigger from './components/feature/ExampleTrigger/ExampleTrigger.ce.vue'

const ExampleWrapperComponent = defineCustomElement(ExampleWrapper)
const ExampleTriggerComponent = defineCustomElement(ExampleTrigger)
customElements.define('example-wrapper', ExampleWrapperComponent)
customElements.define('example-trigger', ExampleTriggerComponent)
