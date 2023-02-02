import type { IProfile, ILicenses } from '@/types/general.schema'
import { ZProfile, ZPassword, ZLicenses } from '@/types/general.schema'

const baseUrl = ref<null|string>(null)

export function useApiAbstraction (cnameOverride: string|null = null) {
  baseUrl.value = cnameOverride || window.location.origin

  const guardUrl = () => {
    if (!baseUrl.value) throw new Error('No base url set')
  }

  const getLicenses = async () : Promise<{data: ILicenses[]}|{error:unknown}> => {
    guardUrl()
    try {
      const data = await fetch(`${baseUrl.value}/license/`, {
        credentials: 'include'
      }).then(response => response.json())

      if (ZLicenses.safeParse(data).success) return { data }
      return { error: new Error('Wrong licenses response') }
    } catch (error) {
      return { error }
    }
  }

  const upgradePlan = async () : Promise<void|{error:unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/upgrade-plan`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error) {
      return { error }
    }
  }

  const downgradePlan = async () : Promise<void|{error:unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/downgrade-plan`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error) {
      return { error }
    }
  }

  const upgradeProperties = async () : Promise<void|{error:unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/upgrade-properties`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error) {
      return { error }
    }
  }

  const downgradeProperties = async () : Promise<void|{error: unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/downgrade-properties`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error) {
      return { error }
    }
  }

  const terminateLicense = async () : Promise<void|{error: unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/license/terminate`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error) {
      return { error }
    }
  }

  const removeAccount = async () : Promise<void|{error: unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/remove-account`, {
        credentials: 'include',
        method: 'POST'
      })
    } catch (error) {
      return { error }
    }
  }

  const getProfile = async () : Promise<{data: IProfile}|{error: unknown}> => {
    guardUrl()
    try {
      const data = await fetch(`${baseUrl.value}/profile`, {
        credentials: 'include',
        method: 'GET'
      }).then(response => response.json())

      if (ZProfile.safeParse(data).success) return { data }
      return { error: new Error('Wrong profile response') }

    } catch (error) {
      return { error }
    }
  }

  const setProfile = async (profile: IProfile) : Promise<void|{error: unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/profile`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(profile)
      })
    } catch (error) {
      return { error }
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) : Promise<{error: unknown, data?: unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/profile/password`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword } )
      })
      return { error: null, data: null }
    } catch (error) {
      return { error }
    }
  }

  const setConsent = async(consent: boolean) : Promise<void|{error: unknown}> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/consent/revoke`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ consent })
      })
    } catch (error) {
      return { error }
    }
  }
  const getConsent = async() : Promise<{data: unknown}| {error: unknown}> => {
    guardUrl()
    try {
      const data = await fetch(`${baseUrl.value}/consent/get`, {
        credentials: 'include',
        method: 'GET'
      }).then(response => response.json())
      return { data }
    } catch (error) {
      return { error }
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
    setConsent,
    getConsent
  }
}
