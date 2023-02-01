import { rest } from 'msw'
import licensesData from './fixtures/licenses.json'

export const handlers = [
  rest.get('https://monitoring.my-hosting.world/license/', (req, res, ctx) => {
    return res(
      ctx.json(licensesData)
    )
  }),
  rest.get('https://monitoring.my-hosting.world/account-remove/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Account removed'
      })
    )
  })
]