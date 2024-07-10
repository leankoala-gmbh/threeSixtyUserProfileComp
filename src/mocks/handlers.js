import { http, HttpResponse } from 'msw'
import licensesData from './fixtures/licenses.json'
import plansData from './fixtures/plans.json'
import unitPricesData from './fixtures/unitPrices.json'

const base = 'https://app.stage.360monitoring.com' //window.location.origin

export const handlers = [
  http.get(`${base}/license/plans`, () => {
    return new HttpResponse(plansData)
  }),
  http.get(`${base}/license/`, () => {
    return new HttpResponse(licensesData)
  }),
  http.get(`${base}/license/properties`, () => {
    return new HttpResponse({
      properties: 10,
      maxProperties: 10
    })
  }),
  http.post(`${base}/license/upgrade-plan`, () => {
    return new HttpResponse({
      status: 'ok',
      data: []
    })
  }),
  http.post(`${base}/license/downgrade-plan`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'Plan downgraded'
    })
  }),
  http.post(`${base}/license/upgrade-properties`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'Properties upgraded'
    })
  }),
  http.post(`${base}/license/downgraded-properties`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'Properties downgraded'
    })
  }),
  http.get(`${base}/license/modify-properties/unit-costs/:id`, ({ params }) => {
    const { id } = params
    if (id.match(/^\d+$/)) {
      const tryOut = 'ok'
      if (tryOut === 'ok') {
        return new HttpResponse(unitPricesData)
      }

      return new HttpResponse({
        message: 'Cannot retrieve properties costs'
      }, {
        status: 500
      })
    }
  }),
  http.post(`${base}/license/modify-properties/preview`, () => {
    new HttpResponse({
      data: {
        alignmentGrossPrice: 1.09,
        alignmentVatPrice: 0.17,
        alignmentNetPrice: 0.92,
        nextBillingGrossPrice: 1.13,
        nextBillingVatPrice: 0.18,
        nextBillingNetPrice: 0.95,
        currency: 'EUR',
        resultMessage: 'OK',
        nextBillingDate: '2023-04-17',
        changePaymentUrl: 'https://store.plesk.com/1404/scp/s51442806-5pKvp9mXCusR83Pd',
        merchantOfRecordType: 'A'
      }
    })
  }
  ),
  http.post(`${base}/license/modify-properties`, () => {
    return new HttpResponse({
      status: 'ok',
      data: []
    })
  }),
  http.post(`${base}/license/terminate`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'License terminated'
    })
  }),
  // Profile Endpoints
  http.delete(`${base}/user/delete`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'Account removed'
    })
  }),
  http.get(`${base}/profile`, () => {
    return new HttpResponse({
      access: 'dsfsdfsdfs',
      timezone: 'Europe/Berlin',
      familyName: 'Doe',
      firstName: 'John',
      nickname: 'Doe'
    })
  }),
  http.put(`${base}/profile`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'Profile updated'
    })
  }),
  http.post(`${base}/profile/change-password`, () => {
    return new HttpResponse({
      'type':'https://symfony.com/errors/validation', 'title':'Validation Failed', 'detail':'password: Password must be at least 8 characters and contain lowercase and uppercase letters, numbers and special characters\npassword: This password has been leaked in a data breach, it must not be used. Please use another password.', 'violations':[{ 'propertyPath':'password', 'title':'Password must be at least 8 characters and contain lowercase and uppercase letters, numbers and special characters', 'parameters':[]}, { 'propertyPath':'password', 'title':'This password has been leaked in a data breach, it must not be used. Please use another password.', 'parameters':[], 'type':'urn:uuid:d9bcdbfe-a9d6-4bfa-a8ff-da5fd93e0f6d' }]
    })
  }),
  http.post(`${base}/consent/set`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'consent updated'
    })
  }),
  http.get(`${base}/consent/get`, () => {
    return new HttpResponse({
      status: 'ok',
      message: 'current consent received'
    })
  })
]
