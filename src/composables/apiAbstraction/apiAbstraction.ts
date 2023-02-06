import type { IProfile, ILicenses } from '@/types/general.schema'

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

  const deleteUser = async () : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/user`, {
        credentials: 'include',
        method: 'DELETE'
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }


  const setProfile = async (profile: IProfile) : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/profile`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(profile)
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string, token: string) : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/profile/change-password`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          oldPassword: currentPassword,
          password: newPassword,
          token
        })
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setConsent = async(consent: boolean) : Promise<void> => {
    guardUrl()
    try {
      await fetch(`${baseUrl.value}/consent/set`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ enabled: consent })
      })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }
  const getConsent = async() : Promise<{enabled: boolean}> => {
    guardUrl()
    try {
      const response = await fetch(`${baseUrl.value}/consent/get`, {
        credentials: 'include',
        method: 'GET'
      })
      return await response.json()
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
