import type { IProfile, ILicenses } from '@/types/general.schema'
import axios from 'axios'

const baseUrl = ref<null|string>(null)

const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    throw error
  }
  console.error(error)
}

export function useApiAbstraction (cnameOverride: string|null = null) {
  baseUrl.value = cnameOverride || window.location.origin

  const guardUrl = () => {
    if (!baseUrl.value) throw new Error('No base url set')
  }

  const getLicenses = async () : Promise<ILicenses> => {
    guardUrl()
    try {
      return await axios.get(`${baseUrl.value}/license/`, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
      return {} as ILicenses
    }
  }

  const upgradePlan = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/license/upgrade-plan`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradePlan = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/license/downgrade-plan`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const upgradeProperties = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/license/upgrade-properties`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradeProperties = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/license/downgrade-properties`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const terminateLicense = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/license/terminate`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const deleteUser = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.delete(`${baseUrl.value}/user`, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }


  const setProfile = async (profile: IProfile) : Promise<void> => {
    guardUrl()
    try {
      await axios.put(`${baseUrl.value}/profile`, profile, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string, token: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/profile/change-password`, {
        oldPassword: currentPassword,
        password: newPassword,
        token
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setConsent = async(consent: boolean) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${baseUrl.value}/consent/set`, { enabled: consent }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }
  const getConsent = async() : Promise<{enabled: boolean}> => {
    guardUrl()
    try {
      return await axios.get(`${baseUrl.value}/consent/get`, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
      return {} as {enabled: boolean}
    }
  }

  return {
    getLicenses,
    upgradePlan,
    downgradePlan,
    upgradeProperties,
    downgradeProperties,
    terminateLicense,
    deleteUser,
    setProfile,
    changePassword,
    setConsent,
    getConsent
  }
}
