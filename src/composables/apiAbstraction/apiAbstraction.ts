import type { IProfile, ILicenses } from '@/types/general.schema'
import { ZProfile, ZPassword, ZLicenses } from '@/types/general.schema'

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
      const response = await fetch(`${baseUrl.value}/license/`, {
        credentials: 'include'
      })
      return await response.json()
    } catch (error: unknown) {
      errorHandler(error)
      return {} as ILicenses
    }
  }

  const upgradePlan = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/upgrade-plan`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradePlan = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/downgrade-plan`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const upgradeProperties = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/upgrade-properties`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradeProperties = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/downgrade-properties`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const terminateLicense = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/terminate`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const removeAccount = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/remove-account`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const getProfile = async () : Promise<IProfile> => {
    guardUrl()
    try {
      const data = await fetch(`${baseUrl.value}/profile`, {
        credentials: 'include',
        method: 'GET'
      }).then(response => response.json())

      if (ZProfile.safeParse(data).success) return data
      throw new Error('Wrong profile response')

    } catch (error: unknown) {
      errorHandler(error)
      return {} as IProfile
    }
  }

  const setProfile = async (profile: IProfile) : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/profile`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(profile)
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/profile/password`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword } )
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setConsent = async(consent: boolean) : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/consent/revoke`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ consent })
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }


  return {
    getLicenses,
    upgradePlan,
    downgradePlan,
    upgradeProperties,
    downgradeProperties,
    terminateLicense,
    removeAccount,
    getProfile,
    setProfile,
    changePassword,
    setConsent
  }
}
