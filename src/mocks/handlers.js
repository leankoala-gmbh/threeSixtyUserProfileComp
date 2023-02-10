import { rest } from 'msw'
import licensesData from './fixtures/licenses.json'

const base = 'https://app.stage.360monitoring.com' //window.location.origin

export const handlers = [
  rest.get(`${base}/license/`, (req, res, ctx) => {
    return res(
      ctx.json(licensesData)
    )
  }),
  rest.post(`${base}/license/upgrade-plan`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Plan upgraded'
      })
    )
  }),
  rest.post(`${base}/license/downgrade-plan`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Plan downgraded'
      })
    )
  }),
  rest.post(`${base}/license/upgrade-properties`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Properties upgraded'
      })
    )
  }),
  rest.post(`${base}/license/downgraded-properties`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Properties downgraded'
      })
    )
  }),
  rest.post(`${base}/license/terminate`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'License terminated'
      })
    )
  }),
  rest.delete(`${base}/user/delete`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Account removed'
      })
    )
  }),
  rest.get(`${base}/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access: 'dsfsdfsdfs',
        timezone: 'Europe/Berlin',
        familyName: 'Doe',
        firstName: 'John',
        nickname: 'Doe'
      })
    )
  }),
  rest.put(`${base}/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Profile updated'
      })
    )
  }),
  rest.post(`${base}/profile/change-password`, (req, res, ctx) => {
    return res(
      ctx.status(409),
      ctx.json({ 'type':'https://symfony.com/errors/validation', 'title':'Validation Failed', 'detail':'password: Password must be at least 8 characters and contain lowercase and uppercase letters, numbers and special characters\npassword: This password has been leaked in a data breach, it must not be used. Please use another password.', 'violations':[{ 'propertyPath':'password', 'title':'Password must be at least 8 characters and contain lowercase and uppercase letters, numbers and special characters', 'parameters':[]}, { 'propertyPath':'password', 'title':'This password has been leaked in a data breach, it must not be used. Please use another password.', 'parameters':[], 'type':'urn:uuid:d9bcdbfe-a9d6-4bfa-a8ff-da5fd93e0f6d' }]})
      // ctx.json({
      //   'status': 'error',
      //   'message': 'Wrong old password'
      // })
    )
  }),
  rest.post(`${base}/consent/setee`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'consent updated'
      })
    )
  }),
  rest.get(`${base}/consent/getee`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'current consent received'
      })
    )
  })
]
