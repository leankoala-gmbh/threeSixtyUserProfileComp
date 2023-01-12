<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMultiselect from 'vue-multiselect'
import timezones from '@/data/timezones.json'
import { onMounted, ref, watch } from 'vue'
import { translator } from '@/composables/translator'
import { debugEcho } from '@/utils/echo'
import { IProfileUser } from '@/types/general.interfaces'

const emit = defineEmits(['updateTimezone'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const timeZoneObj = JSON.parse(JSON.stringify(timezones))
const timezone = ref<null|string>(null)
const timezoneSavedInfo = ref(false)

const successInfo = () => {
  timezoneSavedInfo.value = true
  setTimeout(() => {
    timezoneSavedInfo.value = false
  }, 3000)
}

const saveTimezone = () => {
  successInfo()
  debugEcho('saveTimezone', timezone.value)
  emit('updateTimezone', timezone.value)
}

const initialTimezone = () => {
  if (!props.userData?.timezone?.length) {
    const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    debugEcho('Get timezone from the browser', browserTZ)
    timezone.value = browserTZ
    saveTimezone()
    return
  }
  timezone.value = props.userData.timezone
}

onMounted(() => {
  initialTimezone()
})

watch(() => timezone.value, (o, n) => {
  if (n && n !== o) {
    saveTimezone()
  }
})
</script>

<template>
  <div class="tsx-up-timeZonesForm tsxUp-grid-formRow items-center">
    <div>
      {{ translator('Timezone') }}
    </div>
    <div class=" w-full relative">
      <VueMultiselect
        v-model="timezone"
        :options="Object.keys(timeZoneObj)"
        :searchable="true"
        :close-on-select="true"
        :allow-empty="false"
        :custom-label="(opt:string) => timeZoneObj[opt]"
        placeholder=""
        select-label=""
        deselect-label=""
        selected-label=""
      />
      <div v-if="timezoneSavedInfo" class="absolute top-0 left-0 mt-12 pl-2 text-sm text-signalSuccess">
        {{ translator('TimezoneSaved') }}
      </div>
    </div>
  </div>
</template>
