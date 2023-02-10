import type { Translation } from '../i18n-types'
import * as originDE from '../originJson/de.json'

const de : Translation = JSON.parse(JSON.stringify(originDE))

export default de
