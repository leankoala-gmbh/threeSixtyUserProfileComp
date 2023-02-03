import { rest } from 'msw'
import licensesData from './fixtures/licenses.json'

const base = window.location.origin

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
  rest.post(`${base}/remove-account`, (req, res, ctx) => {
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
  rest.put(`${base}/profile/password`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'password updated'
      })
    )
  }),
  rest.put(`${base}/consent/revoke`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'consent updated'
      })
    )
  }),
  rest.get(`${base}/consent/get`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'current consent received',
        consent: true
      })
    )
  })
]
