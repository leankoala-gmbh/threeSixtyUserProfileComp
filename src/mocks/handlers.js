import { rest } from 'msw'
import licensesData from './fixtures/licenses.json'

export const handlers = [
  rest.get('https://monitoring.my-hosting.world/license/', (req, res, ctx) => {
    return res(
      ctx.json(licensesData)
    )
  })
]
