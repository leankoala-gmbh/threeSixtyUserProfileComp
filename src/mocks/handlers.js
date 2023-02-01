import { rest } from 'msw'
import licensesData from './fixtures/licenses.json'

const base = window.location.origin

export const handlers = [
  rest.get(`${base}/license/`, (req, res, ctx) => {
    return res(
      ctx.json(licensesData)
    )
  }),
  rest.get(`${base}/account-remove/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Account removed'
      })
    )
  })
]
