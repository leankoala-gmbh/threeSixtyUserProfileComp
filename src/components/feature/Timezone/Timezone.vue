<script lang="ts" setup>
import VueMultiselect from 'vue-multiselect'
import timezones from '@/data/timezones.json'
import { onMounted, ref, watch } from 'vue'
import { translator } from '@/composables/translator'
import GeneralButton from '@/components/base/GeneralButton/GeneralButton.vue'
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
const changeTimeZoneInfo = ref(false)

const saveTimezone = () => {
  changeTimeZoneInfo.value = false
  debugEcho('saveTimezone', timezone.value)
  emit('updateTimezone', timezone.value)
}

const initialTimezone = () => {
  const tz = props.userData?.timezone?.length
    ? props.userData.timezone
    : Intl.DateTimeFormat().resolvedOptions().timeZone
  debugEcho('Preselected Timezone', tz)
  timezone.value = tz
  changeTimeZoneInfo.value = !props.userData?.timezone?.length
}

onMounted(() => {
  initialTimezone()
})

watch(() => timezone.value, (o, n) => {
  if (n && n !== o) {
    changeTimeZoneInfo.value = true
  }
})
</script>

<template>
  <div class="tsx-up-timeZonesForm tsxUp-grid-formRow items-center">
    <div>
      {{ translator('Timezone') }}
    </div>
    <div class="flex gap-4 w-full relative">
      <div class="w-full">
        <VueMultiselect
          v-model="timezone"
          :options="Object.keys(timeZoneObj)"
          :searchable="true"
          :close-on-select="true"
          :allow-empty="false"
          :custom-label="opt => timeZoneObj[opt]"
          placeholder=""
          select-label=""
          deselect-label=""
          selected-label=""
        />
      </div>
      <div>
        <GeneralButton @click="saveTimezone">
          {{ translator('Save') }}
        </GeneralButton>
      </div>
      <div v-if="changeTimeZoneInfo" class="absolute top-0 left-0 mt-12 pl-2 text-sm text-gray-400">
        {{ translator('TimezoneChanged') }}
      </div>
    </div>
  </div>
</template>
