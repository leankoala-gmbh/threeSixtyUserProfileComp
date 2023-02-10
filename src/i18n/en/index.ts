import type { BaseTranslation } from '../i18n-types'
import * as originEN from '../originJson/en.json'

const en : BaseTranslation = JSON.parse(JSON.stringify(originEN))

export default en
