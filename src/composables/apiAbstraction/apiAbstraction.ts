import type { IProfile, ILicenses } from '@/types/general.schema'
import { ZProfile, ZPassword, ZLicenses } from '@/types/general.schema'

const baseUrl = ref<null|string>(null)

export function useApiAbstraction (cnameOverride: string|null = null) {
  baseUrl.value = cnameOverride || window.location.origin

  const guardUrl = () => {
    if (!baseUrl.value) throw new Error('No base url set')
  }

  const getLicenses = async () : Promise<ILicenses[]> => {
    guardUrl()
    const data = await fetch(`${baseUrl.value}/license/`, {
      credentials: 'include'
    }).then(response => response.json())

    if (ZLicenses.safeParse(data).success) {
      return data
    }
    throw new Error('Wrong profile response')
  }

  const upgradePlan = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/license/upgrade-plan`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const downgradePlan = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/license/downgrade-plan`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const upgradeProperties = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/license/upgrade-properties`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const downgradeProperties = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/license/downgrade-properties`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const terminateLicense = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/license/terminate`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const getProfile = async () : Promise<IProfile> => {
    guardUrl()
    const data = await fetch(`${baseUrl.value}/profile`, {
      credentials: 'include',
      method: 'GET'
    }).then(response => response.json())

    if (ZProfile.safeParse(data).success) {
      return data
    }
    throw new Error('Wrong profile response')
  }

  const setProfile = async (profile: IProfile) : Promise<unknown> => {
    guardUrl()
    if (!ZProfile.safeParse(profile).success) throw new Error('Invalid Profile Data')
    return await fetch(`${baseUrl.value}/profile`, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(profile)
    })
  }

  const changePassword = async (password: string) : Promise<unknown> => {
    guardUrl()
    if (!ZPassword.safeParse(password ).success) throw new Error('Password invalid')

    return await fetch(`${baseUrl.value}/profile/password`, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify({ password } )
    })
  }


  return {
    getLicenses,
    upgradePlan,
    downgradePlan,
    upgradeProperties,
    downgradeProperties,
    terminateLicense
  }
}
