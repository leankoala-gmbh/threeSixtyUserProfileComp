import type { IProfileUser, ILicenses, IPlanSelector } from '@/types/general.interfaces'
import axios from 'axios'

const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    throw error
  }
  console.error(error)
}

const getBaseUrl = computed(() => {
  const overrideApiUrl: undefined | string = inject('overrideBaseApiUrl')
  return overrideApiUrl || window.location.origin
})

export function useApiAbstraction (cnameOverride: string|null = null) {
  const guardUrl = () => {
    if (!getBaseUrl.value) throw new Error('No base url set')
  }

  const getLicenses = async () : Promise<ILicenses> => {
    guardUrl()
    try {
      const { data } = await axios.get(`${getBaseUrl.value}/license/`, { withCredentials: true })
      return data.reduce((acc: any, license: any) => {
        const { status } = license
        if (!acc[status]) { acc[status] = [] }
        acc[status].push(license)
        return acc
      }, {})
    } catch (error: unknown) {
      errorHandler(error)
      return {} as ILicenses
    }
  }

  const getPlans = async () : Promise<IPlanSelector[]> => {
    guardUrl()
    try {
      const { data } = await axios.get(`${getBaseUrl.value}/license/plans`, { withCredentials: true })
      return data
    } catch (error: unknown) {
      errorHandler(error)
      return []
    }
  }

  const upgradePlan = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/upgrade-plan`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradePlan = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/downgrade-plan`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const upgradeProperties = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/upgrade-properties`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradeProperties = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/downgrade-properties`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const terminateLicense = async () : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/terminate`, {}, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const removeAccount = async (password: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/user/delete`, { password }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setProfile = async (profile: IProfileUser) : Promise<void> => {
    guardUrl()
    try {
      await axios.put(`${getBaseUrl.value}/profile`, profile, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/profile/change-password`, {
        oldPassword: currentPassword,
        password: newPassword
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setConsent = async(consent: boolean) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/consent/set`, { enabled: consent }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }
  const getConsent = async() : Promise<boolean> => {
    guardUrl()
    try {
      const res = await axios.get(`${getBaseUrl.value}/consent/get`, { withCredentials: true })
      return res.data.enabled || false
    } catch (error: unknown) {
      errorHandler(error)
      return false
    }
  }

  return {
    getLicenses,
    getPlans,
    upgradePlan,
    downgradePlan,
    upgradeProperties,
    downgradeProperties,
    terminateLicense,
    removeAccount,
    setProfile,
    changePassword,
    setConsent,
    getConsent
  }
}
