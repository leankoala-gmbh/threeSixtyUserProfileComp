export type LooseOnionString<T extends string> = T | Omit<string, T>
export interface IProfileUser {
  name?: string
  email?: string
  avatar?: string
  timezone?: null | string
  nickname?: string
  firstname?: string
  lastname?: string
}

export interface ILicenses {
  keyId: string
  keyNumber: string
  status: string
  createDate: string
  nextBillingDate:string
  type: string
  renewalCostNet: number
  renewalCostVat: number
  renewalCostGross: number
  renewalCurrency: string
  billingPeriod: string
  activationCode: string
  changePaymentSubscriptionUrl: string
  websites: ILicensesServers
  servers: ILicensesServers
}

export interface ILicensesServers {
  count: number
  min: number
  max: number
}
