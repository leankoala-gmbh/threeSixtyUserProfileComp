export type LooseOnionString<T extends string> = T | Omit<string, T>
export interface IKeyValue { [key: string]: string }

export interface IProfileUser {
  name?: string
  email?: string
  gravatar?: string
  timezone?: null | string
  nickname?: string
  firstName?: string
  familyName?: string
  sessionToken?: string
}

export interface ILicensesDetails {
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
export interface ILicenses {
  [key: string]: ILicensesDetails[]
}

export interface ILicensesServers {
  count: number
  min: number
  max: number
}

export interface IApiError {
  status?: string
  message?: string
  type?: string;
  title?: string;
  detail?: string;
  violations?: {
    propertyPath: string;
    title: string;
    parameters: any[];
    type?: string;
  }[];
}

export type TPlanStatus = 'active' | 'canceled'

export interface ISubscriptionHeaderDetails {
  status: string
  planName: string
  price?: number
  date: string
  currency?: string
}

export type TPaymentProviders = 'visa' | 'mastercard' | 'paypal' | 'sepa' | 'wire' | 'amex'

export interface IPlanSelector {
  name: string
  price: number
  currency: string
  interval: string
}
