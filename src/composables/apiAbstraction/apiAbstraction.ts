import type { ILicenses } from '@/types/general.interfaces'

const baseUrl = ref<null|string>(null)

export function useApiAbstraction () {
  const setBaseUrl = (url: string) => {
    baseUrl.value = url
  }

  const guardUrl = () => {
    if (!baseUrl.value) throw new Error('No base url set')
  }

  const getLicenses = async () : Promise<ILicenses[]> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/`, {
      credentials: 'include'
    }).then(response => response.json())
  }

  const upgradePlan = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/upgrade-plan`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const downgradePlan = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/downgrade-plan`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const upgradeProperties = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/upgrade-properties`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const downgradeProperties = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/downgrade-properties`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  const terminateLicense = async () : Promise<unknown> => {
    guardUrl()
    return await fetch(`${baseUrl.value}/terminate`, {
      credentials: 'include',
      method: 'POST'
    })
  }

  return {
    setBaseUrl,
    getLicenses,
    upgradePlan,
    downgradePlan,
    upgradeProperties,
    downgradeProperties,
    terminateLicense
  }
}
